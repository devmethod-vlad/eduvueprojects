import { createApp } from 'vue';
import SupdForm from "@/supdform/SupdForm.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import FloatingVue from 'floating-vue';
import { createPinia } from 'pinia';

const app = createApp(SupdForm);
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
app.mount('#supdform-container')