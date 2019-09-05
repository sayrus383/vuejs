import api from '../api'

export default {
    namespaced: true,
    state: {
        products: [],
        categories: [],
        currency: null,
        currencyList: {
            'kzt': 'KZT',
            'rub': 'RUB',
            'usd': 'USD',
            'eur': 'EUR'
        }
    },
    getters: {
        allProducts(state, getters) {
            return state.products.map(item => {
                item.price = item[getters.getCurrency]
                return item
            })
        },
        filterProduct(state) {
            return function() {
                return state.products.filter(item => {
                    return (
                        item.price >= this.priceRange[0] &&
                        item.price <= this.priceRange[1] &&
                        (item.binar_pv >= this.PVRange[0] &&
                            item.binar_pv <= this.PVRange[1]) &&
                        (this.activeCode == "all" || this.activeCode == item.code_id) &&
                        (this.promotion == 0 || this.promotion == item.promotion_id)
                    );
                })
            }
        },
        newProducts(state, getters) {
            return getters.allProducts.filter(item => item.promotion_id == 1) 
        },
        getByCode: state => codeId => state.products.filter(product => product.code_id == codeId),
        allCategories(state) {
            return  state.categories
        },
        randomHitProduct(state, getters) {
            let maxItem = getters.allProducts.length - 1
            return getters.allProducts[Math.round(Math.random() * maxItem)]
        },
        getOnebyId: (state, getters) => id => getters.allProducts.find(item => item.id == id),
        getCurrency: state => state.currency,
        getCurrencyLocale: state => state.currencyList[state.currency],
        getCurrencyByType: state => type => state.currencyList[type],
        getMaxProductPrice: (_, getters) => Math.max(...getters.allProducts.map(item => item.price)),
        getMaxProductPV: (_, getters) => Math.max(...getters.allProducts.map(item => item.binar_pv)),
    },
    actions: {
        getProductsFromServer({ commit }){
            return api.getProducts((err, products) => {
                if (err) {
                    console.error(err)
                    return Promise.reject()
                }
                commit('setProducts', products)
                return Promise.resolve()
            })
        },
        async updateProductById({ commit, getters }, product) {
            try {
                let { data: { product: newProduct } } = await api.updateProductById(product)

                let index = getters.allProducts.findIndex(i => i.id == product.id)
                commit('replaceProduct', { index, newProduct })
            } catch (error) {
                console.error(error)
            }
        },
        async createProductProduct({ commit }, product) {
            try {
                let { data: { product: newProduct } } = await api.createProduct(product)

                commit('addProduct', newProduct)
            } catch (error) {
                console.error(error);
            }
        },
        async removeProduct({ commit, getters }, product) {
            if (!window.confirm('Вы действительно хотите удалить этот продукт?')) {
                return;
            }

            try {
                let index = getters.allProducts.findIndex(i => i.id == product.id)

                if (index == -1) {
                    throw new Error('Product not found')
                }

                await api.removeProductById(product);
                commit('removeProduct', index);
                
            } catch (error) {
                console.error(error);
            }
        },
        getCategoriesFromServer({ commit }){
            api.getCategories((err, categories) => {
                if (err) {
                    console.error(err)
                    return
                }
                commit('setCategories', categories)
            })
        },
        async createCategory({ commit }, category) {
            try {
                let { data } = await api.createCategory(category)
                commit('addCategory', data.category)
            } catch (error) {
                console.error(error)
            }
        },
        setCurrency({ commit }, currency) {
            commit('setCurrency', currency)
        },
        async addComment({ commit }, { text, product_id, category_id, user_name, stars }) {
            try {
                let { data } = await api.addComment({
                    stars,
                    text,
                    product_id,
                    category_id,
                    user_name
                });

                commit('addCommentById', { product_id, comment: data.comment })

            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
        },
        async removeCategory({ commit, state }, category) {
            if (!window.confirm('Вы действительно хотите удалить эту категорию?')) {
                return;
            }
            try {
                let categoryIndex = state.categories.findIndex(item => item.id == category.id);

                if (categoryIndex == -1) {
                    throw new Error('Category not found')
                }

                await api.removeCategory(category);

                commit('removeCategory', categoryIndex);
            } catch (error) {
                console.error(error)
            }
        },
        async updateCategory({ commit, state }, category) {
            try {
                const categoryIndex = state.categories.findIndex(item => item.id == category.id);

                if (categoryIndex == -1) {
                    throw new Error('Category not found')
                }

                const { data } = await api.updateCategory(category);

                commit('updateCategory', { index: categoryIndex, category: data.category });
            } catch (error) {
                console.error(error)
            }
        }
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        setCategories(state, categories) {
            state.categories = categories
        },
        addCategory(state, category) {
            state.categories.push(category)
        },
        setCurrency(state, currency) {
            state.currency = currency
        },
        addProduct(state, product) {
            state.products.unshift(product)
        },
        removeProduct(state, index) {
            // state.products = state.products.slice().splice(index, 1)
            state.products.splice(index, 1)
        },
        replaceProduct(state, { index, newProduct }) {
            state.products.splice(index, 1, newProduct)
        },
        addCommentById(state, { product_id, comment }) {
            let productById = state.products.find(product => product_id == product.id)

            if (Array.isArray(productById.comments)) {
                productById.comments.push(comment)
            } 
        },
        removeCategory(state, index) {
            state.categories.splice(index, 1)
        },
        updateCategory(state, { index, category }) {
            state.categories[index] = category;
        }
    }
}