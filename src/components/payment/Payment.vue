<template>
  <div class="ship-page">
    <div class="wrap">
      <div class="ship-page__inner">
        <h1>Доставка</h1>
        <div class="ship-page__inner-wrap">
          <p
            class="ship-page__inner-p"
          >Вы можете оплатить заказ одним из следующих способов:</p>
          <div class="ship-page__inner-list">
            <router-link to="/payment/card" class="ship-page__inner-item" active-class="active">
              <img src="../../assets/images/credit-cards-payment.png">
              <p>Банковской картой при оформлении</p>
            </router-link>
            <router-link to="/payment/cash" class="ship-page__inner-item" active-class="active">
              <img src="../../assets/images/cash-payment-method.png">
              <p>Наличными при получении</p>
            </router-link>
            <router-link to="/payment/bank" class="ship-page__inner-item" active-class="active">
              <img src="../../assets/images/card-bank-payment-method.png">
              <p>Банковской картой </p>
            </router-link>
          </div>
          <div class="ship-page__inner-description">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <promotional-products></promotional-products>
    <big-banner></big-banner>
    <advantages-section></advantages-section>
  </div>
</template>
<script>
import BigBanner from '../BigBanner.vue'
import PromotionalProducts from '../PromotionalProducts.vue'
import AdvantagesSection from '../AdvantagesSection.vue'

export default {
  components: {
    BigBanner,
    AdvantagesSection,
    PromotionalProducts
  },
  name: "Payment",
  data() {
    return {};
  },
  methods: {
    changeTab(componentName) {
      this.activeComponent = componentName;
    }
  }
};
</script>
<style lang="less">
.ship-page {
  margin-top: 50px;
  margin-bottom: 120px;
  &__inner {
    margin-bottom: 50px;
    &-p {
      margin-bottom: 30px;
      text-align: center;
    }
    &-wrap {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    &-list {
      display: flex;
      justify-content: space-around;
    }
    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 165px;
      height: 170px;
      margin: 20px;
      border-radius: 5px;
      font-size: 15px;
      cursor: pointer;
      &.active {
        border: 1px solid #91b92c;
      }
      img {
        margin: 10px;
      }
      p {
        text-align: center;
        margin-bottom: 15px;
      }
    }
    &-description {
      align-self: flex-start;
    }
    &-description-title {
      font-weight: bold;
      margin-top: 20px;
    }
  }
}
</style>
