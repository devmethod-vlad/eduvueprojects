<template>
  <svg
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 16 16"
      fill="none"
  >
    <g clip-path="url(#clip0_201_5585)">
      <path fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 3C7.448 3 7 3.448 7 4.001C7 4.553 7.448 5 8 5C8.552 5 9 4.553 9 4.001C9 3.448 8.552 3 8 3ZM7 7V12C7 12.55 7.45 13 8 13C8.55 13 9 12.55 9 12V7C9 6.45 8.55 6 8 6C7.45 6 7 6.45 7 7ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM8 1C11.86 1 15 4.141 15 8C15 11.859 11.86 15 8 15C4.14 15 1 11.859 1 8C1 4.141 4.14 1 8 1Z"
            :fill="props.color"
      />
    </g>
    <defs>
      <clipPath
          id="clip0_201_5585"
      >
        <rect
            width="16"
            height="16"
            fill="white"
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