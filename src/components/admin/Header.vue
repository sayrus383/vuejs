<template>
    <header>
        <div class="wrap">
            <div class="header__line">
                <router-link to="/" class="header__line__img">
                    <img src="../../assets/images/logo.png" alt="">
                    <span>интернет магазин</span>
                </router-link>
                <button @click="logOut">Выйти</button>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'admin-header',
    data() {
        return {

        }
    },
    methods: {
        logOut() {
            if (window.document.domain === 'localhost') {
                if (this.$cookies.remove('access_token')) {
                    this.$router.push('/tologin')
                } else {
                    this.$store.dispatch('cart/changeStatus', 'fail')
                }
            } else {
                if (this.$cookies.remove('access_token', '/', '.neoin.club')) {
                    this.$router.push('/tologin')
                } else {
                    this.$store.dispatch('cart/changeStatus', 'fail')
                }
            }
            this.$store.dispatch('init')
        }
    }
}
</script>
<style lang="less" scoped>
    .header__line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid var(--main-color);
        margin-bottom: 20px;
        &__img {
            width: 121px;
            span {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            img {
                max-width: 100%;
                margin-bottom: -5px;
            }
        }
        button {
            font-size: 16px;
            border: none;
            background: none;
            cursor: pointer;
            &:hover {
                color: var(--main-color);
            }
        }
    }

    @media print {
        header {
            display: none;
        }
    }
</style>
