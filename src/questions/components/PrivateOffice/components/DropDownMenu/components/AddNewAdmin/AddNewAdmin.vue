<template>
		<modal-content
						modalsize="small"
						@close-modal="emits('closeaddadmin')"
		>
        <div
								class="qst-profile-addadmin-container"
								:class="{'qst-disable-style': loading}"
				>

				</div>
				<form
								@submit.prevent.stop="validateNewAdminForm()"
								class="qst-add-newadmin-form"
				>
            <div class="vue-form-item">
                <label
												for="qst-add-newadmin-edulogin"
												class="vue-form-label">
										Логин на портале edu *:
								</label>
                <input
												type="text"
												@focus="onFocus('edulogin')"
												class="vue-form-control"
												:class="{'vue-input-error': eduLoginErrorStyle}"
												id="qst-add-newadmin-edulogin"
												name="qst-add-newadmin-edulogin"
												v-model="eduLoginInput"
								/>
            </div>
            <div class="vue-form-item">
                <label
												for="qst-add-newadmin-adminlogin"
												class="vue-form-label"
								>
										Логин администратора *:
								</label>
                <input
												type="text"
												@focus="onFocus('adminlogin')"
												class="vue-form-control"
												id="qst-add-newadmin-adminlogin"
												name="qst-add-newadmin-adminlogin"
												v-model="adminLoginInput"
                        :class="{'vue-input-error': adminLoginErrorStyle}"
								/>
            </div>
            <div class="vue-form-item">
                <label
                        for="qst-add-newadmin-adminpass"
                        class="vue-form-label"
                >
                    Пароль администратора *:
                </label>
                <input
                        type="password"
                        @focus="onFocus('adminpass')"
                        class="vue-form-control"
                        id="qst-add-newadmin-adminpass"
                        name="qst-add-newadmin-adminpass"
                        v-model="adminPassInput"
                        :class="{'vue-input-error': adminPassErrorStyle}"
                />
            </div>
            <div v-if="infoText !==''" class="vue-form-item">
                <div class="qst-add-newadmin-infopanel">
										<info-text-panel
														:text="infoText"
														:textmode="infoTextMode"
										/>
                </div>
            </div>
            <div class="vue-form-item">
                <button type="submit" class="vue-btn vue-btn-normal">
										Сохранить
								</button>
            </div>
        </form>
		</modal-content>
</template>

<script setup>
import {addAdmin} from "@/questions/components/PrivateOffice/components/DropDownMenu/components/AddNewAdmin/services/addadmin";
import InfoTextPanel from "@/questions/components/InfoTextPanel/InfoTextPanel.vue";
import ModalContent from "@/common/ui/ModalContent/ModalContent.vue";
import {ref} from "vue";

// EMITS
const emits = defineEmits(['closeaddadmin']);


// DATA
const eduLoginInput = ref('');
const eduLoginErrorStyle = ref(false);
const adminLoginInput = ref('');
const adminLoginErrorStyle = ref(false);
const adminPassInput = ref('');
const adminPassErrorStyle = ref(false);

const loading = ref(false);

const infoText = ref('');
const infoTextMode = ref('info');

// METHODS

const resetInfoPanel = ()=>{
    infoText.value = '';
    infoTextMode.value = 'info';
}

const resetValidateInfo = ()=>{
    eduLoginErrorStyle.value = false;
    adminLoginErrorStyle.value = false;
    adminPassErrorStyle.value = false;
}

const resetInput = ()=>{
    eduLoginInput.value = '';
    adminLoginInput.value = '';
    adminPassInput.value = '';
}

const onFocus =(target)=>{
    resetInfoPanel();
    if (target === 'edulogin'){
        eduLoginErrorStyle.value = false;
		}
    if (target === 'adminlogin'){
        adminLoginErrorStyle.value = false;
    }
    if (target === 'adminpass'){
				adminPassErrorStyle.value = false;
    }

}

const validateNewAdminForm = ()=>{
    resetInfoPanel();
    resetValidateInfo();

    let validFlag=true;

    if (eduLoginInput.value === ''){
        validFlag = false;
        eduLoginErrorStyle.value = true;
    }

    if (adminLoginInput.value === ''){
        validFlag = false;
        adminLoginErrorStyle.value = true;
    }
    if (adminPassInput.value === ''){
        validFlag = false;
        adminPassErrorStyle.value = true;
    }
    if (!validFlag){
        infoText.value='Проверьте заполнение формы. Некоторые поля не заполнены или заполнены неверно';
				infoTextMode.value = 'warning';
    }
    else {
        createNewAdmin();
		}
}

const createNewAdmin = async ()=>{
    loading.value = true;
    let createAnswer = await addAdmin(eduLoginInput.value, adminLoginInput.value, adminPassInput.value);

    // await console.log("addadmin createAnswer: ", createAnswer);
    if(createAnswer.status === 'ok'){
        loading.value = false;
        await resetInput();
        infoText.value = "Вы успешно добавили нового администратора";
        infoTextMode.value = "info";
		}
    else {
        loading.value = false;
        infoTextMode.value = "warning";
        if(createAnswer.info){
            infoText.value = createAnswer.info;
				}
        else {
            infoText.value="Произошла ошибка при попытке создания нового администратор! Обновите страницу или повторите попытку немного позже!"
				}
		}
}

</script>

<style scoped>

</style>