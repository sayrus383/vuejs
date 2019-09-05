<template>
    <div class="hit-line">
        <div v-if="product !== undefined" class="wrap">
            <div class="hit-line__block">
                <div class="hit-line__inner">
                    <div class="hit-line__product">
                        <div class="hit-line__logo">
                            <img :src="product.image">
                            <div class="hit-line__description">
                                <h2>Хит продаж</h2>
                                <p>{{product.name}}</p>
                            </div>
                        </div>
                        <div class="hit-line__controls">
                            <button @click="addToCart(product)" class="hit-line__link"><span></span></button>
                            <div>
                                <p>{{product.price}} {{ currency }}</p>
                                <p>{{product.binar_pv}} PV</p>
                            </div>
                        </div>
                    </div>
                    <div class="hit-line__banner">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'hit-line',
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
            product() {
                return this.$store.getters['products/randomHitProduct']
            },
            currency() {
                return this.$store.getters['products/getCurrencyLocale']
            }
        }
    }
</script>
<style lang="less">

    .hit-line {
        margin-bottom: 120px;
        &__inner {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        height: 100px;
        justify-content: space-between;
        }
        &__block {
            margin-bottom: 40px;
        }
        &__product {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #a9c048;
            flex: 0 1 60%;
            margin-right: 30px;
        }
        &__logo {
            padding: 10px 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &__logo {
            img {
                margin-right: 30px;
                max-height: 80px;
            }
        }
        &__description {
            color: var(--main-gray);
            h2 {
                text-transform: uppercase;
                font-weight: bold;
            }
        } 
        &__controls {
            display: flex;
            align-items: center;
            height: 45px;
            width: 200px;
            justify-content: space-around;
            border-left: 1px solid #fff;
            p {
                font-size: 20px;
                font-weight: bold;
                color: #fff;
            }
        }
        &__link {
            background: none;
            border: none;
            cursor: pointer;
            span {
                content: url("../assets/images/add_to_cart_white.png");
                padding-bottom: 6px;
            }
        }
        &__banner {
            background-color: #d5d5d5;
            flex: 1;
        }
    }
    
</style>
