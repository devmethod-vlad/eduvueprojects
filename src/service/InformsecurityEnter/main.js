import { createApp } from 'vue';
import InformsecurityEnter from "@/service/InformsecurityEnter/InformsecurityEnter.vue";
import { createPinia } from 'pinia';

const app = createApp(InformsecurityEnter);
const pinia = createPinia();
app.use(pinia);
let elem = document.createElement('div')
elem.id = "custom-div";
let targetSection = document.getElementById('content');
targetSection.appendChild(elem);
app.mount("#custom-div");