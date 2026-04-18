<template>
  <span
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="props.width"
        :height="props.height"
        :viewBox="'0 0 ' + props.width.toString()+' '+props.height.toString()"
        fill="none"
    >
      <rect
          :width="props.width"
          :height="props.height"
          rx="2"
          :fill="props.fillColor"
      />
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 8H10V16H22V8ZM10 6C8.89543 6 8 6.89543 8 8V16C8 17.1046 8.89543 18 10 18H22C23.1046 18 24 17.1046 24 16V8C24 6.89543 23.1046 6 22 6H10Z"
          :fill="props.strokeColor"
      />
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.5 9L10 8L15.9992 11.7713L22 8L23.5 9L15.9992 14L8.5 9Z"
          :fill="props.strokeColor"
      />
</svg>
  </span>
</template>

<script setup>

// PROPS
const props = defineProps({
  width:
      {
        type: Number,
        default: 32
      },
  height:
      {
        type: Number,
        default: 24
      },
  strokeColor:
      {
        type: String,
        default: '#333333'
      },

  fillColor:
      {
        type: String,
        default: '#D9D9D9'
      },
});

</script>

<style scoped>

</style>