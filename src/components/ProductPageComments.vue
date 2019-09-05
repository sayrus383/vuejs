<template>
  <div class="comments">
    <div class="comments__nav">
      <h3>Отзывы о продукте:</h3>
      <button @click="isOpen = !isOpen">Оставить отзыв</button>
    </div>
    <div class="comments__wrap" v-if="comments && comments.length">
      <ul>
        <li v-for="(msg, index) in comments" :key="index">
          <div class="comments__user-name">
            <p class="name">{{ msg.user && msg.user.name || msg.user_name }}</p>
            <p class="date-wrap">
              <span class="name">{{ new Date(msg.created_at).toLocaleDateString() }}</span>
              <b v-for="ind in msg.stars" :key="ind" class="star">✩</b>
            </p>
          </div>
          <p class="comments__stars">
          </p>
          <p class="comments__text">{{ msg.text }}</p>
        </li>
      </ul>
    </div>
    <div v-else class="comments__wrap">
      <p>Отзывов нет</p>
    </div>
    <div v-if="isLogged && isOpen" class="comments__add">
      <div class="comments__add__stars">
        <label v-for="i in [1,2,3,4,5]" :key="i" :for="'comments-stars-' + i" class="star-wrap">
          <span class="star">✩</span>
          <input
            type="radio"
            v-model="message.stars"
            name="comments-stars"
            :value="i"
            :id="'comments-stars-' + i"
          >
        </label>
        {{ message.stars }}
      </div>
      <label for="comments-text" class="comments-text">
        <textarea v-model="message.text" id="comments-text"></textarea>
      </label>
      <button
        class="comments-text__button"
        :disabled="buttonIsDisabled"
        @click="addComment({
          stars: message.stars,
          text: message.text,
          product_id: productId,
          category_id: categoryId,
          user_name: user.first_name
        })"
      >Отправить</button>
    </div>
    <p v-if="!isLogged && isOpen">Войдите или зарегистрируйтесь чтобы оставить отзыв.</p>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ProductPageComments",
  props: {
    comments: {
      type: Array,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    productId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      message: {
        text: "",
        stars: 3
      },
      buttonIsDisabled: false,
      isOpen: false
    };
  },
  computed: {
    isLogged() {
      return this.$cookies.get("access_token") !== null;
    },
    ...mapState("user", ["user"])
  },
  methods: {
    async addNew(comment) {
      try {
        this.buttonIsDisabled = true
        await this.addComment(comment)
      } catch (error) {
        console.error(error)
      } finally {
        this.buttonIsDisabled = false
      }
    },
    ...mapActions("products", ["addComment"])
  }
};
</script>
<style lang="less" scoped>
.comments {
  margin-bottom: 50px;
  ul {
    li {
      padding: 10px;
      border: 1px solid #ccc;
      margin-bottom: 15px;
    }
  }
  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    button {
      display: block;
      font-size: 16px;
      padding: 8px 30px;
      border: none;
      background-color: #91b92c;
      color: #fff;
      cursor: pointer;
    }
  }
  &__wrap {
    margin-bottom: 30px;
  }
  &__text {
    font-size: 18px;
    width: 400px;
    margin-bottom: 10px;
  }
  &__user-name {
    p.name {
      font-weight: bold;
      font-size: 22px;
    }
    p.date-wrap {
      display: flex;
      align-items: center;
      span.name {
        font-size: 12px;
        color: #ccc;
        margin-right: 10px;
      }
      b.star {
        font-size: 16px;
        padding: 2px;
      }
    }
  }
  &-text {
    textarea {
      font-size: 16px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border-color: #ccc;
      resize: none;
      width: 100%;
      height: 100px;
      margin-bottom: 20px;
    }
    &__button {
      display: block;
      font-size: 14px;
      padding: 6px 30px;
      border: none;
      background-color: #91b92c;
      border-radius: 24px;
      color: #fff;
      cursor: pointer;
    }
  }
  .star-wrap {
    cursor: pointer;
    color: #92b92c;
    input[type="radio"]:checked,
    & ~ .star-wrap {
      color: #92b92c;
    }
    span.star {
      font-size: 24px;
    }
    font-size: 20px;
    &:hover {
      color: #ccc;
    }
    input[type="radio"] {
      visibility: hidden;
    }
    input[type="radio"]:checked ~ span.star {
      color: green;
      font-size: 18px;
    }
  }
}
</style>
