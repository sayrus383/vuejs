<template>
    <div class="add-status">
        <h2>Статусы заказов</h2>
        <div class="status__list">
            <div v-for="orderStatus in statuses"
                :key="orderStatus.id"
                class="status__item">
                <span>{{ orderStatus.id }}</span>
                <input v-if="isActiveItem(orderStatus.id)" v-model="activeItemText" type="text">
                <p v-else @click.stop="activeItemId = orderStatus.id; activeItemText = orderStatus.name">{{ orderStatus.name }}</p>
                <button v-if="isActiveItem(orderStatus.id)" @click="save">Сохранить</button>
                <button v-if="isActiveItem(orderStatus.id)" @click="activeItemId = null; activeItemText = null">Отмена</button>
                <button v-else @click="removeOneStatus(orderStatus)">Удалить</button>
            </div>
        </div>
        <form class="status__controls" @submit.prevent="addNewStatus">
            <input v-model="statusName" required @keyup.enter="addNewStatus" placeholder="Новый статус заказа" type="text" class="status__add" >
            <button>Добавить</button>
        </form>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    name: 'AdminStatus',
    data() {
        return {
            statusName: '',
            activeItemText: null,
            activeItemId: null
        }
    },
    methods: {
        addNewStatus() {
            if (!this.statusName || this.statusName.length < 2) {
                return;
            } 
            this.addNew(this.statusName);
            this.statusName = '';
        },
        save() {
            this.updateStatus({ id: this.activeItemId, name: this.activeItemText })
            this.activeItemId = null;
            this.activeItemText = null;
        },
        isActiveItem(id) {
            return this.activeItemId === id
        },
        ...mapActions('statuses', ['addNew', 'removeOneStatus', 'updateStatus'])
    },
    computed: {
        ...mapState('statuses', ['statuses']),
    }
}
</script>
<style lang="less" scoped>
    .status {
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
