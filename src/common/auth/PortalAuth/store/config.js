import { defineStore } from 'pinia'
import {portalConfigObject} from "@/objects/portalauthappconfig";


export const useConfigStore = defineStore('portalauthconfig', {
    state: () => {
        return {
            ...portalConfigObject
        }
    }
})