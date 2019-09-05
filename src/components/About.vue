<template>
    <div class="about__block">
        <div class="wrap">
            <div class="about__inner">
                <h1>О магазине</h1>
                <div class="about__items">
                    <div class="about__item">
                        <h2>Официальные гарантии качества</h2>
                        <div class="about__item-inner">
                            <img src="../assets/images/about_warranty.png">
                            <ul>
                                <li>гарантия подлинности продукции</li>
                                <li>соблюдение условий хранения</li>
                                <li>контроль сроков годности</li>
                                <li>возможность возврата и обмена</li>
                                <li>обеспечение сохранности заказов при доставке</li>
                                <li>защита персональных данных</li>
                            </ul>
                        </div>
                    </div>
                    <div class="about__item">
                        <h2>Всегда в срок и любым удобным для вас способом</h2>
                        <div class="about__item-inner">
                            <img src="../assets/images/about_shipping_logo.png">
                            <ul>
                                <li>Бесплатная доставка до офиса NEO</li>
                                <li>Доставка до пункта выдачи (офисов NEO International Club)</li>
                                <li>Курьерская доставка в любую точку Казахстана</li>
                                <li>Курьерская доставка в любую точку Узбекистана</li>
                                <li>Курьерская доставка в любую точку Киргизии</li>
                            </ul>
                        </div>
                    </div>
                    <div class="about__item">
                        <h2>Полный ассортимент продукции</h2>
                        <div class="about__item-inner">
                            <img src="../assets/images/about_trolley_logo.png">
                            <p class="about__item-description">Для заказа доступны все товары из ассортимента NEO International Club. Новинки в наличии с первого дня продаж.</p>
                        </div>
                    </div>
                    <div class="about__item">
                        <h2>Платите, как вам удобно</h2>
                        <div class="about__item-inner">
                            <img src="../assets/images/about_wallet_logo.png">
                            <p class="about__item-description">
                                Наличными или банковской картой.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="about__call-center">
                    <div class="about__call-center__inner">
                        <img src="../assets/images/about_call-center.png">
                        <div class="about__call-center__description">
                            <p>Горячая линия 8 (701) 701 01 01 (Звонок по Казахстану бесплатный)</p>
                            <p>Часы работы: с 8:00 до 2:00 (с 04:00 до 22:00 по московскому времени) без обеда и выходных.</p>
                            <p>Позвонив нам, вы можете:</p>
                        </div>
                    </div>
                    <ul class="about__call-center__list">
                        <li>получить квалифицированную консультацию,</li>
                        <li>если вы менеджер, быстро и просто оформить заказ по телефону.</li>
                    </ul>
                </div>
                <p class="about__wishes">Удачных вам покупок!</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style lang="less" scoped>
    .about {
        &__block {
            margin-top: 45px;
            margin-bottom: 50px;
        }
        &__inner  {
            h1 {
                margin-bottom: 40px;
                margin-left: 50px;
            }
        }
        &__item {
            margin-left: 100px;
            h2 {
                font-size: 18px;
                font-weight: normal;
            }
        }
        &__item {
            h2 {
                margin-bottom: 40px;
            }
            &-description {
                max-width: 400px;
                font-size: 14px;
            }
            &-inner {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-bottom: 50px;
                img {
                    margin-right: 50px;
                    margin-left: 20px;
                }
                ul {
                    li {
                        list-style-type: none;
                        padding: 4px 0;
                        font-size: 14px;
                        &::before {
                            content: url("../assets/images/check-mark-black-outline.png");
                            margin-right: 4px;
                            display: inline-block;
                            margin-bottom: -2px;
                            vertical-align: bottom;
                        }
                    }
                }
            }
        }
        &__call-center {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 150px;
            &__inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                img {
                    margin-right: 40px;
                }
            }
            &__list {
                li {
                    list-style-type: none;
                    font-size: 14px;
                    &::before {
                        content: url("../assets/images/check-mark-black-outline.png");
                        margin-right: 4px;
                        display: inline-block;
                        margin-bottom: -2px;
                        vertical-align: middle;
                    }
                }
            }
            &__description {
                p:first-of-type {
                    font-size: 14px;
                }
                p:first-of-type + p {
                    font-size: 12px;
                    padding-bottom: 24px;
                }
                p:last-of-type {
                    font-size: 14px;
                }
            }
        }
        &__wishes {
            text-align: right;
        }
    }
        
</style>
