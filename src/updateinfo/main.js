import { createApp } from 'vue';
import UpdateInfo from "@/updateinfo/UpdateInfo.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import FloatingVue from 'floating-vue';


const app = createApp(UpdateInfo);
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


app.mount('#update-info-app');




