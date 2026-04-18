<template>
    <svg
						xmlns="http://www.w3.org/2000/svg"
						:width="props.size"
						:height="props.size"
						viewBox="0 0 24 24"
						fill="none"
		>
        <path
								d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3ZM12 19C8.1 19 5 15.9 5 12C5 8.1 8.1 5 12 5C15.9 5 19 8.1 19 12C19 15.9 15.9 19 12 19ZM16 12C16 12.6 15.6 13 15 13H13V15C13 15.6 12.6 16 12 16C11.4 16 11 15.6 11 15V13H9C8.4 13 8 12.6 8 12C8 11.4 8.4 11 9 11H11V9C11 8.4 11.4 8 12 8C12.6 8 13 8.4 13 9V11H15C15.6 11 16 11.4 16 12Z"
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