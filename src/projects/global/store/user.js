import { defineStore } from 'pinia';
import {userObject} from "@/projects/global/objects/userobject";

export const useUserStore = defineStore('user', {
    state: () => {
        return userObject;
    }
})