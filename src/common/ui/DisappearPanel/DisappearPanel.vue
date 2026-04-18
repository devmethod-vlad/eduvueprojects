<template>
  <div class="edu-disappear-panel">
    <div class="edu-disappear-panel-icon">
      <app-icon
          name="check-circle"
          :color="props.iconColor"
          :size="props.iconSize"

      />
    </div>
    <div
        class="edu-disappear-panel-text"
        :style="'font-size: '+props.fontSize.toString()+'px; color: '+props.fontColor+';'"
    >
      {{ props.text }}
    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {onMounted} from "vue";

// PROPS
const props = defineProps({

  text:
      {
        type: String,
        default: '',
        required: true
      },

  fontSize:
      {
        type: Number,
        default: 15,
      },

  fontColor:
      {
        type: String,
        default: '#1D8585',
      },

  iconSize:
      {
        type: Number,
        default: 20,
      },

  iconColor:
      {
        type: String,
        default: '#1D8585',
      },

  timeout:
      {
        type: Number,
        default: 3000,
      },
});

// EMITS
const emits = defineEmits(['hidepanel']);

// LIFECYCLE
onMounted(()=>{
  window.setInterval(function(){
    emits('hidepanel')
  }, props.timeout);
})

</script>

<style scoped>
.edu-disappear-panel-text {
  padding-left: 8px;
  display: flex;
  text-align: left;
  align-items: flex-start;
}

.edu-disappear-panel-icon {
  padding-top: 3px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.edu-disappear-panel {
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
}
</style>