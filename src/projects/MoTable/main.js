import { createApp } from 'vue';
import AppMoList from "@/projects/MoTable/AppMoList.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';
import VueTippy from 'vue-tippy';
import VueAwesomePaginate from "vue-awesome-paginate";
import 'tippy.js/dist/tippy.css';

const app = createApp(AppMoList);
const pinia = createPinia();
app.use(pinia);
app.use(VueAwesomePaginate);
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

