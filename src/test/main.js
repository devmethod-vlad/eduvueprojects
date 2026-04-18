import { createApp } from 'vue';
import TestCors from "@/test/TestCors.vue";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const app = createApp(TestCors);
app.mount('#edu-app')