<template>
  <div class="error">
    <h1>Ошибка доступа. Попробуйте позже.</h1>
    <router-link class="home" to="/">Домой</router-link>
  </div>
</template>
<script>
export default {
  name: "ErrorPage"
}
</script>
<style lang="less" scoped>
.error {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a.home {
    margin: 30px;
    font-size: 18px;
    color: var(--main-color);
    cursor: pointer;
  }
}
</style>


