<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      :viewBox="'0 0 '+props.size.toString()+' '+props.size.toString()"
      fill="none"
  >
    <rect
        x="0.5" y="0.5"
        :width="(Math.round(Number(props.size)*0.94)).toString()"
        :height="(Math.round(Number(props.size)*0.94)).toString()"
        rx="7.5"
        :fill="props.emptyFillColor"
        :stroke="realStrokeColor"
    />
  </svg>

</template>

<script setup>

// DATA
import {ref, watch} from "vue";

const realStrokeColor = ref('');

// PROPS
const props = defineProps({
  size:
      {
        type: Number,
        default: 16
      },
  emptyStrokeColor:
      {
        type: String,
        default: '#999999'
      },
  emptyFillColor:
      {
        type: String,
        default: 'white'
      },

  emptyHoverStrokeColor:
      {
        type: String,
        default: '#757575'
      },

  isHover:
      {
        type: Boolean,
        default: false
      }

});

// WATCH
watch(
    () => props.isHover,
    (hover) => {
      if(hover){
        realStrokeColor.value = props.emptyHoverStrokeColor;
      }
      else {
        realStrokeColor.value = props.emptyStrokeColor;
      }
    },
    {immediate: true}
);


</script>

<style scoped>

</style>