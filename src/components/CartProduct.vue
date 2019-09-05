<template>
    <transition name="slide-fade">
    <div class="cart__inner__item__block">
        <div v-show="product.discount && product.discount > 0" class="discount">
        -{{ product.discount }}
        </div>
        <img :src="product.image || '../assets/images/product.png'">
        <p class="cart__inner__item__title">{{ product.name }}</p>
        <div class="cart__inner__item__controls">
            Количество 
            <button @click="add(product)" class="cart__inner__item__controls-plus">+</button> 
            <span class="cart__inner__item__controls-count">{{ product.quantity }}</span>
            <button @click="rm(product)" class="cart__inner__item__controls-minus">-</button>
        </div>
        <!-- <p class="cart__inner__item__sum">{{ product.sum }}</p> -->
        <small v-if="product.discount && product.discount > 0">{{ product.price * product.quantity }} {{ getCurrencyLocale }}</small>
        <!-- <p class="cart__inner__item__sum" >{{ product.sum }} {{ getCurrencyLocale }}</p>  -->
        <p class="cart__inner__item__sum">
            {{ product.sum }} {{ getCurrencyLocale }} 
            <br>
            <span class="cart__inner__item__pv">{{ product.binar_pv * product.quantity }} PV</span>
        </p>

        <button class="cart__inner__item__button" @click="$emit('productDelete', product)">&#10005;</button>
    </div>
    </transition>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        name: 'CartProduct',
        data() {
            return {

            }
        },
        methods: {
            add(pr) {
                this.$store.dispatch('cart/addProductToCart', pr);
            },
            rm(pr) {
                this.$store.dispatch('cart/decrementProductQuantityInCart', pr);
            }
        },
        computed: {
            ...mapGetters('products', ['getCurrencyLocale']),
        }
    }
</script>
<style lang="less">
    /* Transition start */
    .slide-fade-enter-active {
    transition: all .8s ease;
    }
    .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
    }
    /* Transition end */
    .cart {
        &__inner {
            &__item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                &__number {
                    font-size: 26px;
                    color: #34404b;
                    margin: 20px;
                }
                &__button {
                    border: none;
                    font-size: 20px;
                    margin: 20px;
                    cursor: pointer;
                    background: none;
                    &:hover {
                        color: #92b92c;
                    }
                }
                &__block {
                    display: flex;
                    align-items: center;
                    height: 100px;
                    border: 1px solid #ccc;
                    padding: 10px 30px;
                    flex-grow: 1;

                    position: relative;
                    div.discount {
                        position: absolute;
                        left: 1px;
                        font-weight: bolder;
                        font-size: 14px;
                        color: #fff;
                        background: #ff0000;
                        padding: 4px 5px 3px 2px;
                        top: 1px;
                    }
                    img {
                        max-height: 100%;
                        max-width: 100%;
                        margin-right: 35px;
                    }

                    small {
                        text-decoration: line-through;
                        color: #000;
                        margin-left: 6px;
                        font-size: 14px;
                    }
                }
                &__sum {
                    color: #000 !important;
                    font-size: 24px;
                    margin: 0 20px;
                    margin: 7px 40px 0;
                    width: 100px;
                    text-align: right;
                }
                &__pv {
                    color: #92b92c;
                    font-size: 14px;
                }
                &__title {
                    font-size: 20px;
                    color: #34404b;
                    font-family: "MyriadPro Bold";
                    font-weight: normal;
                }
                &__title {
                    flex-grow: 1;
                }
                &__controls {
                    color: #34404b;
                    font-size: 20px;
                    &-plus,
                    &-minus {
                        font-size: 16px;
                        border: none;
                        padding: 3px 6px;
                        margin: 5px 10px;
                        outline: none;
                        font-weight: lighter;
                        cursor: pointer;
                        background: none;
                    }
                    &-plus {
                        margin-left: 15px;
                    }
                    &-count {
                        color: #92b92c;
                    }
                }
            }
        }
    }
</style>
