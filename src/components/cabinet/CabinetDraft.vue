<template>
    <div>
        <div v-if="draftOrders && draftOrders.length > 0" class="draft">
            <div v-for="(order, index) in draftOrders" :key="index" class="draft__item">
                <div class="draft__item__data">
                    <p>Номер заказа: {{ order.id }}</p>
                    <p>{{ user.first_name }} {{ user.last_name }}</p>
                    <p>{{ user.phone }}</p>
                </div>
                <div class="draft__item__items">
                    <router-link 
                        v-for="(product, ind) in order.products" 
                        :key="ind" :to="'/products/' + product.id">
                        <img :src="product.image" alt="Title">
                    </router-link>
                </div>
                <div class="draft__item__controls">
                    <button @click="confirmPurchaseToDraft(order.id)">Оформить заказ</button>
                    <!-- <router-link to="/asd">Оформить заказ</router-link> -->
                    <p><span>Сумма: {{ order.sum }} {{ order.currency | CF }}</span></p>
                </div>
            </div>
        </div>
        <div v-else class="draft__empty">
            <h3>У Вас нет сохраненных списков покупок</h3>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        confirmPurchase() {
            this.$store.dispatch('cart/buyProducts')
        },
        confirmPurchaseToDraft(id) {
            this.$store.dispatch('cart/purchaseDraftById', id)
        }
    },
    computed: {
        draftOrders() {
            return this.$store.getters['cart/draftOrders']
        },
        user() {
            return this.$store.getters['user/userData']
        }
    }
}
</script>
<style lang="less" scoped>
    .draft {
        margin-bottom: 50px;
        &__empty {
            text-align: center;
            h3 {
                color: var(--main-gray);
            }
        }
        &__item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #000;
            height: 110px;
            &__data {
                margin-right: 50px;
                p {
                    margin-bottom: 4px;
                    font-size: 16px;
                    &:first-of-type {
                        font-weight: bold;
                        margin-bottom: 6px;
                    }
                }
            }
            &__items {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-grow: 1;
                a {
                    margin: 5px;
                    width: 60px;
                    height: 60px;
                    border: 1px solid #ccc;
                    text-align: center;
                    padding: 5px;
                    &:hover {
                        box-shadow: #e4e4e4 0px 0px 8px 3px;
                        transform: scale(1.05);
                    }
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
            &__controls {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                button {
                    display: block;
                    background-color: var(--main-color);
                    color: #000;
                    width: 200px;
                    text-align: center;
                    border: none;
                    padding: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                p {
                    span {
                        font-weight: bold;
                        margin-left: 35px;
                    }
                }
            }
        }
    }
</style>
