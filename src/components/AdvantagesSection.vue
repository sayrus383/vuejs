<template>
    <div class="advantages">
        <div class="wrap">
            <div class="advantages__inner">
                <div class="advantages__item">
                    <img src="../assets/images/warranty_logo.png">
                    <p>ОФИЦИАЛЬНЫЕ <br>  ГАРАНТИИ КАЧЕСТВА</p>
                </div>
                <div class="advantages__item">
                    <img src="../assets/images/trolley_logo.png">
                    <p>ВСЕГДА ПОЛНЫЙ  <br>  АССОРТИМЕНТ ПРОДУКЦИИ</p>
                </div>
                <div class="advantages__item">
                    <img src="../assets/images/shipped_logo.png">
                    <p>ДОСТАВИМ В ЛЮБУЮ  <br> ТОЧКУ СНГ И СРЕДНИЙ АЗИИ</p>
                </div>
                <div class="advantages__item">
                    <img src="../assets/images/operator_logo.png">
                    <p>+7 (702) 777 54 33 <br> ОТВЕТИМ НА ЛЮБЫЕ ВОПРОСЫ</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'advantages-section'   
    }
</script>
<style lang="less" scoped>

    .advantages {
        margin-bottom: 120px;
        &__inner {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
        }
        &__item {    
            display: flex;
            text-align: center;
            height: 180px;
            flex-direction: column;
            align-items: center;
            flex: 0 1 20%;
            justify-content: space-evenly;
        }
    }
</style>


