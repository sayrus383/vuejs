<template>
    <div class="edit">
        <div class="edit__data">
            <p><span> Имя: </span>{{ user.name || 'Айбек' }}</p>
            <p><span> Фамили: </span>{{ user.lastname || 'Дукейхан' }}</p>
            <p><span> Отчества: </span>{{ user.patronimyc || '' }}</p>
            <p><span> Логин: </span>{{ user.login || 'sava490' }}</p>
            <p><span> Дата рождения: </span>{{ user.birthday || '1997.07.31' }}</p>
            <p><span> Страна: </span>{{ user.country || 'Казахстан' }}</p>
            <p><span> Город: </span>{{ user.city || 'Алматы' }}</p>
            <p><span> Адрес прописки: </span>{{ user.homeAddress || 'KZ-050063 Almaty, Mkr. Aksay-5, d20, kv26' }}</p>
            <p><label for="delivery-address"> Адрес доставки: </label> <input type="text" id="delivery-address" v-model="user.deliveryAddress"></p>
            <p><label for="phone"> Телефон: </label> <input type="number" id="phone" v-model="user.phone"></p>
            <p><span> E-mail: </span>{{ user.email || 'sse1234010@gmail.com' }}</p>
            <p><label for="skype"> Skype ID: </label> <input type="text" id="skype" v-model="user.skype"></p>
            <p><span> Язык: </span>{{ user.lang || 'Русский' }}</p>
            <button class="edit__button" @click="saveUpdateUserDate">Сохранить</button>
        </div>
        <div class="edit__banner">
            <img src="../../assets/images/cabinet_banner.png" alt="Banner">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {
                skype: 'fsd234',
                phone: '87374755987',
                deliveryAddress: 'KZ Astana'
            }
        }
    },
    methods: {
        saveUpdateUserDate() {
            this.$notify({
                group: 'success',
                title: 'Магазин',
                text: 'Сохранено!'
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .edit {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-left: 40px;
        &__button {
            margin-top: 50px;
            width: 150px;
            height: 50px;
            border: none;
            border-radius: 3px;
            font-size: 16px;
            background-color: #333;
            color: #fff;
            right: 0;
            float: right;
            cursor: pointer;
            &:active {
                background-color: darken(#333, 10%);
            }
        }
        &__data {
            margin-top: 35px;
            p {
                margin-bottom: 5px;
                font-size: 16px;
                &:last-of-type {
                    margin-top: 23px;
                }
                span, label {
                    display: inline-block;
                    font-weight: bold;
                    width: 130px;
                    margin-right: 30px;
                }
                input {
                    width: 349px;
                    padding: 0px 2px;
                    font-size: 14px;
                }
            }
        }
        &__banner {
            img {
                max-width: 100%;
            }
        } 
    }
</style>
