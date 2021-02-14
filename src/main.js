import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { routes } from "./router/routes.js";
import { store } from "./store.js";

Vue.use(VueRouter);
//Vue.prototype.hostname = "http://thegimmickbox.000webhostapp.com";
// Vue.prototype.hostname = "http://cv.waytosuccess.com.np";
Vue.prototype.hostname = "";
//Vue.prototype.hostname = "http://prijal:8000";

const router = new VueRouter({
  routes
});

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
