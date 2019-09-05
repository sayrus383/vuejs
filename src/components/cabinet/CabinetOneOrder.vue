<template>
    <div class="order__inner">
        <div class="order__inner__controls">
            <div>
                <h2>Заказ № {{ orderItem.id }} от {{ orderItem.created_at | filterDate }}</h2>
                <p><span class="bolder">Статус заказа:</span> {{ orderItem.status.name }}</p>
                <p><span class="bolder">Вид доставки:</span> До офиса</p>
                <p><span class="bolder">Адрес доставки:</span> {{ orderItem.user_address }}</p>
                <div v-if="orderItem.delivery_place && orderItem.delivery_place == 'neo'">
                    <p><span class="bolder">Время работы офиса:</span> с 10.00 до 21.00, без обеда и выходных</p>
                    <p><span class="bolder">Срок хранения заказа:</span> 30 дней с момента поступления заказа в офис</p>
                </div>
                <!-- <router-link to="/cabinet/orders">Назад</router-link> -->
            </div>
            <div class="user-info">
                <p class="user-info__id"><span class="bolder">ID:</span> {{ userData.id }}</p>
                <p class="user-info__login"><span class="bolder">Логин:</span> {{ userData.login }}</p>
            </div>
        </div>
        <table v-if="orderItem.products && orderItem.products.length > 0">
            <thead>
                <th>№</th>
                <th>Наименование</th>
                <th>Цена за шт.</th>
                <th>PV за шт.</th>
                <th>Кол-во</th>
                <th>Общая стоимость</th>
                <th>PV</th>
            </thead>
            <tbody>
                <tr
                    v-for="(product, index) in orderItem.products"
                    :key="index"
                >
                    <td>{{ index + 1 }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product[orderItem.currency] | prettyPrice }} {{ orderItem.currency.toUpperCase() }}</td>
                    <td>{{ product.binar_pv }}</td>
                    <td>{{ product.order_lists.quantity }}</td>
                    <td>{{ product.order_lists.sum | prettyPrice }} {{ orderItem.currency.toUpperCase() }}</td>
                    <td>{{ product.binar_pv * product.order_lists.quantity }}</td>
                </tr>
            </tbody>
            <tfoot>
                <th>Итого</th>
                <th><span class="bolder">{{ orderItem.sum | prettyPrice }} {{ orderItem.currency.toUpperCase() }} </span></th>
                <th><span class="bolder">{{ orderItemPv }}</span></th>
            </tfoot>
        </table>
        <div class="order__inner__description">
            <br>
            <p><span class="bolder"> Оплата заказа:</span> Банковской картой — {{ orderItem.sum | prettyPrice }} {{ orderItem.currency.toUpperCase() }}</p>
            <p><span class="bolder"> Cтоимость продукции:</span> {{ orderItem.sum | prettyPrice }} {{ orderItem.currency.toUpperCase() }}, стоимость доставки: бесплатно</p>
            <p><span class="bolder"> Общая сумма заказа:</span> {{ orderItem.sum | prettyPrice }} {{ orderItem.currency.toUpperCase() }}</p>
            <br>
            <p><i>Фактура № {{ orderItem.id }} от {{ orderItem.created_at | filterDate }}</i></p>
            <p><span class="bolder">Период проведения PV:</span>  {{ orderItem.created_at | filterDate }}</p>
            <p><span class="bolder">Статус фактуры:</span>  {{ orderItem.status.name }}</p>
            <p><span class="bolder">Общая стоимость продукции:</span>  {{ orderItem.sum | prettyPrice }} {{ orderItem.currency.toUpperCase() }}, стоимость доставки: бесплатно</p>
            <p> <span class="bolder"> Общая сумма заказа: </span>{{ orderItem.sum | prettyPrice }} {{ orderItem.currency.toUpperCase() }}</p>
        </div>
        <div class="order__total">
            <!-- <p class="order__total__sum">Сумма: {{ orderItem.sum | prettyPrice }} {{ orderItem.currency | CF }} </p> -->
            <!-- <button class="order__total__button">Подтвердить получение</button> -->
            <button class="order__total__button" @click="printPage">Печать</button>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import OrderProduct from './OrderProduct.vue'

