<template>
    <div class="add-product">
        <h2>{{ isNew ? 'Новый продукт' : product.name }}</h2>
        <form class="product-form" @submit.prevent="saveProduct">
            <label for="name">Наименование</label>
            <input required type="text" v-model="product.name" id="name">
            <label for="category">Категория</label>
            <select v-model="product.category_id" id="category">
                <option :value="null">Нет</option>
                <option 
                    v-for="(category, index) in categories" 
                    :key="index" 
                    :value="category.id"> 
                        {{category.name}}
                    </option>
            </select>
            <label for="packaging">Упаковка</label>
            <select v-model="product.packaging_id" id="packaging">
                <option :value="null">Нет</option>
                <option 
                    v-for="(packaging, index) in packagings"
                    :key="index"
                    :value="packaging.id"> 
                        {{ packaging.type }} 
                </option>
            </select>
            <label for="codes">Код</label>
            <select v-model="product.code_id" id="codes">
                <option :value="null">Нет</option>
                <option 
                    v-for="(code, index) in codes"
                    :key="index"
                    :value="code.id"> 
                        {{ code.name }} 
                </option>
            </select>
            <label for="short_description"> Краткое описание </label>
            <textarea 
                name="short_description"
                id="short_description"
                v-model="product.short_description"
                cols="30"
                rows="4"
                maxlength="200">
            </textarea>
            <label for="description"> Описание </label>
            <textarea 
                name="description"
                id="description"
                v-model="product.description"
                cols="30"
                rows="8"
                maxlength="2000">
            </textarea>
            <label for="benefits"> Преимущества </label>
            <textarea 
                name="benefits"
                id="benefits"
                v-model="product.benefits"
                cols="30"
                rows="8"
                maxlength="2000">
            </textarea>
            <label for="composition"> Состав </label>
            <textarea 
                name="composition"
                id="composition"
                v-model="product.composition"
                cols="30"
                rows="8"
                maxlength="2000">
            </textarea>
            <label for="applying"> Применение </label>
            <textarea 
                name="applying"
                id="applying"
                v-model="product.applying"
                cols="30"
                rows="8"
                maxlength="2000">
            </textarea>
            <label for="available">В наличии: {{ product.available ? 'Есть' : 'Нет' }}</label>
            <input type="checkbox" v-model="product.available" id="available">
            <label for="binar_pv">Бинарный PV</label>
            <input required type="number" min="0" max="1000" v-model="product.binar_pv" id="binar_pv">
            <label for="referal_pv">Реферальный PV</label>
            <input required type="number" min="0" max="1000" v-model="product.referal_pv" id="referal_pv">
            <label for="">Артикул</label>
            <input required type="text" v-model="product.articul" id="articul">
            <label for="cashback_client">Кэшбэк клиент</label>
            <input required type="number" min="0" max="5000" v-model="product.cashback_client" id="cashback_client">
            <label for="cashback_partner">Кэшбэк партнер</label>
            <input required type="number" min="0" max="5000" v-model="product.cashback_partner" id="cashback_partner">
            <label for="discount">Скидка %</label>
            <input required type="number" min="0" max="100" v-model="product.discount" id="discount">
            <label for="promotion">Акция</label>
            <select required v-model="product.promotion_id" id="promotion">
                <option :value="null">Нет</option>
                <option 
                    v-for="(promotion, index) in promotions"
                    :key="index"
                    :value="promotion.id"> 
                        {{ promotion.name }} 
                </option>
            </select>
            <label for="kzt">Цена в KZT</label>
            <input required type="number" min="0" max="1000000" v-model="product.kzt" id="kzt">
            <label for="rub">Цена в RUB</label>
            <input required type="number" min="0" max="1000000" v-model="product.rub" id="rub">
            <label for="usd">Цена в USD</label>
            <input required type="number" min="0" max="1000000" v-model="product.usd" id="usd">
            <label for="eur">Цена в EUR</label>
            <input required type="number" min="0" max="1000000" v-model="product.eur" id="eur">
            <label v-if="isNew" for="images">Картинки</label>
            <input v-if="isNew" type="file" multiple ref="images" id="images">
            <button >Сохранить</button>
        </form>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            isNew: false,
            product: {
                promotion: 0
            }
        }
    },
    methods: {
        async saveProduct() {
            if (this.isNew) {
                let product = this.product
                let images = this.$refs.images.files
                let formData = new FormData();

                for (let key in product) {
                    formData.append(key, product[key])
                }

                if (images && images.length) {
                    for (let i = 0; i < images.length; i++) {
                        let image = images.item(i)
                        formData.append(image.name, image)
                    }
                }
                await this.createProductProduct(formData)
                
                this.$router.push('/admin/products')
                this.$notify({
                    group: "success",
                    title: 'Магазин',
                    text: 'Новый продукт создан'
                });

            } else {
                await this.updateProductById(this.product)
                this.$router.push('/admin/products')
                this.$notify({
                    group: "success",
                    title: 'Магазин',
                    text: 'Изменения сохранены'
                });
            }
        },
        ...mapActions('products', [
            'createProductProduct',
            'updateProductById'
        ])
    },
    created() {
        let  { product_id } = this.$route.params
        if (product_id == 'new') {
            this.isNew = true
            return
        }
        let pr = this.$store.getters['products/allProducts'].find(pr => pr.id == product_id)
        this.product = Object.assign({}, pr)
    },
    computed: {
        ...mapState('products', ['categories']),
        ...mapState('codes', ['codes']),
        ...mapState('packagings', ['packagings']),
        ...mapState('promotions', ['promotions']),
    }
}
</script>
<style lang="less" scoped>
    .add-product {
        h2 {
            margin-bottom: 20px;
        }
    }
    .product-form {
        display: flex;
        flex-direction: column;
        input, select, button {
            font-size: 14px;
            width: 300px;
            height: 30px;
            margin-bottom: 10px;
            padding: 5px;
        }
        input[type="button"] {
            background-color: #ccc;
            cursor: pointer;
        }
        textarea {
            width: 300px;
            padding: 10px;
            font-size: 14px;
            outline: none;
            resize: none;
            margin-bottom: 10px;
        }
    }
</style>
