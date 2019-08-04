//@flow
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {IntlProvider} from 'preact-i18n';
import {createStore} from 'redux';
import {copyDeep} from './utils/copy-deep';
import {mergeDeep} from './utils/merge-deep';
import {LogLevel, getLogLevel, setLogLevel, setLogHandler} from './utils/logger';
import {EventType} from './event/event-type';
import {setEnv} from './utils/key-map';
import {ContainerProvider} from './components/container';
import reducer from './store';
import en_translations from './translations/en.json';
import {actions as configActions} from './reducers/config';
import {actions as shellActions, SidePanelOrientation} from './reducers/shell';
import {CustomEventType} from '@playkit-js/playkit-js';
import {utils as playkitUtils} from '@playkit-js/playkit-js';

// core components for the UI
import {EngineConnector} from './components/engine-connector';
import {Shell} from './components/shell';
import {PlayerGUI} from './components/player-gui';
// ui presets
import * as presets from './ui-presets';

import {middleware} from './middlewares';

import './styles/style.scss';

// TODO sakal move to utils
/**
 * Throttle function (taken from underscore)
 * Information on the differences between:
 * https://css-tricks.com/debouncing-throttling-explained-examples/
 * @param {*} func func
 * @param {*} wait wait
 * @param {*} options options
 * @returns {function} throttle
 */
