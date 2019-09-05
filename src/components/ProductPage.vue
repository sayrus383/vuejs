<template>
  <div class="product-page">
    <div class="wrap" v-if="product && product.name">
      <p class="product-page__top-links">
        <router-link to="/">Главная</router-link>/
        <router-link to="/products">Продукты</router-link>/
        <router-link to="/products">{{ product.category }}</router-link>
        <router-link :to="'/products/' + product.id">{{product.name}}</router-link>
      </p>
      <div class="product-page__inner">
        <product-page-gallery :images="product.images" :img="product.image"></product-page-gallery>
        <div class="product-page__description-wrap">
        <div v-show="product.discount && product.discount > 0" class="discount">
          -{{ product.discount }} <small>%</small>
        </div>
          <h1>{{product.name}}</h1>
          <p class="product-page__articul">{{product.articul}}</p>
          <p class="product-page__description-p">{{product.description}}</p>
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
            <div class="product-page__price">
              Цена:
              <p v-if="product.discount && product.discount > 0">{{ product.price - (product.price * product.discount) / 100 }} {{ currency }}<small>{{ product.price }} {{ currency }}</small></p> 
              <p v-else>{{ product.price }} {{ currency }}</p> 
              <!-- <span>{{product.price}} {{ currency }}</span> -->
            </div>
            <product-card-controls :isNeedPopupButton="false" :product="product"></product-card-controls>
            <button @click="buy" class="product-page__buy-button">Купить</button>
          </div>
        </div>
      </div>
      <product-tabs :product="product"></product-tabs>
      <product-page-comments
        :categoryId="product.category_id"
        :productId="product.id"
        :comments="product.comments"
      />
    </div>
    <div v-else>
      <p class="loader">Загрузка...</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ProductCardControls from "./ProductCardControls.vue";
import ProductPageGallery from "./ProductPageGallery.vue";
import ProductPageComments from "./ProductPageComments.vue";
import ProductTabs from "./ProductTabs.vue";

export default {
  components: {
    ProductCardControls,
    ProductPageGallery,
    ProductPageComments,
    ProductTabs
  },
  name: "ProductPage",
  data() {
    return {
      product: {}
    };
  },
  methods: {
    buy() {
      if (!this.cartItem || !this.cartItem.quantity) {
        this.$store.dispatch("cart/addProductToCart", this.product);
      }
      this.$router.push("/cart");
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
      let { product_id } = this.$route.params;
      return this.cart.find(i => i.id == product_id) || { quantity: 0 };
    }
  },
  beforeRouteEnter (to, from, next) {
    let { product_id } = to.params;
    next(async vm => {
      await vm.$store.dispatch('init')
      vm.product = vm.$store.getters["products/allProducts"].find(
        item => item.id == product_id
      );
    })
  },
  beforeRouteUpdate (to, from, next) {
    let { product_id } = to.params;
    this.product = this.$store.getters["products/allProducts"].find(
      item => item.id == product_id
    );
    next();
  },
  beforeMount() {
    let { product_id } = this.$route.params;
    this.product = this.$store.getters["products/allProducts"].find(
      item => item.id == product_id
    );
  }
};
</script>
<style lang="less">
.loader {
  text-align: center;
}
.product-page {
  margin-top: 20px;
  &__top-links {
    margin-bottom: 40px;
  }
  &__top-links a:hover {
    color: #92b92c;
  }
  &__description-wrap {
    display: flex;
    flex-direction: column;
    color: #34404b;
    flex: 1;
    max-width: 600px;
    position: relative;
    h1 {
      text-transform: uppercase;
      color: #92b92c;
      font-weight: bolder;
      font-size: 38px;
      margin-bottom: 20px;
    }

    div.discount {
      position: absolute;
      right: 10px;
      font-weight: bolder;
      font-size: 18px;
      background: #d2ff00c9;
      padding: 10px 15px 5px 10px;
      box-shadow: 2px 5px 7px -5px #000;
      z-index: 5;
    }
  }
  &__articul {
    margin-bottom: 38px;
  }
  &__counts {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    &-span {
      width: 1px;
      border-left: 1px solid #ccc;
      height: 26px;
    }
    &-plus,
    &-minus {
      font-size: 16px;
      border: none;
      padding: 3px 6px;
      margin: 5px 10px;
      outline: none;
      font-weight: lighter;
      cursor: pointer;
    }
    &-plus {
      margin-left: 15px;
    }
    &-count {
      color: #92b92c;
    }
  }
  &__in-stock {
    span {
      color: #92b92c;
    }
  }
  &__description-p {
    flex-grow: 1;
    margin-bottom: 30px;
  }
  &__inner {
    display: flex;
    margin-bottom: 90px;
  }
  &__gallery {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-right: 90px;
    padding-top: 35px;
    width: 400px;
  }
  &__image {
    text-align: center;
    margin-bottom: 80px;
    max-width: 330px;
    max-height: 330px;
    img {
      max-height: 300px;
      max-width: 300px;
    }
    &-item {
      height: 70px;
      min-width: 90px;
      text-align: center;
      padding: 10px;
      background-color: #f4f6f8;
      margin: 10px;
      &--active {
        background-color: #91b92c;
      }
      &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 12px 0px #ccc;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &-list {
      display: flex;
      max-width: 330px;
      overflow-x: scroll;
    }
  }
  &__buy-button {
    font-size: 16px;
    padding: 15px 45px;
    border: none;
    background-color: #91b92c;
    border-radius: 24px;
    color: #fff;
    cursor: pointer;
  }
  &__controls {
    margin-right: 20px;
    &-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;
      margin-bottom: 40px;
    }
    a {
      width: 15px;
      height: 15px;
      display: inline-block;
      margin: 10px;
    }
    a.share {
      content: url("../assets/images/share_logo.png");
    }
    a.share:hover {
      content: url("../assets/images/share_active.png");
    }
    a.add-to-cart {
      width: 20px;
      height: 20px;
      content: url("../assets/images/add_to_cart.png");
    }
    a.add-to-cart:hover {
      content: url("../assets/images/add_to_cart_active.png");
    }
    a.add-to-favourites {
      content: url("../assets/images/favourites_logo.png");
    }
    a.add-to-favourites:hover {
      content: url("../assets/images/favourites_logo_active.png");
    }
  }
  &__price {
    font-size: 20px;
    p {
      small {
        text-decoration: line-through;
        color: #000;
        margin-left: 6px;
        font-size: 14px;
      }
    }
    span {
      font-size: 24px;
      color: #91b92c;
      margin-left: 10px;
      font-weight: bold;
    }
  }
}
.product-card__controls {
  max-height: unset;
  opacity: 1;
  visibility: visible;
  padding: 0;
  border: none;
}
</style>
