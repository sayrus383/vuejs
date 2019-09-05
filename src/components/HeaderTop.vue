<template>
    <header>
        <router-link style="position: absolute;opacity: 0;" to='/tologin'>00</router-link>
        <div class="wrap">
            <div class="top-line">
                <div class="top-line__left">
                    <a href="mailto:info@neoin.club" class="top-line__email">info@neoin.club</a>
                    <a href="tel:87027775433" class="top-line__phone">+7 (702) 777 54 33</a>
                    <a href="http://neoin.club/register">Стать клиентом</a>
                </div>
                <div class="top-line__right">
                    <a href="http://neoin.club/cabinet" class="top-line__office">Перейти в бэк офис</a>
                    <div class="top-line__socials">
                        <a href="https://www.facebook.com/neoin.market"><img src="../assets/images/facebook.png" alt="facebook"></a>
                        <a href="https://twitter.com/neoin.market"><img src="../assets/images/twitter.png" alt="twitter"></a>
                        <a href="https://www.youtube.com/channel/neoin.market"><img src="../assets/images/youtube.png" alt="youtube"></a>
                        <a href="https://www.instagram.com/neoin.market"><img src="../assets/images/instagram.png" alt="instagram"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap">
            <div class="main-menu">
                <router-link to="/" class="logo-wrap">
                    <img src="../assets/images/logo.png" alt="Home">
                    <span> Интернет магазин </span>
                </router-link>
                <ul class="main-menu__list">
                    <li 
                        v-for="(item, index) in menuItems"
                        :key="index"
                        class="main-menu__item">
                        <router-link :to="item.link"> {{item.name}} </router-link>
                    </li>
                </ul>
                <div class="user-controls">
                    <currency-block v-show="currencyShow" @currencyClose="currencyShow = false"></currency-block>
                    <a href="/home" @click.prevent="currencyShow = !currencyShow">
                        <img src="../assets/images/currency_logo.png" alt="Currency">
                    </a>
                    <router-link to="/search">
                        <img src="../assets/images/search_logo.png" alt="Search">
                    </router-link>
                    <!-- <a href="http://neoin.club/login?redirect_back=true"><img src="../assets/images/cabinet_logo.png" alt="Cabinet"></a> -->
                    <router-link to="/cabinet">
                        <img src="../assets/images/cabinet_logo.png" alt="Cabinet">
                    </router-link>
                    <router-link to="/cart">
                        <img src="../assets/images/cart_logo.png" alt="Cart">
                        <span class="user-controls__count">{{cartCount}}</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="categories-wrap">
            <div class="wrap">
                <div class="categories">
                    <div v-for="(code, index) in codes" 
                        :key="index"
                        class="categories__item__wrap">
                        <router-link
                            class="categories__item" 
                            :to="'/products?code_id=' + code.id"> 
                            {{code.name}}
                        </router-link>
                        <div v-if="getByCode(code.id) && getByCode(code.id).length > 0" class="categories__item__inner">
                            <router-link v-for="(product, index) in getByCode(code.id)" 
                                :key="index"
                                :to="'/products/' + product.id">
                                {{product.name}}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import CurrencyBlock from './CurrencyBlock.vue'
