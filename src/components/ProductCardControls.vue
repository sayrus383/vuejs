<template>
  <div class="product-card__controls">
    <div v-show="isSocShow" @click="isSocShow = false" class="product-card__shared-buttons">
      <p class="product-card__shared-buttons__title">Поделиться:</p>
      <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" :url="'http://market.neoin.club/#/products/' + product.id" />
    </div>
    <div>
      <a href="#" @click.prevent.stop="openPopop" v-if="isNeedPopupButton" class="open-popup"></a>
      <a href="#" @click.prevent.stop="share" class="share"></a>
      <a href="#" @click.prevent.stop="addToCart" class="add-to-cart"></a>
      <a href="#" @click.prevent.stop="addToFavourites" class="add-to-favourites"></a>
    </div>
  </div>
</template>
<script>
import evenBus from '../helpers/eventBus'

export default {
  name: "product-card-controls",
  props: {
    product: {
      type: Object,
      required: true
    },
    isNeedPopupButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isSocShow: false
    };
  },
  methods: {
    share() {
      this.isSocShow = !this.isSocShow
    },
    addToCart() {
      this.$store.dispatch("cart/addProductToCart", this.product);
      this.$notify({
        group: "success",
        title: "Магазин",
        text: "Продукт успешно добавлен в корзину!"
      });
    },
    addToFavourites() {},
    openPopop() {
      evenBus.$emit('openProductPopup', { product: this.product })
    }
  }
};
</script>
<style lang="less">
.product-card {
  &__shared-buttons {
    &__title {
      padding-top: 10px;
    }
    position: absolute;
    width: 230px;
    left: 120px;
    bottom: -15px;
    background: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 0px 11px 9px 3px;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.6);
    z-index: 400;
  }
  &__controls {
    position: relative;
    border-top: 1px solid #ccc;
    max-height: 0;
    visibility: hidden;
    // overflow: hidden;
    opacity: 0;
    transition: max-height 300ms ease-in-out, visibility 300ms ease-in-out,
      opacity 300ms ease-in-out, padding 300ms ease-in-out,
      margin 300ms ease-in-out;
    a {
      width: 15px;
      height: 15px;
      display: inline-block;
      margin: 10px;
    }
    a:active {
      transform: translateY(4px);
    }
    
    a.open-popup {
      width: 35px;
      height: 35px;
      margin: 0;
      margin-right: 20px;
      // content: url('../assets/images/product_popup.png');
      content: url('../assets/images/product_popup-open.png');
    }
    a.open-popup:hover {
      // background-color: #0f0;
      // content: url('../assets/images/product_popup.png');
      content: url('../assets/images/product_popup-open.png');
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
}
</style>
