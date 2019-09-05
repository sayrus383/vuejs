import request, { axios } from '../config/axios'

export default {
    get token() {
        let token = window.$cookies.get('access_token')
        if (token === null) {
            token = this.aToken
        }
        return token
    },
    get aToken() {
        return window.$cookies.get('a_token')
    },
    async getNeoAddresses() {
        return await request.get('/addresses');
    },
    async deleteNeoAddressByID(id) {
        return await request.delete('/addresses/' + id, {
            headers: { 'Authorization': this.token }
        });
    },
    async createNeoAddress({ address }) {
        return await request.post('/addresses', { address }, {
            headers: { 'Authorization': this.token }
        });
    },
    getProducts(cb) {
        return request
            .get('/categories/all/products')
            .then(res => cb(null, res.data.products))
            .catch(err => console.error(err))
    },
    getCategories(cb) {
        request
            .get('/categories')
            .then(res => cb(null, res.data.categories))
            .catch(err => cb(err))
    },
    async createCategory(category) {
        return await request.post('/categories', category, {
            headers: { 'Authorization': this.token }
        })
    },
    buyProducts({ cart: products, delivery, address, currency, contacts, paymentMethod, deliveryPlace }, cb) {

        if (this.token !== null) {
            return request
                .post('/orders', {
                    products,
                    status_id: 2,
                    delivery,
                    address,
                    contacts,
                    currency,
                    paymentMethod,
                    deliveryPlace,
                }, {
                    headers: { 'Authorization': this.token }
                })
                .then(res => cb(null, res))
                .catch(err => cb(err))
        }
    },
    async getUserData() {
        return await request.get('/user-data', {
                    headers: { 'Authorization': this.token }
                })
    },
    getOrders(cb) {

        if (this.token !== null) {
            request
                .get('/orders', {
                    headers: { 'Authorization': this.token }
                })
                .then(res => cb(res.data.orders))
                .catch(err => console.error(err))
        }
    },
    addCartToDraft({ products, currency }, cb) {

        if (this.token !== null) {
            return request
                .post('/orders', {
                    products,
                    currency,
                    status_id: 1
                }, {
                    headers: { 'Authorization': this.token }
                })
                .then(() => cb(null))
                .catch(err => cb(err))
        }
    },
    purchaseDraftById(id, cb) {

        if (this.token !== null) {
            request
                .put('/orders/' + id, {
                    status_id: 2
                }, {
                    headers: { 'Authorization': this.token }
                })
                .then(res => cb(null, res.data.order))
                .catch(err => cb(err))
        }
    },
    getAllPackagings(cb) {
        request
            .get('/packagings')
            .then(res => cb(res.data.packagings))
            .catch(err => console.error(err))
    },
    getAllCodes(cb) {
        request
            .get('/codes')
            .then(res => cb(res.data.codes))
            .catch(err => console.error(err))
    },
    getAllPromotions(cb) {
        request
            .get('/promotions')
            .then(res => cb(res.data.promotions))
            .catch(err => console.error(err))
    },
    async updateProductById(product, cb) {
        return await request.put(
            `/categories/${product.category_id}/products/${product.id}`,
            product,
            {
                headers: { 'Authorization': this.token }
            }
        )

    },
    async createProduct(newProduct) {
        return await request
            .post(`/categories/${newProduct.get('category_id')}/products`, newProduct, {
                headers: { 'Authorization': this.token }
            })

    },
    getAllStatuses(cb) {
        request
            .get('/statuses')
            .then(res => cb(null, res.data.statuses))
            .catch(err => cb(err))
    },
    changeOrderStatus({ statusId, orderId }, cb) {

        if (this.token !== null) {
            request
                .put('/orders/' + orderId, {
                    status_id: statusId
                }, {
                    headers: { 'Authorization': this.token }
                })
                .then(res => cb(null, res.data.order))
                .catch(err => cb(err))
        }

    },
    async addNewStatus(status) {
        return await request.post('/statuses', status, {
            headers: { 'Authorization': this.token }
        })
    },
    async createNewCode(code) {
        return await request.post('/codes', code, {
            headers: { 'Authorization': this.token }
        })

    },
    async addNewPackaging(packaging) {
        return await request.post('/packagings', packaging, {
            headers: { 'Authorization': this.token }
        })
    },
    addNewPromorion(promotionName, cb) {

        if (this.aToken !== null) {
            request
                .post('/promotions', promotionName, {
                    headers: { 'Authorization': this.token }
                })
                .then(res => cb(null, res.data.promotion))
                .catch(err => cb(err))
        }
    },
    login(credentials, cb) {
        request
            .post('/login', credentials)
            .then(res => {
                if (window.document.domain === 'localhost') {
                    window.$cookies.set('access_token', res.data.token, '7d')
                } else {
                    window.$cookies.set('access_token', res.data.token, '7d', '/', '.neoin.club')
                }
                cb(null, res.data.user)
            })
            .catch(err => cb(err))
    },
    checkOrderFromServer(orderId) {
        return request.get('/check-order/' + orderId, {
            headers: { 'Authorization': this.token }
        })
    },
    async addComment({ text, category_id, product_id, user_name, stars }) {
        return request.post(`/categories/${category_id}/products/${product_id}/comments`, {
            text,
            user_name,
            stars
        }, {
            headers: { 'Authorization': this.token }
        })
    },
    async removeProductById({ id, category_id }) {
        return await request.delete(`/categories/${category_id}/products/${id}`)
    },
    async removePromotion({ id }) {
        return await request.delete('/promotions/' + id);
    },
    async updatePromotion({ id, name }) {
        return await request.put('/promotions/' + id, {
            name
        });
    },
    async removePackaging({ id }) {
        return await request.delete('/packagings/' + id)
    },
    async updatePackaging({ id, type }) {
        return await request.put('/packagings/' + id, {
            type
        })
    },
    async removePoductCode({ id }) {
        return await request.delete('/codes/' + id)
    },
    async updatePoductCode({ id, name }) {
        return await request.put('/codes/' + id, {
            name
        })
    },
    async removeStatus({ id }) {
        return await request.delete('/statuses/' + id);
    },
    async updateStatus({ id, name }) {
        return await request.put('/statuses/' + id, {
            name
        });
    },
    async removeCategory({ id }) {
        return await request.delete('/categories/' + id)
    },
    async updateCategory({ id, name }) {
        return await request.put('/categories/' + id, {
            name
        })
    },
    async updateNeoAdress({ id, address }) {
        return await request.put('/addresses/' + id, {
            address
        })
    },
    async registerWithServer(data) {
        return request.post('/register-with-server', data)
    }
}
