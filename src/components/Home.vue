<template>
    <div class="home">
        <slider-top v-if="products" :products="products"></slider-top>
        <new-products-slider v-if="fourProductBlocks" :products="fourProductBlocks"></new-products-slider>
        <hit-product v-if="productHitRandom" :product="productHitRandom"></hit-product>
        <promotional-products></promotional-products>
        <big-banner></big-banner>
        <advantages-section></advantages-section>
    </div>
</template>
<script>
import SliderTop from './SliderTop.vue'
import NewProductsSlider from './NewProductsSlider.vue'
import HitProduct from './HitProduct.vue'
import BigBanner from './BigBanner.vue'
import PromotionalProducts from './PromotionalProducts.vue'
import AdvantagesSection from './AdvantagesSection.vue'
import BottomMenu from './BottomMenu.vue'

export default {
    components: {
        SliderTop,
        NewProductsSlider,
        HitProduct,
        BigBanner,
        AdvantagesSection,
        BottomMenu,
        PromotionalProducts
    },
    data() {
        return {
            
        }
    },
    methods: {

    },
    computed: {
        products() {
            let res = this.$store.getters['products/allProducts'].slice(0, 3)
            if (res !== undefined && res.length > 0) {
                return res
            } else {
                return false
            }
        },
        fourProductBlocks() {
            let res = this.$store.getters['products/allProducts']
            if (res === undefined || res.length < 1) return false

            let j = 0;
            let arr = [];
            for (let i = 0; i < Math.ceil(res.length / 4); i++) {
                arr[i] = res.slice(j, j + 4)
                j = j + 4
            }

            return arr
        },
        productHitRandom() {
            return this.$store.getters['products/randomHitProduct']
        }
    }
}
</script>
<style <style lang="less" scoped>
.home {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
</style>
