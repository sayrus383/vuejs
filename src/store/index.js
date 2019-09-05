import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'
import cart from './cart'
import favourites from './favourites'
import products from './products'
import user from './user'
import packagings from './packagings'
import codes from './codes'
import promotions from './promotions'
import statuses from './statuses'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        cart,
        favourites,
        products,
        user,
        packagings,
        codes,
        promotions,
        statuses
    },
    actions: {
        async init({ dispatch }) {
            // eslint-disable-next-line 
            // console.log('[Init] Store')
            await dispatch('products/setCurrency', 'kzt')
            await dispatch('products/getProductsFromServer')
            await dispatch('products/getCategoriesFromServer')
            await dispatch('packagings/setAll')
            await dispatch('codes/setAll')
            await dispatch('promotions/setAll')
            await dispatch('statuses/setAll')
            await dispatch('cart/setCartFromLocalStorage')
            await dispatch('user/getUserDataFromServer')
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
