<template>
    <div class="cart">
        <div class="wrap">
            <div class="cart__inner">
                <div class="cart__title">
                    <h1>Корзина</h1>
                </div>
                <div v-if="cartProducts.length > 0" class="cart__inner__list__wrap">
                    <ul  class="cart__inner__list">
                        <li v-for="(product, index) in cartProducts"
                            :key="product.id"
                            class="cart__inner__item">
                            <span class="cart__inner__item__number">{{index + 1}}</span>
                            <cart-product :product="product" @productDelete="rmProductFromCart"></cart-product>
                            <!-- <button class="cart__inner__item__button" @click="rmProductFromCart(product)">&#10005;</button> -->
                        </li>
                    </ul>
                    <div class="dicount-block">
                        <div class="dicount-block__inner">
                            <h3 class="dicount-block__inner__title">Сумма без скидок</h3>
                            <div class="dicount-block__inner__description">
                                <p class="dicount-block__inner_p">
                                    {{ cartProductsTotal | prettyPrice }} {{ getCurrencyLocale }}
                                </p>
                            </div>
                        </div>
                        <div class="dicount-block__inner">
                            <h3 class="dicount-block__inner__title">Вы сэкономили</h3>
                            <div class="dicount-block__inner__description">
                                <p class="dicount-block__inner_p dicount-block__inner--outlined">
                                    - {{ cartProductsDiscountMiddle.toFixed(0) }}%
                                </p>
                                <p class="dicount-block__inner_p">
                                    {{ cartProductsTotal - cartTotal | prettyPrice }} {{ getCurrencyLocale }}
                                </p>
                            </div>
                        </div>
                        <div class="dicount-block__inner">
                            <h3 class="dicount-block__inner__title">Сумма с учетом скидок</h3>
                            <div class="dicount-block__inner__description">
                                <p class="dicount-block__inner_p">
                                    {{ cartTotal | prettyPrice }} {{ getCurrencyLocale }}
                                </p>
                                <p class="dicount-block__inner_p dicount-block__inner--outlined  dicount-block__inner--green">
                                    {{ cartProductsTotalPV }} PV
                                </p>
                            </div>
                            <label for="check-order">
                                <input type="checkbox" id="check-order" required>
                                Ознакомлен. Я подтверждаю свой заказ
                            </label>
                        </div>
                    </div>
                </div>
                <h2 v-else class="cart__inner__title">Корзина пуста</h2>
                <div class="cart__total__wrap">
                    <!-- <p class="cart__total">Итого: {{ cartTotal }} {{ getCurrencyLocale }}</p> -->
                    <button 
                        v-if="cartProducts.length > 0 && !$cookies.get('access_token')"
                        @click="registerLoginAlert = true"
                        > 
                        Оформить корзину 
                    </button>
                    <p 
                        v-if="registerLoginAlert" 
                        style="text-align: center;"
                        > 
                        Чтобы продолжить <a @click="buyCartUnregistered" href="http://neoin.club/login">войдите</a> или <a @click="buyCartUnregistered" href="http://neoin.club/register">зарегистрируйтесь</a> пожалуйста 
                    </p>
                    <p
                        v-if="cartProducts.length > 0 && (user.cash < cartTotal) && $cookies.get('access_token') && false"
                        style="text-align: center; color: red;"
                    >
                        У вас недостаточно средств. Ваш баланс {{ user.cash }} {{ user.cash_currency_iso_code }}
                    </p>
                </div>
            </div>
            <div v-if="cartProducts.length > 0 &&
                userData !== null &&
                userData.role == 'user'" class="cart__order">
                <h2 class="cart__order__title">Оформить заказ </h2>
                <div class="cart__order__inner">
                    <div class="cart__order__inner__country">
                        <input v-model="deliveryCountry" type="text" placeholder="Страна">
                        <input v-model="deliveryCity" type="text" placeholder="Город">
                    </div>
                    <div class="cart__order__manager">
                        <p>ID менеджера</p>
                        <p class="noselect"><input type="checkbox" id="have-manager"> <label for="have-manager">У меня уже есть менеджер, который консультирует меня по продукции. Мне известен его ID.</label></p>
                    </div>
                </div>
            </div>
            <div v-if="cartProducts.length > 0 && userData !== null && userData.role == 'user'" class="cart__method">
                <div class="cart__method__list">
                    <a href="" :class="['delivery', activeMethod == 'delivery' ? 'active' : '']" @click.prevent="activeMethod = 'delivery'">Способ доставки</a>
                    <a href="" v-show="true"  @click.prevent="activeMethod = 'payment'" :class="['payment', activeMethod == 'payment' ? 'active' : '']">Способ оплаты</a>
                </div>
                <div v-if="activeMethod == 'delivery'" class="cart__method__delivery">
                    <div class="cart__method__delivery__list">
                        <label for="to-home">
                            <input type="radio" v-model="deliveryPlace" value="home" name="delivery-place" id="to-home">
                            <div class="cart__method__delivery__item">
                                <img src="../assets/images/method_delivery_home.png">
                                <span>до двери</span>
                            </div>
                        </label>
                        <label for="to-office">
                            <input type="radio" v-model="deliveryPlace" value="office" name="delivery-place" id="to-office">
                            <div class="cart__method__delivery__item">
                                <img src="../assets/images/method_delivery_office.png">
                                <span>до офиса</span>
                            </div>
                        </label>
                        <label for="to-neo">
                            <input type="radio" v-model="deliveryPlace" value="neo" name="delivery-place" id="to-neo">
                            <div class="cart__method__delivery__item">
                                <img src="../assets/images/method_delivery_neo.png">
                                <span>забрать <br> с точки NEO</span>
                            </div>
                        </label>
                    </div>
                    <p class="cart__method__delivery__attention">Проверяйте правильность вводимого номера мобильного телефона. <br>
                        В случае если номер будет указан некорректно, вы не сможете получить ваш заказ.
                    </p>
                    <div v-if="deliveryPlace == 'home' || deliveryPlace == 'office'" class="cart__method__delivery__form">
                        <div>
                            <input
                                v-model="delivery.date"
                                ref="dateInput" type="text"
                                @focus="changeTypeDate"
                                placeholder="Дата доставки"
                            >
                            <textarea
                                v-model="delivery.message"
                                cols="65"
                                rows="8"
                                placeholder="Сообщение курьеру"
                            >
                            </textarea>
                        </div>
                        <div>
                            <input v-model="user.email" type="text" placeholder="Логин или E-mail">
                            <input v-model="user.phone" type="text" placeholder="Номер телефона">
                            <input v-model="user.name" type="text" placeholder="Имя">
                            <input v-model="user.lastname" type="text" placeholder="Фамилия">
                            <input v-model="user.patronymic" type="text" placeholder="Отчество">
                            <input v-model="address.street" type="text" placeholder="Улица">
                        </div>
                        <div>
                            <input v-model="address.house" type="text" placeholder="Дом">
                            <input v-model="address.kv" type="text" placeholder="Кв">
                            <input v-model="address.corpus" type="text" placeholder="Корпус">
                        </div>
                    </div>
                    <div v-if="deliveryPlace == 'neo'" class="cart__method__delivery__form__neo">
                        <label v-for="(value, index) in neoAddresses" :for="'address-' + value.id" :key="index">
                            <input required type="radio" v-model="address.street" :value="value.address" name="adresses" :id="'address-' + value.id">
                            {{ 'Точка ' + value.id + ': ' + value.address }}
                        </label>
                    </div>
                    <button 
                        @click="activeMethod = 'payment'"
                        :disabled="buttonDisable"
                        class="cart__method__delivery__next"
                    >
                        Далее
                    </button>
                </div>
                <div v-if="activeMethod == 'payment'" class="cart__method__payment">
                    <div class="cart__method__payment__inner">
                        <label 
                            for="payment-type-money"
                            :class="{ 'disabled-method': user.cash < cartTotal }"
                        >
                            <input
                                type="radio"
                                name="payment-type"
                                id="payment-type-money"
                                v-model="paymentMethod"
                                value="cash"
                                checked="checked"
                                :disabled="user.cash < cartTotal"
                            >
                            Счет Денежный. Остаток {{ user.cash }} {{ user.cash_currency_iso_code }}
                        </label>
                       <!--  <label 
                            for="payment-type-bonus"
                            style="color: #ccc;"
                        >
                            <input
                                type="radio"
                                name="payment-type"
                                id="payment-type-bonus"
                                v-model="paymentMethod"
                                value="bonus"
                                disabled
                            >
                            Бонусный счет.
                        </label> -->
                        <label 
                            for="payment-type-card"
                        >
                            <input
                                type="radio"
                                name="payment-type"
                                id="payment-type-card"
                                v-model="paymentMethod"
                                value="card"
                            >
                            Оплата картой.
                        </label>
                    </div>
                    <div class="button__wrap">
                        <button
                            v-if="cartProducts.length > 0 
                                && userData !== null && 
                                userData.role == 'user' &&
                                activeMethod == 'payment'"
                            :disabled="buttonDisable"
                            @click="addOrderToDraft"
                            class="cart__method__delivery__next"
                            style="margin-right: 20px; background: #34404b;"
                        >
                            Сохранить в черновики
                        </button>
                        <button 
                            @click="buy"
                            :disabled="buttonDisable"
                            class="cart__method__delivery__next"
                        >
                            Оплатить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CartProduct from './CartProduct.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import request from '../config/axios'
