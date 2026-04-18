import { createApp } from 'vue';
import AppMainStatsTable from "@/projects/MainStatsTable/AppMainStatsTable.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import VueTippy from 'vue-tippy';
import VueAwesomePaginate from "vue-awesome-paginate";
import 'tippy.js/dist/tippy.css';
import VueTheMask from 'vue-the-mask'

const app = createApp(AppMainStatsTable);
const pinia = createPinia();
app.use(pinia);
app.use(VueAwesomePaginate);
app.use(VueTheMask);
app.use(
    VueTippy,
    // optional
    {
        directive: 'tippy', // => v-tippy
        component: 'tippy', // => <tippy/>
        componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
        defaultProps: {
            placement: 'auto-end',
            allowHTML: true,
        }, // => Global default options * see all props
    }
);
app.mount('#app-container')
