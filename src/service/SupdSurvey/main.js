import { createApp } from 'vue';
import SupdSurvey from "@/service/SupdSurvey/SupdSurvey.vue";
import { createPinia } from 'pinia';
import { surveyPlugin } from 'survey-vue3-ui'

const app = createApp(SupdSurvey);
const pinia = createPinia()
app.use(pinia);
app.use(surveyPlugin);
app.mount('#app-container');