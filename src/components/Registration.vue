<template>
  <div class="register__block">
    <div class="wrap">
      <h1>Регистрация</h1>
      <div class="register__inner">
        <form action class="register__form">
          <input v-model="user.first_name" type="text" required placeholder="Имя">
          <input v-model="user.last_name" type="text" required placeholder="Фамилия">
          <input v-model="user.login" type="text" required placeholder="Логин">
          <input v-model="user.phone" type="text" required placeholder="+7 (___) ___ __ __">
          <input v-model="user.email" type="email" required placeholder="E-mail">
          <input
            v-model="user.sponsor_login"
            type="text"
            disabled
            required placeholder="Спонсор логин"
            value="Admin"
          >
          <input v-model="user.password" type="password" required placeholder="Пароль">
          <input v-model="passwordConfirm" type="password" required placeholder="Повторите пароль">
        </form>
        <div class="register__banner">
          <div class="register__banner-inner"></div>
          <div class="register__banner-confirms">
            <ul>
              <li>
                <input type="checkbox" id="manager">
                <label
                  for="manager"
                >Я хочу, чтобы со мной связался любой менеджер для консультаций по ассортименту NEO International Club</label>
              </li>
              <li>
                <input type="checkbox" id="personal-data">
                <label for="personal-data">Я даю согласие на обработку персональных данных</label>
              </li>
              <li>
                <input name="sponsor" type="radio" id="consultant">
                <label for="consultant">У меня уже есть менеджер-консультант NEO International Club</label>
              </li>
              <li>
                <input name="sponsor" type="radio" id="card">
                <label for="card">У меня уже есть пластиковая карта NEO Club</label>
              </li>
            </ul>
          </div>
          <div class="register__gender">
            <div>
              <input type="radio" v-model="user.gender" name="gender" id="man" value="male">
              <label for="man">Мужчина</label>
            </div>
            <div>
              <input type="radio" v-model="user.gender" name="gender" id="woman" value="female">
              <label for="woman">Женщина</label>
            </div>
          </div>
          <button 
            class="register__button"
            @click="register"
            :disabled="buttonIsDisabled"
          >
            Зарегистрироваться
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Registration',
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        login: '',
        password: '',
        gender: 'male',
        phone: '',
        sponsor_login: 'Admin'
      },
      passwordConfirm: '',
      buttonIsDisabled: false
    };
  },
  methods: {
    async register() {
      if (this.buttonIsDisabled) {
        return;
      }

      this.buttonIsDisabled = true;

      try {
        let res = await this.registerWithServer(this.user);

        this.$notify({
          group: "success",
          title: 'Магазин',
          text: 'Регистрация прошла успешно'
        });

        this.$router.push('home')
      } catch (error) {
        console.error(error)

        this.$notify({
          group: "fail",
          title: 'Магазин',
          text: 'Вы ввели непраильные данные'
        })

      } finally {
        this.buttonIsDisabled = false;
      }
    },
    ...mapActions('user', ['registerWithServer'])
  }
};
</script>
<style lang="less">
.register {
  &__block {
    margin-bottom: 50px;
    padding-top: 40px;
  }
  &__inner {
    display: flex;
    margin-left: 130px;
    margin-top: 30px;
  }
  &__form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    flex-basis: 36%;
  }
  &__form > input {
    outline: none;
    font-size: 14px;
    width: 250px;
    height: 30px;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid #e3e3e3;
    margin-bottom: 12px;
  }
  &__gender {
    display: flex;
    justify-content: space-around;
    width: 250px;
    height: 30px;
  }
  &__gender {
    margin-bottom: 5px;
    input[type="radio"] {
      margin-right: 5px;
      display: inline-block;
      vertical-align: top;
    }
  }
  &__banner {
    flex-grow: 1;
    &-inner {
      height: 170px;
      background-color: #d5d5d5;
      margin-bottom: 40px;
    }
  }
  &__banner {
    &-confirms {
      margin-bottom: 20px;
      ul {
        li {
          list-style-type: none;
          input {
            margin-right: 5px;
          }
          label {
            font-size: 12px;
          }
        }
      }
    }
  }
  &__button {
    width: 370px;
    height: 70px;
    text-align: center;
    border: none;
    display: block;
    font-size: 20px;
    color: #fff;
    background-color: #a9c048;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    &:disabled {
      background-color: #bfce81;
    }
    span {
      content: url("../assets/images/register_button_logo.png");
      display: inline-block;
      vertical-align: middle;
      margin-left: 5px;
    }
  }
}
</style>
