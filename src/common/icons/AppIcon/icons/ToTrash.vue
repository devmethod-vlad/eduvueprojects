<template>
    <span
        @mouseenter="onMouseEnter()"
        @mouseleave="color = props.color"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="props.size"
          :height="props.size"
          viewBox="0 0 21 24"
          fill="none"
      >
        <g clip-path="url(#clip0_1093_5763)">
            <path
                d="M1.66992 3.43945H19.1499V21.5995C19.1499 22.6095 18.3299 23.4395 17.3099 23.4395H3.50992C2.49992 23.4395 1.66992 22.6195 1.66992 21.5995V3.43945Z"
                :stroke="color"
                stroke-miterlimit="10"
            />
            <path
                d="M7.53922 0.5H13.1692C13.7792 0.5 14.2692 0.99 14.2692 1.6V3.41H6.44922V1.6C6.44922 0.99 6.93922 0.5 7.54922 0.5H7.53922Z"
                :stroke="color"
                stroke-miterlimit="10"
            />
            <path
                d="M0.82 3.08984H19.93C20.11 3.08984 20.25 3.22984 20.25 3.40984V3.48984H0.5V3.40984C0.5 3.22984 0.64 3.08984 0.82 3.08984Z"
                :stroke="color"
                stroke-miterlimit="10"
            />
            <path
                d="M6.13086 7.56055V18.9205"
                :stroke="color"
                stroke-miterlimit="10"
            />
            <path
                d="M10.4492 7.56055V18.9205"
                :stroke="color"
                stroke-miterlimit="10"
            />
            <path
                d="M14.7109 7.56055V18.9205"
                :stroke="color"
                stroke-miterlimit="10"
            />
        </g>
        <defs>
            <clipPath id="clip0_1093_5763">
                <rect
                    width="20.76"
                    height="23.94"
                    fill="white"
                />
            </clipPath>
        </defs>
      </svg>
    </span>
</template>

<script setup>
// PROPS
import {ref} from "vue";

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
      },

  hoverColor:
      {
        type: String,
        default: ''
      },

});

// DATA
const color = ref(props.color);

// METHODS
const onMouseEnter = ()=>{
  if (props.hoverColor !==''){
    color.value = props.hoverColor;
  }
}
</script>

<style scoped>

</style>