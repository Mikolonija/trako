import { createApp } from "vue";
import { createPinia } from "pinia";
import { i18n } from "@/I18n";
import Notifications from "@kyvg/vue3-notification";
import VueDatePicker from "@vuepic/vue-datepicker";
import router from "@/router";
import App from "@/views/App.vue";
import "@/styles/reset.scss";
import "@/styles/fonts.scss";
import "@/styles/layout.scss";
import "@/styles/loader.scss";
import "@/styles/buttons.scss";
import "@/styles/habitStatus.scss";
import "@vuepic/vue-datepicker/dist/main.css";

const pinia = createPinia();
const app = createApp(App);

app.component("VueDatePicker", VueDatePicker);
app.use(pinia);
app.use(router);
app.use(i18n);
app.use(Notifications);
app.mount("#app");