export default {
    components: {
        OrderProduct
    },
    filters: {
        filterDate(date) {
            const options = {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            };

            return new Date(date).toLocaleString('ru', options);
        },
    },
    data() {
        return {

        }
    },
    methods: {
        printPage() {
            window.print()
        },
        ...mapGetters('products', { cur: 'getCurrencyByType'}),
    },
    computed: {
        orderItem() {
            let { order_id } = this.$route.params
            return this.$store.getters['cart/orderById'](order_id)
        },
        orderItemPv() {
            return this.orderItem.products.reduce((acc, item) => acc + item.binar_pv * item.order_lists.quantity, 0).toFixed(2);
        },
        ...mapGetters('user', ['userData']),
    }
}
</script>
<style lang="less" scoped>
    .user-info {
        display: none;
        text-align: right;
    }
    .order {
        font-family: "MyriadPro Regular";
        &__inner {
            margin-bottom: 30px;
            table {
                width: 100%;
                display: flex;
                flex-direction: column;
                thead {
                    background-color: #e3e3e3;
                    -webkit-print-color-adjust: exact;
                    display: flex;
                    width: 100%;
                    padding: 0 10px;
                    th {
                        padding: 10px;
                        text-align: left;
                        flex-basis: 10%;
                    }
                    th:nth-of-type(1) {
                        flex-basis: 5%;
                    }
                    th:nth-of-type(2) {
                        // flex-basis: 40%;
                        flex-grow: 1;
                    }
                    th:nth-of-type(6) {
                        flex-basis: 15%;
                    }
                    th:nth-of-type(7) {
                        flex-basis: 5%;
                    }
                }
                tbody {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    width: 100%;
                    padding: 0 10px;
                    tr {
                        display: flex;
                        width: 100%;
                        td {
                            padding: 10px;
                            text-align: left;
                            flex-basis: 10%;
                        }
                        td:nth-of-type(1) {
                            flex-basis: 5%;
                        }
                        td:nth-of-type(2) {
                            // flex-basis: 40%;
                            flex-grow: 1;
                        }
                        td:nth-of-type(6) {
                            flex-basis: 15%;
                        }
                        td:nth-of-type(7) {
                            flex-basis: 5%;
                        }
                    }
                }
                tfoot {
                    background-color: var(--main-color);
                    -webkit-print-color-adjust: exact;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 10px 16px;

                    th:nth-of-type(1) {
                        flex-grow: 1;
                        text-align: left;
                    }

                    th:nth-of-type(2) {
                        width: 30%;
                        margin-right: 10px;
                    }

                    th:nth-of-type(3) {
                    }
                }
            }
            &__controls {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                div {

                    h2 {
                        margin-bottom: 20px;
                    }
                    p {
                        flex-grow: 1;
                        margin-left: 20px;
                    }
                    a:hover {
                        color: var(--main-color)
                    }
                }
            }
            &__item {
                display: flex;
                align-items: center;
                &__number {
                    margin: 20px;
                    font-size: 20px;
                }
            }
            &__list {
                margin-bottom: 20px;
                li {
                    margin-bottom: 10px;
                }
            }
            &__description {
                padding-left: 20px;
            }
        }
        &__total {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            &__sum {
                margin-right: 20px;
            }
            button {
                background-color: var(--main-color);
                padding: 8px;   
                font-size: 13px;
                cursor: pointer;
                &:hover {
                    background-color: lighten(#91b92c, 10%);
                }
                &:active {
                    background-color: darken(#91b92c, 5%);
                }
            }
        }
    }

    span.bolder {
        font-family: "MyriadPro Bold";
    }
    @media print {
        .order__inner {
            font-size: 10px;
            position: absolute;
            left: 0;
            width: 100vw;
        }
        .user-info {
            display: block;
        }
        .order__total {
            display: none;
        }
    }
</style>
