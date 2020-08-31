import {authModelData} from './models/AuthModel'
import {authService} from './api/AuthService'

const AuthModule = {
    namespaced: true, // NameSpaced module

    state: authModelData(),

    getters: {
        getToken: state => {
            return state.token
        },
        isLoggedIn: state => state.is_logged_in,
        username: state => state.username,
        getUserId: state => state.userId,
        getFirstName: state => state.firstName,
        getEmail: state => state.email
    },

    mutations: {
        setAuth: function (state) {
            localStorage.setItem('is_logged_in', true)
            state.is_logged_in = localStorage.getItem('is_logged_in')
            let now = new Date()
            localStorage.setItem('active_Time', now)
        },
        setTokens (state, tokens) {
            state.token = tokens.token
            localStorage.setItem('token', tokens.token)
            if (localStorage.getItem('keepLoggedIn') === 'true') {
                state.refresh_token = tokens.refresh_token
                localStorage.setItem('refresh_token', tokens.refresh_token)
            }
        },
        setUserDetails (state, data) {
            state.userId = data.userId
        },
        fetchFirstName (state, data) {
            state.firstName = data.firstName
        },
        setUserEmail (state, data) {
            state.email = data.email
        }
    },

    actions: {
        login (context, data) {
            context.commit('setTokens', data)
            context.commit('setAuth')
        },
        userData ({ commit }, data) {
            commit('setUserDetails', data)
        },
        // eslint-disable-next-line no-unused-vars
        async attemptLogin ({ dispatch, commit }, { resolve, reject, credentials }) {
            try {
                const response = await authService.attemptLogin(credentials)
                const { token, errors } = response.data
                if (token) {
                    resolve && resolve(response)
                } else {
                    reject && reject(errors)
                }
            } catch (error) {
                reject && reject(error)
            }
        },
        // eslint-disable-next-line no-unused-vars
        async setJWTTokens ({ dispatch, commit }, { resolve, reject, tokens }) {
            try {
                commit('setTokens', tokens)
                resolve && resolve()
            } catch (error) {
                reject && reject(error)
            }
        },
        // eslint-disable-next-line no-unused-vars
        async setUserMetaInfoToApp ({ dispatch, commit }, { userDetails }) {
            try {
                commit('setUserDetails', {
                    userId: userDetails.userId
                })
                commit('fetchFirstName', {
                    firstName: userDetails.firstName
                })
                commit('setUserEmail', {
                    email: userDetails.email
                })
                commit('setAuth')
                // eslint-disable-next-line no-empty
            } catch (error) {

            }
        },
        // eslint-disable-next-line no-unused-vars
        async getUserByEmail ({ dispatch, commit }, { uname }) {
            try {
                return await authService.getUserByEmail(uname)
            } catch (error) {
                // debug statement
            }
        },
        // eslint-disable-next-line no-unused-vars
        async logout ({ dispatch, commit }, { resolve, reject }) {
            try {
                /**
                 * Call the global store action for resting all the states
                 * To call the global action not present in this module we need to pass additional param as root true
                 */
                dispatch('resetStoreState', null, { root: true })
                resolve && resolve()
            } catch (error) {
                reject && reject(error)
            }
        },
        /**
         * Action dispatch for forgot password function
         */
        // eslint-disable-next-line no-unused-vars
        async forgotPassword ({ dispatch }, { resolve, reject, credentials }) {
            try {
                const response = await authService.forgotPassword(credentials)
                const { success, data } = response.data
                if (success === true) {
                    resolve && resolve(data)
                } else {
                    reject && reject(data)
                }
            } catch (error) {
                reject && reject(error)
            }
        },
        // eslint-disable-next-line no-unused-vars
        async checkResetPwdLinkValidity ({ dispatch }, { resolve, reject, resetPwdLinkId }) {
            try {
                const response = await authService.checkResetPwdLinkValidity(resetPwdLinkId)
                const { success, data } = response.data
                if (success) {
                    resolve && resolve(data)
                } else {
                    reject && reject(data)
                }
            } catch (error) {
                reject && reject(error)
            }
        },
        // eslint-disable-next-line no-unused-vars
        async resetPassword ({ dispatch }, { resolve, reject, credentials }) {
            try {
                const response = await authService.resetPassword(credentials)
                const { success, data } = response.data
                if (success) {
                    resolve && resolve(data)
                } else {
                    reject && reject(data)
                }
            } catch (error) {
                reject && reject(error)
            }
        },
        // eslint-disable-next-line no-unused-vars
        async refresh ({ dispatch, commit }, { resolve, reject }) {
            try {
                const refreshToken = localStorage.getItem('refresh_token')
                const response = await authService.attemptRefresh(refreshToken)
                const { token, errors } = response.data
                if (token) {
                    commit('setTokens', response.data)
                    resolve && resolve(response.data.token)
                } else {
                    reject && reject(errors)
                }
            } catch (error) {
                reject && reject(error)
            }
        }
    }
}
export default AuthModule
