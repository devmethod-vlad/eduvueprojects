<template>

  <svg
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      :viewBox="'0 0 '+props.size.toString()+' '+props.size.toString()"
      fill="none"
  >
    <g clip-path="url(#clip0_1002_4769)">
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 7C14 10.866 10.866 14 7 14C3.134 14 0 10.866 0 7C0 3.134 3.134 0 7 0C10.866 0 14 3.134 14 7ZM3.35156 6.75763C3.66951 6.46087 4.16783 6.47805 4.46459 6.79601L5.75556 8.17918L9.5354 4.12934C9.8322 3.81139 10.3305 3.7942 10.6484 4.09096C10.9664 4.38771 10.9836 4.88603 10.6868 5.20399L6.33126 9.8707C6.01993 10.2043 5.49118 10.2043 5.17985 9.8707L3.31318 7.87066C3.01642 7.5527 3.03361 7.05438 3.35156 6.75763Z"
          :fill="color"
      />
    </g>
    <defs>
      <clipPath
          id="clip0_1002_4769"
      >
        <rect
            :width="props.size"
            :height="props.size"
            fill="white"
        />
      </clipPath>
    </defs>
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
const onMouseEnter = () => {
  if (props.hoverColor !== '') {
    color.value = props.hoverColor;
  }
}

</script>

<style scoped>

</style>