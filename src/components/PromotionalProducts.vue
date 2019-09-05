<template>
    <div class="promotional-products" v-if="products && products.length > 0">
        <div class="wrap">
            <div class="promotional-products__title">
                <h1><span>акционные</span> товары</h1>
                <p>Товары которые учавствуют в действующих акциях, успейте приобрести по выгодней цене</p>
            </div>
        </div>
        <div class="wrap">
            <div v-if="products && products.length > 0" class="promotional-products__block">
                <div v-for="(product, index) in products"
                    :key="index"
                    class="promotional-products__item">
                    <div class="promotional-products__image__wrap">
                        <img :src="product.image || '/images/no-product.png'">
                    </div>
                    <div class="promotional-products__description">
                        <h3>{{product.name}}</h3>
                        <button @click="addToCart(product)" class="promotional-products__button">Добавить в корзину</button>
                        <div>
                            <p>{{product.price}} {{ currency }}</p>
                            <p>{{product.binar_pv}} PV</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'promotional-products',
        data() {
            return {

            }
        },
        methods: {
            addToCart(pr) {
                this.$store.dispatch('cart/addProductToCart', pr)
                this.$notify({
                    group: "success",
                    title: 'Магазин',
                    text: 'Продукт успешно добавлен в корзину!'
                });
            }
        },
        computed: {
            products() {
                return this.$store.getters['products/allProducts'].slice(0, 3)
            },
            currency() {
                return this.$store.getters['products/getCurrencyLocale']
            }
        }
    }
</script>
<style lang="less" scoped>
    .promotional-products {
        margin-bottom: 70px;
        &__title {
            text-align: center;
            h1 {
                text-transform: uppercase;
                font-weight: 100;
                margin-bottom: 20px;
                 span {
                    color: #a9c048;
                    font-weight: bold;
                }
            }
            p {
                margin-bottom: 40px;
            }
        }
        &__block {
            display: flex;
            flex-wrap: wrap;
            align-items: stretch;
            justify-content: space-between;
        }
        &__item {
            display: flex;
            align-items: stretch;
            justify-content: space-between;
            flex: 0 1 32%;
            border: 1px solid #d5d5d5;
            padding: 10px 10px;
            box-shadow: 0px 0px 20px -2px #ccc;
        }
        &__description {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: flex-end;
            div {
                p {
                    font-size: 22px;
                    color: var(--main-color);
                }
                p:last-of-type {
                    font-size: 18px;
                    text-align: right;
                    color: var(--main-gray);
                }
            }
            h3 {
                color: var(--main-gray);
                font-weight: bold;
            }
        }
        &__button {
            display: none;
            color: var(--main-color) !important;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 14px;
            &::before {
                content: url("../assets/images/cart_logo.png");
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;
            }
        }
        &__item:hover &__button {
            display: block;
        }
        &__item:hover p {
            display: none;
        }
        &__image__wrap {
            width: 135px;
            height: 135px;
            margin-right: 20px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

    @media print {
        .promotional-products {
            display: none;
        }
    }
</style>

