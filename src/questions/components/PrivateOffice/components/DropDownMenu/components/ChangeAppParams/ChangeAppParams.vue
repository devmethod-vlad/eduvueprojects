<template>
    <modal-content
            modalsize="small"
            @close-modal="emits('closeappconfig')"
    >
        <div
                class="qst-profile-appconfig-container"
                :class="{'qst-disable-style': loading}"
        >

        </div>
        <form
                @submit.prevent.stop="validateNewAdminForm()"
                class="qst-appconfig-form"
        >
            <div class="vue-form-item">
                <label
                        for="qst-appconfig-token-lifetime"
                        class="vue-form-label">
                    Время жизни токена (мин):
                </label>
                <input
                        type="number"
                        @focus="onFocus('tokenlifetime')"
                        class="vue-form-control"
                        :class="{'vue-input-error': tokenLifeTimeErrorStyle}"
                        id="qst-appconfig-token-lifetime"
                        name="qst-appconfig-token-lifetime"
                        v-model="tokenLifeTimeInput"
                />
            </div>
            <div class="vue-form-item">
                <label
                        for="qst-appconfig-botname"
                        class="vue-form-label"
                >
                    Имя телеграмм-бота:
                </label>
                <input
                        type="text"
                        @focus="onFocus('botname')"
                        class="vue-form-control"
                        id="qst-appconfig-botname"
                        name="qst-appconfig-botname"
                        v-model="botNameInput"
                        :class="{'vue-input-error': botNameErrorStyle}"
                />
            </div>
            <div class="vue-form-item">
                <label
                        for="qst-appconfig-upload-size"
                        class="vue-form-label"
                >
                    Максимальный объем загружаемого файла (Мб):
                </label>
                <input
                        type="number"
												min="0"
												max="10"
                        @focus="onFocus('uploadsize')"
                        class="vue-form-control"
                        id="qst-appconfig-upload-size"
                        name="qst-appconfig-upload-size"
                        v-model="uploadSizeInput"
                        :class="{'vue-input-error': uploadSizeErrorStyle}"
                />
            </div>
            <div v-if="infoText !==''" class="vue-form-item">
                <div class="qst-appconfig-infopanel">
                    <info-text-panel
                            :text="infoText"
                            :textmode="infoTextMode"
                    />
                </div>
            </div>
            <div class="vue-form-item">
                <button type="submit" class="vue-btn vue-btn-normal">
                    Сохранить изменения
                </button>
            </div>
        </form>
    </modal-content>
</template>

<script setup>
import {saveAppConfig} from "@/questions/components/PrivateOffice/components/DropDownMenu/components/ChangeAppParams/services/saveapparams";
import InfoTextPanel from "@/questions/components/InfoTextPanel/InfoTextPanel.vue";
import ModalContent from "@/common/ui/ModalContent/ModalContent.vue";
import {ref} from "vue";

// EMITS
const emits = defineEmits(['closeappconfig']);


// DATA
const tokenLifeTimeInput = ref('');
const tokenLifeTimeErrorStyle = ref(false);
const botNameInput = ref('');
const botNameErrorStyle = ref(false);
const uploadSizeInput = ref('');
const uploadSizeErrorStyle = ref(false);

const loading = ref(false);

const infoText = ref('');
const infoTextMode = ref('info');

// METHODS

const resetInfoPanel = ()=>{
    infoText.value = '';
    infoTextMode.value = 'info';
}

const resetValidateInfo = ()=>{
    tokenLifeTimeErrorStyle.value = false;
    botNameErrorStyle.value = false;
    uploadSizeErrorStyle.value = false;
}

const resetInput = ()=>{
    tokenLifeTimeInput.value = '';
    botNameInput.value = '';
    uploadSizeInput.value = '';
}

const onFocus =(target)=>{
    resetInfoPanel();
    if (target === 'tokenlifetime'){
        tokenLifeTimeErrorStyle.value = false;
    }
    if (target === 'botname'){
        botNameErrorStyle.value = false;
    }
    if (target === 'uploadsize'){
        uploadSizeErrorStyle.value = false;
    }

}

const validateNewAdminForm = ()=>{
    resetInfoPanel();
    resetValidateInfo();

    let validFlag=true;

    if (tokenLifeTimeInput.value <= 0){
        validFlag = false;
        tokenLifeTimeErrorStyle.value = true;
    }

    if (botNameInput.value === ''){
        validFlag = false;
        botNameErrorStyle.value = true;
    }
    if (uploadSizeInput.value <= 0){
        validFlag = false;
        uploadSizeInput.value = true;
    }
    if (!validFlag){
        infoText.value='Проверьте заполнение формы. Некоторые поля не заполнены или заполнены неверно';
        infoTextMode.value = 'warning';
    }
    else {
        saveAppParams();
    }
}

const saveAppParams = async ()=>{
    loading.value=true;
    let saveAnswer = await saveAppConfig(tokenLifeTimeInput.value, botNameInput.value, uploadSizeInput.value);
    if(saveAnswer.status === 'ok'){
        loading.value = false;
        await resetInput();
        infoText.value = "Вы успешно обновили параметры приложения";
        infoTextMode.value = "info";
    }
    else{
        loading.value = false;
        infoText.value = "Произошла ошибка при попытке обновить параметры приложения! Обновите страницу или повторите попытку немного позже!";
        infoTextMode.value = "warning";
    }
}

</script>
