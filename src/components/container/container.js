//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  activePresetName: state.shell.presetName
});

/**
 * get container component item by key
 * @param {*} dictionary dictionary
 * @param {*} componentName componentName
 * @returns {*} positionedComponent
 */
function getPositionedContainerItem(dictionary, componentName) {
  dictionary[componentName] = dictionary[componentName] || {
    before: [],
    after: [],
    replace: null
  };

  return dictionary[componentName];
}

const initialState = {
  containerComponents: null,
  hasPositionedComponents: false
};

/**
 * get component name
 * @param {*} component component
 * @returns {*} component name
 */
function getComponentName(component: Object) {
  if (!component || !component.nodeName) {
    return null;
  }

  return component.nodeName.displayName;
}

@connect(mapStateToProps)
/**
 * A video container enabling injecting components by preset, container and position
 */
class Container extends Component {
  /**
   * constructor
   * @param {*} props props
   * @param {*} context context
   * @return {void}
   */
  constructor(props, context) {
    super(props, context);
    this.setState(initialState);
  }

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount(): void {
    if (!this.context.presetData) {
      return;
    }
    this.context.presetData.listen(this._onPresetDataChanged);
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   */
  componentWillUnmount(): void {
    if (!this.context.presetData) {
      return;
    }
    this.context.presetData.unlisten(this._onPresetDataChanged);
  }

  /**
   * update container components
   * @param {*} presetsData presetData
   * @return {void}
   */
  _onPresetDataChanged = presetsData => {
    if (!presetsData) {
      return;
    }
    const {targetPresetName, activePresetName} = this.props;
    if (targetPresetName !== activePresetName) {
      this.setState(initialState);
      return;
    }

    const nextContainerComponents = {
      appendedComponents: [],
      positionedComponentMap: {}
    };
    const positionedComponentMap = nextContainerComponents.positionedComponentMap;
    let hasPositionedComponents = false;

    const presetComponents = [...presetsData.allPresets, ...(presetsData.specificPreset[targetPresetName] || [])];
    const relevantComponents = presetComponents.filter(component => component.container === this.props.name);
    relevantComponents.forEach(component => {
      if (component.beforeComponent) {
        getPositionedContainerItem(positionedComponentMap, component.beforeComponent).before.push(component);
        hasPositionedComponents = true;
      } else if (component.afterComponent) {
        getPositionedContainerItem(positionedComponentMap, component.afterComponent).after.push(component);
        hasPositionedComponents = true;
      } else if (component.replaceComponent) {
        getPositionedContainerItem(positionedComponentMap, component.replaceComponent).replace = component;
        hasPositionedComponents = true;
      } else {
        nextContainerComponents.appendedComponents.push(component);
      }
    });

    this.setState({
      containerComponents: nextContainerComponents,
      hasPositionedComponents
    });
  };

  /**
   *  render preset component
   * @param {PresetComponent} presetComponent presetComponent
   * @returns {*} component
   * @private
   */
  _renderPresetComponent(presetComponent: PresetComponent) {
    return presetComponent.render({context: presetComponent.context});
  }
  /**
   * render component
   *
   * @param {*} props - props
   * @param {*} state - state
   * @param {*} context - context
   * @returns {React$Element} - component
   * @memberof Container
   */
  render(): React$Element<any> {
    const {children} = this.props;
    const {containerComponents, hasPositionedComponents} = this.state;
    if (!containerComponents) {
      return null;
    }
    const newChildren = [];

    if (hasPositionedComponents) {
      children.forEach(child => {
        let childName = getComponentName(child);
        if (!childName) {
          newChildren.push(child);
          return;
        }
        const positionedComponent = containerComponents.positionedComponentMap[childName];
        if (!positionedComponent) {
          newChildren.push(child);
          return;
        }
        const {replace, before, after} = positionedComponent;
        if (replace) {
          newChildren.push(this._renderPresetComponent(replace));
          return;
        }
        if (before.length) {
          before.forEach(component => {
            newChildren.push(this._renderPresetComponent(component));
          });
        }
        newChildren.push(child);
        if (after.length) {
          after.forEach(component => {
            newChildren.push(this._renderPresetComponent(component));
          });
        }
      });
    } else {
      newChildren.push(...children);
    }

    containerComponents.appendedComponents.forEach(component => {
      const newChild = this._renderPresetComponent(component);
      if (this.props.name === 'player-gui') {
        // eslint-disable-next-line no-console
        console.log(`>>>>>>>>>>>> newChild`, {newChild});
      }
      newChildren.push(newChild);
    });

    if (this.props.name === 'player-gui') {
      // eslint-disable-next-line no-console
      console.log(`>>>>>>>>>>>> a`, {containerComponents, hasPositionedComponents, newChildren});
    }

    return (
      <div className={this.props.className} data-kp-container={this.props.name}>
        {newChildren}
      </div>
    );
  }
}

export {Container};
