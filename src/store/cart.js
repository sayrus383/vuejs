import api from '../api'

export default {
    namespaced: true,
    state: {
        cart: [],
        checkoutStatus: null,
        orders: []
    },
    getters: {
        allOrders: state => state.orders,
        ordersNotDraft: state => state.orders.filter(order => order.status_id != 1),
        draftOrders: state => state.orders.filter(order => order.status_id == 1),
        orderById: state => id => state.orders.find(order => order.id == id),
        status: state => state.checkoutStatus,
        cartProducts(state, getters, rootState, rootGetters) {
            return state.cart.map(cartItem => {
                const product = rootGetters['products/getOnebyId'](cartItem.id);
                return {
                    ...product,
                    quantity: cartItem.quantity,
                    sum: cartItem.sum
                }
            });
        },
        totalPrice(state, getters) {
            return getters.cartProducts.reduce((total, product) => {
                return total + product.sum
            }, 0)
        },
        totalCount(state, getters) {
            return getters.cartProducts.reduce((total, product) => {
                return total + product.quantity
            }, 0)
        },
        totalSumOfDays: state => days => {
            return state.orders.filter(order => {
                return new Date(order.created_at) > new Date(new Date() - 86400000 * days)
            }).reduce((total, order) => {
                return total + order.sum
            }, 0)
        },
        totalProductsOfDays: state => days => {
            return state.orders.filter(order => {
                return new Date(order.created_at) > new Date(new Date() - 86400000 * days)
            }).reduce((total, order) => {
                return total + order.products.length
            }, 0)
        },
    },
    actions: {
        purchaseDraftById({ commit, dispatch }, draftId) {
            api.purchaseDraftById(draftId, (err, order) => {
                if (err) {
                    commit('setCheckoutStatus', 'fail')
                    return
                }
                commit('replaceOrderById', { id: draftId, newOrder: order })
                commit('setCheckoutStatus', 'success')
            })
            dispatch('getOrdersFromServer')
            commit('setCheckoutStatus', null)
        },
        addDraft({ commit, state: { cart }, dispatch, rootGetters }, products) {
            return api.addCartToDraft({
                    products, 
                    currency: rootGetters['products/getCerrency']
                }, err => {
                if (err) {
                    commit('setCheckoutStatus', 'fail')
                    return Promise.reject(err)
                }
                dispatch('getOrdersFromServer')
                commit('setCartItems', { items: [] })
                commit('setCheckoutStatus', 'success')
                return Promise.resolve()
            })
        },
        buyProducts ({ commit, state: { cart }, getters, rootGetters }) {
            commit('setCheckoutStatus', null)
            api.buyProducts({
                    cart,
                    total: getters.totalPrice,
                    currency: rootGetters['products/getCerrency']
                }, err => {
                if (err) {
                    commit('setCheckoutStatus', 'fail')
                    return
                }

                commit('setCheckoutStatus', 'success')
                commit('setCartItems', { items: [] })
                // location.href = 'http://neoin.club/cabinet'
            })
            commit('setCheckoutStatus', null)
        },
        checkout({ commit, rootGetters }, { products, delivery, address, contacts, paymentMethod, deliveryPlace }) {
            commit('setCheckoutStatus', null)
            return api.buyProducts({
                cart: products,
                delivery,
                address,
                contacts,
                paymentMethod,
                deliveryPlace,
                currency: rootGetters['products/getCerrency']
            }, (err, res) => {
                if (err) {
                    commit('setCheckoutStatus', 'failed')
                    console.error(err)
                    return Promise.reject(err)
                }

                commit('setCheckoutStatus', 'successful')
                commit('setCartItems', { items: [] })
                return Promise.resolve(res.data.url)
                // location.href = 'http://neoin.club/cabinet'
            })
        },
        addProductToCart ({ commit, state }, product) {
            let productFromCart = state.cart.find(item => item.id === product.id)
            if (!productFromCart) {
                commit('addProductToCart', product)
            } else {
                commit('incrementProductQuantity', product)
            }
        },
        removeProductFromCart ({ commit, state }, product) {
            let productFromCart = state.cart.find(item => item.id === product.id)
            if (productFromCart) {
                commit('removeProductFromCart', product)
            }
        },
        decrementProductQuantityInCart ({ commit, state }, product) {
            let productFromCart = state.cart.find(item => item.id === product.id)
            if (!productFromCart) return;
            if (productFromCart.quantity === 1) {
                commit('removeProductFromCart', product)
            }
            if (productFromCart.quantity > 1) {
                commit('decrementProductQuantity', product)
            }
        },
        changeStatus({ commit }, status) {
            commit('setCheckoutStatus', status)
        },
        changeOrderStatus({ commit }, { id: orderId, status_id: statusId }) {
            api.changeOrderStatus({ orderId, statusId }, (err, newOrder) => {
                if (err) {
                    console.error(err)
                    return
                }
                commit('replaceOrderById', { orderId, newOrder })
            })
        },
        getOrdersFromServer ({ commit }) {
            api.getOrders(orders => commit('setOrders', orders))
        },
        buyCartUnregistered({ commit, state: { cart } }) {
            if (cart && cart.length > 0) {
                commit('saveCartInLocalStorage', JSON.stringify(cart))
                window.location.href = 'http://neoin.club'
            }
        },
        setCartFromLocalStorage({ commit }) {
            let storageCart = localStorage.getItem('cart')
            if (storageCart !== null) {
                try {
                    let items = JSON.parse(storageCart)

                    commit('setCartItems', { items })
                } catch (err) {
                    console.error(err)
                }
                localStorage.removeItem('cart')
            }
        },
        checkOrder(_, orderId) {
            return api.checkOrderFromServer(orderId)
        }
    },
    mutations: {
        setOrders (state, orders) {
            state.orders = orders
        },
        addProductToCart(state, { id, price, discount }) {
            let sum = price
            if (discount && discount > 0) {
                sum = price - (price * discount) / 100
            }

            state.cart.push({
                id,
                quantity: 1,
                discount,
                sum,
                price
            })
        },
        incrementProductQuantity(state, { id, price, discount }) {
            let sum = price
            if (discount && discount > 0) {
                sum = price - (price * discount) / 100
            }

            const product = state.cart.find(item => item.id === id)
            product.quantity++
            product.sum = product.quantity * sum
        },
        removeProductFromCart (state, product) {
            let productIndex = state.cart.findIndex(i => i.id === product.id)
            state.cart.splice(productIndex, 1)
        },
        decrementProductQuantity(state, { id, price, discount }) {
            let sum = price
            if (discount && discount > 0) {
                sum = price - (price * discount) / 100
            }
            const product = state.cart.find(item => item.id === id)
            if (product.quantity > 0) {
                product.quantity--
                product.sum = product.quantity * sum
            }
        },
        setCartItems (state, {items}) {
            state.cart = items
        },
        setCheckoutStatus (state, status) {
          state.checkoutStatus = status
        },
        setOrderStatus(state, {id, status}) {
            let order = state.orders.find(ord => ord.id == id)
            order.status = status
        },
        replaceOrderById(state, {id, newOrder}) {
            state.orders.splice(id, 1, newOrder)
        },
        saveCartInLocalStorage(state, jsonCart) {
            localStorage.setItem('cart', jsonCart)
        }
    }
};
