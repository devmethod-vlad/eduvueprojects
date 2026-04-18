<template>
  <span
      @mouseenter.stop.prevent="isHover=true"
      @mouseleave.stop.prevent="isHover=false"
      @click="processCheckBoxClick()"
      class="em-custom-checkbox"
      :class="{'em-custom-checkbox-disable': props.isDisable}"
  >
    <template v-if="!props.checkList.includes(props.id)">

      <empty-box
          v-if="props.shape === 'square'"
          :size="props.size"
          :empty-fill-color="props.emptyFillColor"
          :empty-stroke-color="props.emptyStrokeColor"
          :is-hover="isHover"
      />
      <empty-box-circle
          v-if="props.shape === 'circle'"
          :size="props.size"
          :empty-fill-color="props.emptyFillColor"
          :empty-stroke-color="props.emptyStrokeColor"
          :is-hover="isHover"
      />
    </template>
    <template v-else>
      <checked-box
          v-if="props.shape === 'square'"
          :size="props.size"
          :checked-fill-color="props.checkedFillColor"
          :check-color="props.checkColor"
      />
      <checked-box-circle
          v-if="props.shape === 'circle'"
          :size="props.size"
          :checked-fill-color="props.checkedFillColor"
          :check-color="props.checkColor"
      />
    </template>
  </span>
</template>

<script setup>
import EmptyBox from "./states/EmptyBox.vue";
import EmptyBoxCircle from "@/common/ui/CustomCheckbox/states/EmptyBoxCircle.vue";
import CheckedBox from "./states/CheckedBox.vue";
import CheckedBoxCircle from "@/common/ui/CustomCheckbox/states/CheckedBoxCircle.vue";
import {ref} from "vue";

// EMITS
const emits = defineEmits(['active', 'inactive']);

// PROPS
const props = defineProps({
  size:
      {
        type: Number,
        default: 16
      },
  id:
      {
        type: String,
        default: ''
      },

  shape:
      {
        type: String,
        default:'square'
      },

  checkList:
      {
        type: Array,
        default(){
          return []
        }
      },

  emptyStrokeColor:
      {
        type: String,
        default: '#999999'
      },

  emptyHoverStrokeColor:
      {
        type: String,
        default: '#757575'
      },

  emptyFillColor:
      {
        type: String,
        default: 'white'
      },

  checkedFillColor:
      {
        type: String,
        default: '#269999'
      },
  checkColor:
      {
        type: String,
        default: 'white'
      },
  isDisable:
      {
        type: Boolean,
        default: false
      },
});

//DATA
const isHover = ref(false);

// METHODS
const processCheckBoxClick = ()=>{
  if(!props.checkList.includes(props.id)){
    emits('active', props.id);
  }
  else{
    emits('inactive', props.id);
  }
}

</script>

<style scoped>
.em-custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.em-custom-checkbox-disable {
  pointer-events: none;
  opacity: 0.4;
}

</style>