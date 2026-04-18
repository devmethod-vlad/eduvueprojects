import { defineStore } from 'pinia'

export const useAppStore = defineStore('updateapp', {
    state: () => {
        return {
            accessToForm: false ,
            submitform_list: [],
            submitError: false,
            submitErrorText: 'Убедитесь, что вы добавили хотя бы по одному контакту в поля email и телефон, поля заполнены правильно, и отмечены основные контакты',
            prepareLoading: false,
            loading: false,
            showResult: false
        }
    }
})