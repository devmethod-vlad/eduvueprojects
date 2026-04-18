<template>
    <modal-content
            modalsize="small"
            @close-modal="emits('closechangepass')"
    >
        <div
                class="qst-profile-change-adminpass-container"
                :class="{'qst-disable-style': loading}"
        >

        </div>
        <form
                @submit.prevent.stop="validateChangeAdminPassForm()"
                class="qst-add-change-adminpass-form"
        >
            <div class="vue-form-item">
                <label
                        for="qst-add-change-adminpass-newpass"
                        class="vue-form-label">
                    Новый пароль:
                </label>
                <input
                        type="password"
                        @focus="onFocus('newpass')"
                        class="vue-form-control"
                        :class="{'vue-input-error': newPassErrorStyle}"
                        id="qst-add-change-adminpass-newpass"
                        name="qst-add-change-adminpass-newpass"
                        v-model="newPassInput"
                />
            </div>
            <div class="vue-form-item">
                <label
                        for="qst-add-change-adminpass-renewpass"
                        class="vue-form-label"
                >
                    Повторить новый пароль:
                </label>
                <input
                        type="password"
                        @focus="onFocus('renewpass')"
                        class="vue-form-control"
                        id="qst-add-change-adminpass-renewpass"
                        name="qst-add-change-adminpass-renewpass"
                        v-model="reNewPassInput"
                        :class="{'vue-input-error': reNewPassErrorStyle}"
                />
            </div>
            <div v-if="infoText !==''" class="vue-form-item">
                <div class="qst-change-adminpass-infopanel">
                    <info-text-panel
                            :text="infoText"
                            :textmode="infoTextMode"
                    />
                </div>
            </div>
            <div class="vue-form-item">
                <button type="submit" class="vue-btn vue-btn-normal">
                    Сменить пароль
                </button>
            </div>
        </form>
    </modal-content>
</template>

<script setup>
import {changeAdminPass} from "@/questions/components/PrivateOffice/components/DropDownMenu/components/ChangeAdminPass/services/changeadminpass";
import ModalContent from "@/common/ui/ModalContent/ModalContent.vue";
import InfoTextPanel from "@/questions/components/InfoTextPanel/InfoTextPanel.vue";
import {useUserStore} from "@/questions/store/user";
import {ref} from "vue";

// EMITS
const emits = defineEmits(['closechangepass']);

// STORE
const userStore = useUserStore();

// DATA
const newPassInput = ref('');
const newPassErrorStyle = ref(false);
const reNewPassInput = ref('');
const reNewPassErrorStyle = ref(false);

const loading = ref(false);

const infoText = ref('');
const infoTextMode = ref('info');

// METHODS
const resetInfoPanel = ()=>{
    infoText.value = '';
    infoTextMode.value = 'info';
}

const resetValidateInfo = ()=>{
    newPassErrorStyle.value = false;
    reNewPassErrorStyle.value = false;
}

const resetInput = ()=>{
    newPassInput.value = '';
    reNewPassInput.value = '';
}

const onFocus =(target)=>{
    resetInfoPanel();
    if (target === 'newpass'){
        newPassErrorStyle.value = false;
    }
    if (target === 'renewpass'){
        reNewPassErrorStyle.value = false;
    }

}

const validateChangeAdminPassForm = ()=>{
    resetInfoPanel();
    resetValidateInfo();

    let validFlag=true;

    if (newPassInput.value === ''){
        validFlag = false;
        newPassErrorStyle.value = true;
    }

    if (reNewPassInput.value === ''){
        validFlag = false;
        reNewPassErrorStyle.value = true;
    }
    if(!validFlag){
        infoText.value='Проверьте заполнение формы. Некоторые поля не заполнены или заполнены неверно';
        infoTextMode.value = 'warning';
		}
    if(newPassInput.value !== '' && reNewPassInput.value !== '' && newPassInput.value !== reNewPassInput.value){
        validFlag = false
        infoTextMode.value = 'warning';
        infoText.value='Введенные пароли не совпадают';
		}
    if (validFlag){
        changeAdminPass();
    }
}

const changeAdmin = async ()=>{
    let changeAnswer = await changeAdminPass(userStore.$state.userid, newPassInput.value);
    if(changeAnswer.status === 'ok'){
        loading.value = false;
        await resetInput();
        infoText.value = "Вы успешно обновили пароль администратора";
        infoTextMode.value = "info";

    }
    else {
        loading.value = false;
        infoText.value = "Произошла ошибка при попытке обновить пароль администратор! Обновите страницу или повторите попытку немного позже!";
        infoTextMode.value = "warning";
    }
}

</script>

<style scoped>

</style>