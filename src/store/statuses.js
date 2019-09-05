import api from '../api'

export default {
    namespaced: true,
    store: {
        statuses: []
    },
    getters: {
        all(state) {
            return state.statuses
        }
    },
    actions: {
        setAll({ commit }) {
            api.getAllStatuses((err, statuses) => {
                if (err) {
                    console.error(err)
                    return
                }
                commit('setAll', statuses)
            })
        },
        async addNew({ commit }, newStatusName) {
            try {
                const { data } = await api.addNewStatus({ name: newStatusName });
                commit('addNew', data.status);
            } catch (error) {
                console.error(error)
            }
        },
        async removeOneStatus({ commit, state }, status) {
            if (!window.confirm('Вы действительно хотите удалить этот тип статуса заказов?')) {
                return;
            }
            try {
                let statusIndex = state.statuses.findIndex(item => item.id == status.id);

                if (statusIndex == -1) {
                    throw new Error('Status not found')
                }

                await api.removeStatus(status);

                commit('removeStatus', statusIndex);
            } catch (error) {
                console.error(error)
            }
        },
        async updateStatus({ commit, state }, status) {
            try {
                const statusIndex = state.statuses.findIndex(item => item.id == status.id);

                if (statusIndex == -1) {
                    throw new Error('Status not found')
                }

                const { data } = await api.updateStatus(status); 

                commit('updateStatus', { index: statusIndex, status: data.status});
            } catch (error) {
                console.error(error)
            }
        }
    },
    mutations: {
        setAll(state, statuses) {
            state.statuses = statuses
        },
        addNew(state, newStatus) {
            // state.statuses.push(newStatus)
            let arr = [...state.statuses, newStatus]
            state.statuses = arr;
        },
        removeStatus(state, index) {
            state.statuses.splice(index, 1)
        },
        updateStatus(state, { index, status }) {
            state.statuses[index] = status
        }
    }
}