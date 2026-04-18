<template>
    <svg
						xmlns="http://www.w3.org/2000/svg"
						:width="props.size"
						:height="props.size"
						viewBox="0 0 25 24"
						fill="none">
        <g clip-path="url(#clip0_1093_5745)">
            <path
										d="M10.6194 10.52C13.3863 10.52 15.6294 8.27695 15.6294 5.51C15.6294 2.74305 13.3863 0.5 10.6194 0.5C7.85243 0.5 5.60938 2.74305 5.60938 5.51C5.60938 8.27695 7.85243 10.52 10.6194 10.52Z"
										stroke="#231F20"
										stroke-miterlimit="10"
						/>
            <path
										d="M9.39948 13.2999C3.92948 13.1999 2.28948 15.5699 1.48948 17.3599C1.18948 18.0399 0.879482 19.1999 0.989482 20.8799C0.999482 21.1099 1.06948 21.7699 1.57948 22.3899C2.09948 23.0299 2.75948 23.2299 2.97948 23.2799C7.44948 23.2799 9.97948 23.3499 14.4395 23.3599C14.2395 23.2899 10.9495 22.3399 9.78948 18.8599C8.86948 16.0999 9.12948 13.7199 9.39948 13.2999Z"
										stroke="#231F20"
										stroke-miterlimit="10"
						/>
            <path
										d="M16.3579 23.4502C20.5111 23.4502 23.8779 20.0833 23.8779 15.9302C23.8779 11.777 20.5111 8.41016 16.3579 8.41016C12.2047 8.41016 8.83789 11.777 8.83789 15.9302C8.83789 20.0833 12.2047 23.4502 16.3579 23.4502Z"
										fill="white"
										stroke="black"
										stroke-miterlimit="10"
						/>
            <path
										d="M19.0686 16.0391H12.5586"
										stroke="black"
										stroke-miterlimit="10"
						/>
            <path
										d="M19.7692 16.37L16.1992 12.5"
										stroke="black"
										stroke-miterlimit="10"
						/>
            <path
										d="M19.7577 15.7109L16.1777 19.6309"
										stroke="black"
										stroke-miterlimit="10"
						/>
        </g>
        <defs>
            <clipPath id="clip0_1093_5745">
                <rect
												width="23.91"
												height="23.95"
												fill="white"
												transform="translate(0.46875)"
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