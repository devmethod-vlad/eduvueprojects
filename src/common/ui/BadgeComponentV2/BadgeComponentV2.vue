<template>
    <span @click="processOnClick"
          class="vue-badge"
          v-html="props.badgeText"
          :class="{'vue-badge-with-hover': !isActive && props.hoverEnable}"
          :style="backgroundColor + badgeFontSize + badgeFontColor"
    >
    </span>
</template>

<script setup>
import {computed, ref, watch} from "vue";

// EMITS
const emits = defineEmits(['clickonbadge']);


// PROPS
const props = defineProps({

  badgeText:
      {
        type: String,
        default: 'Текст',
        required: true
      },

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

  badgeId:
      {
        type: String,
        default: '',
        required: true
      },

  checkList:
      {
        type: Array,
        default(){
          return []
        },
        required: true
      },

  hoverEnable:
      {
        type: Boolean,
        default: true,
      },

});

// DATA
const isActive = ref(false);

// METHODS
const processOnClick = ()=>{
  emits('clickonbadge');
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
    () => props.checkList,
    () => {
      isActive.value = props.checkList.includes(props.badgeId);
    },
    {
      immediate: true,
      deep: true
    }
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