import { mapState, mapGetters } from 'vuex'
export default {
    components: {
        CurrencyBlock
    },
    data() {
        return {
            logged: false,
            currencyShow: false,
            menuItems: [
                {link: '/', name: 'Главная'},
                {link: 'About', name: 'О магазине'},
                {link: '/products', name: 'Продукты'},
                {link: '/new-products', name: 'Новинки'},
                {link: '/promotions', name: 'Акции'},
                {link: '/contacts', name: 'Контакты'}
            ]
        }
    },
    methods: {
        logoff() {
            if (window.document.domain === 'localhost') {
                if (this.$cookies.remove('access_token')) {
                    this.$router.push('/')
                } else {
                    this.$store.dispatch('cart/changeStatus', 'fail')
                }
            } else {
                if (this.$cookies.remove('access_token', '/', '.neoin.club')) {
                    this.$router.push('/')
                } else {
                    this.$store.dispatch('cart/changeStatus', 'fail')
                }
            }
        }
    },
    computed: {
        cartCount() {
            return this.$store.getters['cart/totalCount']
        },
        productCurrency() {
            return this.$store.getters['products/getCurrency']
        },
        ...mapState('codes',['codes']),
        ...mapGetters('products', ['getByCode'])
    },
    watch: {
        '$route': function(_) {
            this.logged = !!this.$cookies.get('access_token')
        }
    }
}
</script>
<style scoped>
    .admin {
        margin-right: 20px;
        font-size: 28px;
        font-weight: bold;
    }
    .top-line, .top-line__left, .top-line__right {
        display: flex;
    }
    .top-line__right button {
        margin-right: 30px;
        padding: 8px 20px;
        cursor: pointer;
        background: var(--main-color);
        color: #fff;
        font-size: 16px;
    }
    .top-line {
        justify-content: space-between;
        border-bottom: 1px solid #f2f3f5;
        margin-bottom: 40px;
    }
    .top-line__left a {
        padding: 20px 30px 20px 0;
        font-size: 14px;
    }
    .top-line__email::before {
        content: url("../assets/images/email_logo.png");
    }
    .top-line__phone::before {
        content: url("../assets/images/phone_logo.png");
    }
    .top-line__left a::before {
        display: inline-block;
        margin-right: 5px;
        vertical-align: middle;
    }
    .top-line__right {
        justify-content: space-between;
        align-items: center;
    }
    .top-line__socials {
        padding: 10px 0 10px 20px;
    }
    .top-line__socials a {
        margin-left: 10px;
    }
    .top-line__office {
        text-transform: uppercase;
        color: #000;
        background: var(--main-color);
        padding: 10px 20px;
        padding: 10px 30px;
        font-size: 12px;
    }
    .logo-wrap {
        width: 121px;
    }
    .logo-wrap > img {
        max-width: 100%;
        margin-bottom: -5px;
    }
    .logo-wrap > span {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .main-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .main-menu__list {
        display: flex;
        align-items: center;
        list-style-type: none;
        justify-content: space-between;
    }
    .main-menu__item {
        margin: 10px;
    }
    .main-menu__item a {
        color: #34404b;
        font-size: 18px;
    }
    .main-menu__item a.active {
        color: var(--main-color);
    }
    .main-menu__item a:hover {
        color: var(--main-color);
    }
    .user-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }
    .user-controls a {
        margin: 10px;
        position: relative;
    }
    span.user-controls__count{
        display: block;
        position: absolute;
        padding: 4px 8px;
        background-color: #34404b;
        border-radius: 15px;
        border: 2px solid #fff;
        top: -28px;
        right: -2px;
        font-size: 13px;
        color: #fff;
    }
    .categories-wrap {
        background-color: var(--main-color);
        padding: 15px 5px;
    }
    .categories {
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
    .categories__item {    
        margin: 8px;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        padding-bottom: 2px;
    }
    .categories__item__wrap:hover .categories__item,
    .categories__item__inner:hover ~ .categories__item {
        border-bottom: 2px solid #fff;
    }
    .categories__item__inner {
        position: absolute;
        background-color: var(--main-color);
        padding: 10px;
        border-radius: 5px;
        margin-top: 2px;
        z-index: 3;
        display: none;
    }
    .categories__item__inner a {
        display: block;
        font-size: 14px;
        color: #fff;
        margin-right: 30px;
    }
    .categories__item__inner a:hover {
        text-decoration: underline;
    }
    .categories__item__wrap:hover .categories__item__inner,
    .categories__item__inner:hover {
        display: block;
    }
    @media print {
        header {
            display: none;
        }
    }
</style>
