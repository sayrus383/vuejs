import api from '../api'

export default {
    namespaced: true,
    state: {
        promotions: []
    },
    getters: {
        all(state) {
            return state.promotions
        }
    },
    actions: {
        setAll({ commit }) {
            api.getAllPromotions(promotions => {
                commit('setAll', promotions)
            })
        },
        addNew({ commit }, newPromotionName) {
            api.addNewPromorion({ name: newPromotionName}, (err, newPromotion) => {
                if (err) {
                    console.error(err)
                    return
                }

                commit('addNew', newPromotion)
            })
        },
        async removePromotion({ commit, state }, promotion) {
            if (!window.confirm('Вы действительно хотите удалить эту акцию?')) {
                return;
            }
            try {
                let promotionIndex = state.promotions.findIndex(item => item.id == promotion.id);

                if (promotionIndex == -1) {
                    throw new Error('Promotion not found')
                }

                await api.removePromotion(promotion);

                commit('removePromotion', promotionIndex);

            } catch (error) {
                console.error(error)
            }
        },
        async updatePromotion({ commit, state }, promotion) {
            try {
                const promotionIndex = state.promotions.findIndex(item => item.id == promotion.id);

                if (promotionIndex == -1) {
                    throw new Error('Promotion not found')
                }

                const { data } = await api.updatePromotion(promotion);

                commit('updatePromotion', { index: promotionIndex, promotion: data.promotion });

            } catch (error) {
                console.error(error)
            }
        }
    },
    mutations: {
        setAll(state, promotions) {
            state.promotions = promotions
        },
        addNew(state, newPromotion) {
            state.promotions.push(newPromotion)
        },
        removePromotion(state, index) {
            state.promotions.splice(index, 1);
        },
        updatePromotion(state, { index, promotion }) {
            state.promotions[index] = promotion
        }
    }
}