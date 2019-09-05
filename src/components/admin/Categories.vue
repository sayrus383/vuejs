<template>
    <div class="categories">
        <div class="categories__title">
            <h2>Категории</h2>
        </div>
        <div class="categories__list">
            <div 
                v-for="(category, index) in categories" 
                :key="index"
                class="categories__item">
                <p>{{ category.id }}</p>
                <input v-if="isActiveItem(category.id)" v-model="activeItemText" type="text">
                <h3 v-else @click.stop="activeItemId = category.id; activeItemText = category.name" class="categories__item__title">{{ category.name }}</h3>
                <button v-if="isActiveItem(category.id)" @click="save">Сохранить</button>
                <button v-if="isActiveItem(category.id)" @click="activeItemId = null; activeItemText = null">Отмена</button>
                <button v-else @click="removeCategory(category)">Удалить</button>
            </div>
            <form class="categories__controls" @submit.prevent="createNewCategory">
                <input v-model="categoryName" required placeholder="Новая категория" type="text">
                <button>Добавить</button>
            </form>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            categoryName: '',
            activeItemText: null,
            activeItemId: null
        }
    },
    methods: {
        async createNewCategory() {
            if (!this.categoryName || this.categoryName.length < 2) {
                return;
            }

            await this.createCategory({ name: this.categoryName });
            this.categoryName = '';
        },
        save() {
            this.updateCategory({ id: this.activeItemId, name: this.activeItemText })
            this.activeItemId = null;
            this.activeItemText = null;
        },
        isActiveItem(id) {
            return this.activeItemId === id
        },
        ...mapActions('products', ['createCategory', 'removeCategory', 'updateCategory'])
    },
    computed: {
        categories() {
            return this.$store.getters['products/allCategories']
        }
    }
}
</script>
<style lang="less" scoped>
    .categories {
        &__title {
            margin-bottom: 10px;
        }
        &__list {
            width: 400px;
            margin-bottom: 20px;
            div {
                h3 {
                    flex-grow: 1;
                }
                button {
                    padding: 2px 10px;
                    cursor: pointer;
                    background: none;
                    margin: 4px;
                }
            }
        }
        &__item {
            display: flex;
            align-items: center;

            &:hover {
                cursor: pointer;
                border: 1px solid #000;
            }
            p {
                font-size: 14px;
                margin: 5px;
            }
            h3 {
                margin: 5px;
            }
        }

        &__controls {
            margin-top: 20px;
            input {
                font-size: 14px;
                outline: none;
                padding: 2px;
            }
            button {
                padding: 2px 10px;
                cursor: pointer;
                background: none;
                margin: 4px;
                font-size: 14px;
            }
        }
    }
</style>

