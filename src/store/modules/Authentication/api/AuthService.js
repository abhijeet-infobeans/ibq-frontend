import axios from 'axios'

export const authService = {
    /**
     * Login to ICC Code Adoption admin with user provided credentials
     * @param data | user form data
     */
    attemptLogin (data) {
        return axios.post(`/login`, JSON.stringify({
                email: data.username,
                password: data.password
            })
        )
    },
    attemptRefresh (refreshToken) {
        return axios.post(`/api/v1/token/refresh`, JSON.stringify({
                refresh_token: refreshToken
            })
        )
    },
    userDetails (data) {
        return axios.post(`/api/v1/user`, JSON.stringify({
            username: data.credentials.username
        }))
    },
    getUserByEmail (data) {
        return axios.post(`/api/v1/getUserByEmail`, JSON.stringify({
            email: data
        }))
    },
    forgotPassword (data) {
        return axios.post(`/api/v1/forgotpassword`, JSON.stringify({
            username: data.username,
            baseLink: data.rpLnk
        }))
    },
    checkResetPwdLinkValidity (resetPwdLinkId) {
        if (resetPwdLinkId !== '') {
            return axios.post(`/api/v1/validatepasswordresetlink`, JSON.stringify({
                token: resetPwdLinkId
            }))
        }
    },
    resetPassword (data) {
        return axios.post(`/api/v1/resetpassword`, JSON.stringify({
            password: data.password,
            confirmPassword: data.confirmPassword,
            token: data.token
        }))
    }
}
