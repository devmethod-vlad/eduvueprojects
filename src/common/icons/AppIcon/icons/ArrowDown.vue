<template>
    <svg
						xmlns="http://www.w3.org/2000/svg"
						:width="props.size"
						:height="props.size"
						viewBox="0 0 14 17"
						fill="none"
		>
        <path
								d="M6.37527 16.7809L0.375269 10.7809C-0.0559925 10.4359 -0.125914 9.80657 0.219096 9.3753C0.564106 8.94404 1.1934 8.87412 1.62466 9.21913L6 13.697L6 0.999999C6 0.447715 6.44772 -6.60242e-07 7 -6.11959e-07C7.55229 -5.63677e-07 8 0.447715 8 0.999999L8 13.697L12.3753 9.21913C12.8065 8.87412 13.4358 8.94404 13.7808 9.37531C14.1258 9.80657 14.0559 10.4359 13.6247 10.7809L7.62466 16.7809C7.25944 17.073 6.74049 17.073 6.37527 16.7809Z"
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