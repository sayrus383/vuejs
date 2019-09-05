<template>
    <div class="new-products">
        <div class="wrap">
            <div class="new-products__inner">
                <h3 class="new-products__title">Новинки</h3>
                <div v-show="newProducts" class="new-products__body">
                    <product-card
                        v-for="(product, index) in newProducts" 
                        :key="index" 
                        :product="product">
                    </product-card>
                </div>
                <div v-show="!newProducts.length" class="new-products__body">
                    <h3 style="text-align: center;">Новинки скоро будут.</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductCard from './ProductCard.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        ProductCard
    },
    name: 'NewProducts',
    data() {
        return {}
    },
    computed: {
        ...mapGetters('products', ['newProducts'])
    }
}
</script>
<style lang="less" scoped>
.new-products {
    margin-bottom: 50px;

    &__title {
        font-size: 22px;
        margin: 15px 0 20px;
    }

    &__body {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>

