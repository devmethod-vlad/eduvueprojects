<template>
    <template v-if="props.target === 'newquestion' || props.target === 'feedback'">
				<div class="qst-action-newquestion-buttons-wr">

					<button
									@click.stop.prevent="emitSubmitButton('savenewquestion')"
									type="button"
									class="vue-btn vue-btn-normal qst-save-newquestion-button"
									:disabled="props.disabled || props.loading"
					>
							{{ props.loading ? 'Отправка...' : 'Отправить' }}
					</button>
				</div>
		</template>

  <template v-else-if="props.target === 'fastquestion'">
    <div class="qst-action-newquestion-buttons-wr">

      <button
          @click.stop.prevent="emitSubmitButton('savefastquestion')"
          type="button"
          class="vue-btn vue-btn-normal qst-save-newquestion-button"
          :disabled="props.disabled || props.loading"
      >
        {{ props.loading ? 'Отправка...' : 'Отправить' }}
      </button>
    </div>
  </template>

		<template v-else-if="props.target === 'editquestion'">
				<template v-if="!synchroStore.$state.activeQuestionError">
            <template v-if="actionArray.length !==0">
                <div class="qst-action-editquestion-buttons-wr">
                    <template v-for="action in actionArray" :key="action">
                        <div
                                class="qst-editquestion-button-item-two"
                                :class="{'qst-editquestion-button-item-one':actionArray.length === 1}">
                            <button
                                    @click.stop.prevent="emits('onactionbutton', action)"
                                    type="button"
                                    class="vue-btn vue-btn-normal-wobg"
                                    :class="{'vue-btn-warn-wobg': ['delete', 'to_trash', 'from_work', 'from_work_admin'].includes(action)}"
                            >
                                {{ app_config.QUESTION_ACTIONS[action].show_name }}
                            </button>
                        </div>
                    </template>

                </div>
            </template>
				</template>
		</template>

</template>

<script setup>
import {ref, watch} from "vue";
import {useUserStore} from "@/questions/store/user";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {setButtonActions} from "@/questions/services/setbuttonactions";
import {useSynchroStore} from "@/questions/store/synchronized";
import {app_config} from "@/questions/config/setconfig";
import {useAppStore} from "@/questions/store/app";

// PROPS
const props = defineProps({
    target:
        {
            type: String,
            default: '',
            required: true
        },
    disabled:
        {
            type: Boolean,
            default: false
        },
    loading:
        {
            type: Boolean,
            default: false
        }
})

// EMITS
const emits = defineEmits(['submitbutton','onactionbutton']);

// STORE
const userStore = useUserStore();
const activeQuestion = useActiveQuestionStore();
const appStore = useAppStore();
const synchroStore = useSynchroStore();


// DATA
const actionArray = ref([]);

// METHODS
const emitSubmitButton = (action)=>{
    if (props.disabled || props.loading){
        return;
    }

    emits('submitbutton', action);
};


// WATCH
watch(
    ()=>appStore.questionShowMode,
    () => {
        if(props.target === 'editquestion'){
            actionArray.value = setButtonActions(userStore.$state.userid, userStore.$state.userrole.id, activeQuestion.$state);
        }
    },
    {immediate:true}
);

watch(
    ()=>activeQuestion.status_id,
    (newid) => {
        console.log("watch newid:", newid);
        if(newid !== 0){
            if(props.target === 'editquestion'){
                actionArray.value = setButtonActions(userStore.$state.userid, userStore.$state.userrole.id, activeQuestion.$state);
            }
				}
    },
    {immediate:true}
);

watch(
    ()=>activeQuestion.order_id,
    (newid) => {
      if(newid !== 0){
        if(props.target === 'editquestion'){
          actionArray.value = setButtonActions(userStore.$state.userid, userStore.$state.userrole.id, activeQuestion.$state);
        }
      }
    },
    {immediate:true}
);

</script>

<style scoped>
.qst-editquestion-button-item-two button{
		width: 100%;
}

.qst-editquestion-button-item-one button{
    width: 100%;
}

.qst-editquestion-button-item-two {
		width: 100%;
		margin-bottom: 20px;
}

.qst-editquestion-button-item-one {
    width: 100% !important;
}

.qst-action-editquestion-buttons-wr {
		margin-top: 30px;
		justify-content: space-between;
		display: flex;
		flex-wrap: wrap;
}

.qst-action-newquestion-buttons-wr .qst-save-newquestion-button {
		width: 100%;
}

@media (min-width: 992px) {
    .qst-editquestion-button-item-two {
        width: 47%;
				margin-bottom: 0;
    }
}

</style>
