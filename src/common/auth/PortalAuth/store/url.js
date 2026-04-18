import { defineStore } from 'pinia'
import {portalAuthUrlObject} from "../objects/urlparams";

export const useUrlStore = defineStore('portalauthurl', {
    state: () => {
        return {
            ...portalAuthUrlObject
        }
    }
})