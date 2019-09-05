<template>
    <div id="app" v-cloak>
        <div v-if="false" class="no-connection">
            Сервер недоступен
        </div>
        <notifications class="notification-cart notification-cart--success" position="top right" group="success"/>
        <notifications class="notification-cart notification-cart--fail" position="top right" group="fail"/>
        <div class="router-wrap">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
        </div>
        <product-popup v-if="isPopupOpen" :product="product"></product-popup>
    </div>
</template>

<script>
import './assets/css/fonts.css';
import './assets/css/print.css';
import { mapState } from 'vuex';
import ProductPopup from './components/ProductPopup';
import evenBus from './helpers/eventBus';

export default {
    components: {
        ProductPopup,
    },
    name: 'App',
    data() {
        return {
            isPopupOpen: false,
            product: null
        }
    },
    methods: {
        
    },
    async beforeCreate() {
        await this.$store.dispatch('init')
    },
    mounted() {
        evenBus.$on('openProductPopup', ({ product }) => {
            if (product) {
                this.product = product,
                this.isPopupOpen = true
            }
        })
        evenBus.$on('closePopup', () => this.isPopupOpen = false)
        if (this.$cookies.get('access_token') !== null) {
            this.$acl.change('user')
        }
    },
    computed: {
        ...mapState('cart', ['checkoutStatus']),
        ...mapState('user', ['user'])
    },
    watch: {
        isPopupOpen: function(val) {
            if (val) {
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = "unset"
            }
        },
        checkoutStatus: function(val) {
            if (val === null ) return 
            this.$notify({
                group: val,
                title: 'Store',
                text: 'Status is ' + val
            })
            this.$store.dispatch('cart/changeStatus', null)
        },
        user: function(userData) {
            if (userData && ['user', 'admin'].includes(userData.role)) {
                this.$acl.change(userData.role)
            } else {
                this.$acl.change('public')
            }
        }
    }

}
</script>

<style>
    .router-wrap {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    .router-wrap > div {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .no-connection {
        color: red;
        position: absolute;
        text-align: right;
        right: 0;
    }
    .notification-cart .vue-notification {
        font-size: 14px;
        margin-top: 20px;
        box-shadow: #828282 0px 0px 15px 0px;
    }
    .notification-cart--success  .vue-notification {
        background-color: #91b92c;
        border-left: 5px solid #688819;
    }
    .notification-cart--fail .vue-notification {
        background-color: #f14141;
        border-left: 5px solid #af1414;
    }
    [v-cloak] {
        display: none;
    }
    /* Transition start */
    .slide-fade-enter-active {
        transition: all .8s ease;
    }
    .slide-fade-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
        transform: translateY(-10px);
        opacity: 0;
    }
    /* Transition end */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :root {
        --main-color: #91b92c;
        --main-gray: #34404b;
    }
    body {
        font-family: "MyriadPro Regular", serif;
    }
    .wrap {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }
    a, a:visited, a:hover {
        text-decoration: none;
        color: #000;
    }
    ul li {
        list-style-type: none;
    }
    input, button {
        outline: none;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently 
        supported by Chrome and Opera */
    }
    input[type="date"]::-webkit-inner-spin-button {
        display: none;
        -webkit-appearance: none;
    }
    div#app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        transition: all .3s ease-in-out;
    }
    div#app main {
        flex-grow: 1;
    }
</style>
