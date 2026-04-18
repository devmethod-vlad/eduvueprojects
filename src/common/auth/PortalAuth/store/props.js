import { defineStore } from 'pinia'
import {portalProps} from "@/common/auth/PortalAuth/objects/props";


export const usePropsStore = defineStore('portalauthprops', {
    state: () => {
        return {
            ...portalProps
        }
    }
})