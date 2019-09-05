export default {
    namespaced: true,
    state: {
        favourites: []
    },
    getters: {
        allFavourites({ favourites }) {
            return favourites
        }
    },
    actions: {
        favouriteProduct({ commit, state }, product) {
            let favourProduct = state.favourites.find(item => item.id == product)
            if (!favourProduct) {
                commit('pushToFavourites', product)
            } else {
                commit('removeFromFavourites', favourProduct)
            }
        }
    },
    mutations: {
        pushToFavourites({ favourites }, item) {
            favourites.push(item)
        },
        removeFromFavourites({ favourites }, { id }) {
            favourites.splice(id, 1)
        }
    }
};
