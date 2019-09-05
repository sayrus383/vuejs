<template>
    <div class="socials-popup" v-if="isOpen" v-autoclose @click="close">
        <div class="ya-share2" data-services="vkontakte,twitter,facebook,gplus"></div>
    </div>
</template>
<script>
import evenBus from '../helpers/eventBus'

export default {
    name: 'SocialsPopup',
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        close() {
            this.isOpen = false
        }
    },
    mounted() {
        evenBus.$on('openSocials', () => this.isOpen = true)
    }
}
</script>
<style lang="less" scoped>
.socials-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(31, 31, 31, 0.51);
    z-index: 1000;
}
</style>

