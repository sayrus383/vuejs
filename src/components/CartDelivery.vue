<template>
    <div class="cart__method__delivery">
        <ul class="cart__method__delivery__list">
            <li class="active">
                <img src="../assets/images/method_delivery_home.png">
                <span>до двери</span>
            </li>
            <li>
                <img src="../assets/images/method_delivery_office.png">
                <span>до офиса</span>
            </li>
            <li>
                <img src="../assets/images/method_delivery_neo.png">
                <span>забрать <br> с точки NEO</span>
            </li>
        </ul>
        <p class="cart__method__delivery__attention">Проверяйте правильность вводимого номера мобильного телефона. <br>
            В случае если номер будет указан некорректно, вы не сможете получить ваш заказ.
        </p>
        <div class="cart__method__delivery__form">
            <div>
                <input v-model="user.deliveryDate" ref="dateInput" type="text" @focus="changeTypeDate" placeholder="Дата доставки">
                <textarea v-model="user.messageForCourier" cols="65" rows="8" placeholder="Сообщение курьеру"></textarea>
            </div>
            <div>
                <input v-model="user.email" type="text" placeholder="+7 (___) ___ __ __">
                <input v-model="user.name" type="text" placeholder="Имя">
                <input v-model="user.lastname" type="text" placeholder="Фамилия">
                <input v-model="user.patronymic" type="text" placeholder="Отчество">
                <input v-model="user.address.street" type="text" placeholder="Улица">
            </div>
            <div>
                <input v-model="user.address.house" type="text" placeholder="Дом">
                <input v-model="user.address.kv" type="text" placeholder="Кв">
                <input v-model="user.address.corpus" type="text" placeholder="Корпус">
            </div>
        </div>
        <button @click="buy" :disabled="buttonDisable" class="cart__method__delivery__next">Далее</button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'cart-delivery',
    data() {
        return {
            buttonDisable: false,
            user: {
                deliveryDate: '',
                messageForCourier: '',
                email: '',
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
            }
        }
    },
    methods: {
        changeTypeDate() {
            this.$refs.dateInput.type = 'date'
            this.$refs.dateInput.value = '2019-01-12'
        },
        buy() {
            this.buttonDisable = true;
            this.$store.dispatch('cart/checkout', this.cartProducts)
            setTimeout(() => {
                this.buttonDisable = false 
                this.$router.push('/cabinet/orders')
            }, 800)
        }
    },
    computed: {
        ...mapGetters('user', ['user'])
    }
}
</script>
