import { createApp } from 'vue';
import AppSurveyRender from "@/projects/SurveyRender/AppSurveyRender.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import { surveyPlugin } from 'survey-vue3-ui'

const app = createApp(AppSurveyRender);
const pinia = createPinia();
app.use(pinia);
app.use(surveyPlugin);
app.mount('#app-container')