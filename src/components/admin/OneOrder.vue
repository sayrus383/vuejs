<template>
    <div class="order">
        <div class="order__inner">
            <div class="order__controls">
                <p class="order__number">Номер заказа: <span>{{ order.id }}</span></p>
                <div class="order__status">
                    <label for="status-list"> Статус: </label>
                    <select v-model="order.status_id" id="status-list">
                        <option
                            v-for="(status, index) in statuses"
                            :key="index"
                            :value="status.id"
                            >
                            {{ status.name }}
                        </option>
                    </select>
                </div>
                <button @click="saveOrder">Сохранить</button>
            </div>
            <div class="order__products">
                <!-- <div 
                    v-for="(product, index) in order.products"
                    :key="index"
                    class="order__products__item">
                    <span>{{ index + 1 }}</span>
                    <div class="order__products__img">
                        <img :src="product.image" alt="">
                    </div>
                    <h3 class="order__products__title">{{ product.name }}</h3>
                    <div class="order__products__quantity">Количество: {{ product.order_lists.quantity }}</div>
                    <div class="order__products__sum">Сумма: {{ product.order_lists.sum }}</div>
                </div> -->

                <div class="order__products__header">
                    <h2><span>Заказ № {{ order.id }} от {{ order.created_at | filterDate }}</span><span>ID: {{ order.user_id }} <br>Login: {{ order.user_contacts.split(', ').pop() }} </span></h2>
                    <p><span class="bolder">Статус заказа:</span> {{ order.status.name }}</p>
                    <p><span class="bolder">Вид доставки:</span> До офиса</p>
                    <p><span class="bolder">Адрес доставки:</span> {{ order.user_address }}</p>
                    <!-- <router-link to="/cabinet/orders">Назад</router-link> -->
                </div>
                <table v-if="order.products && order.products.length > 0">
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
                            v-for="(product, index) in order.products"
                            :key="index"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product[order.currency] | prettyPrice }} {{ order.currency.toUpperCase() }}</td>
                            <td>{{ product.binar_pv }}</td>
                            <td>{{ product.order_lists.quantity }}</td>
                            <td>{{ product.order_lists.sum | prettyPrice }} {{ order.currency.toUpperCase() }}</td>
                            <td>{{ product.binar_pv * product.order_lists.quantity }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <th>Итого</th>
                        <th><span class="bolder">{{ order.sum | prettyPrice }} {{ order.currency.toUpperCase() }} </span></th>
                        <th><span class="bolder">{{ orderPv }}</span></th>
                    </tfoot>
                </table>
                <div class="order__inner__description">
                    <br>
                    <p><span class="bolder"> Оплата заказа:</span> {{ getPaymentType(order) }} — {{ order.sum | prettyPrice }} {{ order.currency.toUpperCase() }}</p>
                    <p><span class="bolder"> Cтоимость продукции:</span> {{ order.sum | prettyPrice }} {{ order.currency.toUpperCase() }}, стоимость доставки: бесплатно</p>
                    <p><span class="bolder"> Общая сумма заказа:</span> {{ order.sum | prettyPrice }} {{ order.currency.toUpperCase() }}</p>
                    <br>
                    <p><i>Фактура № {{ order.id }} от {{ order.created_at | filterDate }}</i></p>
                    <p><span class="bolder">Период проведения PV:</span>  {{ order.created_at | filterDate }}</p>
                    <p><span class="bolder">Статус фактуры:</span>  {{ order.status.name }}</p>
                    <p><span class="bolder">Общая стоимость продукции:</span>  {{ order.sum | prettyPrice }} {{ order.currency.toUpperCase() }}, стоимость доставки: бесплатно</p>
                    <p> <span class="bolder"> Общая сумма заказа: </span>{{ order.sum | prettyPrice }} {{ order.currency.toUpperCase() }}</p>
                </div>
                <div class="order__total">
                    <!-- <p class="order__total__sum">Сумма: {{ orderItem.sum | prettyPrice }} {{ orderItem.currency | CF }} </p> -->
                    <!-- <button class="order__total__button">Подтвердить получение</button> -->
                    <button class="order__total__button" @click="printPage">Печать</button>
                </div>
            </div>
            <div class="order__address">
                <span>Адреc:</span> {{ order.user_address }}
            </div>
            <div class="order__contacts">
                <span>Контакты:</span> {{ order.user_contacts }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'admin-one-order',
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
            order: {}
        }
    },
    created() {
        let { order_id } = this.$route.params

        let order = this.$store.getters['cart/allOrders'].find(ord => ord.id == order_id)

        this.order = Object.assign({}, order)
    },
    methods: {
        printPage() {
            window.print()
        },
        saveOrder() {
            this.$store.dispatch('cart/changeOrderStatus', this.order)
        },
        getPaymentType(order) {
            const type = order.user_contacts.split('+').shift();
            const types = {
                cash: 'Оплата наличными',
                card: 'Оплата банковской картой',
                undefined: ''
            };
            return types[type];
        }
    },
    computed: {
        statuses() {
            return this.$store.getters['statuses/all']
        },
        orderPv() {
            return this.order.products.reduce((acc, item) => acc + item.binar_pv * item.order_lists.quantity, 0).toFixed(2);
        },
    }
}
</script>
<style lang="less" scoped>
    .order {
        &__controls {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            button {
                background-color: #dedcdc;
                padding: 5px 10px;
                cursor: pointer;
            }
        }
        &__status {
            margin-right: 10px;
        }
        &__number {
            margin-right: 10px;
            span {
                font-weight: bold;
            }
        }
        &__products {
            margin-bottom: 20px;

            table {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-bottom: 30px;
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
            &__img {
                width: 70px;
                height: 70px;
                padding: 10px;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            &__title {
                flex-grow: 1;
            }
            &__quantity {
                margin-right: 10px;
            }
            &__item {
                display: flex;
                align-items: center;
                border: 1px solid #ccc;
                padding: 10px;
            }
            &__header {
                h2 {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        &__address span,
        &__contacts span {
            font-weight: bold;
            font-size: 18px;
        }
    }

    span.bolder {
        font-family: "MyriadPro Bold";
    }
    .order__products__header {
        margin-bottom: 30px;
    }
    @media print {
        .order__address, .order__contacts, .order__total__button, .order__controls {
            display: none;
        }
        .order__products {
            font-size: 10px;
        }
    }
    .order__total {
        text-align: right;
    }
    button.order__total__button {
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
</style>
