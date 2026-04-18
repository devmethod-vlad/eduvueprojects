import { defineStore } from 'pinia'
import {user_object} from "@/objects/user";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            ...user_object
        }
    }
})