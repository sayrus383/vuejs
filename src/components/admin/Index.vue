<template>
    <main>
        <admin-header/>
        <div class="admin">
            <div class="wrap">
                <h2>Админ</h2>
                <div class="admin__inner">
                    <aside class="menu">
                        <router-link active-class="active" to="/admin/products">Продукты</router-link>
                        <router-link active-class="active" to="/admin/orders">Заказы</router-link>
                        <router-link active-class="active" to="/admin/categories">Категории</router-link>
                        <router-link active-class="active" to="/admin/statuses">Статусы заказов</router-link>
                        <router-link active-class="active" to="/admin/codes">Коды продуктов</router-link>
                        <router-link active-class="active" to="/admin/packagings">Типы упаковок</router-link>
                        <router-link active-class="active" to="/admin/promotions">Акции</router-link>
                        <router-link active-class="active" to="/admin/neo-addresses">Адреса точек Neoin</router-link>
                    </aside>
                    <div class="admin__inner__body">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import AdminHeader from './Header'
export default {
    components: {
        AdminHeader
    },
    data() {
        return {

        }
    },
    beforeCreate() {
        this.$store.dispatch('cart/getOrdersFromServer')
    }
}
</script>
<style lang="less" scoped>
    .admin {
        h2 {
            margin-bottom: 15px;
        }
        &__inner {
            display: flex;
            &__body {
                flex-grow: 1;
                background-color: #efefef;
                padding: 10px;
            }
        }
    }
    aside.menu {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 230px;
        margin-right: 20px;
        a {
            padding: 10px;
            background-color: rgb(239, 239, 239);
            &:hover, &.active {
                background-color: rgb(222, 220, 220);
            }
        }
    }

    @media print {
        aside, h2 {
            display: none !important;
        }
        .admin__inner__body {
            background-color: #fff;
        }
        .wrap {
            max-width: 100%;
            margin: 0;
            padding: 0;
        }
    }
</style>

