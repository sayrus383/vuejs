<template>
  <div class="login__block">
    <div class="wrap">
      <h1 class="login__title">Вход</h1>
      <div class="login__inner">
        <p class="login__info">У меня есть аккаунт</p>
        <p class="login__alert">Введите ID или номер телефона.
          <br>Введите номер телефона (для зарегистрированного клиента).
        </p>
        <div class="login-form__wrap">
          <img src="../assets/images/login_logo.png">
          <form action="/" class="login__form">
            <input v-model="login" ref="loginInput" type="text" :placeholder="placeholderText">
            <p class="login__login-description">ID, мобильный телефон, e-mail</p>
            <input v-model="password" type="password" placeholder="Введите пароль">
            <router-link to="/recovery-password" class="login__login-password">Забыли пароль?</router-link>
            <button @click.prevent="auth">Войти
              <span></span>
            </button>
          </form>
          <div class="login__type">
            <ul class="noselect">
              <li class="active">
                <input type="radio" v-model="ma" name="loginType" id="mnumber" value="number">
                <label for="mnumber">Номер мобильного телефона</label>
              </li>
              <li class="active">
                <input type="radio" v-model="ma" name="loginType" id="mlogin" value="text">
                <label for="mlogin">Логин</label>
              </li>
              <li class="active">
                <input type="radio" v-model="ma" name="loginType" id="memail" value="email">
                <label for="memail">Электронная почта</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="login__register">
          <a href="#" class="login__register__top-p">В первый раз?</a>
          <div class="login__register__buttons">
            <button @click="redirect" class="login__register__to-register">Зарегистрироваться
              <span></span>
            </button>
            <button
              @click="$router.push('/products')"
              class="login__register__without-register"
            >Продолжить без регистрации
              <span></span>
            </button>
          </div>
          <a href="#" class="login__register__bottom-p">Бонусная программа NEO Club</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../config/axios";
export default {
  name: "login",
  data() {
    return {
      ma: "text",
      login: "",
      password: ""
    };
  },
  methods: {
    auth() {
      request
        .post("/login-server", {
          email: this.login,
          password: this.password
        })
        .then(({ data: { success, access_token } }) => {
          if (window.document.domain === "localhost") {
            this.$cookies.set("access_token", access_token);
          } else {
            this.$cookies.set(
              "access_token",
              access_token,
              "7d",
              "/",
              ".neoin.club"
            );
          }
          this.$router.push({
            path: "/cart" //this.$route.query.redirect
          });
        })
        .catch(err => console.error(err));
    },
    redirect() {
      window.location.href = "http://neoin.club/register";
    }
  },
  computed: {
    placeholderText() {
      if (this.ma === "text") {
        return "Введите логин";
      }

      if (this.ma === "number") {
        return "8 (___) ___ __ __";
      }

      if (this.ma === "email") {
        return "Введите email";
      }
      return "text";
    }
  },
  watch: {
    ma(val) {
      this.$refs.loginInput.type = val;
    }
  }
};
</script>
<style>
.login__block {
  padding-top: 40px;
}
.login__inner {
  max-width: 800px;
  margin: 30px auto;
  align-self: center;
}
.login__alert {
  text-align: center;
  font-size: 12px;
  margin-bottom: 20px;
}
.login-form__wrap {
  display: flex;
  justify-content: space-between;
}
.login-form__wrap > img {
  align-self: center;
}
.login__type {
  width: 200px;
  margin-top: 20px;
}
.login__type > ul > li {
  font-size: 12px;
  list-style-type: none;
  cursor: pointer;
  position: relative;
}
.login__type > ul > li input[type="radio"] {
  position: absolute;
  visibility: hidden;
}
.login__type > ul > li label {
  cursor: pointer;
}
.login__type > ul > li label::before {
  content: "";
  display: inline-block;
  border-radius: 4px;
  margin-right: 5px;
  vertical-align: middle;
  width: 7px;
  height: 7px;
  background-color: #e3e3e3;
  margin-bottom: 2px;
}
.login__type > ul > li input[type="radio"]:checked ~ label::before {
  background-color: #92ba2d;
}
.login__form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
.login__form input {
  outline: none;
  font-size: 14px;
  width: 250px;
  height: 30px;
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid #e3e3e3;
}
.login__form input:first-of-type {
  margin-bottom: 0;
}
.login__login-description,
.login__login-password {
  width: 250px;
  font-size: 10px;
  color: #909090;
  margin-bottom: 25px;
}
.login__login-password {
  text-align: right;
  text-decoration: underline;
}
.login__form button,
.login__register__buttons button {
  width: 210px;
  height: 60px;
  text-align: center;
  border: none;
  font-size: 20px;
  color: #fff;
  background-color: #a9c048;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}
.login__register__buttons button {
  margin: 8px 0;
}
.login__register__buttons button > span {
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
}
.login__register__buttons button.login__register__to-register,
.login__register__buttons button.login__register__without-register {
  height: 70px;
  width: 45%;
}
.login__register__buttons button.login__register__without-register {
  background-color: #333;
}
button.login__register__to-register > span {
  content: url("../assets/images/register_button_logo.png");
}
button.login__register__without-register > span {
  content: url("../assets/images/login_cancel_logo.png");
}
.login__form button > span {
  content: url("../assets/images/check-in_logo.png");
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
}
.login__register__buttons {
  display: flex;
  justify-content: space-between;
}
.login__register__bottom-p {
  color: #92b92c;
  text-decoration: underline;
  padding: 4px;
}
</style>
