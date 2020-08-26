import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from "@/store/modules/Authentication/AuthModule";
import defaultStoreStates from './defaultStoreStates'

Vue.use(Vuex)

const storeModules = {
    AuthModule
}
const store = new Vuex.Store({
    namespace: true,
    modules: storeModules,
    state: {
    },
    mutations: {
        resetAllStatesToDefault (state) {
            try {
                this.replaceState(Object.assign(state, defaultStoreStates()))
                // eslint-disable-next-line no-empty
            }catch (e) {
                // for debug console e
            }
        }
    },
    actions: {
        /**
         * Action to call mutation for resetting all the modules states to default
         */
        resetStoreState ({ commit }) {
            // resets state of all the modules
            commit('resetAllStatesToDefault')
        }
    }
})

export default store
