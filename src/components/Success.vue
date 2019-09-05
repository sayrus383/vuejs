<template>
    <div class="success">
        <div class="success__inner">
            <h2 :class="['success__title', { 'warn': orderStatus == 'failed'}]">
                {{ statusMessage }}
            </h2>
            <p :class="['success__description', { 'warn': orderStatus == 'failed'}]">
                Оптала заказа {{ statusMessage }}.
            </p>
            <router-link to="/">Главная</router-link>
            <router-link to="/cabinet/orders">Заказы</router-link>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import api from "../api";

export default {
    name: 'Success',
    data () {
        return {
            orderStatus: null,
            statusMessage: '',
            messagesList: {
                completed: 'Успешно!',
                failed: 'Не успешно!',
                pending: 'В процессе'
            }
        }
    },
    methods: {
        setStatus(status) {
            this.orderStatus = status;
            this.statusMessage = this.messagesList[status];
        }
    },
    beforeRouteEnter(to, from, next) {
        try {
        let status = to.query.status

        next(vm => {
            vm.setStatus(status)
        })
            
        } catch (error) {
            next(vm => {
                vm.setStatus('failed')
            })
        }
    }
}
</script>
<style lang="less" scoped>
.success {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;

    &__inner {
        flex: 1;
        text-align: center;

        p {
            margin-bottom: 30px;
        }

        a {
            color: var(--main-color);
            display: block;
        }
    }

}

.warn {
    color: red;
}
</style>
