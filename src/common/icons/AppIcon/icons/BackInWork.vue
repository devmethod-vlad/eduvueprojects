<template>
    <svg
						xmlns="http://www.w3.org/2000/svg"
						:width="props.size"
						:height="props.size"
						viewBox="0 0 24 24"
						fill="none"
		>
        <g clip-path="url(#clip0_1093_5759)">
            <path
										d="M0.679688 13.9506C0.689687 14.0306 0.709688 14.1206 0.729688 14.2006C1.97969 20.4006 8.00969 24.4106 14.2097 23.1606C20.4097 21.9106 24.4197 15.8806 23.1697 9.6806C21.9197 3.4806 15.8797 -0.5194 9.68969 0.7306C6.76969 1.3206 4.33969 2.9706 2.70969 5.2006C2.55969 5.4006 2.42969 5.6006 2.28969 5.8106"
										stroke="black"
										stroke-miterlimit="10"
						/>
            <path
										d="M1.54883 6.4893L6.76883 5.7793"
										stroke="black"
										stroke-miterlimit="10"
						/>
            <path
										d="M2.09945 6.85969L0.939453 1.67969"
										stroke="black"
										stroke-miterlimit="10"
						/>
        </g>
        <defs>
            <clipPath id="clip0_1093_5759">
                <rect
												width="23.7"
												height="23.89"
												fill="white"
												transform="translate(0.189453)"
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