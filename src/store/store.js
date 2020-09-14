import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from "@/store/modules/Authentication/AuthModule";
import ProjectModule from "@/store/modules/Project/ProjectModule";
import defaultStoreStates from './defaultStoreStates'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const storeModules = {
    AuthModule,
    ProjectModule
}
let tz;
tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
const date = new Date(tz)
date.setTime(date.getTime() + (3600 * 1000))
const store = new Vuex.Store({
    namespace: true,
    modules: storeModules,
    plugins: [createPersistedState({
        paths: ['AuthModule'],
        storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: date }),
            removeItem: key => Cookies.remove(key)
        }
    })],
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
