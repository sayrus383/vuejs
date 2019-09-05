<template>
    <section class="new-product-slider">
        <div class="wrap new-product-slider__title-block">
            <h1 class="new-product-slider__title"><span>новые</span> товары</h1>
            <p class="new-product-slider__description">Мы каждую неделю обновляем ассортимент товаров в нашем магазине </p>
        </div>
        <Slider
            ref="Slider"
            direction="horizontal"
            :mousewheel-control="false"
            :performance-mode="true"
            :pagination-visible="true"
            :pagination-clickable="true"
            :loop="true"
            :speed="500">
            <div class="product-card__block" 
                v-for="(productList, index) in products"
                :key="index">
                <product-card 
                    v-for="(product, ind) in productList"
                    :key="ind"
                    :product="product">
                </product-card>
            </div>
        </Slider>
    </section>
</template>

<script>
import Slider from 'vue-plain-slider'
import ProductCard from './ProductCard.vue'

export default {
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    name: 'slider-top',
    components: { Slider, ProductCard },
    data() {
        return {
            showControls: false
        }
    },
    methods: {/* 
        onSlideChangeStart (currentPage, el) {
            // eslint-disable-next-line
        console.log('onSlideChangeStart', currentPage, el)
        },
        onSlideChangeEnd (currentPage, el) {
            // eslint-disable-next-line
        console.log('onSlideChangeEnd', currentPage, el)
        },
        showNone () {
            this.showControls = !this.showControls;
        }, */
    }
}
</script>

<style>
    .product-card__block {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 100px;
    }
    .new-product-slider {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        margin-bottom: 120px;
    }
    .new-product-slider__title-block {
        text-align: center;
    }
    .new-product-slider__title {
        text-transform: uppercase;
        font-weight: 100;
    }
    .new-product-slider__title span {
        color: #a9c048;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .new-product-slider__description {
        margin-bottom: 50px;
    }
    .new-product-slider .slider .slider-pagination .slider-pagination-bullet {
        cursor: pointer;
    }
    .new-product-slider .slider .slider-pagination .slider-pagination-bullet.active {
        background: #a9c048;
    }
    
</style>
