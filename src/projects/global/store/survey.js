import { defineStore } from 'pinia';
import {survey} from "@/projects/global/objects/survey";

export const useSurveyStore = defineStore('survey', {
    state: () => {
        return {...survey};
    }
})