<template>
    <svg
						xmlns="http://www.w3.org/2000/svg"
						:width="props.size"
						:height="props.size"
						viewBox="0 0 18 16"
						fill="none"
		>
        <path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M10.7482 1.14724L17.3492 13.029C17.8856 13.9946 17.5377 15.2122 16.5722 15.7486C16.275 15.9137 15.9408 16.0003 15.6009 16.0003H2.39893C1.29436 16.0003 0.398926 15.1048 0.398926 14.0003C0.398926 13.6604 0.485547 13.3261 0.650611 13.029L7.25158 1.14724C7.78801 0.181675 9.00562 -0.166212 9.97118 0.370214C10.2977 0.551592 10.5668 0.820762 10.7482 1.14724Z"
								:fill="props.color"
				/>
        <path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9 12C9.55226 12 10 12.4475 10 12.9995C10 13.5514 9.55226 14 9 14C8.44774 14 8 13.5514 8 12.9995C8 12.4475 8.44774 12 9 12ZM9 4C9.55006 4 10 4.44987 10 4.99984V10.0002C10 10.5501 9.55006 11 9 11C8.44994 11 8 10.5501 8 10.0002V4.99984C8 4.44987 8.44994 4 9 4Z"
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
            default: 48
        },
    color:
        {
            type: String,
            default: '#F05C46'
        }
});

</script>

<style scoped>

</style>