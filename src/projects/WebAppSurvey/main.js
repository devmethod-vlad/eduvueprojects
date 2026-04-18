import { createApp } from 'vue';
import WebAppSurvey from "@/projects/WebAppSurvey/WebAppSurvey.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import { surveyPlugin } from 'survey-vue3-ui'

const app = createApp(WebAppSurvey);
const pinia = createPinia();
app.use(pinia);
app.use(surveyPlugin);
app.mount('#app-container')