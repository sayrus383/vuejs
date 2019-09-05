<template>
  <div class="login">
    <form class="login__form" @submit.prevent="toLogin">
      <router-link to="/" class="logo-wrap">
        <img src="../../assets/images/logo.png" alt="Home">
        <span>Интернет магазин</span>
      </router-link>
      <h2>Welcome</h2>
      <input required v-model="credentials.name" @keydown.enter="toLogin" autocomplete="off" type="text">
      <input
        required
        v-model="credentials.password"
        @keydown.enter="toLogin"
        autocomplete="off"
        type="password"
      >
      <button>Next</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "admin-login",
  data() {
    return {
        credentials: {
            name: "",
            password: ""
        }
    };
  },
  methods: {
    toLogin() {
      this.$store
        .dispatch("user/login", this.credentials)
        .then(() => {
          this.$acl.change('admin')
          this.$router.push("/admin")
        })
        .catch(err => {
            console.error(err)
            this.$notify({
                group: "fail",
                title: "Магазин",
                text: "Ошибка!"
            });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo-wrap {
      width: 121px;
      margin-bottom: 20px;
    }
    .logo-wrap > img {
      max-width: 100%;
      margin-bottom: -5px;
    }
    .logo-wrap > span {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    h2 {
      margin-bottom: 10px;
    }
    input {
      margin-bottom: 10px;
    }
    button {
      width: 250px;
      height: 30px;
    }
  }
}
</style>


