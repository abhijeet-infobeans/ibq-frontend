/**
 * A global plugin to share states or data between components
 */
import CONSTANTS from './config/constant'
const GlobalStorePlugin = {
    install (Vue) {
        Vue.prototype.$globalStates = new Vue({
            data () {
                return {
                    notification: {
                        text: '',
                        type: '', // error, success, info, warning
                        init_notifications: false
                    },
                    showSideDrawer: true
                }
            },
            computed: {
                // computed props
            },
            methods: {
                // Methods
                /**
                 * This is a helper function for checking error message is available
                 * If not this function will return a constant value with default error message
                 */
                getErrorMessageText (inputString) {
                    let errorString = CONSTANTS.SOMETHING_WENT_WRONG
                    if (inputString !== undefined && inputString !== '') {
                        errorString = inputString
                    }
                    return errorString
                },
            }
        })
    }
}

export default GlobalStorePlugin
