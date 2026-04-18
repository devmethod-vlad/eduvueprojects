import { defineStore } from 'pinia';
import {question_object} from "@/questions/objects/question";

export const useActiveQuestionStore = defineStore('activequestion', {
    state: () => {
        return {
            ...question_object

        }

    }
})