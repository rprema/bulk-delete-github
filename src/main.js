import Vue from "vue";
import App from "@/App.vue";
import VueRouter from "vue-router";
import AppLogin from "@/components/AppLogin.vue";
import AppDashboard from "@/components/AppDashboard.vue";
import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "login", component: AppLogin },
    {
      path: "/app",
      name: "dashboard",
      component: AppDashboard
    }
  ]
});
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
