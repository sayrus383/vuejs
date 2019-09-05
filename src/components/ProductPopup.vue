<template>
    <div class="product-popup">
      <div class="product-page__inner product-popup__inner" v-autoclose>
        <button @click="closePopup" class="product-popup__button">X</button>
        <product-page-gallery :images="product.images" :img="product.image"></product-page-gallery>
        <div class="product-page__description-wrap">
          <h1>{{product.name}}</h1>
          <p class="product-page__articul">{{product.articul}}</p>
          <p class="product-page__description-p">{{product.short_description}}</p>
          <div class="product-page__counts">
            <p class="product-page__in-stock">
              В наличии
              <span>{{product.available ? 'Есть' : 'Нет'}}</span>
            </p>
            <span class="product-page__counts-span"></span>
            <div class="product-page__counts-controls">
              Количество
              <button
                @click="addProductToCart(product)"
                class="product-page__counts-plus"
              >+</button>
              <span class="product-page__counts-count">{{ cartItem.quantity || 0 }}</span>
              <button
                @click="decrementProductQuantityInCart(product)"
                class="product-page__counts-minus"
              >-</button>
            </div>
          </div>
          <div class="product-page__controls-wrap">
            <p class="product-page__price">
              Цена:
              <span>{{product.price}} {{ currency }}</span>
            </p>
            <product-card-controls :isNeedPopupButton="false" :product="product"></product-card-controls>
            <button @click="buy" class="product-page__buy-button">Купить</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ProductCardControls from "./ProductCardControls.vue";
import ProductPageGallery from "./ProductPageGallery.vue";
import evenBus from '../helpers/eventBus'

export default {
  components: {
    ProductCardControls,
    ProductPageGallery,
  },
  name: 'ProductPopup',
    props: {
        product: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
  data() {
    return {
    };
  },
  methods: {
    buy() {
      if (!this.cartItem || !this.cartItem.quantity) {
        this.$store.dispatch("cart/addProductToCart", this.product);
      }
      evenBus.$emit('closePopup')
      this.$router.push("/cart");
    },
    closePopup() {
        evenBus.$emit('closePopup')
    },
    ...mapActions("cart", [
      "addProductToCart",
      "decrementProductQuantityInCart"
    ])
  },
  computed: {
    currency() {
      return this.$store.getters["products/getCurrencyLocale"];
    },
    ...mapState("cart", ["cart"]),
    cartItem() {
      let product_id = this.product.id
      return this.cart.find(i => i.id == product_id) || { quantity: 0 };
    }
  },
};
</script>
<style lang="less">
.product-popup {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    &__button {
        position: absolute;
        right: 10px;
        top: 10px;
        border: none;
        padding: 6px 12px;
        color: #fff;
        font-size: 20px;
        background-color: var(--main-color);
        border-radius: 17px;
        cursor: pointer;
    }
    &__inner {
        background: #fff;
        position: relative;
        width: 960px;
        box-shadow: 0px 0px 10px 4px rgba(56, 56, 56, 0.52);
        padding: 15px 35px 40px 0;
        border-radius: 7px;

    }
}
</style>

