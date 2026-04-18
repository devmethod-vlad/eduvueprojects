<template>
    <div
						class="qst-detail-filegallery-item"
						:class="{'filegallery-item-border': appStore.$state.questionShowMode === 'modal'}"
		>
        <div class="filegallery-item-header">
            <div class="filegallery-item-header-badge">
                <file-badge
                        :filename="props.attachment.path"
                />
            </div>

            <div class="filegallery-item-header-name">
                <VTooltip theme="qst-standart-tooltip">
								<span>
										{{ fileName }}
								</span>
                    <template #popper>
                        {{ props.attachment.path }}
                    </template>
                </VTooltip>
            </div>

            <div @click.prevent.stop="(compPermissions.approve_attachment && !synchroStore.$state.activeQuestionError) ? openDeleteSubmitModal() : null" class="filegallery-item-header-icon">
                <template v-if="compPermissions.approve_attachment && !synchroStore.$state.activeQuestionError">
                    <VTooltip theme="qst-standart-tooltip">

                        <app-icon
                                name="close"
                                :size="15"
                        />
                        <template #popper>
                            Удалить вложение
                        </template>
										</VTooltip>
								</template>

            </div>
        </div>
        <div
								@click.stop.prevent="isImage ? ligthboxVisible = true : null"
								class="filegallery-item-body"
								:style="styleBackgroundImage">
        </div>

				<div class="filegallery-item-bottom">
						<template v-if="!synchroStore.$state.activeQuestionError">
                <a :href="fileSrc"
                   download
                   class="filegallery-item-bottom-download"
                >
                    <div class="fg-item-bottom-download-icon">
                        <app-icon
                                name="download"
                                :size="15"
                        />
                    </div>
                    <div class="fg-item-bottom-download-text">
                        Скачать
                    </div>
                </a>
						</template>
            <div  v-if="(role ==='admin' || role === 'redactor') && !synchroStore.$state.activeQuestionError && compPermissions.approve_attachment" class="filegallery-item-bottom-public">
                <div  class="fg-item-bottom-public-toggle">
                    <label class="switch">
                        <input
																@change="onChangePublicSwitch()"
																type="checkbox"
																v-model="publicSwitch"
												>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="fg-item-bottom-public-text">
										<template v-if="publicSwitch">
												Скрыть
										</template>
										<template v-else>
												Опубликовать
										</template>
                </div>
            </div>
				</div>
				<template v-if="isImage">
            <vue-easy-lightbox
                    :visible="ligthboxVisible"
                    :imgs="fileSrc"
                    :index="fileIndex"
                    @hide="()=>{ligthboxVisible=false}"
            ></vue-easy-lightbox>
				</template>
				<template v-if="deleteSubmitText !==''">
            <submit-modal-panel
										:text="deleteSubmitText"
										action="deleteattachment"
										@closesubmitaction="()=>{deleteSubmitText = ''}"
										@submitaction="(action, flag)=>{submitDelete(action, flag)}"
						/>
				</template>

    </div>
</template>

<script setup>
import {formQuestionsList} from "@/questions/services/formquestionslist";
import {deleteAttach} from "@/questions/components/QuestionDetail/components/FileGallery/components/FileGalleryItem/services/deleteattachment";
import SubmitModalPanel from "@/questions/components/SubmitModalPanel/SubmitModalPanel.vue";
import {changeFilePublicity} from "@/questions/components/QuestionDetail/components/FileGallery/components/FileGalleryItem/services/changefilepublic";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import FileBadge from "@/questions/components/QuestionDetail/components/FileBadge/FileBadge.vue";
import {computed, onMounted, ref} from "vue";
import {useAppStore} from "@/questions/store/app";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {useQuestionsStore} from "@/questions/store/questions";
import {useErrorsStore} from "@/questions/store/errors";
import {app_config} from "@/questions/config/setconfig";
import {useUserStore} from "@/questions/store/user";
import {setCompPermissions} from "@/questions/components/QuestionDetail/services/setcomppermissions";
import {getRoleInfo} from "@/questions/services/getrole";
import {useSynchroStore} from "@/questions/store/synchronized";

// PROPS
const props = defineProps({
    attachment:
        {
            type: Object,
            default(){
                return {};
            },
            required: true
        },
    target:
        {
            type: String,
            default: ''
        }
});

