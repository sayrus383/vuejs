<template>
  <div class="all-products">
    <div class="wrap">
      <div class="all-products__inner">
        <div class="all-products__left">
          <div class="all-products__left-menu">
            <h2>Категория</h2>
            <ul class="noselect">
              <li>
                <router-link
                  to="/products?code_id=all"
                  :class="activeCode == 'all' ? 'active': ''"
                >Все</router-link>
              </li>
              <li v-for="(code, index) in codes" :key="index">
                <router-link
                  :to="'/products?code_id=' + code.id"
                  :class="activeCode == code.id ? 'active': ''"
                >{{code.name}}</router-link>
              </li>
            </ul>
          </div>
          <div class="all-products__left-filter">
            <button
              :class="[
                'all-products__left-filter__button',
                filterType === 'price' ? 'all-products__left-filter__button-active' : ''
                ]"
              @click="filterType = 'price'"
            >По цене</button>
            <button
              :class="[
                'all-products__left-filter__button',
                filterType === 'pv' ? 'all-products__left-filter__button-active' : ''
                ]"
              @click="filterType = 'pv'"
            >По PV</button>
            <ul v-show="filterType === 'price'">
              <li style="width: 80%;">
                <vue-slider v-model="priceRange" :interval="100" :min="0" :max="priceMax"></vue-slider>
              </li>
              <li>
                <label for="from">от</label>
                <input
                  v-model="priceRange[0]"
                  @focus="$event.target.select()"
                  autocomplete="off"
                  type="number"
                  name="price"
                  id="from"
                >
                <label for="to">до</label>
                <input
                  v-model="priceRange[1]"
                  @focus="$event.target.select()"
                  autocomplete="off"
                  type="number"
                  name="price"
                  id="to"
                >
              </li>
            </ul>
            <ul v-show="filterType === 'pv'">
              <li style="width: 80%;">
                <vue-slider v-model="PVRange" :interval="10" :min="0" :max="pricePv"></vue-slider>
              </li>
              <li>
                <label for="from-pv">от</label>
                <input
                  v-model="PVRange[0]"
                  @focus="$event.target.select()"
                  autocomplete="off"
                  type="number"
                  name="price-pv"
                  id="from-pv"
                >
                <label for="to-pv">до</label>
                <input
                  v-model="PVRange[1]"
                  @focus="$event.target.select()"
                  autocomplete="off"
                  type="number"
                  name="price-pv"
                  id="to-pv"
                >
              </li>
            </ul>
          </div>
          <!-- <div class="all-products__left-filter">
                        <h2>PV</h2>
                        <ul>
                            <li style="width: 80%;">
                                <vue-slider v-model="PVRange" :interval="10" :min="0" :max="getMaxProductPV"></vue-slider>
                            </li>
                            <li>
                                <label for="from-pv">от </label>
                                <input 
                                    v-model="PVRange[0]"
                                    @focus="$event.target.select()"
                                    autocomplete="off" 
                                    type="number" 
                                    name="price-pv" 
                                    id="from-pv">
                                <label for="to-pv">до </label>
                                <input 
                                    v-model="PVRange[1]" 
                                    @focus="$event.target.select()"
                                    autocomplete="off" 
                                    type="number" 
                                    name="price-pv" 
                                    id="to-pv">
                            </li>
                        </ul>
          </div>-->
          <div class="all-products__left-promotion">
            <h2>Акции</h2>
            <ul class="noselect">
              <li>
                <input
                  v-model="promotion"
                  type="radio"
                  name="promotion"
                  :value="0"
                  id="all-products"
                >
                <label for="all-products">Все продукты</label>
              </li>
              <li v-for="({name, id}, index) in promotions" :key="index">
                <input
                  v-model="promotion"
                  type="radio"
                  name="promotion"
                  :value="id"
                  :id="'promotion-'+id"
                >
                <label :for="'promotion-'+id">{{ name }}</label>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="products && products.length" class="all-products__right">
          <product-card v-for="(product, index) in products" :key="index" :product="product"></product-card>
        </div>

        <!-- <div class="loading" v-else>
          <p class="loading__text">Загрузка...</p>
        </div>-->
        <!-- <div v-show="!filteredProducts || !filteredProducts.length" class="all-products__right">
                    <h3 class="all-products__right__title">
                        Товаров по критерию "{{ currentPromotionName }}" на данный момент нет.
                        Посмотрите <button @click="promotion = 0" class="all-products__right__button">другие товары.</button>
                    </h3>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from "./ProductCard.vue";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    ProductCard
  },
  name: "AllProducts",
  data() {
    return {
      activeCode: "all",
      from: 0,
      to: 5000000,
      promotion: 0,
      filterdedProducts: [],
      priceRange: [0, 1000000],
      PVRange: [0, 200],
      filterType: "price",
      priceMax: 1000000,
      pricePv: 200
    };
  },
  beforeRouteEnter(to, from, next) {
    const codeId = to.query.code_id || "all";
    next(vm => {
      vm.activeCode = codeId;
    });
  },
  beforeRouteUpdate(to, from, next) {
    const codeId = to.query.code_id || "all";
    this.activeCode = codeId;
    next();
  },
  methods: {},
  mounted() {
    const codeId = this.$route.query.code_id || "all";
    this.activeCode = codeId;
    setTimeout(() => {
      this.priceMax = this.getMaxProductPrice;
      this.pricePv = this.getMaxProductPV;
      this.priceRange = [0, this.getMaxProductPrice];
      this.to = this.getMaxProductPrice;
      this.PVRange = [0, this.getMaxProductPV];
    }, 1000);
  },
  computed: {
    ...mapState("promotions", ["promotions"]),
    ...mapState("codes", ["codes"]),
    ...mapState("products", {
      getMaxProductPrice: (state, getters) =>
        Math.max(...getters.allProducts.map(item => item.price)),
      getMaxProductPV: (state, getters) =>
        Math.max(...getters.allProducts.map(item => item.binar_pv)),
      products: function(state, getters) {
        return state.products.filter(item => {
          return (
            item.price >= this.priceRange[0] &&
            item.price <= this.priceRange[1] &&
            (item.binar_pv >= this.PVRange[0] &&
              item.binar_pv <= this.PVRange[1]) &&
            (this.activeCode == "all" || this.activeCode == item.code_id) &&
            (this.promotion == 0 || this.promotion == item.promotion_id)
          );
        });
      },
      categories: state => state.categories
    })
  },
  watch: {
    filterType: function(v) {
      if (v === "pv") {
        this.priceRange = [0, this.getMaxProductPrice];
      }
      if (v === "price") {
        this.PVRange = [0, this.getMaxProductPV];
      }
    }
  }
};
</script>
<style lang="less">
.loading__text {
  text-align: center;
}
.all-products {
  padding-top: 60px;
  color: #34404b;
  margin-bottom: 60px;
  h2 {
    color: #91b92c;
    margin-bottom: 15px;
  }
  &__inner {
    display: flex;
  }
  &__left {
    flex: 0 0 22%;
    display: flex;
    flex-direction: column;
    padding-top: 45px;
    &-menu,
    &-filter,
    &-promotion {
      margin-bottom: 65px;
    }
    &-menu {
      ul {
        li {
          margin-bottom: 3px;
          font-size: 14px;
          position: relative;
          a {
            cursor: pointer;
          }
          a.active {
            color: var(--main-color);
          }
        }
      }
    }
    &-filter {
      &__button {
        border: none;
        background: none;
        font-size: 20px;
        margin-right: 10px;
        margin-bottom: 10px;
        font-family: "MyriadPro Regular", serif;
        font-weight: bold;
        cursor: pointer;
        &-active {
          color: #91b92c;
        }
      }
      label {
        margin-right: 10px;
      }
      input[type="number"] {
        width: 60px;
        height: 25px;
        background-color: #edf0f2;
        border: none;
        margin-right: 15px;
        padding: 4px;
        outline: none;
      }

      ul {
        li {
          margin-bottom: 15px;
          .vue-slider-process {
            background-color: #34404b !important;
          }
          .vue-slider-dot-tooltip-inner {
            border-color: #34404b !important;
            background-color: #34404b !important;
          }
          .vue-slider-dot-handle {
            background-color: #34404b !important;
          }
        }
      }
    }
    &-promotion {
      h2 {
        margin-bottom: 35px;
      }
      ul {
        li {
          margin-bottom: 30px;
          input[type="radio"] {
            position: absolute;
            visibility: hidden;
          }
          label {
            cursor: pointer;
            &::before {
              content: "";
              width: 13px;
              height: 13px;
              background-color: #ccc;
              display: inline-block;
              margin-right: 10px;
              box-sizing: border-box;
            }
          }
          input[type="radio"]:checked ~ label {
            color: #91b92c;
            &::before {
              background-color: #fff;
              border: 4px solid #91b92c;
            }
          }
        }
      }
    }
  }
  &__right {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;

    &__button {
      border: none;
      font-size: 18px;
      color: var(--main-color);
      border-bottom: 1px solid var(--main-color);
      cursor: pointer;
    }
  }
}
</style>
