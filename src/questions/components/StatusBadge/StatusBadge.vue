<template>
    <span @click="props.forstatuspanel ? statusClick() : null"
          class="vue-badge"
          :class="[statusBadgeClass, statusTypeClass, statusActiveClass]"
          :style="statusBadgeStyle"
    >
        {{ statusBadgeText }}
    </span>
</template>

<script setup>
import {useQuestionsStore} from "@/questions/store/questions";
import {ref, watch} from "vue";
import {setStatusBadgeInfo} from "@/questions/components/StatusBadge/services/setstatusbadgeinfo";
import {app_config} from "@/questions/config/setconfig";

// PROPS
const props = defineProps({
    statusid:
      {
          type: Number,
          default: 0,
          required: true
      },

    forstatuspanel:
      {
          type: Boolean,
          default: false
      },

    badgeHeight:
      {
          type: Number,
          default: 0
      },

    fontSize:
      {
          type: Number,
          default:0
      }

});

// STORE
const questions = useQuestionsStore();

//DATA
const statusBadgeText = ref('');
const statusBadgeClass = ref('');
const statusTypeClass = ref('');
const statusActiveClass = ref('');

// METHODS
const statusClick = ()=>{
    let copyQuestionsStore = questions.$state;
    if(Number(props.statusid) === Number(app_config.QUESTION_STATUS.feedback.id)){
      if (Number(copyQuestionsStore.isFeedback) === 1){
        copyQuestionsStore.statusId = 0;
        copyQuestionsStore.spaceId = 0;
        copyQuestionsStore.isFeedback = 0;
      }
      else {
        copyQuestionsStore.statusId = Number(props.statusid);
        copyQuestionsStore.spaceId = 0;
        copyQuestionsStore.isFeedback = 1;
        copyQuestionsStore.onlyPublic = 0;
      }

    }
    else if (Number(props.statusid) === Number(app_config.QUESTION_STATUS.public.id)){
      if (Number(copyQuestionsStore.onlyPublic) === 1){
        copyQuestionsStore.onlyPublic = 0;
        copyQuestionsStore.statusId = 0;
      }
      else {
        copyQuestionsStore.onlyPublic = 1;
        copyQuestionsStore.isFeedback = 0;
        copyQuestionsStore.statusId = props.statusid;
      }
    }
    else {
      copyQuestionsStore.onlyPublic = 0;
      copyQuestionsStore.isFeedback = 0;

      if(Number(copyQuestionsStore.statusId) === Number(props.statusid)){
        copyQuestionsStore.statusId = 0;
      }
      else {
        copyQuestionsStore.statusId = props.statusid;
      }
    }

    copyQuestionsStore.activePage = 1;
    copyQuestionsStore.countPerPage = 5;
    copyQuestionsStore.sorting = 'desc';
    copyQuestionsStore.searchInput = '';
    copyQuestionsStore.updateFlag = !questions.$state.updateFlag;
    questions.$patch(copyQuestionsStore);
}


// WATCH
watch(
  () => props.statusid,
  (newStatusId) => {
      let badgeInfo = setStatusBadgeInfo(newStatusId);

      statusBadgeText.value = badgeInfo.badgeText;
      if (props.forstatuspanel){
          if (statusBadgeText.value === app_config.QUESTION_STATUS.feedback.show_name){
            statusTypeClass.value = 'vue-badge-status vue-badge-status-feedback';
          }
          else if (statusBadgeText.value === app_config.QUESTION_STATUS.public.show_name){
            statusTypeClass.value = 'vue-badge-status vue-badge-status-public';
          }
          else {
            statusTypeClass.value = 'vue-badge-status';
          }

      }
      else {
          statusTypeClass.value = 'vue-badge-card';
          statusBadgeClass.value = badgeInfo.badgeClass;
      }
  },
  {immediate: true}
);

watch(
  () => questions.statusId,
  (newStatusId) => {
      if (props.forstatuspanel){
          if(Number(newStatusId) === Number(props.statusid)){
              statusActiveClass.value = 'vue-badge-status-active';
          }
          else{
              statusActiveClass.value = '';
          }
      }
  },
  {immediate: true}
);

watch(
    () => questions.isFeedback,
    (newVal) => {
      if (props.forstatuspanel){
        if(Number(newVal) === 1){
          if(Number(props.statusid)===Number(app_config.QUESTION_STATUS.feedback.id)){
            statusActiveClass.value = 'vue-badge-status-active';
          }
        }
        else{
          if(Number(props.statusid)===Number(app_config.QUESTION_STATUS.feedback.id)){
            statusActiveClass.value = '';
          }
        }
      }
    },
    {immediate: true}
);

// watch(
//     () => questions.onlyPublic,
//     (newVal) => {
//       console.log("watch questions.onlyPublic");
//       if (props.forstatuspanel){
//         if(Number(newVal) === 1){
//           console.log("watch questions.onlyPublic = 1");
//           if(Number(props.statusid)===Number(app_config.QUESTION_STATUS.public.id)){
//             console.log("watch Number(props.statusid)===Number(app_config.QUESTION_STATUS.public.id)");
//             statusActiveClass.value = 'vue-badge-status-active';
//           }
//         }
//         else{
//           console.log("watch questions.onlyPublic = 0");
//           if(Number(props.statusid)===Number(app_config.QUESTION_STATUS.public.id)){
//             statusActiveClass.value = '';
//           }
//         }
//       }
//     },
//     {immediate: true}
// );

// COMPUTED
const statusBadgeStyle = () =>{
    let styleString = '';
    if(Number(props.badgeHeight) !== 0){
        styleString = styleString +'height: '+props.badgeHeight.toString()+'px;';
    }
    if (Number(props.fontSize) !== 0){
        styleString = styleString + 'font-size: '+props.fontSize.toString()+'px;'
    }
    return styleString;
}

</script>

<style scoped>
.vue-badge-status-active {
    background-color: #2699997a !important;
}

.vue-badge {
    cursor: pointer;
    display: flex;
    align-items: center;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 50rem !important;
    font-size: 16px;
}

.vue-badge-card {
    font-size: 14px;
    color: #000000;
    font-weight: 400;
    padding: 0.35em 0.65em;
}

.vue-badge-status {
    font-size: 15px;
    color: #000000;
    font-weight: 400;
    padding: 0.35em 0.65em;
    background-color: #2699991A;
}

.vue-badge-status-feedback {
  background-color: #28a3ca33;
}

.vue-badge-status-public {
  background-color: #ebf5d9;
}

.vue-badge-blue {
    background-color: #C9EAF7 !important;
}

.vue-badge-orange {
    background-color: #FFE7BD !important;
}

.vue-badge-green {
    background-color: #DFF0C0 !important;
}

.vue-badge-raspberry {
    background-color: #FCD6CE !important;
}

.vue-badge-maincolor {
    background-color: #2699991A !important;
}

.vue-badge-gray {
    background-color: #D9D9D9 !important;
}

@media (min-width: 992px) {
    font-size: 16px;
}
</style>