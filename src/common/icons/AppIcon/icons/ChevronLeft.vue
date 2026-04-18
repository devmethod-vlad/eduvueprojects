<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="props.size"
       :height="props.size"
       viewBox="0 0 16 16" fill="none"
  >
    <mask
        id="mask0_201_4818"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="5"
        y="3"
        width="6"
        height="10"
    >
      <path
          d="M10.7808 4.62473C11.1258 4.19347 11.0559 3.56418 10.6247 3.21917C10.1934 2.87416 9.5641 2.94408 9.21909 3.37534L5.21909 7.37534C4.92692 7.74056 4.92692 8.25951 5.21909 8.62473L9.21909 12.6247C9.5641 13.056 10.1934 13.1259 10.6247 12.7809C11.0559 12.4359 11.1258 11.8066 10.7808 11.3753L7.28059 8.00004L10.7808 4.62473Z"
          fill="white"
      />
    </mask>
    <g mask="url(#mask0_201_4818)">
      <path
          d="M11.3753 10.7808C11.8065 11.1258 12.4358 11.0559 12.7808 10.6247C13.1258 10.1934 13.0559 9.5641 12.6247 9.21909L8.62466 5.21909C8.25944 4.92692 7.74049 4.92692 7.37527 5.21909L3.37527 9.21909C2.94401 9.5641 2.87408 10.1934 3.21909 10.6247C3.5641 11.0559 4.1934 11.1258 4.62466 10.7808L7.99996 7.28059L11.3753 10.7808Z"
          :fill="props.color"
      />
      <path
          d="M27 27L27 -11L-11 -11L-11 27L27 27Z"
          :fill="props.color"
      />
    </g>
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