<template>
    <div class="slider-top">
        <div class="wrap">
            <Slider class="wrap"
                ref="Slider"
                direction="vertical"
                :mousewheel-control="false"
                :performance-mode="true"
                :pagination-visible="true"
                :pagination-clickable="true"
                :loop="true"
                :speed="500">
                <div class="slider-top__item"
                    v-for="(product, index) in products"
                    :key="index">
                    <div class="slider-top__inner">
                        <h1 class="slider-top__title">уникальная продукция NEO</h1>
                        <p class="slider-top__title-little">По доступным ценам</p>
                        <div class="product-block">
                            <div class="product-block__image__wrap">
                                <img :src="product.image || '/images/no-product.png'">
                            </div>
                            <div class="product-block__description">
                                <p>{{product.description}}</p>
                                <div class="product-block__price">
                                    <p>
                                        <span>Цена: {{product.price}} {{ currency }}</span><span>{{product.binar_pv}} PV</span>
                                        <button @click="addToCart(product)" class="product-block__button">
                                            <span>Добавить в корзину</span>
                                        </button>
                                    </p> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    </div>
</template>

<script>
import Slider from 'vue-plain-slider'
export default {
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    name: 'slider-top',
    data() {
        return {
            // products: []
        }
    },
    components: { Slider },
    methods: {/* 
        onSlideChangeStart(currentPage, el) {
            console.log('onSlideChangeStart', currentPage, el)
        },
        onSlideChangeEnd(currentPage, el) {
            console.log('onSlideChangeEnd', currentPage, el)
        }, */
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
        currency() {
            return this.$store.getters['products/getCurrencyLocale']
        }
    }
}
</script>

<style lang="less">
    .slider-top {
        background: url("../assets/images/header_background.png") center no-repeat;
        background-size: cover;
        margin-bottom: 60px;
        &__item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        &__inner {
            margin-left: 100px;
        }
        &__title, 
        &__title-little {
            text-transform: uppercase;
        }
        &__title {
            font-weight: bold;
            font-family: "MyriadPro Bold";
            color: #a9c048;
            font-size: 48px;
        }
        &__title-little {
            margin-bottom: 30px;
            color: #34404b;
            font-size: 24px;
        }

        .slider {
            height: 650px;
        }
    }
    .product-block {
        display: flex;
        align-items: center;
        &__image__wrap {
            width: 200px;
            height: 200px;
            margin-right: 30px;
            img {
                max-width: 100%;
                max-height: 100%
            }
        }
        &__description {
            display: flex;
            flex-direction: column;
        }
        &__price p {
            padding: 15px 0;
            font-size: 18px;
            & > span {
                margin-right: 20px;
                font-size: 18px;
            }
        }
        &__button {
            border: 1px solid var(--main-color);
            border-radius: 5px;
            color: var(--main-color);
            font-size: 14px;
            padding: 12px;
            background-color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            &:hover {
                color: var(--main-color);
                background-color: rgba(255, 255, 255, 0.92);
            }
            span {
                color: inherit;
                &::before {
                    content: url("../assets/images/cart_logo.png");
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 10px;
                }
            }
        }
    }
    .slider-top .slider .slider-pagination span.slider-pagination-bullet.active {
        background: #a9c048 !important;
        height: 30px !important;
    }
    .slider-top .slider .slider-pagination span.slider-pagination-bullet {
        border-radius: 0px !important;
        height: 12px !important;
        &:hover {
            cursor: pointer !important;
        }
    }
    .slider-top .slider.vertical .slider-pagination {
        right: unset !important;
    }
</style>