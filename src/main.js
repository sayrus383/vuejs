import Vue from 'vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import { сurrencyFilter, prettyPrice }  from './filters/index'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
import acl from './acl'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import App from './App.vue'
import { Autoclose } from './directives'
import YandexShare from '@cookieseater/vue-yandex-share';

Vue.component('yandex-share', YandexShare);

Vue.filter('CF', сurrencyFilter);
Vue.filter('prettyPrice', prettyPrice);
// Outside click close
Vue.directive('autoclose', Autoclose); 

Vue.component('VueSlider', VueSlider)
Vue.use(VueResource)
Vue.use(Notifications)
Vue.use(VueCookies)

VueCookies.config('30d')

Vue.config.productionTip = false && process.env.NODE_ENV === 'production'

Vue.directive('click-outside', {
    bind () {
        this.event = event => this.vm.$emit(this.expression, event)
        this.el.addEventListener('click', this.stopProp)
        document.body.addEventListener('click', this.event)
    },   
    unbind() {
        this.el.removeEventListener('click', this.stopProp)
        document.body.removeEventListener('click', this.event)
    },

    stopProp(event) { event.stopPropagation() }
})

// setInterval(_ => {
//     navigator.onLine ? store.dispatch('init') : console.log('no connection')
// }, 1000 * 120)

// window.addEventListener('error', function(e){ console.log('Ты гавно', e) })

window.vm0 = new Vue({
  router,
  store,
  acl,
  render: h => h(App),
}).$mount('#app')
