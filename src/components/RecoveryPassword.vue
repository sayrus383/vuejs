<template>
    <div class="recovery-password__block">
        <div class="wrap">
            <h1>Восстановить пароль</h1>
            <div class="recovery-password__inner">
                <p class="recovery-password__alert">
                    ВНИМАНИЕ! <br>
                    Если вы не получили SMS-сообщение в течение 30 минут, свяжитесь с сотрудником компании,
                    возможно, в регистрационных данных указан неправильный мобильный телефон.
                </p>
                <form action="" class="recovery-password__form">
                    <input type="text" placeholder="+7 (___) ___ __ __">
                    <span class="recovery-password__login-description">ID, мобильный телефон, e-mail</span>
                    <input type="text" placeholder="Имя">
                    <input type="text" placeholder="Фамилия">
                    <input type="text" placeholder="Отчества">
                    <button>Отправить</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'recovery-password'        
    }
</script>
<style>
    .recovery-password__block h1 {
        margin-bottom: 50px;
    }
    .recovery-password__alert {
        max-width: 500px;
        text-align: center;
        font-size: 12px;
        margin-bottom: 20px;
    }
    .recovery-password__inner, .recovery-password__form {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .recovery-password__form input {
        font-size: 14px;
        width: 250px;
        height: 30px;
        padding: 5px 10px;
        border-radius: 3px;
        margin-bottom: 25px;
        border: 1px solid #e3e3e3;
    }
    .recovery-password__form input:first-of-type {
        margin-bottom: 0;
    }
    .recovery-password__login-description {
        width: 250px;
        font-size: 10px;
        color: #909090;
        margin-bottom: 25px;
    }
    .recovery-password__form button {
        width: 210px;
        height: 60px;
        text-align: center;
        border: none;
        font-size: 20px;
        color: #fff;
        background-color: #a9c048;
        border-radius: 4px;
        outline: none;
    }
    .recovery-password__form {
        margin-bottom: 30px;
    }
</style>
