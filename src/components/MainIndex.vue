<template>
    <div>
        <header-top></header-top>
        <main>
            <transition name="slide-fade">
                <router-view default="/home" :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
import HeaderTop from './HeaderTop'
import FooterBottom from './FooterBottom'
export default {
    components: {
        HeaderTop,
        FooterBottom
    },
}
</script>

