<template>
  <span
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
      @keydown="onKeyDown()"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        :viewBox="'0 0 ' + props.size.toString()+' '+props.size.toString()"
        fill="none"
    >
      <rect
          :y="props.size"
          :width="props.size"
          :height="props.size"
          :rx="( Math.round(Number(props.size)/2)).toString()"
          :transform="'rotate(-90 0 '+props.size.toString()+')'"
          :fill="color"
      />
      <path
          d="M14.2954 24.2785C13.9015 24.6723 13.9015 25.3108 14.2954 25.7046C14.6892 26.0985 15.3277 26.0985 15.7215 25.7046L20 21.4262L24.2785 25.7046C24.6723 26.0985 25.3108 26.0985 25.7046 25.7046C26.0985 25.3108 26.0985 24.6723 25.7046 24.2785L21.4262 20L25.7046 15.7215C26.0985 15.3277 26.0985 14.6892 25.7046 14.2954C25.3108 13.9015 24.6723 13.9015 24.2785 14.2954L20 18.5738L15.7215 14.2954C15.3277 13.9015 14.6892 13.9015 14.2954 14.2954C13.9015 14.6892 13.9015 15.3277 14.2954 15.7215L18.5738 20L14.2954 24.2785Z"
          fill="#269999"
      />
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
        default: 'rgba(38,153,153,0.1)'
      },

  hoverColor:
      {
        type: String,
        default: 'rgba(38,153,153,0.2)'
      },
  pressColor:
      {
        type: String,
        default: 'rgba(38,153,153,0.3)'
      }

});

// DATA
const color = ref(props.color);

// METHODS
const onMouseEnter = ()=>{
  if (props.hoverColor !==''){
    color.value = props.hoverColor;
  }
}

const onKeyDown = ()=>{
  if (props.pressColor !==''){
    color.value = props.pressColor;
  }
}

</script>

<style scoped>

</style>