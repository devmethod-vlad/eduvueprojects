<template>
    <svg
        @mouseenter="onMouseEnter()"
        @mouseleave="color = props.color"
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        :viewBox="'0 0 '+(Math.round(Number(props.size)*1.06)).toString()+' '+(Math.round(Number(props.size)*1.06)).toString()"
        fill="none"
    >
      <path
          d="M34.5807 16.1788C34.1333 15.8684 33.5139 15.9724 33.1973 16.411L21.2998 31.5089L13.7046 23.8387C13.3228 23.4531 12.6945 23.444 12.3012 23.8182C11.9079 24.1925 11.8986 24.8085 12.2804 25.1941L20.7077 33.7047C21.1403 34.1416 21.8713 34.086 22.23 33.589L34.8176 17.5351C35.1342 17.0964 35.0282 16.4892 34.5807 16.1788Z"
          :fill="color"
      />
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24 46C11.8497 46 2 36.1503 2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46ZM24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
          :fill="color"
      />
    </svg>
</template>

<script setup>

// PROPS
import {ref} from "vue";

const props = defineProps({
  size:
      {
        type: Number,
        default: 48
      },
  color:
      {
        type: String,
        default: '#333333'
      },

  hoverColor:
      {
        type: String,
        default: ''
      },
});

// DATA
const color = ref(props.color);

// METHODS
const onMouseEnter = ()=>{
  if (props.hoverColor !==''){
    color.value = props.hoverColor;
  }
}

</script>

<style scoped>

</style>