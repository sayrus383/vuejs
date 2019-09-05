<template>
    <div class="search">
        <div class="wrap">
            <div class="search__input-block">
                <label for="search-text">Поиск товаров: </label>
                <input type="text" id="search-text" v-model="searchText">
            </div>
            <div class="search__inner">
                <product-card
                    v-for="(product, index) in result" 
                    :key="index" 
                    :product="product">
                </product-card>
            </div>
        </div>
    </div>
</template>
<script>
import ProductCard from './ProductCard.vue'
import { mapState, mapGetters } from 'vuex'

export default {
    components: {
        ProductCard
    },
    name: 'Search',
    data () {
        return {
            searchText: ''
        }
    },
    computed: {
        result() {
            return this.searchtext !== '' &&
            this.allProducts.filter(item => {
                const q = this.searchText.toUpperCase()
                return item.name.toUpperCase().includes(q)
            })
        },
        ...mapGetters('products', ['allProducts']),
    }
}
</script>
<style lang="less" scoped>
.search {
    &__inner {
        display: flex;
        flex-wrap: wrap;
    }
    &__input-block {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
        margin-top: 40px;
        label {
            font-size: 18px;
            margin-right: 10px;
        }
        input {
            font-size: 16px;
            border-radius: 4px;
            padding: 3px 5px;
            border: 1px solid #ccc;
        }
    }
}
</style>
