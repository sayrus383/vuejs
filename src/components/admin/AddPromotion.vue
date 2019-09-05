<template>
    <div class="add-promotion">
        <h2>Типы акции</h2>
        <div class="promotion__list">
            <div v-for="(promotion, index) in promotions"
                :key="index"
                class="promotion__item">
                <span>{{ promotion.id }}</span>

                <input v-if="isActiveItem(promotion.id)" v-model="activeItemText" type="text">
                <p v-else @click.stop="activeItemId = promotion.id; activeItemText = promotion.name" >{{ promotion.name }}</p>
                <button v-if="isActiveItem(promotion.id)" @click="save">Сохранить</button>
                <button v-if="isActiveItem(promotion.id)" @click="activeItemId = null; activeItemText = null">Отмена</button>
                <button v-else @click="removePromotion(promotion)">Удалить</button>
            </div>
        </div>
        <form class="promotion__controls" @submit.prevent="addNewpromotion">
            <input v-model="name" type="text" required placeholder="Новая акция" class="promotion__add" >
            <button>Добавить</button>
        </form>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'admin-promotion',
    data() {
        return {
            name: '',
            activeItemText: null,
            activeItemId: null
        }
    },
    methods: {
        addNewpromotion() {
            if (!this.name || this.name.length < 2) {
                return;
            } 
            this.addNew(this.name)
            this.name = ''
        },
        save() {
            this.updatePromotion({ id: this.activeItemId, name: this.activeItemText })
            this.activeItemId = null;
            this.activeItemText = null;
        },
        isActiveItem(id) {
            return this.activeItemId === id
        },
        ...mapActions('promotions', ['addNew', 'removePromotion', 'updatePromotion'])
    },
    computed: {
        ...mapState('promotions', ['promotions'])
    }
}
</script>
<style lang="less" scoped>
    .promotion {
        &__list {
            width: 300px;
            margin-bottom: 20px;
            div {
                p {
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
            span {
                margin-right: 10px;
            }
        }
        &__controls {
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
