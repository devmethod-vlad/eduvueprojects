import { defineStore } from 'pinia';
import {fmState} from "@/projects/global/objects/fmstate";

export const useFmStore = defineStore('fm', {
    state: () => {
        return fmState;
    }
})