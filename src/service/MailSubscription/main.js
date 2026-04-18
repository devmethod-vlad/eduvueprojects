import { createApp } from 'vue';
import NotifyComp from "@/service/NotifyComp/NotifyComp.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const app = createApp(NotifyComp);
app.mount('#send-service-message')