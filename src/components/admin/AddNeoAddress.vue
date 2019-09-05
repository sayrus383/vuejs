<template>
    <div class="neo-address">
        <h2>Адреса точек Neoin</h2>
        <div class="neo-address__list">
            <div v-for="(neoAddress, index) in neoAddresses"
                :key="neoAddress.id"
                class="neo-address__item">
                <span>{{ index + 1 }}</span>

                <input v-if="isActiveItem(neoAddress.id)" v-model="activeItemText" type="text">
                <p v-else @click.stop="activeItemId = neoAddress.id; activeItemText = neoAddress.address">{{ neoAddress.address }}</p>
                <button v-if="isActiveItem(neoAddress.id)" @click="save">Сохранить</button>
                <button v-if="isActiveItem(neoAddress.id)" @click="activeItemId = null; activeItemText = null">Отмена</button>
                <button v-else @click="removeNeoAddress(neoAddress)" :disabled="isButtonDisabled">Удалить</button>
            </div>
        </div>
        <form class="neo-address__controls" @submit.prevent="addNewAddress">
            <input v-model="address" required @keyup.enter="addNewAddress" placeholder="Новый адрес" type="text" class="neo-address__add" >
            <button :disabled="isButtonDisabled">Добавить</button>
        </form>
    </div>
</template>
<script>
import api from '../../api'

export default {
    name: 'NeoAddress',
    data() {
        return {
            address: '',
            neoAddresses: [],
            isButtonDisabled: false,
            activeItemText: null,
            activeItemId: null
        }
    },
    methods: {
        async addNewAddress() {
            this.isButtonDisabled = true;
            try {
                if (!this.address || this.address.length < 2) {
                    return;
                } 
                const { data } = await api.createNeoAddress({ address: this.address });
                this.neoAddresses.push(data.neoAddress);
            } catch (error) {
                console.error(error);
            } finally {
                this.address = '';
                this.isButtonDisabled = false;
            }
        },
        async removeNeoAddress({id}) {
            this.isButtonDisabled = true;
            try {
                await api.deleteNeoAddressByID(id);
                this.neoAddresses = this.neoAddresses.filter(item => item.id !== id);
            } catch (error) {
                console.error(error);
            } finally {
                this.isButtonDisabled = false;
            }

        },
        async save() {
            this.isButtonDisabled = true;
            try {
                const { data } = await api.updateNeoAdress({ id: this.activeItemId, address: this.activeItemText });
                this.neoAddresses = [...this.neoAddresses.filter(i => i.id !== this.activeItemId), data.neoAddress].sort((a, b) => a.id - b.id);
            } catch (error) {
                console.error(error);
            } finally {
                this.activeItemId = null;
                this.activeItemText = null;
                this.isButtonDisabled = false;
            }
        },
        isActiveItem(id) {
            return this.activeItemId === id
        },
    },
    async beforeMount() {
        try {
            const { data } = await api.getNeoAddresses();
            this.neoAddresses = data.neoAddresses;
        } catch (error) {
            console.error(error);
        }
    }
}
</script>
<style lang="less" scoped>
    .neo-address {
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
                width: 400px;
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
