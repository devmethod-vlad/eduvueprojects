import { defineStore } from 'pinia'
import {app_object} from "@/questions/objects/app";

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            ...app_object
        }
    }
})