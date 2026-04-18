import { createApp } from 'vue';
import AiSearch from "@/aisearch/AiSearch.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import FloatingVue from 'floating-vue';
import VueEasyLightbox from 'vue-easy-lightbox';


const app = createApp(AiSearch);
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
        },

        'qst-arrow-tooltip-black':{
            $extend: 'dropdown',
            triggers: ['hover', 'focus'],
            popperTriggers: ['hover', 'focus'],
        }
    }
});
app.use(VueEasyLightbox);

app.mount('#aisearch-app');




