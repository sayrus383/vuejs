<template>
    <div class="products">
        <div class="products__controls">
            <h2>Продукты</h2>
            <button @click="$router.push('/admin/products/new')">Create</button>
        </div>
        <div class="products-list">
            <router-link 
                v-for="(product, index) in products" 
                :key="index" 
                :to="'/admin/products/' + product.id"
                class="products-item">
                <div class="products-item__img">
                    <img :src="product.image">
                </div>
                <h3 class="products-item__title">{{ product.name }} </h3>
                <p class="products-item__price">{{ product.price }} тенге</p>
                <div class="products-item__controls">
                    <button class="products-item__delete" @click.prevent="removeProduct(product)">Удалить</button>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'

    export default {
        data() {
            return {

            }
        },
        computed: {
            productsQ() {
                return this.$store.getters['products/allProducts']
            },
            ...mapGetters('products', ['allProducts']),
            ...mapState('products', ['products']),
            
        },
        methods: {
            ...mapActions('products', ['removeProduct'])
        }
    }
</script>
<style lang="less" scoped>
    .products {

        &__controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            margin-bottom: 10px;
            h2 {
                flex-grow: 1;
            }
            button {
                background-color: #ccc;
                padding: 5px 20px;
                margin: 10px;
                cursor: pointer;
                font-size: 14px;
            }
        }
        &-item {
            // background-color: #fff;
            display: flex;
            align-items: center;
            height: 100px;
            padding: 10px;
            cursor: pointer;
            &:hover {
                background-color: #dedcdc;
            }
            &__img {
                text-align: center;
                width: 80px;
                height: 80px;
                img {
                    max-height: 60px;
                    max-width: 60px;
                    margin-top: 10px;
                }
            }
            &__title {
                flex-grow: 1;
            }
            &__price {
                margin-right: 15px;
            }
            &__delete {
                border: none;
                padding: 6px 11px;
                font-size: 14px;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>
