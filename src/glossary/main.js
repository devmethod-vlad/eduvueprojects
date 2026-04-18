import 'core-js/stable';
import 'regenerator-runtime/runtime';
import GlossaryApp from "@/glossary/GlossaryApp.vue";
import { createApp } from 'vue';
import { createPinia } from 'pinia';

const app = createApp(GlossaryApp);
const pinia = createPinia();
app.use(pinia);

app.mount('#edu-glossary-app')