import { createApp } from 'vue';
import DispatchesApp from "@/dispatches/DispatchesApp.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import FloatingVue from 'floating-vue';
import VueAwesomePaginate from "vue-awesome-paginate";
import VueEasyLightbox from 'vue-easy-lightbox';

const app = createApp(DispatchesApp);
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

app.use(VueAwesomePaginate);
app.use(VueEasyLightbox);
app.mount('#dispatches-app');




