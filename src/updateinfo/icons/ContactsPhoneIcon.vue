<template>
    <svg
        @mouseenter="onMouseEnter()"
        @mouseleave="()=>{color = props.color; backColor = props.backgroundColor}"
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        :viewBox="'0 0 '+props.size.toString()+' '+props.size.toString()"
        fill="none"
    >
      <rect
          :width="props.size"
          :height="props.size"
          rx="4"
          :fill="backColor"
      />
      <path
          d="M15.0967 10.0029C14.1059 10.0029 13.3917 10.4305 12.5093 11.3071L11.82 12.0195C10.7628 13.0761 10.7652 14.9919 11.596 17.1932C12.4271 19.3959 14.0417 21.7536 16.1463 23.8574C19.4647 27.1765 23.1094 29.0042 25.6645 29.0042C26.6184 29.0042 27.4293 28.7383 27.9836 28.1816L28.4972 27.6893C29.5446 26.6786 30.0436 25.9047 29.9978 24.7947C29.9567 23.7991 29.3912 22.916 28.3688 22.0941C27.2312 21.1795 26.2805 20.7224 25.3485 20.7224L25.16 20.7269C24.3653 20.7663 23.8454 21.0666 23.1118 21.765L22.8271 22.0442L22.7734 22.0182C22.6738 21.9676 22.5427 21.8927 22.3817 21.787C21.8192 21.418 21.0771 20.7861 20.147 19.8558L19.9232 19.6297C18.908 18.5935 18.2992 17.8191 18.0281 17.2975L17.9651 17.1672L17.8855 17.2484C19.6752 15.4875 19.8962 14.106 17.9086 11.634C17.0564 10.5738 16.134 10.0029 15.0967 10.0029ZM15.0967 12.0029C15.4342 12.0029 15.842 12.2553 16.3499 12.8871C17.5417 14.3695 17.5929 14.6874 16.7034 15.6017L16.3011 16.0023C15.3507 16.9559 16.0234 18.5082 18.5023 21.0373L18.7327 21.2699C20.709 23.2468 22.0195 24.1067 22.9966 24.1067C23.3742 24.1067 23.7221 23.9783 23.9936 23.7089L24.4277 23.2742C24.8802 22.8361 25.0857 22.7224 25.3485 22.7224C25.7286 22.7224 26.3002 22.9973 27.1157 23.6528C27.7296 24.1463 27.9859 24.5466 27.9995 24.8772C28.0131 25.2054 27.8057 25.5538 27.2536 26.1074L26.5718 26.765C26.4326 26.9047 26.1292 27.0042 25.6645 27.0042C23.6996 27.0042 20.5329 25.4162 17.5605 22.4431C15.6455 20.5288 14.1907 18.4046 13.4672 16.487C12.8844 14.943 12.883 13.7847 13.2334 13.4345L13.756 12.8913C14.3752 12.2501 14.75 12.0029 15.0967 12.0029Z"
          :fill="color"
      />
    </svg>
</template>

<script setup>

// PROPS
import {ref} from "vue";

const props = defineProps({
  size:
      {
        type: Number,
        default: 40
      },
  color:
      {
        type: String,
        default: '#333333'
      },

  backgroundColor:
      {
        type: String,
        default: '#F2F2F2'
      },

  hoverColor:
      {
        type: String,
        default: ''
      },

  hoverBackgroundColor:
      {
        type: String,
        default: ''
      },
});

// DATA
const color = ref(props.color);
const backColor = ref(props.backgroundColor);

// METHODS
const onMouseEnter = () => {
  if (props.hoverColor !== '') {
    color.value = props.hoverColor;
  }
  if (props.hoverBackgroundColor !==''){
    backColor.value = props.hoverBackgroundColor;
  }
}

</script>

<style scoped>

</style>