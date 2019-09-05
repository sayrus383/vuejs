<template>
  <div class="ship-page__inner-description">
    <h3>Наличными</h3>

    <p>Оплата производится исключительно в национальной валюте. В подтверждение оплаты мы выдаем Вам товарный чек. Оплата наличными возможна на кассе нашего розничного магазина при самовывозе или лично в руки курьеру при доставке на дом в момент получения заказа (возможно только в городах, где действует наша служба доставки).</p>
  </div>
</template>
<script>
export default {
  name: 'PaymentCash'
};
</script>
<style lang="less" scoped>
.ship-page {
  margin-top: 50px;
  margin-bottom: 120px;
  &__inner {
    h3 {
        margin-bottom: 15px;
    }
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

