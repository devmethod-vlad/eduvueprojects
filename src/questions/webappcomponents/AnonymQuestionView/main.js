import { createApp } from 'vue';
import AnonymQuestionView from "@/questions/webappcomponents/AnonymQuestionView/AnonymQuestionView.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import VueEasyLightbox from 'vue-easy-lightbox';

const app = createApp(AnonymQuestionView);
const pinia = createPinia();
app.use(pinia);
app.use(VueEasyLightbox);
app.mount('#anonym-question-view-app')
