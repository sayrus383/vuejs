<template>
    <div class="promotions">
        <div class="wrap">
            <div class="promotions__inner">
                <h3 class="promotions__title">
                    Акции
                </h3>
                <div v-if="promotions && promotions.length">
                    <div v-for="(promotion, index) in promotions" :key="index" class="promotions__products">
                        <h4 v-if="filterByPromoution(promotion.id).length" class="promotions__products__title">{{ promotion.name }}</h4>
                        <div class="promotions__products__list">
                            <product-card 
                                v-for="(product, ind) in filterByPromoution(promotion.id)"
                                :key="ind"
                                :product="product">
                            </product-card>
                        </div>
                    </div>
                </div>
                <p v-else class="promotions__body">Действующих акции нет</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import ProductCard from './ProductCard.vue'

export default {
    name: 'Promotions',
    components: { ProductCard },
    computed: {
        ...mapState('promotions', ['promotions']),
        ...mapState('products', ['products']),
    },
    methods: {
        filterByPromoution(id) {
            return this.products.filter(product => product.promotion_id === id)
        }
    }
}
</script>
<style lang="less" scoped>
.promotions {
    &__title {
        text-align: center;
        font-size: 22px;
        margin: 30px;
    }
    &__body {
        text-align: center;
        font-size: 18px;
        margin-bottom: 50px;
    }
    &__products {
        &__title {
            font-size: 22px;
            margin-bottom: 20px;
            text-align: center;
            text-decoration: underline;
        }
        &__list {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 30px;
        }
    }
}

.promotions__inner {
    margin-bottom: 50px;
}
</style>

