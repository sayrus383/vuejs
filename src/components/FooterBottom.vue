<template>
    <footer>
        <div class="wrap">
            <div class="footer__block">
                <div class="magazine-menu">
                    <h3>Интернет <br> магазин</h3>
                    <ul>
                        <li v-for="(item, index) in menuItems"
                            :key="index">
                            <router-link :to="item.link">{{item.name}}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="partners">
                    <h3>ОТКРОЙТЕ ДЛЯ СЕБЯ <br> NEO INTERNATIONAL NETWORK</h3>
                    <ul>
                        <li><a href="http://neoin.club">Новости</a></li>
                        <li><a href="http://neoin.club/business">Начни бизнес</a></li>
                        <li><a href="http://neoin.club/partner">Стань партнером</a></li>
                        <li><a href="http://neoin.club">Автопрограмма</a></li>
                        <li><a href="http://neocity.kz">Жилищная программа</a></li>
                        <li><a href="http://neoin.club/cabinet">Личный кабинет</a></li>
                    </ul>
                </div>
                <form action="mailto:info@neoin.club" method="post" enctype="text/plain" class="subscribe">
                    <h3>ПОДПИСАТЬСЯ <br> НА НОВОСТИ</h3>
                    <input v-model="userMail" type="email" required placeholder="Введите E-mail" id="user-email">
                    <input type="hidden" value="Подписка на новости!">
                    <label for="user-email">
                        <!-- <button type="submit" @click="subscribe">Отправить</button> -->
                        <input type="submit" @click="subscribe" value="Отправить">
                    </label>
                </form>
                <div class="phone">
                    <div class="call-center">
                        <p class="call-center__number">+7 (702) 777 54 33</p>
                        <p class="call-center__logo">call центр</p>
                    </div>
                    <div class="whatsapp">
                        <p class="whatsapp__logo">whatsapp</p>
                        <p class="whatsapp__number">+7 (702) 777 54 33</p>
                    </div>
                    <router-link to="/personal-data-policy" class="phone__rules">Политика защиты персональных данных</router-link>
                </div>
            </div>
            <div class="footer__copyright">
                <p>© NEO PARTNERS CLUB 2018</p>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'footer-bottom',
        data() {
            return {
                userMail: '',
                menuItems: [
                    {link: '/', name: 'Главная'},
                    {link: '/shipping', name: 'Доставка'},
                    {link: '/payment', name: 'Оплата'},
                    {link: '/return-and-exchange', name: 'Обмен и возврат'},
                    {link: '/public-offer-of-sale', name: 'Публичная оферта'},
                    {link: '/products', name: 'Каталог'},
                    {link: '/products', name: 'Новинки акции'},
                    {link: '/', name: 'Хиты продаж'},
                    {link: 'About', name: 'О магазине'},
                ]
            }
        },
        methods: {
            subscribe() {
                if (this.userMail != '') {
                    this.$notify({
                        group: "success",
                        title: 'Магазин',
                        text: 'Вы успешно подписались!'
                    });
                }
            }
        }
    }
</script>
<style lang="less" scoped>

    footer {
        background: url("../assets/images/footer_bg.png") center no-repeat;
        background-size: cover;
        padding: 15px 0;
    }
    .footer {
        &__block {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 30px 15px;
            h3 {
                color: #535458;
                text-transform: uppercase;
                padding-bottom: 7px;
            }
            ul {
                li {
                    list-style-type: none;
                    padding: 4px 0;
                    a {
                        &:hover {
                            color: var(--main-color);
                        }
                    }
                }
            }
            .subscribe {    
                input, 
                button {    
                    width: 250px;
                    height: 35px;
                    padding: 5px 10px;
                    font-size: 18px;
                    display: block;
                    border: none;
                    margin-bottom: 10px;
                }
                input[type="submit"],
                button {
                    text-transform: uppercase;
                    background-color:  #a9c048;
                    color: #fff;
                    cursor: pointer;
                    &:active {
                        background: #8b9e39;
                    }
                }
            }
            & > div {
                flex: 1;
            }
            & .phone {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                &__rules {
                    font-size: 12px;
                    text-align: right;
                    text-decoration: underline;
                    color: #afafaf;
                }
                .call-center {
                    text-align: right;
                    color: #afafaf;
                    &__number{
                        font-size: 34px;
                    }
                    &__logo::before {
                        content: url("../assets/images/phone-call_logo.png");
                        margin-right: 3px;
                    }
                }
                .whatsapp {
                    text-align: right;
                    color: #7ad06d;
                    &__number {
                        font-size: 24px;
                    }
                    &__logo::before {
                        content: url("../assets/images/whatsapp_logo.png");
                        margin-right: 3px;
                    }
                }
            }
        }
        &__copyright {
            text-align: center;
            border-top: 1px solid #000;
            p {
                font-size: 12px;
                padding: 10px 0;
            }
        }
    }

    @media print {
        footer {
            display: none;
        }
    }

</style>

