import Vue from "vue"
import App from "./App.vue"
import VCA from "@vue/composition-api"
Vue.config.productionTip = false
Vue.use(VCA)
new Vue({
  render: (h) => h(App),
}).$mount("#app")
