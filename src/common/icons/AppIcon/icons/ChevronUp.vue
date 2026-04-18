<template>
    <svg
						xmlns="http://www.w3.org/2000/svg"
						:width="props.size"
						:height="props.size"
						viewBox="0 0 14 8"
						:fill="props.color"
		>
        <path
								d="M1.62473 7.78083C1.19347 8.12584 0.564178 8.05592 0.219168 7.62466C-0.125842 7.1934 -0.0559202 6.5641 0.375342 6.21909L6.37534 0.219094C6.74056 -0.073081 7.25951 -0.073081 7.62473 0.219094L13.6247 6.21909C14.056 6.5641 14.1259 7.1934 13.7809 7.62466C13.4359 8.05592 12.8066 8.12584 12.3753 7.78083L7.00004 2.28059L1.62473 7.78083Z"
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