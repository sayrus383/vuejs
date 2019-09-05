<template>
  <div class="ship-page__inner-description">
    <h3>Оплата банковской картой</h3>

    <p>К оплате за интернет-заказ принимаются пластиковые карты международных платёжных систем VISA и MasterCard любого банка мира. В подтверждение оплаты Вам предоставляется чек.</p>
  </div>
</template>
<script>
export default {
  name: 'PaymentBankCard'
};
</script>
<style lang="less" scoped>
.ship-page {
  margin-top: 50px;
  margin-bottom: 120px;

  h3 {
    margin-bottom: 15px;
  }
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

