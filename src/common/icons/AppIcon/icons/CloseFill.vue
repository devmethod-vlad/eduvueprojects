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
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM4.00043 10C3.6066 9.60618 3.6066 8.96766 4.00043 8.57384L5.57426 6.99991L4.00045 5.42616C3.60662 5.03234 3.60662 4.39382 4.00045 4C4.39427 3.60618 5.03278 3.60618 5.4266 4L7.00042 5.57376L8.57428 3.99996C8.9681 3.60613 9.60661 3.60613 10.0004 3.99996C10.3943 4.39378 10.3943 5.03229 10.0004 5.42612L8.42658 6.99991L10.0004 8.57384C10.3943 8.96766 10.3943 9.60618 10.0004 10C9.60662 10.3938 8.96811 10.3938 8.57429 10L7.00042 8.42607L5.42659 10C5.03276 10.3938 4.39425 10.3938 4.00043 10Z"
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
const onMouseEnter = () => {
  if (props.hoverColor !== '') {
    color.value = props.hoverColor;
  }
}

</script>

<style scoped>

</style>