// STORE
const appStore = useAppStore();
const activeQuestion = useActiveQuestionStore();
const userStore = useUserStore();
const questionsListStore = useQuestionsStore();
const errorStore = useErrorsStore();
const synchroStore = useSynchroStore();


// DATA
const ligthboxVisible = ref(false);
const fileIndex = ref(0);
const publicSwitch = ref(false);
const deleteSubmitText = ref('');

// METHODS
const openDeleteSubmitModal = ()=>{
    deleteSubmitText.value = 'Вы точно хотите удалить вложение: '+props.attachment.path + '?';
}

const submitDelete = (action, flag)=>{
    // console.log("submitDelete");
    // console.log("submitDelete flag: ", flag);
    if (flag === 'cancel'){
        deleteSubmitText.value = '';
		}
    else {
        deleteAttachment();
		}
}

const deleteAttachment = async () =>{
    // await console.log("deleteAttachment");
    let delAnswer = await deleteAttach(props.target, props.attachment.attachid, activeQuestion.$state.order_id, userStore.$state.userid);
    // console.log("delAnswer: ", delAnswer);
    if (delAnswer.status === 'ok'){
        let orderid = activeQuestion.$state.order_id;
        await formQuestionsList(questionsListParams.value);
		}
    deleteSubmitText.value = '';
}

const onChangePublicSwitch = async ()=>{
    let publicFlag;
    publicSwitch.value ? publicFlag = 1: publicFlag = 0;
    let changePublAnswer = await changeFilePublicity(props.attachment.attachid, publicFlag);
    // await console.log(" changePublAnswer :",  changePublAnswer);
    if (changePublAnswer.status !=='ok'){
        publicSwitch.value = !publicSwitch.value;
		}
}


// COMPUTED
const questionsListParams = computed(()=>{
    return {
        listStore: questionsListStore,
        userStore: userStore,
        activeQuestionStore: activeQuestion,
        errorStore: errorStore,
				appStore: appStore
    }
});

const fileName = computed(()=>{
    if(props.attachment.path.length > 9){
        return props.attachment.path.slice(0,9)+'...';
		}
    else {
        return props.attachment.path;
		}
});

const fileExt = computed(()=>{
    return props.attachment.path.split(".").pop();
});

const fileSrc = computed(()=>{
    let apiUrl = app_config.apiUrl + app_config.attachmentsUrl;
    let questionId = activeQuestion.$state.order_id.toString();

    if (props.target === 'question'){
        let orderUserId = activeQuestion.$state.order_userid.toString();
        return apiUrl + '/orders/'+ orderUserId+'/'+questionId+'/'+props.attachment.path;
    }
    else {
        let answerUserId = activeQuestion.$state.answer_userid.toString();
        return apiUrl + '/answers/'+ answerUserId+'/'+questionId+'/'+props.attachment.path;

    }
})

const isImage = computed(()=>{
    return app_config.IMAGE_EXT_ARR.includes(fileExt.value.trim().toLowerCase());
});

const styleBackgroundImage = computed(()=>{
    if(app_config.IMAGE_EXT_ARR.includes(fileExt.value.trim().toLowerCase())){
        let apiUrl = app_config.apiUrl + app_config.attachmentsUrl;
        let questionId = activeQuestion.$state.order_id.toString();
        let imgPath;

        if (props.target === 'question'){
            let orderUserId = activeQuestion.$state.order_userid.toString();
            imgPath = apiUrl + '/orders/'+ orderUserId+'/'+questionId+'/'+props.attachment.path;
				}
        else {
            let answerUserId = activeQuestion.$state.answer_userid.toString();
            imgPath = apiUrl + '/answers/'+ answerUserId+'/'+questionId+'/'+props.attachment.path;

				}

        return 'background-image: url('+imgPath+');';
		}
    else {
        return '';
		}
});

const compPermissions = computed(()=>{
    if(props.target !=='newquestion'){
        return setCompPermissions('filegallery', activeQuestion.$state, props.target, userStore.$state);
    }
    else {
        return {}
    }
});

const role = computed(()=>{
    let roleInfo = getRoleInfo(userStore.$state.userrole.id);
    if (roleInfo !== null){
        return roleInfo[0];
    }
    else {
        return null;
    }
});

onMounted(()=>{
    if(Number(props.attachment.public === 1)){
        publicSwitch.value = true;
		}
})


</script>

<style scoped>
@import "@/questions/components/QuestionDetail/components/FileGallery/components/FileGalleryItem/css/filegalleryitem.css";
</style>