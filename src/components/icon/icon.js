import { h, Component } from 'preact';

class Icon extends Component {

  render(props) {
    switch (props.type) {
      case 'maximize':
        return (
          <svg className='icon icon-maximize' viewBox='0 0 1024 1024'>
            <path d='M800 269.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' />
            <path d='M224 754.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' />
          </svg>
        )
      case 'minimize':
        return (
          <svg className='icon icon-minimize' viewBox='0 0 1024 1024'>
            <path d='M672 306.745v-114.745c0-17.673-14.327-32-32-32s-32 14.327-32 32v192c0 17.673 14.327 32 32 32h192c17.673 0 32-14.327 32-32s-14.327-32-32-32h-114.745l137.373-137.373c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-137.373 137.373z' />
            <path d='M352 717.255v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-17.673-14.327-32-32-32h-192c-17.673 0-32 14.327-32 32s14.327 32 32 32h114.745l-137.373 137.373c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.497 45.255 0l137.373-137.373z' />
          </svg>
        )

      case 'play':
        return (
          <svg className='icon icon-play' viewBox='0 0 1024 1024'>
            <path d='M796.806 461.202c44.919 28.075 44.739 73.706 0 101.668l-459.472 287.171c-44.919 28.075-81.334 7.915-81.334-45.305v-585.4c0-53.096 36.595-73.266 81.334-45.305l459.472 287.171z' />
          </svg>
        )

      case 'pause':
        return (
          <svg className='icon icon-pause' viewBox='0 0 1024 1024'>
            <path d='M256 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314zM640 287.843c0-35.259 28.407-63.843 64-63.843 35.346 0 64 28.564 64 63.843v448.314c0 35.259-28.407 63.843-64 63.843-35.346 0-64-28.564-64-63.843v-448.314z' />
          </svg>
        )

      case 'volume-base':
        return (
          <svg className='icon volume-base' viewBox='0 0 1024 1024'>
            <path d='M224 352l234.504-156.336c29.545-19.697 53.496-7.194 53.496 28.053v576.566c0 35.19-24.059 47.677-53.496 28.053l-234.504-156.336h-127.906c-17.725 0-32.094-14.581-32.094-31.853v-256.295c0-17.592 14.012-31.853 32.094-31.853h127.906zM288 637.748l160 106.667v-464.83l-160 106.667v251.496zM128 416v192h96v-192h-96z' />
          </svg>
        )

      case 'volume-waves':
        return (
          <svg className='icon volume-waves' viewBox='0 0 1024 1024'>
            <path d='M802.017 837.177c82.359-86.627 129.183-201.774 129.183-324.26 0-123.976-47.976-240.409-132.127-327.329-12.293-12.697-32.552-13.025-45.249-0.732s-13.025 32.552-0.732 45.249c72.692 75.084 114.109 175.597 114.109 282.812 0 105.928-40.422 205.331-111.566 280.162-12.177 12.808-11.666 33.063 1.143 45.24s33.063 11.666 45.24-1.143z' />
            <path d='M667.436 743.221c67.761-60.884 107.273-147.888 107.273-241.233 0-87.318-34.552-169.203-94.836-229.446-12.501-12.493-32.762-12.486-45.255 0.015s-12.486 32.762 0.015 45.255c48.375 48.342 76.075 113.989 76.075 184.176 0 75.021-31.679 144.776-86.048 193.627-13.146 11.812-14.227 32.044-2.416 45.19s32.044 14.227 45.19 2.416z' />
          </svg>
        )

      case 'volume-mute':
        return (
          <svg className='icon volume-mute' viewBox='0 0 1024 1024'>
            <path d='M768 466.745l-67.986-67.986c-12.213-12.213-32.654-12.393-45.151 0.104-12.584 12.584-12.543 32.711-0.104 45.151l67.986 67.986-67.986 67.986c-12.213 12.213-12.393 32.654 0.104 45.151 12.584 12.584 32.711 12.543 45.151 0.104l67.986-67.986 67.986 67.986c12.213 12.213 32.654 12.393 45.151-0.104 12.584-12.584 12.543-32.711 0.104-45.151l-67.986-67.986 67.986-67.986c12.213-12.213 12.393-32.654-0.104-45.151-12.584-12.584-32.711-12.543-45.151-0.104l-67.986 67.986z' />
          </svg>
        )

      case 'close':
        return (
          <svg className='icon icon-close' viewBox='0 0 1024 1024'>
            <path d='M573.162 512l214.269-214.269c16.772-16.772 16.688-44.071-0.202-60.96-17.007-17.007-44.182-16.98-60.96-0.202l-214.269 214.269-214.269-214.269c-16.772-16.772-44.071-16.688-60.96 0.202-17.007 17.007-16.98 44.182-0.202 60.96l214.269 214.269-214.269 214.269c-16.772 16.772-16.688 44.071 0.202 60.96 17.007 17.007 44.182 16.98 60.96 0.202l214.269-214.269 214.269 214.269c16.772 16.772 44.071 16.688 60.96-0.202 17.007-17.007 16.98-44.182 0.202-60.96l-214.269-214.269z' />
          </svg>
        )

      case 'share':
        return (
          <svg className='icon icon-share' viewBox='0 0 1024 1024'>
            <path d='M318.641 446.219l236.155-142.257c-0.086-1.754-0.129-3.52-0.129-5.295 0-58.91 47.756-106.667 106.667-106.667s106.667 47.756 106.667 106.667c0 58.91-47.756 106.667-106.667 106.667-33.894 0-64.095-15.808-83.633-40.454l-236.467 142.445c-0.132-3.064-0.394-6.095-0.779-9.087l7.271-12.835-0.117 53.333-7.183-12.743c0.399-3.046 0.67-6.131 0.806-9.252l236.467 142.383c19.538-24.648 49.741-40.457 83.636-40.457 58.91 0 106.667 47.756 106.667 106.667s-47.756 106.667-106.667 106.667c-58.91 0-106.667-47.756-106.667-106.667 0-1.775 0.043-3.539 0.129-5.293l-236.19-142.216c-19.528 24.867-49.868 40.841-83.939 40.841-58.91 0-106.667-47.756-106.667-106.667s47.756-106.667 106.667-106.667c34.091 0 64.447 15.993 83.974 40.886zM234.667 554.667c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 341.333c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 768c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667z' />
          </svg>
        )

      case 'settings':
        return (
          <svg className='icon icon-share' viewBox='0 0 1024 1024'>
            <path d='M829.945 549.126c2.784-24.116 2.784-48.445 0.269-70.702-1.182-6.772-7.090-11.696-13.674-11.641-33.039 0.582-62.975-19.389-75.126-50.118s-3.971-65.772 20.504-87.92c4.293-3.894 4.818-10.455 1.003-15.228-14.831-18.927-31.796-36.079-50.521-51.087-4.614-3.687-11.301-3.148-16.127 2.145-15.732 16.059-37.322 25.023-59.382 24.831-9.828 0.044-19.574-1.802-29.307-5.686-30.997-13.082-50.429-44.232-48.535-78.046 0.365-5.803-3.87-10.878-9.583-11.551-23.919-2.769-48.074-2.831-71.958-0.192-5.836 0.654-10.191 5.68-10.009 11.47 1.121 33.146-18.329 63.547-49.925 76.834-8.987 3.423-18.538 5.129-27.498 5.028-22.472 0.224-44.067-8.707-60.526-25.487-2.197-2.386-5.29-3.748-8.24-3.758-2.663 0.016-5.248 0.905-7.105 2.334-19.136 15.052-36.496 32.233-51.558 50.977-3.729 4.732-3.187 11.536 1.058 15.449 24.89 22.573 32.935 58.34 19.426 90.928-14.22 29.886-44.875 48.43-77.941 47.151-5.576-0.215-10.363 3.934-11.003 10.013-2.916 24.025-2.916 48.315-0.231 70.764 1.178 6.84 7.155 11.808 14.518 11.713l2.428 0.007c31.565 0.659 59.701 20.063 71.6 49.499 12.239 30.769 4.278 65.898-20.252 88.586-4.217 3.829-4.736 10.275-0.976 14.991 14.777 18.932 31.665 36.115 50.227 51.128 4.694 3.762 11.505 3.223 16.349-2.081 15.725-16.101 37.337-25.092 59.378-24.895 9.894-0.057 19.705 1.819 29.5 5.78 30.753 13.169 50.063 44.084 48.378 77.965-0.373 5.795 3.857 10.867 9.602 11.539 23.908 2.78 48.053 2.842 71.923 0.192 5.851-0.659 10.215-5.702 10.027-11.562-1.088-33.118 18.371-63.473 49.584-76.583 9.014-3.552 18.622-5.354 27.841-5.307 22.555-0.225 44.218 8.804 60.434 25.505 2.224 2.395 5.343 3.76 8.371 3.769 2.474-0.012 4.874-0.847 6.896-2.43 19.227-14.971 36.653-32.121 51.726-50.848 3.737-4.743 3.194-11.563-0.941-15.379-24.391-21.907-32.789-56.564-21.134-87.207s40.964-50.957 73.904-51.116h5.704c5.586-0.028 10.269-4.227 10.905-9.777zM893.526 556.438c-4.321 37.715-36.171 66.271-74.323 66.464h-5.711c-6.33 0.031-11.99 3.953-14.24 9.87s-0.629 12.609 4.385 17.116c29.020 26.748 32.567 71.325 7.936 102.582-18.378 22.837-39.342 43.468-62.397 61.42-13.128 10.284-29.303 15.909-46.22 15.991-21.004-0.056-41.043-8.825-54.839-23.692-3.514-3.616-8.356-5.634-13.867-5.583-1.555-0.007-3.097 0.282-3.877 0.581-6.088 2.559-9.967 8.609-9.749 15.235 1.257 39.227-27.828 72.841-66.88 77.241-28.725 3.189-57.719 3.114-86.45-0.227-39.585-4.631-68.615-39.444-66.083-78.749 0.331-6.679-3.529-12.859-9.057-15.234-1.449-0.585-2.998-0.881-5.025-0.873-5.074-0.045-9.947 1.982-12.693 4.763-26.775 29.494-71.875 33.067-103.071 8.066-22.458-18.164-42.771-38.831-60.335-61.337-24.602-30.847-21.012-75.5 7.982-101.818 4.881-4.515 6.479-11.568 4.088-17.58-2.239-5.538-7.562-9.209-12.866-9.327-39.748 0.506-72.828-26.991-79.581-66.425-3.538-29.147-3.538-58.616-0.060-87.234 4.085-39.084 37.791-68.296 77.064-66.784 7.502 0.29 14.456-3.916 17.001-9.164 2.519-6.098 0.94-13.122-4.133-17.724-29.022-26.738-32.57-71.311-7.956-102.538 18.292-22.765 39.115-43.375 62.322-61.626 13.199-10.169 29.368-15.731 46.323-15.833 21.063 0.065 41.146 8.908 54.704 23.656 3.559 3.623 8.44 5.642 14.175 5.592 1.605 0.017 3.199-0.268 3.668-0.426 6.11-2.574 9.998-8.651 9.771-15.356-1.228-39.209 27.864-72.786 66.897-77.161 28.715-3.173 57.697-3.098 86.456 0.231 39.539 4.653 68.54 39.409 66.051 78.92-0.369 6.596 3.446 12.713 8.931 15.035 1.507 0.6 3.114 0.905 5.156 0.898 5.087 0.044 9.973-1.985 12.671-4.704 26.66-29.444 71.625-33.068 102.694-8.244 22.604 18.117 43.043 38.781 60.715 61.337 24.728 30.927 21.142 75.751-8.215 102.378-4.724 4.275-6.301 11.031-3.958 16.955s8.114 9.775 14.774 9.659c38.18-0.325 70.992 27.018 77.822 66.463 3.343 28.966 3.343 58.22 0 87.185zM511.951 597.037c47.144-0.118 85.24-38.367 85.169-85.511 0-34.617-20.872-65.819-52.867-79.034s-68.802-5.836-93.231 18.69c-24.429 24.527-31.66 61.363-18.317 93.305s44.628 52.688 79.245 52.55zM512.158 661.036c-60.477 0.242-115.178-36.032-138.507-91.881s-10.686-120.254 32.026-163.138c42.712-42.884 107.066-55.785 163.008-32.679s92.434 77.661 92.434 138.139c0.124 82.417-66.545 149.353-148.962 149.559z' />
          </svg>
        )

      case 'check':
        return (
          <svg className='icon check-icon' viewBox='0 0 1024 1024'>
            <path d='M342.481 563.894c-12.577-12.416-32.838-12.285-45.254 0.292s-12.285 32.838 0.292 45.254l118.857 117.333c13.275 13.105 34.901 12.123 46.933-2.131l297.143-352c11.4-13.505 9.694-33.694-3.811-45.094s-33.694-9.694-45.094 3.811l-274.828 325.566-94.238-93.030z' />
          </svg>
        )
      case 'language':
        return (
          <svg className='icon language-icon' viewBox='0 0 1024 1024'>
            <path d='M625.773 808.031c29.752-39.944 63.443-97.069 83.311-168.977 41.798-3.715 74.872-8.022 98.271-11.57-32.456 82.71-98.638 148.558-181.582 180.547zM216.562 627.283c23.516 3.506 56.799 7.797 98.279 11.528 19.868 72.017 53.601 129.224 83.378 169.219-83.002-32.014-149.226-97.945-181.657-180.747zM400.147 215.201c-29.835 40.32-64.161 98.037-84.572 169.695-42.123 3.731-75.423 8.072-98.938 11.629 32.698-83.353 99.656-149.61 183.51-181.323zM807.438 396.725c-23.641-3.523-57.158-7.847-98.947-11.587-20.402-71.766-54.778-129.567-84.639-169.937 83.912 31.73 150.912 98.070 183.585 181.523zM720.095 436.644c48.952 4.817 84.472 10.209 102.995 13.331 3.99 20.068 6.127 40.796 6.127 62.024 0 21.262-2.137 42.031-6.152 62.141-18.248 3.172-53.376 8.615-102.753 13.448 3.84-23.908 6.069-49.102 6.069-75.59 0-26.296-2.304-51.431-6.286-75.356zM537.043 597.206v-170.396c48.576 0.551 92.653 2.646 131.178 5.426 5.050 25.119 8.072 51.74 8.072 79.763 0 28.216-2.913 54.87-7.789 79.939-38.283 2.713-82.343 4.742-131.462 5.267zM486.957 195.859v180.856c-43.175 0.442-82.443 1.995-117.429 4.149 31.939-95.382 89.99-161.656 112.237-184.612 1.72-0.159 3.464-0.259 5.192-0.392zM542.286 196.26c22.297 22.906 80.456 89.080 112.345 184.771-35.261-2.229-74.646-3.848-117.587-4.307v-180.864c1.745 0.142 3.506 0.234 5.242 0.401zM347.706 512c0-28.074 3.047-54.762 8.156-79.955 38.191-2.696 82.134-4.708 131.094-5.234v170.387c-48.71-0.551-92.895-2.655-131.495-5.443-4.858-25.018-7.755-51.606-7.755-79.755zM194.783 512c0-21.262 2.137-42.031 6.144-62.125 18.282-3.181 53.501-8.64 103.012-13.482-4.007 24-6.319 49.219-6.319 75.606 0 26.396 2.221 51.506 6.027 75.339-48.826-4.808-84.246-10.184-102.737-13.306-3.99-20.068-6.127-40.804-6.127-62.033zM481.338 827.706c-22.389-22.314-81.016-87.469-112.662-184.779 35.437 2.262 75.047 3.898 118.28 4.366v180.839c-1.87-0.142-3.757-0.25-5.618-0.426zM542.653 827.706c-1.862 0.175-3.74 0.284-5.61 0.426v-180.839c43.509-0.442 83.044-2.012 118.222-4.199-31.672 97.244-90.265 162.349-112.612 184.612zM512 128c-211.734 0-384 172.257-384 384 0 211.734 172.266 384 384 384s384-172.266 384-384c0-211.743-172.266-384-384-384z' />
          </svg>
        )

      default:
        break;
    }
  }
}

export default Icon;