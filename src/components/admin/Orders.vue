<template>
  <div class="orders">
    <div class="orders__title">
      <h2>Orders</h2>
    </div>
    <table class="orders__table">
        <thead>
            <th>В неделю</th>
            <th>В месяц</th>
            <th>В год</th>
        </thead>
        <tbody>
            <td>Продуктов продано: {{ totalProductsOfDays(7) }} <br> на общую сумму: {{ totalSumOfDays(7) }} KZT</td>
            <td>Продуктов продано: {{ totalProductsOfDays(30) }} <br> на общую сумму: {{ totalSumOfDays(30) }} KZT</td>
            <td>Продуктов продано: {{ totalProductsOfDays(365) }} <br> на общую сумму: {{ totalSumOfDays(365) }} KZT</td>
        </tbody>
    </table>
    <div class="orders__search">
      <input type="text" @focus="searchFromDate = searchToDate = ''" v-model="searchId" class="orders__search__input" placeholder="ID"> или с
      <input type="date" @focus="searchId = ''" v-model="searchFromDate" class="orders__search__input" placeholder="дату в ДД.ММ.ГГГ"> по 
      <input type="date" @focus="searchId = ''" v-model="searchToDate" class="orders__search__input" placeholder="дату в ДД.ММ.ГГГ">
    </div>
    <div class="orders__sort">
      <label for="sort-type">
        Сортировка по:
      </label>
      <select v-model="sortType" name="sort-type" id="sort-type">
        <option value="id">ID</option>
        <option value="created_at">Дате</option>
      </select>
    </div>
    <div v-if="filteredOrders && filteredOrders.length > 0" class="orders__list">
      <router-link
        v-for="(order, index) in filteredOrders"
        :key="index"
        :to="'/admin/orders/' + order.id"
        class="orders__item"
      >
        <p class="orders__item__no">{{ order.id }}</p>
        <div class="orders__item__products">
          <div
            v-for="(product, ind) in order.products"
            :key="ind"
            class="orders__item__products__item"
          >
            <img :src="product.image" :alt="product.name">
          </div>
        </div>
        <p class="orders__item__status">
          Статус:
          <span>{{ order.status.name }}</span>
        </p>
        <p class="orders__item__status">
          Дата:
          <span>{{ new Date(order.created_at).toLocaleDateString() }}</span>
        </p>
        <p class="orders__item__sum">
          Сумма:
          <span>{{ order.sum }}</span>
        </p>
      </router-link>
    </div>
    <div v-else class="orders__empty">Заказов нет</div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AdminOrders',
  data() {
    return {
      searchId: '',
      searchFromDate: '',
      searchToDate: '',
      sortType: 'created_at'
    };
  },
  computed: {
    // orders() {
    //   return this.$store.getters["cart/allOrders"];
    // },
    ...mapState('cart', ['orders']),
    ...mapGetters('cart', ['allOrders', 'totalSumOfDays', 'totalProductsOfDays']),
    sortedOrders() {
      if (this.sortType == 'created_at') {
        return [...this.orders].sort((a, b) => new Date(b[this.sortType]) -  new Date(a[this.sortType]))
      }
      return [...this.orders].sort((a, b) => a[this.sortType] - b[this.sortType])
    },
    filteredOrders() {
      if (this.searchId) {
        return this.sortedOrders.filter(item => item.id == this.searchId)
      } else if (this.searchFromDate && this.searchToDate) {
        return this.sortedOrders.filter(item => {
          const date = new Date(item.created_at);
          return date >= new Date(this.searchFromDate) && date <= new Date(this.searchToDate);
        })
      }

      return this.sortedOrders;
    },
  }
};
</script>
<style lang="less" scoped>
.orders {
  &__sort select {
    width: 90px;
    height: 25px;
  }
  &__search {
    margin: 20px 30px;
    &__input {
      font-size: 16px;
      padding: 5px;
      width: 240px;
    }
  }
  &__title {
    margin-bottom: 10px;
  }
  &__table {
    border: 1px solid #ccc;
    margin-bottom: 20px;
    th {
      font-size: 18px;
    }
    th, td {
      width: 220px;
      text-align-last: left;
      border: 1px solid #ccc;
      margin: 0;
      padding: 5px;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #dedcdc;
    }
    &__no {
      margin-right: 10px;
    }
    &__products {
      display: flex;
      align-items: center;
      flex-grow: 1;
      &__item {
        width: 70px;
        padding: 5px;
        height: 70px;
        text-align: center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    &__status {
      margin-right: 10px;
    }
    &__status span,
    &__sum span {
      font-weight: bold;
    }
  }
}
</style>

