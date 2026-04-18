<template>
    <svg
						xmlns="http://www.w3.org/2000/svg"
						:width="props.size"
						:height="props.size"
						viewBox="0 0 25 24"
						fill="none"
		>
        <g clip-path="url(#clip0_1093_5736)">
            <path
										d="M12.2393 0.500234C18.4593 0.470234 23.7393 5.57023 23.7493 11.9102C23.7593 18.2402 18.4993 23.3802 12.2693 23.3802M12.2393 0.500234C6.1593 0.530234 0.799297 5.46023 0.789297 11.5002C0.779297 17.8902 5.8193 23.3802 12.2693 23.3802M12.2393 0.500234C15.4093 0.470234 18.0393 5.58023 18.0393 11.9102C18.0493 18.2502 15.4293 23.3802 12.3393 23.3802C9.1393 23.3802 6.5193 17.8802 6.6393 11.5002C6.7493 5.45023 9.2193 0.530234 12.2393 0.500234ZM12.2693 23.3802L12.3093 0.490234M2.2293 6.25023H22.2093M0.779297 11.9202H23.7493M2.3193 17.6202H22.1993"
										stroke="black"
										stroke-miterlimit="10"
						/>
        </g>
        <defs>
            <clipPath id="clip0_1093_5736">
                <rect
												width="23.96"
												height="23.88"
												fill="white"
												transform="translate(0.289062)"
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