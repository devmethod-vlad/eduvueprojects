import { createApp } from 'vue';
import AppSurveyRedactor from "@/projects/SurveyRedactor/AppSurveyRedactor.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css';

const app = createApp(AppSurveyRedactor);
const pinia = createPinia();
app.use(pinia);
app.use(
    VueTippy,
    {
        directive: 'tippy',
        component: 'tippy',
        componentSingleton: 'tippy-singleton',
        defaultProps: {
            placement: 'auto-end',
            allowHTML: true,
        },
    }
    );
app.mount('#app-container')