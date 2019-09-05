<template>
    <div class="cabinet-outer-wrap">
        <div class="cabinet">
            <div class="wrap">
                <div class="cabinet__inner">
                    <div class="cabinet__controls">
                        <h1>Личный кабинет</h1>
                        <router-link active-class="active" to="/cabinet/profile">Мой профиль</router-link>
                        <router-link active-class="active" to="/cabinet/orders">Мои заказы</router-link>
                        <router-link active-class="active" to="/cabinet/draft">Моя корзина</router-link>
                        <router-link active-class="active" to="/cabinet/edit">Изменить</router-link>
                        <a href="/" @click.prevent="logoff">Выйти</a>
                    </div>
                    <div class="cabinet__body">
                        <transition name="slide-fade">
                            <router-view default="profile"></router-view>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <promotional-products></promotional-products>
        <big-banner></big-banner>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import BigBanner from '../BigBanner.vue'
import PromotionalProducts from '../PromotionalProducts.vue'

export default {
    components: {
        BigBanner,
        PromotionalProducts
    },
    name: 'cabinet',
    data() {
        return {

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
            this.$store.dispatch('user/setUserData', null)
        },
        ...mapActions('user', ['getUserDataFromServer']),
        ...mapActions('cart', ['getOrdersFromServer'])
    },
    async beforeMount() {
        await this.getUserDataFromServer()
        await this.getOrdersFromServer()
    }
}
</script>
<style lang="less" scoped>
    .cabinet-outer-wrap {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .cabinet {
        margin-top: 40px;
        flex-grow: 1;
        margin-bottom: 250px;
        &__controls {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            h1 {
                flex-grow: 1;
            }
            a {
                margin: 0 15px;
                &.active {
                    border-bottom: 3px solid var(--main-color);
                }
            }
            button {
                background: none;
                border: none;
            }
        }
        &__inner {
            padding-left: 45px;
            padding-right: 45px;
        }
    }

    @media print {
        .cabinet__controls {
            display: none;
        }
    }
</style>

