<template>
    <div class="order__product">
        <img :src="product.image" alt="Image">
        <p class="order__product__title">{{ product.name }}</p>
        <p class="order__product__sum">
            <span>Количество: {{ product.order_lists.quantity }}</span> 
            Сумма: {{ product.order_lists.sum }} {{ product.order_lists.currency | CF }}
        </p>
    </div>
</template>
<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        data() {
            return {

            }
        }
    }
</script>
<style lang="less" scoped>
    .order {
        &__product {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border: 1px solid #ccc;
            flex-grow: 1;
            img {
                height: 80px;
                margin: 10px 20px;
            }
            &__title {
                flex-grow: 1
            }
            &__sum {
                margin-right: 20px;
                span {
                    margin-right: 10px;
                }
            }
        }
    }
</style>

