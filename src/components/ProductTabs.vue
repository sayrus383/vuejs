<template>
  <div class="product-tabs">
    <div class="product-tabs__nav">
      <button
        :class="['product-tabs__button', {'product-tabs__button--active': activeText == 'description'}]"
        @click="activeText = 'description'"
      >
        Описание
      </button>
      <button
        :class="['product-tabs__button', {'product-tabs__button--active': activeText == 'benefits'}]"
        @click="activeText = 'benefits'"
      >
        Преимущества
    </button>
      <button
        :class="['product-tabs__button', {'product-tabs__button--active': activeText == 'composition'}]"
        @click="activeText = 'composition'"
      >
        Состав
    </button>
      <button
        :class="['product-tabs__button', {'product-tabs__button--active': activeText == 'applying'}]"
        @click="activeText = 'applying'"
      >
        Применение
    </button>
    </div>
    <div class="product-tabs__body">
      <p class="product-tabs__text">{{ product[activeText] }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductTabs",
  props: {
    product: {
      type: Object,
      default: () => ({
        description: "Description",
        benefits: "Benefits",
        composition: "Composition",
        applying: "Applying"
      })
    }
  },
  data() {
    return {
      activeText: "description"
    };
  }
};
</script>
<style lang="less" scoped>
.product-tabs {
  margin-bottom: 40px;
  &__nav {
    display: flex;
    justify-content: space-between;
  }
  &__body {
    padding: 30px;
  }
  &__button {
    height: 45px;
    width: calc(100% / 4 - 10px);
    margin: 5px;
    border: none;
    font-size: 16px;
    color: #fff;
    background-color: #9e9e9e;
    cursor: pointer;

    &--active {
      background-color: var(--main-color);
    }
  }
}
</style>
