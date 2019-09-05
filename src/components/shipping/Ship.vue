<template>
  <div class="ship-page">
    <div class="wrap">
      <div class="ship-page__inner">
        <h1>Доставка</h1>
        <div class="ship-page__inner-wrap">
          <p
            class="ship-page__inner-p"
          >Вы можете оформить доставку заказа одним из следующих способов:</p>
          <div class="ship-page__inner-list">
            <router-link to="/shipping/office" class="ship-page__inner-item" active-class="active">
              <img src="../../assets/images/shipping_warehouse.png">
              <p>Бесплатная доставка до офиса NEO</p>
            </router-link>
            <router-link to="/shipping/home" class="ship-page__inner-item" active-class="active">
              <img src="../../assets/images/shipping_delivery-man.png">
              <p>Бесплатная курьерская доставка «до двери»</p>
            </router-link>
            <router-link to="/shipping/country" class="ship-page__inner-item" active-class="active">
              <img src="../../assets/images/shipping_truck.png">
              <p>Платная курьерская доставка в любую точку Казахстана</p>
            </router-link>
            <router-link to="/shipping/post" class="ship-page__inner-item" active-class="active">
              <img src="../../assets/images/shippin_post.png">
              <p>Между­народная доставка почтой Казахстана</p>
            </router-link>
            <router-link to="/shipping/sng" class="ship-page__inner-item" active-class="active">
              <img src="../../assets/images/shipping_airplane.png">
              <p>Доставка из Казахстана в СНГ</p>
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
  name: "Ship",
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
