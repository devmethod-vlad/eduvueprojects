<template>
			<template v-for="action in action_arr" :key="action">
					<div @click.prevent.stop="execAction(action, props.question.order_id)" class="card-actions-item-wr">
              <VTooltip theme="qst-standart-tooltip">
							<span>
							<template v-if="action === 'to_trash'">
									<app-icon
													name="to-trash"
													:size="35"
									/>
							</template>

              <template v-if="action === 'from_trash'">
                  <app-icon
													name="from-trash"
													:size="35"
									/>
              </template>

              <template v-if="action === 'delete'">
                  <app-icon
                          name="to-trash"
                          :size="35"
                  />
              </template>

              <template v-if="action === 'in_work'">
                  <app-icon
													name="in-work"
													:size="35"
									/>
              </template>

              <template v-if="action === 'from_work' || action === 'from_work_admin'">
                  <app-icon
													name="from-work"
													:size="35"
									/>
              </template>

              <template v-if="action === 'to_archive'">
                  <app-icon
													name="to-archive"
													:size="35"

									/>
              </template>

              <template v-if="action === 'public'">
                  <app-icon
													name="public"
													:size="35"
									/>
              </template>

              <template v-if="action === 'from_public'">
                  <app-icon
													name="from-public"
													:size="35"
									/>
              </template>

              <template v-if="action === 'back_in_work'">
                  <app-icon
													name="back-in-work"
													:size="35"
									/>
              </template>


							</span>
                  <template #popper>
                      {{ app_config.QUESTION_ACTIONS[action].show_name }}
                  </template>
							</VTooltip>
					</div>
			</template>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {app_config} from "@/questions/config/setconfig";
import {setQuestionActions} from "@/questions/services/setcardactions";
import {question_object} from "@/questions/objects/question";
import {useUserStore} from "@/questions/store/user";
import {ref, watch} from "vue";

// EMIT
const emit = defineEmits(['execaction'])

// PROPS
const props = defineProps({
    question:
        {
            type: Object,
            default(){
                return {...question_object};
            }
        }
});

// STORE
const userStore = useUserStore();

// DATA
const action_arr = ref([]);

//METHODS
const execAction = (action, order_id)=>{
    emit('execaction', action, order_id);
}

// WATCH
watch(
    () => props.question.status_id,
    () => {
        action_arr.value = setQuestionActions(userStore.$state.userid, userStore.$state.userrole.id, props.question);
    },
    {immediate: true}
);

watch(
    () => props.question.space_id,
    () => {
      action_arr.value = setQuestionActions(userStore.$state.userid, userStore.$state.userrole.id, props.question);
    },
    {immediate: true}
);

watch(
    () => props.question.public_id,
    () => {
        action_arr.value = setQuestionActions(userStore.$state.userid, userStore.$state.userrole.id, props.question);
    }
);
</script>

<style scoped>
@import "@/questions/components/QuestionCard/components/QuestionCardActions/css/questioncardactions.css";
</style>