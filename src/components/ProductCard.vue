<template>
  <div @click="openProductPage(product.id)" class="product-card-wrap">
    <div v-show="product.discount && product.discount > 0" class="discount">
      -{{ product.discount }} <small>%</small>
    </div>
    <div class="product-card">
      <div v-show="isAddedMonthOneAgo(product.created_at)" class="product-card__onsale">
        В продаже с {{ new Date(product.created_at).toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' }) }}
      </div>
      <div class="product-card__img-wrap">
        <img class="product-card__img" :src="product.image || '/images/no-product.png'">
      </div>
      <h3
        @click="$router.push(`/products/${product.id}`)"
        class="product-card__title"
      >{{ product.name }}</h3>
      <div class="product-card__price">
        <p v-if="product.discount && product.discount > 0">{{ product.price - (product.price * product.discount) / 100 }} {{ currency }}<small>{{ product.price }} {{ currency }}</small></p> 
        <p v-else>{{ product.price }} {{ currency }}</p> 
        <span>{{ product.binar_pv }} PV</span>
      </div>
      <product-card-controls :product="product"></product-card-controls>
    </div>
  </div>
</template>
<script>
import ProductCardControls from "./ProductCardControls.vue";
export default {
  components: {
    ProductCardControls
  },
  name: "product-card",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    openProductPage(id) {
      this.$router.push("/products/" + id);
    },
    isAddedMonthOneAgo(date) {
      let oneMonth = 86400000 * 30;
      return +new Date(date) > (Date.now() - oneMonth); //
    }
  },
  computed: {
    currency() {
      return this.$store.getters["products/getCurrencyLocale"];
    }
  }
};
</script>
<style lang="less" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 365px;
  width: 270px;
  border: 1px solid #ccc;
  margin: 10px;
  justify-content: space-around;
  transition: all 0.3s;
  position: relative;
  padding-top: 18px;
  &__onsale {
    position: absolute;
    background-color: #f00;
    top: 0;
    width: calc(100% - 25px);
    text-align: center;
    border-radius: 0 0 5px 5px;
    padding: 2px;
    font-size: 12px;
    color: #fff;
  }
  &-wrap {
    position: relative;
    div.discount {
      position: absolute;
      right: 10px;
      font-weight: bolder;
      font-size: 18px;
      background: #d2ff00c9;
      padding: 10px 15px 5px 10px;
      top: 25px;
      box-shadow: 2px 5px 7px -5px #000;
      z-index: 5;
    }
  }
  &__img {
    max-width: 100%;
    max-height: 100%;
  }
  &__img-wrap {
    width: 220px;
    height: 210px;
    text-align: center;
  }
  &:hover {
    box-shadow: #ccc 0px 0px 19px 0px;
    cursor: pointer;
  }
  &__title {
    color: var(--main-gray);
    cursor: pointer;
    margin: 0 10px;
    text-align: center;
  }
  &:hover > &__title {
    color: var(--main-color);
  }
  &__price {
    font-size: 24px;
    color: #91b92c;
    font-weight: bold;
    margin: 0 20px;
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    p {
      small {
        text-decoration: line-through;
        color: #000;
        margin-left: 6px;
        font-size: 14px;
      }
    }
    span:last-of-type {
      color: var(--main-gray);
      font-size: 18px;
    }
  }
  .product-card__controls {
    visibility: hidden;
    max-height: 0;
    opacity: 0;
  }
  &:hover .product-card__controls {
    max-height: 30px;
    opacity: 1;
    visibility: visible;
    padding: 0px 5px 55px 0px;
    margin-bottom: 20px;
  }
  &:hover .product-card__img-wrap {
    max-height: 110px;
  }
}
</style>

