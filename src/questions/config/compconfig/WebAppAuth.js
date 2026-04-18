import { createApp } from 'vue';
import WebAppAuth from "@/questions/webappcomponents/WebAppAuth/WebAppAuth.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createPinia } from 'pinia';


function createWebAppAuth(){
    const app = createApp(WebAppAuth);
    const pinia = createPinia();
    app.use(pinia);
    app.mount('#webappcomponents-auth-container')
}

export {createWebAppAuth}