function throttle(func, wait, options) {
  var timeout,
    context,
    args,
    result,
    previous = 0;

  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
// TODO sakal remove if not in use
// /**
//  * Debounce function, taken directly from lodash (thank you)
//  * @param {*} func - the callback
//  * @param {*} wait - how much time to wait before calling the callback.
//  * @param {*} immediate - leading edge - trigger the callback right away and then wait.
//  * @returns {Function} debounce
//  */
// function debounce(func, wait, immediate) {
//   var timeout;
//   return function() {
//     var context = this,
//       args = arguments,
//       later = function() {
//         timeout = null;
//         if (!immediate) func.apply(context, args);
//       },
//       callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// }

/**
 * API used for building UIs based on state conditions
 *
 * @class UIManager
 */
class UIManager {
  player: Object;
  targetId: string;
  store: any;
  container: ?HTMLElement;
  root: React$Component<any, any, any>;
  _translations: {[langKey: string]: Object} = {en: en_translations};
  _locale: string = 'en';
  _uiComponents: UIComponent[];

  /**
   * holds the resize observer. Incharge of notifying on resize changes.
   * @type {?AdsController}
   * @private
   */
  _resizeWatcher: ResizeWatcher;

  /**
   * Creates an instance of UIManager.
   * @param {Object} player - player instance
   * @param {UIOptionsObject} config - ui config
   * @memberof UIManager
   */
  constructor(player: Object, config: UIOptionsObject) {
    if (config.log && config.log.level && this.LogLevel[config.log.level]) {
      setLogLevel(this.LogLevel[config.log.level]);
    }
    if (config.log && typeof config.log.handler === 'function') {
      setLogHandler(config.log.handler);
    }

    this._uiComponents = [...(config.uiComponents || [])];
    delete config.uiComponents; // todo sakal consult with Oren if he wants to keep the value in the config even if it is stale
    this.player = player;
    this.targetId = config.targetId;
    this._createStore(config);
    this.setConfig(config);
    this._setLocaleTranslations(config);
    setEnv(this.player.env);

    this._resizeWatcher = new playkitUtils.ResizeWatcher();
    this._resizeWatcher.init(document.getElementById(config.targetId));
    this._resizeWatcher.addEventListener(CustomEventType.RESIZE, this._onPlayerWrapperResize);
  }

  /**
   * handle player wrapper resize
   * @type {Function}
   * @private
   */
  _onPlayerWrapperResize = throttle(() => {
    // todo sakal discuss about the name player wrapper
    const playerWrapperContainer = document.getElementById(this.targetId);
    if (playerWrapperContainer) {
      this.store.dispatch(shellActions.updatePlayerWrapperClientRect(playerWrapperContainer.getBoundingClientRect()));
    }

    // todo sakal Oren imo this is the relevant place and note that it is wrappered with debounce
    if (document.body) {
      this.store.dispatch(shellActions.updateDocumentWidth(document.body.clientWidth));
    }
  }, 500);

  /**
   * Gets the updated state from the config reducer.
   * @public
   * @returns {UIOptionsObject} - The UI manager config.
   */
  get config(): UIOptionsObject {
    return copyDeep(this.store.getState().config);
  }

  /**
   * sets the player and ui config in the store
   *
   * @param {Object} config - new config object
   * @param {string} componentAlias - component alias (optional)
   * @returns {void}
   * @memberof UIManager
   */
  setConfig(config: Object, componentAlias?: string): void {
    if (componentAlias) {
      this.store.dispatch(configActions.updateComponentConfig(componentAlias, config));
    } else {
      this.store.dispatch(configActions.updateConfig(config));
      if (config.components && config.components.sidePanels) {
        // todo sakal consult with Oren if he wants to keep the value in the config even if it is stale
        const {verticalSizes, horizontalSizes} = config.components.sidePanels;
        if (verticalSizes) {
          this.store.dispatch(shellActions.updateSidePanelSize(SidePanelOrientation.VERTICAL, verticalSizes));
        }

        if (horizontalSizes) {
          this.store.dispatch(shellActions.updateSidePanelSize(SidePanelOrientation.HORIZONTAL, horizontalSizes));
        }
      }
    }
  }

  /**
   * build default UIs
   *
   * @returns {void}
   * @memberof UIManager
   */
  buildDefaultUI(): void {
    // TODO remove temp 'sakal' global variable
    const uis = [
      {template: presets.idleUI, condition: state => state.engine.isIdle},
      {template: presets.errorUI, condition: state => window.sakal === 'error' || state.engine.hasError},
      {template: presets.adsUI, condition: state => window.sakal === 'ads' || state.engine.adBreak},
      {template: presets.liveUI, condition: state => window.sakal === 'live' || state.engine.isLive},
      {template: presets.playbackUI}
    ];
    this._buildUI(uis);
  }

  /**
   * build custom UIs
   *
   * @param {Array<UIPreset>} uis - UIs array with conditions based on state
   * @returns {void}
   * @memberof UIManager
   */
  buildCustomUI(uis: Array<UIPreset>): void {
    if (uis.length > 0) {
      this._buildUI(uis);
    } else {
      let fallbackUIs = [{template: props => presets.playbackUI(props)}];
      this._buildUI(fallbackUIs);
    }
  }

  /**
   * set the language translations
   * @param {UIOptionsObject} config - config
   * @private
   * @returns {void}
   */
  _setLocaleTranslations(config: UIOptionsObject): void {
    if (config.translations) {
      Object.entries(config.translations).forEach(([locale, translation]) => {
        //fallback to english for non existing keys
        translation = mergeDeep({}, this._translations['en'], translation);
        this._translations[locale] = translation;
      });
    }
    if (config.locale && this._translations[config.locale]) {
      this._locale = config.locale;
    }
  }

  /**
   * Creates the redux store.
   * @param {UIOptionsObject} config - The UI config.
   * @private
   * @returns {void}
   */
  _createStore(config: UIOptionsObject): void {
    this.store = createStore(
      reducer,
      window.devToolsExtension &&
        window.devToolsExtension({
          name: `playkit #${this.targetId}`,
          instanceId: this.targetId
        }),
      middleware(this.player, config)
    );
  }

  /**
   * build the UI and render to targetId configured in player config
   *
   * @param {Array<UIPreset>} [uis] - UI array with conditions
   * @returns {void}
   * @memberof UIManager
   */
  _buildUI(uis?: Array<UIPreset>): void {
    if (!this.player) return;
    this.container = document.getElementById(this.targetId);
    if (this.container) {
      // i18n, redux and initial player-to-store connector setup
      const template = (
        <Provider store={this.store}>
          <ContainerProvider uiComponents={this._uiComponents}>
            <IntlProvider definition={this._translations[this._locale]}>
              <Shell player={this.player}>
                <EngineConnector player={this.player} />
                <PlayerGUI uis={uis} player={this.player} playerContainer={this.container} />
              </Shell>
            </IntlProvider>
          </ContainerProvider>
        </Provider>
      );

      // render the player
      this.root = render(template, this.container, this.root);
    }
  }

  /**
   * Destroy the ui manager.
   * @returns {void}
   */
  destroy(): void {
    this._resizeWatcher.removeEventListener(CustomEventType.RESIZE, this._onPlayerWrapperResize);
    this._resizeWatcher.destroy();
    if (this.container) {
      this.container.prepend(this.player.getView());
      render('', this.container, this.root);
    }
  }

  /**
   * get the log level
   * @param {?string} name - the logger name
   * @returns {Object} - the log level
   */
  getLogLevel(name?: string): Object {
    return getLogLevel(name);
  }

  /**
   * sets the logger level
   * @param {Object} level - the log level
   * @param {?string} name - the logger name
   * @returns {void}
   */
  setLogLevel(level: Object, name?: string) {
    setLogLevel(level, name);
  }

  /**
   * Get the ui manager log level.
   * @returns {Object} - The log levels of the player.
   * @public
   */
  get LogLevel(): {[level: string]: Object} {
    return LogLevel;
  }

  /**
   * Gets the ui manager event enums.
   * @returns {Object} - The ui manager event enums.
   * @public
   */
  get Event(): {[event: string]: string} {
    return EventType;
  }
}

export {UIManager};
