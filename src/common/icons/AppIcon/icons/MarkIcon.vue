<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 15 14"
      fill="none"
  >
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.1973 1.06949C13.5139 0.630843 14.1333 0.526868 14.5807 0.837255C15.0282 1.14764 15.1342 1.75485 14.8176 2.1935L6.22999 13.2475C5.87126 13.7445 5.14029 13.8 4.7077 13.3632L0.280353 8.85253C-0.101439 8.46696 -0.0921128 7.85098 0.301183 7.4767C0.694479 7.10241 1.32281 7.11155 1.7046 7.49712L5.29977 11.1673L13.1973 1.06949Z"
        :fill="props.color"
    />
  </svg>
</template>

<script setup>

// PROPS
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
      }
});

</script>

<style scoped>

</style>