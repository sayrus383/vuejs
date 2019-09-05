<template>
    <div>
        <h1>404</h1>
        <h2>Упс! Страница не найдена!</h2>
        <router-link to="/">Домой</router-link>
        <button @click="$router.back()">Назад</button>
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
            font-size: 50px;
        }
        h1, h2 {
            color: var(--main-gray);
        }
        a {
            margin: 30px;
            color: var(--main-color);
            font-size: 18px;
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
