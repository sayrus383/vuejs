<template>
    <div class="add-code">
        <h2>Коды продуктов</h2>
        <div class="code__list">
            <div
                v-for="(code, index) in codes"
                :key="index"
                class="code__item">
                <span>{{ code.id }}</span>
                <input v-if="isActiveItem(code.id)" v-model="activeItemText" type="text">
                <p v-else @click.stop="activeItemId = code.id; activeItemText = code.name">{{ code.name }}</p>
                <button v-if="isActiveItem(code.id)" @click="save">Сохранить</button>
                <button v-if="isActiveItem(code.id)" @click="activeItemId = null; activeItemText = null">Отмена</button>
                <button v-else @click="deleteOneCode(code)">Удалить</button>
            </div>
        </div>
        <form class="code__controls" @submit.prevent="addNewCode">
            <input v-model="name" type="text" required placeholder="Новый код продукта" class="code__add" >
            <button>Добавить</button>
        </form>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'admin-code',
    data() {
        return {
            name: '',
            activeItemText: null,
            activeItemId: null
        }
    },
    methods: {
        addNewCode() {
            if (!this.name || this.name.length < 2) {
                return;
            }

            this.addNew(this.name);
            this.name = '';
        },
        save() {
            this.updateCode({ id: this.activeItemId, name: this.activeItemText })
            this.activeItemId = null;
            this.activeItemText = null;
        },
        isActiveItem(id) {
            return this.activeItemId === id
        },
        ...mapActions('codes', ['addNew', 'deleteOneCode', 'updateCode'])
    },
    computed: {
        ...mapState('codes', ['codes'])
    }
}
</script>
<style lang="less" scoped>
    .code {
        &__list {
            width: 400px;
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
