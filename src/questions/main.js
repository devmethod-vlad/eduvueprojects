import { createApp } from 'vue';
import MainQuestionsApp from "@/questions/mainapp/MainQuestionsApp.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import FloatingVue from 'floating-vue';
import VueAwesomePaginate from "vue-awesome-paginate";
import VueQRCodeComponent from 'vue-qrcode-component';
import VueEasyLightbox from 'vue-easy-lightbox';
import VueApexCharts from "vue3-apexcharts";

const app = createApp(MainQuestionsApp);
const pinia = createPinia();
app.use(pinia);
app.use(FloatingVue, {
    themes: {
        'qst-arrow-tooltip': {
            $extend: 'dropdown',
            triggers: ['hover', 'focus'],
            popperTriggers: ['hover', 'focus'],
        },

        'qst-standart-tooltip':{
            $extend: 'tooltip'
        }
    }
});

app.use(VueApexCharts);
app.use(VueAwesomePaginate);
app.use(VueEasyLightbox);
app.component('qr-code', VueQRCodeComponent);
app.mount('#questions-app');




