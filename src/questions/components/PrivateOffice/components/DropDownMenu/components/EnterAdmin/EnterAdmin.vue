<template>
    <modal-content
            modalsize="small"
            @close-modal="emits('closenteradmin')"
    >
        <div
                class="qst-profile-enter-admin-container"
                :class="{'qst-disable-style': loading}"
        >

        </div>
        <form
                @submit.prevent.stop="validateEnterAdminForm()"
                class="qst-profile-enter-admin-form"
        >
            <div class="vue-form-item">
                <label
                        for="qst-profile-enter-admin-login"
                        class="vue-form-label"
								>
                    Логин администратора:
                </label>
                <input
                        type="text"
                        @focus="onFocus('login')"
                        class="vue-form-control"
                        :class="{'vue-input-error': loginErrorStyle}"
                        id="qst-profile-enter-admin-login"
                        name="qst-profile-enter-admin-login"
                        v-model="loginInput"
                />
            </div>
            <div class="vue-form-item">
                <label
                        for="qst-profile-enter-admin-pass"
                        class="vue-form-label"
                >
                    Пароль администратора:
                </label>
                <input
                        type="password"
                        @focus="onFocus('pass')"
                        class="vue-form-control"
                        id="qst-profile-enter-admin-pass"
                        name="qst-profile-enter-admin-pass"
                        v-model="passInput"
                        :class="{'vue-input-error': passErrorStyle}"
                />
            </div>
            <div v-if="infoText !==''" class="vue-form-item">
                <div class="qst-profile-enter-admin-infopanel">
                    <info-text-panel
                            :text="infoText"
                            :textmode="infoTextMode"
                    />
                </div>
            </div>
            <div class="vue-form-item">
                <button type="submit" class="vue-btn vue-btn-normal">
                    Авторизоваться
                </button>
            </div>
        </form>
    </modal-content>
</template>

<script setup>
import {app_config} from "@/questions/config/setconfig";
import {enterAdminRole} from "@/questions/components/PrivateOffice/components/DropDownMenu/components/EnterAdmin/services/enteradmin";
import ModalContent from "@/common/ui/ModalContent/ModalContent.vue";
import InfoTextPanel from "@/questions/components/InfoTextPanel/InfoTextPanel.vue";
import {useUserStore} from "@/questions/store/user";
import {ref} from "vue";

// EMITS
const emits = defineEmits(['closenteradmin']);

// STORE
const userStore = useUserStore();

// DATA
const loginInput = ref('');
const loginErrorStyle = ref(false);
const passInput = ref('');
const passErrorStyle = ref(false);

const loading = ref(false);

const infoText = ref('');
const infoTextMode = ref('info');

// METHODS
const resetInfoPanel = ()=>{
    infoText.value = '';
    infoTextMode.value = 'info';
}

const resetValidateInfo = ()=>{
    loginErrorStyle.value = false;
    passErrorStyle.value = false;
}

const resetInput = ()=>{
    loginInput.value = '';
    passInput.value = '';
}

const onFocus =(target)=>{
    resetInfoPanel();
    if (target === 'login'){
        loginErrorStyle.value = false;
    }
    if (target === 'pass'){
        passErrorStyle.value = false;
    }

}

const validateEnterAdminForm = ()=>{
    resetInfoPanel();
    resetValidateInfo();

    let validFlag=true;

    if (loginInput.value === ''){
        validFlag = false;
        loginErrorStyle.value = true;
    }

    if (passInput.value === ''){
        validFlag = false;
        passErrorStyle.value = true;
    }
    if(!validFlag){
        infoText.value='Проверьте заполнение формы. Некоторые поля не заполнены или заполнены неверно';
        infoTextMode.value = 'warning';
    }

    if (validFlag){
        enterAdmin();
    }
}

const enterAdmin = async ()=>{
    loading.value = true;
    let changeAnswer = await enterAdminRole(loginInput.value, passInput.value, userStore.$state.userid);
    if(changeAnswer.status === 'ok'){
        loading.value = false;

        let storageKey = app_config.localStorage.userInfo.key;

        //'userToken'
        let storageTokenProp = app_config.localStorage.userInfo.props.token;

        let localInfo = {}

        localInfo[storageTokenProp] = await changeAnswer['info']['token']

        await localStorage.setItem(storageKey, JSON.stringify(localInfo));

         console.log("enter admin reload");
        await location.reload();

    }
    else {
        loading.value = false;

        if(changeAnswer.status === 'not_found'){
            infoText.value = "Логин администратора не найден в базе";
            infoTextMode.value = "warning";
				}
        else if(changeAnswer.status === 'not_match'){
            infoText.value = "Введенные логин/пароль не найдены в базе данных";
            infoTextMode.value = "warning";
        }
        else {
            infoText.value = "При попытке авторизоваться возникла проблема. Повторите попытку позже";
            infoTextMode.value = "warning";
				}

    }
}

</script>
