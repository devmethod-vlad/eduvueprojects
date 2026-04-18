import { defineStore } from 'pinia'
import {submitInfoInitial} from "@/common/auth/PortalAuth/objects/submitinfo";


export const usePortalAuthAppStore = defineStore('portalauthapp', {
    state: () => {
        return {

            resetToLoginForm: false,

            //Флаг, определяющий факт успешной авторизации
            //используемый для возврата из компонента данных пользователя
            //и GET- параметров
            setUserInfo: false,

            //Флаг, определяющий факт отсутствия авторизации у пользователя
            //по изменению, отдается сигнал из компонента авторизации
            unSuccessLogin: false,

            //Текст ошибки, не блокирующий интерфейс взаимодействия с пользователем
            warningText: '',

            //Текст ошибки, блокирующей интерфейс
            errorText: '',
            loading: false,
            loadingText: '',
            loginFormVisible: false,
            errorFormVisible: false,
            submitInfo: {...submitInfoInitial},
            localSubmitPanelVisible: false,
            tabsSubmitPanelVisible: false,
            standaloneFormSubmitPanelVisible: false
        }
    }
})