import api from '../api'

export default {
    components: {
        CartProduct
    },
    name: 'cart',
    data() {
        return {
            neoAddresses: [],
            neoAddress: 1,
            activeMethod: 'delivery',
            buttonDisable: false,
            registerLoginAlert: false,
            deliveryPlace: 'home',
            paymentMethod: 'card',
            // isAvailable: false,
            user: {
                login: '',
                email: '',
                phone: '',
                name: '',
                lastname: '',
                patronymic: '',
            },
            delivery: {
                date: '',
                message: ''
            },
            address: {
                street: '',
                house: '',
                kv: '',
                corpus: ''
            },
            deliveryCountry: '',
            deliveryCity: ''
        }
    },
    methods: {
        changeTypeDate() {
            this.$refs.dateInput.type = 'date'
            this.$refs.dateInput.value = '2019-01-12'
        },
        rmProductFromCart(prod) {
            this.$store.dispatch('cart/removeProductFromCart', prod)
        },
        buy() {
            /* if (!this.isAvailable) {
                this.$notify({
                    group: "fail",
                    title: 'Магазин',
                    text: 'У вас недостаточно средств.'
                });
                return
            } */
            this.buttonDisable = true;
            this.checkout({ 
                products: this.cartProducts,
                delivery: this.delivery,
                address: this.userAddress,
                contacts: this.userContacts,
                paymentMethod: this.paymentMethod,
                deliveryPlace: this.deliveryPlace,

            })
            .then((redirectUrl) => {
                if (this.paymentMethod == 'card') {
                    window.location.href = redirectUrl;
                    return;
                }
                this.buttonDisable = false
                this.$router.push('/cabinet/orders')
            })
            .catch(err => {
                this.buttonDisable = false
                this.$notify({
                    group: "fail",
                    title: 'Магазин',
                    text: 'Неизвестная ошибка. Повторите позже.'
                });
            })
        },
        addOrderToDraft() {
            if (this.userData === null) {
                this.$notify({
                    group: "fail",
                    title: 'Магазин',
                    text: 'Зарегистрируйтесь или зайдите в свой аккаунт.'
                });
                return
            }
            this.$store.dispatch('cart/addDraft', this.cartProducts)
        },
        ...mapActions('cart', ['buyCartUnregistered', 'checkout']),
        ...mapActions('user', ['getUserDataFromServer'])
    },
    computed: {
        products() {
            return this.$store.getters['products/allProducts']
        },
        cartProducts() {
            return this.$store.getters['cart/cartProducts']
        },
        cartTotal() {
            return this.$store.getters['cart/totalPrice']
        },
        status() {
            return this.$store.getters['cart/status']
        },
        // isAvailable() {
        //     return this.user.cash >= this.cartTotal
        // },
        ...mapGetters('products', ['getCurrencyLocale']),
        ...mapGetters('user', ['userData']),
        st() {
            return this.$acl.get
        },
        userAddress() {
            let res = '';
            if (this.deliveryPlace != 'neo') {
                if (this.deliveryCountry) {
                    res += this.deliveryCountry;
                    res += ', ';
                }
                if (this.deliveryCity) {
                    res += this.deliveryCity;
                    res += ', ';
                }
            }
            return res += Object.values(this.address).filter(i => !!i).join(', ')
        },
        userContacts() {
            return Object.values(this.user).slice(0,5).reverse().join(', ')
        },
        cartProductsTotal() {
            return this.cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        cartProductsTotalPV() {
            return this.cartProducts.reduce((acc, item) => acc + item.binar_pv * item.quantity, 0);
        },
        cartProductsDiscountMiddle() {
            return this.cartProducts.reduce((acc, item) => acc + item.discount, 0) / this.cartProducts.length;
        }

    },
    watch: {
        'status': function(val) {
            if (val == 'successful') {
                this.$notify({
                    group: "success",
                    title: 'Магазин',
                    text: 'Успешно!'
                });
            }
            if (val == 'failed') {
                this.$notify({
                    group: "fail",
                    title: 'Магазин',
                    text: 'Провал!'
                });
            }
        }
    },
    async beforeMount() {
        await this.getUserDataFromServer()
        if (this.userData !== null) {
            this.user.name = this.userData.first_name;
            this.user.lastname = this.userData.last_name;
            this.user.email = this.userData.email;
            this.user.login = this.userData.login;
            this.user.phone = this.userData.phone;
            this.user.cash = this.userData.cash;
            this.user.cash_currency_iso_code = this.userData.cash_currency_iso_code;

            if (['user', 'admin'].includes(this.userData.role)) {
                this.$acl.change(this.userData.role)
            }
        }
        try {
            let { data } = await api.getNeoAddresses();
            this.neoAddresses = data.neoAddresses;
        } catch (error) {
            console.error(error)
        }
    },
    // async beforeCreate() {
    //     await this.getUserDataFromServer()
    // }
}
</script>

<style lang="less">
    .dicount-block {
        display: flex;
        flex-direction: column;

        &__inner {
            width: 100%;
            margin-bottom: 20px;
            box-shadow: 2px 5px 7px 0px #cecece;
            &__title {
                background-color: #92b92c;
                text-align: center;
                color: #fff;
                padding: 10px;
                font-size: 18px;
            }
            &__description {
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding: 20px;
                font-size: 26px;
            }
            &_p {
                border-radius: 4px;
                padding: 5px;
            }
            &--outlined {
                border: 1px solid #8c8c8c;
            }
            &--green {
                color: #92b92c;
            }

            label {
                
                align-items: center;
                display: flex;
                justify-content: center;
                margin: 10px;
                color: #888;

                input {
                    margin: 3px 6px 6px;
                }
            }
        }
    }
    .cart {
        margin-top: 50px;
        margin-bottom: 50px;
        &__title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left: 40px;
            margin-bottom: 30px;
            button {
                font-size: 14px;
                padding: 10px 15px;
                background-color: #91b92c;
                cursor: pointer;
                border: none;
                &:hover {
                    background-color: lighten(#91b92c, 3%);
                }
                &:active {
                    background-color: darken(#91b92c, 5%);
                }
            }
        }
        &__total {
            &__wrap {
                padding-right: 70px;
                text-align: right;
                p {
                    a {
                        color: #91b92c;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
                button {
                    font-size: 14px;
                    padding: 10px 15px;
                    background-color: #91b92c;
                    cursor: pointer;
                    border: none;
                    &:hover {
                        background-color: lighten(#91b92c, 3%);
                    }
                    &:active {
                        background-color: darken(#91b92c, 5%);
                    }
                }
            }
            font-size: 26px;
            margin-bottom: 20px;
            text-align: right;
        }
        &__inner {
            margin-bottom: 100px;
            &__title {
                text-align: center;
                color: var(--main-gray);
            }
            &__list {
                display: flex;
                flex-direction: column;
                position: relative;
                margin-bottom: 30px;
                margin-right: 20px;
                flex-grow: 1;
                &__wrap {
                    display: flex;
                }
            }
            &__item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                &__title {
                    margin-right: 10px;
                    max-width: 300px;
                }
                &__number {
                    font-size: 26px;
                    color: #34404b;
                    margin: 20px;
                }
                &__button {
                    border: none;
                    font-size: 20px;
                    margin: 0 10px;
                    cursor: pointer;
                    align-self: flex-start;
                    &:hover {
                        color: #92b92c;
                    }
                }
                &__block {
                    display: flex;
                    align-items: center;
                    height: 100px;
                    border: 1px solid #ccc;
                    padding: 10px 0px 10px 30px;
                    flex-grow: 1;
                    img {
                        max-height: 100%;
                        max-width: 100%;
                        margin-right: 35px;
                    }
                }
                &__sum {
                    color: #92b92c;
                    font-size: 20px;
                    margin: 0;
                }
                &__title {
                    font-size: 20px;
                    color: #34404b;
                    font-family: "MyriadPro Bold";
                    font-weight: normal;
                }
                &__title {
                    flex-grow: 1;
                }
                &__controls {
                    color: #34404b;
                    font-size: 20px;
                    width: 205px;
                    &-plus,
                    &-minus {
                        font-size: 16px;
                        border: none;
                        padding: 3px 6px;
                        margin: 5px 10px;
                        outline: none;
                        font-weight: lighter;
                        cursor: pointer;
                    }
                    &-plus {
                        margin-left: 15px;
                    }
                    &-count {
                        color: #92b92c;
                    }
                }
            }
        }
        &__order {
            margin-bottom: 100px;
            margin-left: 32px;
            h2 {
                font-size: 18px;
                font-weight: 100;
            }
            &__inner {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                flex-wrap: wrap;

                &__country {
                    display: flex;
                    flex-direction: column;
                    margin-right: 30px;

                    input[type="text"] {
                        padding: 4px 8px;
                        border-radius: 3px;
                        border: 1px solid #ccc;
                        width: 250px;
                        height: 30px;
                        margin-bottom: 10px;
                    }
                }
            }
            &__manager {
                & > p + p {
                    font-size: 14px;
                    input[type="checkbox"] {
                        margin-right: 6px;
                    }
                }
            }
        }
        &__method {
            &__list {
                margin-bottom: 25px;
                & > a.delivery {
                    margin-right: 40px;
                }
                & > a.delivery,
                & > a.payment {
                    font-size: 24px;
                    color: #a5a5a5;
                }
                & > a:active,
                & > a.active,
                & > a:hover {
                    color: #000;
                    border-bottom: 3px solid #92b92c;
                }
            }
            &__delivery {
                display: flex;
                flex-direction: column;
                margin-bottom: 100px;
                &__item {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 30px;
                    width: 80px;
                    height: 96px;
                    border-radius: 3px;
                    &:hover {
                        border: 1px solid #92b92c;
                    }
                    img {
                        margin-bottom: 10px;
                    }
                    span {
                        text-align: center;
                        font-size: 14px;
                        line-height: 1;
                    }
                }
                &__list {
                    display: flex;
                    align-self: center;
                    & > label {
                        &:hover {
                            cursor: pointer;
                        }
                        input[type="radio"] {
                            visibility: hidden;
                        }
                        input[type="radio"]:checked ~ div {
                            border: 1px solid #92b92c;
                        }
                    }
                }
                &__attention {
                    color: #a5a5a5;
                    align-self: center;
                    text-align: center;
                    margin-bottom: 50px;
                }
                &__form {
                    display: flex;
                    justify-content: flex-start;
                    & > div {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    & > div:nth-of-type(1) {
                        margin-left: 40px;
                        margin-right: 100px;
                    }
                    & > div:nth-of-type(2) {
                        margin-right: 18px;
                    }
                    & > div:last-of-type {
                        flex-direction: row;
                        justify-content: space-between;
                        align-self: flex-end;
                        input {
                            width: 60px;
                            margin-right: 18px;
                        }
                    }
                    input,
                    textarea {
                        border: 1px solid #ccc;
                        border-radius: 3px;
                        padding: 4px 8px;
                        font-size: 12px;
                        margin-bottom: 10px;
                        outline: none;
                    }
                    input {
                        width: 250px;
                        height: 30px;
                    }
                    textarea {
                        resize: none;
                        max-width: 420px;
                    }
                    &__neo {
                        display: flex;
                        flex-direction: column;
                        label {
                            margin-bottom: 10px;
                        }
                    }
                }
                &__next {
                    align-self: flex-end;
                    color: #fff;
                    font-size: 18px;
                    background-color: #92b92c;
                    height: 70px;
                    width: 370px;
                    border-radius: 4px;
                    margin-right: 60px;
                    cursor: pointer;
                    &[disabled] {
                        background-color: #bec7a6;
                        cursor: not-allowed;
                    }
                }
            }
            &__payment {
                padding-top: 40px;
                margin-bottom: 60px;
                &__inner {
                    display: flex;
                    flex-direction: column;
                    padding: 10px;
                    label {
                        margin: 10px;
                        
                    }
                    label input[type="radio"]:disabled {
                        color: #ccc;
                    }
                    input[type="radio"] {
                        vertical-align: top;
                    }
                }
            }
        }
    }
    .button__wrap {
        text-align: right;
        padding-top: 50px;
    }
    .disabled-method {
        color: #ccc;
    }
</style>
