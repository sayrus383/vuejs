<template>
    <div>
        <div v-if="images && images.length" class="product-page__gallery">
            <div class="product-page__image">
                <img :src="images[activeImage].src">
            </div>
            <div class="product-page__image-list">
                <div v-for="(image, index) in images"
                    :key="index"
                    @click="activeImage = index"
                    :class="['product-page__image-item', activeImage == index ? 'product-page__image-item--active': '']"
                >
                    <img :src="image.src">
                </div>
            </div>
        </div>
        <div v-else class="product-page__gallery">
            <img :src="img ? img :'/images/no-product.png'">
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProductPageGallery',
    props: {
        images: {
            type: Array,
            required: true,
            default: function() {
                return [{ src: '/images/product.png' }]
            }
        },
        img: {
            type: String,
        }
    },
    data () {
        return {
            activeImage: 0
        }
    }
}
</script>
<style lang="less" scoped>
.product-page {
    &__image {
        img {
            max-height: 300px;
            max-width: 300px;
        }
    }
}
</style>


