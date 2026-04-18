<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      :viewBox="'0 0 '+props.size.toString() + ' ' + props.size.toString()"
      fill="none"
  >
    <rect
        :width="props.size"
        :height="props.size"
        :fill="props.checkedFillColor"
    />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.45234 7.51489C4.03712 7.07 3.33986 7.04596 2.89497 7.46118C2.45009 7.87641 2.42604 8.57367 2.84127 9.01855L5.45314 11.817C5.88875 12.2837 6.6286 12.2837 7.06421 11.817L13.1586 5.28731C13.5738 4.84243 13.5498 4.14517 13.1049 3.72994C12.66 3.31472 11.9627 3.33876 11.5475 3.78365L6.25868 9.45024L4.45234 7.51489Z"
        :fill="props.checkColor"
    />
  </svg>
</template>

<script setup>
// PROPS
const props = defineProps({
  size:
      {
        type: Number,
        default: 16
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
      }
});
</script>

<style scoped>

</style>