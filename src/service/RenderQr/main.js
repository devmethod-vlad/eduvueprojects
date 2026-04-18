import { createApp } from 'vue';
import RenderQr from "@/service/RenderQr/RenderQr.vue";
import { createPinia } from 'pinia';
import VueQRCodeComponent from 'vue-qrcode-component';

const app = createApp(RenderQr);
app.component('qr-code', VueQRCodeComponent);
const pinia = createPinia()
app.use(pinia);
app.mount('#edu-render-qr-container')