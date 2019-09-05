<template>
    <div class="wrap__orders">
        <div v-if="orders && orders.length !== 0" class="orders">
            <div v-for="(order, index) in orders" :key="index" class="orders__item">
                <div class="orders__item__data">
                    <p>Номер заказа: {{order.id}}</p>
                    <p>{{user.first_name}} {{ user.last_name }}</p>
                    <p>{{user.phone}}</p>
                </div>
                <div class="orders__item__items">
                    <router-link 
                        v-for="(item, index) in order.products" 
                        :key="index"
                        :to="'/products/'+ item.id">
                            <img :src="item.image" alt="Title">
                    </router-link>
                </div>
                <div class="orders__item__controls">
                    <router-link :to="'/cabinet/orders/' + order.id">Открыть заказ</router-link>
                    <p>Статус: {{ order.status.name }} <span>Сумма: {{ order.sum }} {{ order.currency | CF }}</span></p>
                </div>
            </div>
        </div>
        <div v-else class="orders__empty">
            <h3>У Вас нет совершенных покупок</h3>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        orders() {
            return this.$store.getters['cart/ordersNotDraft']
        },
        user() {
            return this.$store.getters['user/userData']
        }
    }
}
</script>
<style lang="less" scoped>
    .orders {
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
                flex-wrap: wrap;
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
                a {
                    display: block;
                    background-color: var(--main-color);
                    color: #000;
                    width: 200px;
                    text-align: center;
                    padding: 5px;
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
