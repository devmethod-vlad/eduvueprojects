<template>
    <span @click="processOnClick"
          class="vue-badge"
          v-html="props.badgeText"
          :class="{'vue-badge-with-hover': !isActive && props.hoverActive}"
          :style="backgroundColor + badgeFontSize + badgeFontColor"
    >
    </span>
</template>

<script setup>
import {computed, ref, watch} from "vue";

// EMITS
const emits = defineEmits(['badgeactive', 'badgeinactive', 'clickonbadge']);


// PROPS
const props = defineProps({

  fontSize:
      {
        type: Number,
        default: 16
      },

  fontColor:
      {
        type: String,
        default: '#333333'
      },

  fontColorActive:
      {
        type: String,
        default: '#333333'
      },

  badgeText:
      {
        type: String,
        default: 'Текст',
        required: true
      },

  badgeColor:
      {
        type: String,
        default: '#2699991A'
      },

  activeBadgeColor:
      {
        type: String,
        default: '#FFE766'
      },

  groupId:
      {
        type: String,
        default: '',
      },

  activeIdInGroup:

      {
        type: String,
        default: '',
      },

  defaultGroupId:
      {
        type: String,
        default: '',
      },

  showMode:
      {
        type: Boolean,
        default: false,
      },

  hoverActive:
      {
        type: Boolean,
        default: true,
      },

});

// DATA
const isActive = ref(false);

// METHODS
const processOnClick = () =>{
  if(!props.showMode){
    if(isActive.value){
      if(props.defaultGroupId !==''){
        if (props.defaultGroupId !== props.groupId){
          emits('badgeinactive', props.groupId);
          isActive.value = false;
        }
      }
      else{
        emits('badgeinactive', props.groupId);
        isActive.value = false;
      }
    }
    else {
      emits('badgeactive', props.groupId);
      isActive.value = true;
    }
  }
  else {
    emits('clickonbadge');
  }
}

// COMPUTED
const backgroundColor = computed(()=>{

  if (isActive.value){
    return 'background-color: ' + props.activeBadgeColor + ';';
  }
  else {
    return 'background-color: ' + props.badgeColor + ';';
  }

});

const badgeFontSize = computed(()=>{

  return ' font-size: ' + props.fontSize.toString() + 'px;'

});

const badgeFontColor = computed(()=>{

  if (isActive.value){
    return ' color: ' + props.fontColor + ';';
  }
  else {
    return ' color: ' + props.fontColorActive + ';';
  }

});

// WATCH
watch(
    () => props.activeIdInGroup,
    (newVal, oldValue) => {
      if(!props.showMode) {
        if(newVal !== props.groupId){
          if(oldValue !== undefined) {
            isActive.value = false;
            emits('badgeinactive', props.groupId);
          }

        }
        else{
          isActive.value = true;
          emits('badgeactive', props.groupId);
        }
      }
    },
    {immediate: true}
);

</script>

<style scoped>

.vue-badge-with-hover:hover {
  background-color: rgba(38, 153, 153, 0.33) !important;
}

.vue-badge {
  cursor: pointer;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  padding-right: 12px;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 50rem !important;
}

@media (min-width: 992px) {
  font-size: 16px;
}
</style>