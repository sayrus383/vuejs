<template>
    <div class="contacts">
        <div class="wrap">
            <div class="contacts__inner">
                <h3 class="contacts__title">
                    Контакты
                </h3>
                <div class="contacts__body__wrap">
                    <div class="contacts__body">
                        <div class="contacts__body__req">
                            <p>Интернет Магазин NEO MARKET</p>
                            <p class="contacts__body__req__title">Реквизиты компании:</p>
                            <p>ТОО “NEO New Extra Opportunity”</p>
                            <p>БИН 181240019987</p>
                            <p>Юридический адрес г. Алматы, ул. Тимирязева, дом здание 42</p>
                            <p>АО “Kaspi Bank” </p>
                            <p>Номер счета KZT KZ14722S00001818825</p>
                            <p>БИК CASPKZKA КБе-17</p>
                        </div>
                        <div class="contacts__body__managers">
                            <p class="contacts__body__managers__title">Менеджера по работе с клиентами:</p>
                            <p>Айбек +7 (702) 777 54 33 </p>
                            <p>Асель +7 (705) 111 19 94</p>
                            <p>Болат +7 (707) 59 94 44</p>
                        </div>

                        <div class="contacts__body__office">
                            <p class="contacts__body__office__title">Адрес головного офиса:</p>
                            <p>г.Алматы, проспект Жибек жолы д 135 , офис 2101</p>
                        </div>

                        <div class="contacts__body__office">
                            <p class="contacts__body__office__title">Юридический адрес:</p>
                            <p>г.Алматы, проспект Жибек жолы д 135 , офис 2101</p>
                        </div>
                        <!-- Email: <a href="mailto:info@neoin.club">info@neoin.club</a>
                        <br>
                        Сall центр: <span>+7 (702) 777 54 33</span> -->
                    </div>
                    <div class="contacts__form">
                        <h2>Написать нам</h2>
                        <form action="/" >
                            <input type="text" required placeholder="Имя">
                            <input type="email" required placeholder="E-mail">
                            <input type="text" placeholder="Телефон">
                            <textarea name="message" required placeholder="Сообщение" cols="30" rows="5">
                            </textarea>
                            <button>Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="contacts__map">
                <p>г. Алматы, ул. Жибек жолы 135 , БЦ “Жибек жолы”</p>
            </div>
            <div class="contacts__new-maganizes">
                <h2>СКОРО открытие магазинов</h2>
                <div class="contacts__new-maganizes__images">
                    <img src="/images/magazines.png">
                    <div class="contacts__new-maganizes__inner">
                        <h1>Казахстан</h1>
                        <p>г. Алматы, ул. Рихарда Зорге, 18, ТРЦ “Март”</p>
                        <p>г. Алматы, ул. Мустай Карима, 11В/28,  ТРЦ “Almaty Mall”</p>
                        <p>г. Алматы, ул. Тимирязева, 42, корп. 3, ТРЦ “Atakent Moll”</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Contacts'
}
</script>
<style lang="less" scoped>
.contacts {
    &__inner {
        margin: 0 50px;
    }
    &__title {
        font-size: 22px;
        margin: 30px 0;
    }
    &__body {
        font-size: 18px;
        margin-bottom: 50px;
        padding: 0 50px;

        &__wrap {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }

        p {
            margin-bottom: 7px;
            font-size: 14px;
        }

        &__req {
            margin-bottom: 30px;
            &__title {
                font-weight: bold;
                position: relative;
            }
            &__title:before {
                content: url('/images/file.png');
                position: absolute;
                left: -30px;
                top: -5px;
            }
        }
        &__managers {
            margin-bottom: 30px;
            &__title {
                font-weight: bold;
                position: relative;
            }
            &__title:before {
                content: url('/images/user.png');
                position: absolute;
                left: -35px;
                top: -3px;
            }
        }
        &__office {
            margin-bottom: 20px;
            &__title {
                font-weight: bold;
                position: relative;
            }
            &__title:before {
                content: url('/images/location.png');
                position: absolute;
                left: -30px;
                top: -5px;
            }
        }
    }
    &__form {
        background-color: var(--main-color);
        border-radius: 5px;
        padding: 15px 30px;
        width: 500px;
        h2 {
            text-align: center;
            color: #fff;
            margin-bottom: 10px;
        }
        form {
            display: flex;
            flex-direction: column;
            input, textarea, button {
                padding: 10px 15px;
                border-radius: 4px;
                border: none;
                margin-bottom: 10px;
                outline: none;
            }
            textarea {
                resize: none;
            }
            button {
                font-size: 14px;
                border: 2px solid #fff;
                text-transform: uppercase;
                color: #fff;
                width: 50%;
                background-color: var(--main-color);
                align-self: flex-end;
                margin-top: 10px;
            }
        }
    }
    &__map {
        background: url('/images/map-contact.png');
        height: 225px;
        margin-bottom: 20px;
        padding-top: 30px;

        p {
            background-color: var(--main-color);
            width: 365px;
            padding: 7px 10px;
        }
    }
    &__new-maganizes {
        margin-bottom: 20px;
        h2 {
            text-align: center;
            color: var(--main-color);
            font-size: 32px;
            margin-bottom: 10px;
        }
        &__images {
            text-align: center;
            img {
                margin-bottom: 40px;
            }
        }
        &__inner {
            width: 700px;
            margin: 0 auto;
            text-align: left;
            margin-bottom: 50px;

            h1 {
                font-size: 24px;
                margin-bottom: 15px;
            }

            p:before {
                content: url('/images/shop.png');
                margin: 10px;
            }
        }
    }
}
</style>
