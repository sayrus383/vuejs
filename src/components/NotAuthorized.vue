<template>
    <div>
        <h1>Вы не авторизованы</h1>
        <h2>Войдите пожалуйста в свой аккаунт</h2>
        <router-link to="/registration">Регистрация</router-link>
        <a href="http://neoin.club/login?redirect_back=true">Войти</a>
        <!-- <button @click="$router.back()">Назад</button> -->
    </div>
</template>
<style lang="less" scoped>
    div {
        height: 500px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        h1 {
            font-size: 36px;
        }
        h1, h2 {
            color: var(--main-gray);
        }
        h2 {
            margin-bottom: 30px;
        }
        a {
            font-size: 18px;
            color: var(--main-color);
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
        button {
            color: var(--main-color);
            cursor: pointer;
            border: none;
            font-size: 14px;
        }
    }
</style>
