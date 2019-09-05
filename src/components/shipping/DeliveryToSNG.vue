<template>
  <div class="ship-page__inner-description">
    <h3>Доставка из Казахстана в РФ</h3>

    <p>Для полной информации обратитесть по телефону +7 (702) 777 54 33</p>
  </div>
</template>
<script>
export default {
  name: "DeliveryToSNG"
};
</script>
<style lang="less" scoped>
.ship-page {
  margin-top: 50px;
  margin-bottom: 120px;
  &__inner {
    &-description-title {
      font-weight: bold;
      margin-top: 20px;
      & + p {
        margin-bottom: 20px;
      }
    }
  }
}
</style>

