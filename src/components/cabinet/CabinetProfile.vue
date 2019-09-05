<template>
    <div v-if="user !== null" class="profile">
        <div class="profile__data">
            <p><span> Имя: </span>{{ user.first_name || '' }}</p>
            <p><span> Фамили: </span>{{ user.last_name || '' }}</p>
            <p><span> Отчества: </span>{{ user.patronimyc || '' }}</p>
            <p><span> Логин: </span>{{ user.login || '' }}</p>
            <p><span> Дата рождения: </span>{{ user.birthday || '' }}</p>
            <p><span> Страна: </span>{{ user.country || '' }}</p>
            <p><span> Город: </span>{{ user.city || '' }}</p>
            <p><span> Адрес прописки: </span>{{ user.homeAddress || '' }}</p>
            <p><span> Адрес доставки: </span>{{ user.deliveryaddress || '' }}</p>
            <p><span> Телефон: </span>{{ user.phone || '' }}</p>
            <p><span> E-mail: </span>{{ user.email || '' }}</p>
            <p><span> Skype ID: </span>{{ user.skype || '' }}</p>
            <p><span> Язык: </span>{{ user.lang || '' }}</p>
        </div>
        <div class="profile__banner">
            <img src="../../assets/images/cabinet_banner.png" alt="Banner">
        </div>
    </div>
</template>
<script>
export default {
    name: 'cabinet-profile',
    data() {
        return {

        }
    },
    computed: {
        user() {
            return this.$store.getters['user/userData']
        }
    }
}
</script>
<style lang="less" scoped>
    .profile {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-left: 40px;
        &__data {
            margin-top: 35px;
            p {
                margin-bottom: 5px;
                font-size: 16px;
                &:last-of-type {
                    margin-top: 23px;
                }
                span {
                    display: inline-block;
                    font-weight: bold;
                    width: 130px;
                    margin-right: 30px;
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
