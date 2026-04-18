<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      :viewBox="'0 0 '+props.size.toString()+' '+props.size.toString()" fill="none">
    <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        :fill="props.color"
    />
    <path
        d="M11.9997 5.33331C12.7361 5.33331 13.333 5.93027 13.333 6.66665V10.6666H17.333C18.0694 10.6666 18.6663 11.2636 18.6663 12C18.6663 12.7364 18.0694 13.3333 17.333 13.3333H13.333V17.3333C13.333 18.0697 12.7361 18.6666 11.9997 18.6666C11.2633 18.6666 10.6663 18.0697 10.6663 17.3333V13.332L6.66634 13.3333C5.92996 13.3333 5.33301 12.7364 5.33301 12C5.33301 11.2636 5.92996 10.6666 6.66634 10.6666L10.6663 10.6653V6.66665C10.6663 5.93027 11.2633 5.33331 11.9997 5.33331Z"
        fill="white"
    />
  </svg>
</template>

<script setup>

// PROPS
const props = defineProps({
  size:
      {
        type: Number,
        default: 24
      },
  color:
      {
        type: String,
        default: '#269999'
      }
});


</script>

<style scoped>

</style>