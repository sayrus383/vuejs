<template>
    <div class="currency">
        <div class="currency__item">
            <input type="radio" name="currency" v-model="currency" value="kzt" id="kzt">
            <label for="kzt">KZT</label>
        </div>
        <div class="currency__item">
            <input type="radio" name="currency" v-model="currency" value="rub" id="rub">
            <label for="rub">RUB</label>
        </div>
        <div class="currency__item">
            <input type="radio" name="currency" v-model="currency" value="usd" id="usd">
            <label for="usd">USD</label>
        </div>
        <div class="currency__item">
            <input type="radio" name="currency" v-model="currency" value="eur" id="eur">
            <label for="eur">EUR</label>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'currency-block',
        data() {
            return {
                currency: ''
            }
        },
        beforeMount() {
            this.currency = this.$store.getters['products/getCurrency']
        },
        watch: {
            'currency': function(val) {
                this.$store.dispatch('products/setCurrency', val)
                this.$emit('currencyClose')
            }
        }
    }
</script>
<style lang="less" scoped>
    .currency {
        position: absolute;
        top: 40px;
        left: -80px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        z-index: 4;
        border: 1px solid rgba(108, 122, 136, 0.6);
        box-shadow: rgba(148, 148, 148, 0.32941176470588235) 0px 5px 13px 6px;
        div {
            flex-basis: 50%;
            text-align: center;
            height: 50px;
            cursor: pointer;
            width: 30px;
            cursor: pointer;
            label {
                display: block;
                margin-top: 15px;
                cursor: pointer;
            }
            input[type="radio"] {
                position: absolute;
                visibility: hidden;
                &:checked ~ label {
                    color: var(--main-color);
                    text-shadow: #ccc 0px 0px 1.5px;
                    text-decoration: underline;
                }
            }
        }
    }
</style>
