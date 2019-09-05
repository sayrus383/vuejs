<template>
  <div class="ship__delivery">
    <h3 class="ship__delivery__title">Бесплатная доставка до офиса</h3>
    <p
      class="ship__delivery__p"
    >Вы можете самостоятельно забрать заказ из пункта выдачи, выбрав удобное для вас время.</p>
    <p class="ship__delivery__p">При оформления заказа вы увидите дату поступления в пункт выдачи.</p>
    <p
      class="ship__delivery__p"
    >Срок хранения заказа в офсе не играничен, но рекомендуем вам забрать в течение месяца.</p>
  </div>
</template>
<script>
export default {
  name: "DeliveryToOffice"
};
</script>
<style lang="less" scoped>
.ship__delivery {
  &__title {
    font-weight: bold;
    margin: 15px 0;
  }
  &__p {
    margin: 15px 0;
  }
}
</style>

