import { createApp } from 'vue';
import AttachToBot from "@/service/AttachToBot/AttachToBot.vue";
import { createPinia } from 'pinia';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const app = createApp(AttachToBot);
const pinia = createPinia()
app.use(pinia);
app.component(VueQrcode.name, VueQrcode);
app.mount('#edu-telauth-modal-container')