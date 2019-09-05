import api from '../api'

export default {
    namespaced: true,
    state: {
        user: null,
        cart: []
    },
    getters: {
        userData(state) {
            return state.user
        }
    },
    actions: {
        async getUserDataFromServer({ commit }) {
            try {
                let { data } = await api.getUserData()

                commit('setUserData', data.user)
            } catch (error) {
                // eslint-disable-next-line
                console.error(error.message)
            }
        },
        login({ commit }, credentials) {
            return new Promise((resolve,  reject) => {
                api.login(credentials, (err, user) => {
                    if (err) {
                        reject(err)
                    }
                    commit('setUserData', user)
                    resolve(user)
                })
            })
        },
        setUserData({ commit }, data) {
            commit('setUserData', data)
        },
        async registerWithServer(_, data) {
            return api.registerWithServer(data);
        }
    },
    mutations: {
        setUserData(state, userData) {
            state.user = userData
        }
    }
}