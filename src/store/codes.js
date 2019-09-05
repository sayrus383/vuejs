import api from '../api'

export default {
    namespaced: true,
    state: {
        codes: []
    },
    getters: {
        all: state => state.codes
    },
    actions: {
        setAll({ commit }) {
            api.getAllCodes(codes => {
                commit('setAll', codes)
            })
        },
        async addNew({ commit }, newCodeName) {
            try {
                let { data } = await api.createNewCode({ name: newCodeName });
                commit('addNew', data.code);
            } catch (error) {
                console.error(error)
            }
        },
        async deleteOneCode({ commit, state }, code) {
            if (!window.confirm('Вы действительно хотите удалить этот тип кода продуктов?')) {
                return;
            }
            try {
                let codeIndex = state.codes.findIndex(item => item.id == code.id);

                if (codeIndex == -1) {
                    throw new Error('Code not found')
                }

                await api.removePoductCode(code);

                commit('removeCode', codeIndex);
            } catch (error) {
                console.error(error)
            }
        },
        async updateCode({ state, commit }, code) {
            try {
                const codeIndex = state.codes.findIndex(item => item.id == code.id);

                if (codeIndex == -1) {
                    throw new Error('Code not found')
                }

                const { data } = await api.updatePoductCode(code);

                commit('updateCode', { index: codeIndex, code: data.code });
            } catch (error) {
                console.error(error)
            }
        }
    },
    mutations: {
        setAll(state, codes) {
            state.codes = codes
        },
        addNew(state, newCode) {
            state.codes.push(newCode)
        },
        removeCode(state, index) {
            state.codes.splice(index, 1)
        },
        updateCode(state, { index, code }) {
            state.codes[index] = code
        }
    }
}