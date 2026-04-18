<template>
    <svg
						xmlns="http://www.w3.org/2000/svg"
						:width="props.size"
						:height="props.size"
						viewBox="0 0 22 24"
						fill="none">
        <g clip-path="url(#clip0_1093_5770)">
            <path
										d="M2.42969 3.43945H19.9097V21.5995C19.9097 22.6095 19.0897 23.4395 18.0697 23.4395H4.26969C3.25969 23.4395 2.42969 22.6195 2.42969 21.5995V3.43945Z"
										stroke="#010101"
										stroke-miterlimit="10"
						/>
            <path
										d="M8.29898 0.5H13.929C14.539 0.5 15.029 0.99 15.029 1.6V3.41H7.20898V1.6C7.20898 0.99 7.69898 0.5 8.30898 0.5H8.29898Z"
										stroke="#010101"
										stroke-miterlimit="10"
						/>
            <path
										d="M1.57977 3.08984H20.6898C20.8698 3.08984 21.0098 3.22984 21.0098 3.40984V3.48984H1.25977V3.40984C1.25977 3.22984 1.39977 3.08984 1.57977 3.08984Z"
										stroke="#010101"
										stroke-miterlimit="10"
						/>
            <path
										d="M11.2695 8.89062V18.4006"
										stroke="black"
										stroke-miterlimit="10"
						/>
            <path
										d="M11.6005 8.17969L7.73047 11.7597"
										stroke="black"
										stroke-miterlimit="10"
						/>
            <path
										d="M10.9512 8.19922L14.8612 11.7792"
										stroke="black"
										stroke-miterlimit="10"
						/>
        </g>
        <defs>
            <clipPath id="clip0_1093_5770">
                <rect width="20.76"
											height="23.94"
											fill="white"
											transform="translate(0.759766)"
								/>
            </clipPath>
        </defs>
    </svg>
</template>

<script setup>
// PROPS
const props = defineProps({
    size:
        {
            type: Number,
            default: 48
        }
});
</script>

<style scoped>

</style>