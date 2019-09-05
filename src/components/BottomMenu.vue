<template>
    <div class="bottom-menu">
        <div class="wrap">
            <div class=" bottom-menu__block">
                <div class="bottom-menu__item"
                    v-for="(category, index) in categories"
                    :key="index">
                    <router-link :to="'/products?category_id=' + category.id"> {{'FINEFFECT'}} <br> {{category.name}} </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'bottom-menu',
        data() {
            return {

            }
        },
        computed: {
            categories() {
                return this.$store.getters['products/allCategories'].slice(0, 5)
            }
        }
    }
</script>
<style lang="less" scoped>

    .bottom-menu {
        background-color: #a9c048;
        &__block {
            display: flex;
            justify-content: space-around;
        }
        &__item {
            text-align: center;
            padding: 15px;
            a {
                color: #fff !important;
                &::first-line {
                    text-transform: uppercase;
                }
            }
        }
    }
</style>
