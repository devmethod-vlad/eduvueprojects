<template>
    <svg
						xmlns="http://www.w3.org/2000/svg"
						:width="props.size"
						:height="props.size"
						viewBox="0 0 25 24"
						fill="none"
		>
        <g clip-path="url(#clip0_1093_5753)">
            <path
										d="M23.6902 11.9002C23.6802 5.57023 18.4102 0.470234 12.1902 0.500234C6.11023 0.530234 0.760234 5.45023 0.750234 11.4902C0.750234 17.8702 5.78023 23.3602 12.2202 23.3602C18.4402 23.3602 23.7002 18.2302 23.6902 11.9002ZM23.6902 11.9002H0.740234M12.2102 23.3602L12.2502 0.490234M2.19023 6.25023H22.1502M2.28023 17.6102H22.1402M6.59023 11.4902C6.47023 17.8702 9.09023 23.3602 12.2802 23.3602C15.3702 23.3602 17.9802 18.2302 17.9802 11.9002C17.9802 5.57023 15.3602 0.470234 12.1802 0.500234C9.16023 0.530234 6.70023 5.45023 6.58023 11.4902H6.59023Z"
										stroke="black"
										stroke-miterlimit="10"
						/>
            <path
										d="M16.21 23.3692C20.33 23.3692 23.67 20.0293 23.67 15.9092C23.67 11.7892 20.33 8.44922 16.21 8.44922C12.09 8.44922 8.75 11.7892 8.75 15.9092C8.75 20.0293 12.09 23.3692 16.21 23.3692Z"
										fill="white"
										stroke="black"
										stroke-miterlimit="10"
						/>
            <path
										d="M13.75 13.3809L19.14 18.7609"
										stroke="#010101"
										stroke-miterlimit="10"
						/>
            <path
										d="M19.1195 13.3105L13.6895 18.7405"
										stroke="#010101"
										stroke-miterlimit="10"
						/>
        </g>
        <defs>
            <clipPath id="clip0_1093_5753">
                <rect
												width="23.94"
												height="23.87"
												fill="white"
												transform="translate(0.25)"
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