import api from '../api'

export default {
    namespaced: true,
    state: {
        packagings: []
    },
    getters: {
        all(state) {
            return state.packagings
        }
    },
    actions: {
        setAll({ commit }) {
            api.getAllPackagings(packagings => {
                commit('setAll', packagings)
            })
        },
        async addNew({ commit }, newPackagingType) {
            try {
                let { data } = await api.addNewPackaging({ type: newPackagingType })

                commit('addNew', data.packaging)
            } catch (error) {
                console.error(error)
            }
        },
        async removePackaging({ commit, state }, packaging) {
            if (!window.confirm('Вы действительно хотите удалить этот тип упаковок?')) {
                return;
            }
            try {
                let packagingIndex = state.packagings.findIndex(item => item.id == packaging.id);

                if (packagingIndex == -1) {
                    throw new Error('Packaging not found')
                }

                await api.removePackaging(packaging);

                commit('removePackaging', packagingIndex);
            } catch (error) {
                console.error(error)
            }
        },
        async updatePackaging({ commit, state }, packaging) {
            try {
                const packagingIndex = state.packagings.findIndex(item => item.id == packaging.id);

                if (packagingIndex == -1) {
                    throw new Error('Packaging not found')
                }

                const { data } = await api.updatePackaging(packaging);

                commit('updatePackaging', { index: packagingIndex, packaging: data.packaging });
            } catch (error) {
                console.error(error)
            }
        }
    },
    mutations: {
        setAll(state, packagings) {
            state.packagings = packagings
        },
        addNew(state, newPackaging) {
            state.packagings.push(newPackaging)
        },
        removePackaging(state, index) {
            state.packagings.splice(index, 1)
        },
        updatePackaging(state, { index, packaging }) {
            state.packaging[index] = packaging
        }
    }
}