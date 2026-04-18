<template>
  <div class="edu-warn-panel">
    <div class="edu-warn-panel-icon">
      <app-icon
          name="warning-fill"
          :color="props.iconColor"
          :size="props.iconSize"

      />
    </div>
    <div
        class="edu-warn-panel-text"
        :style="'font-size: '+props.fontSize.toString()+'px; color: '+props.fontColor+';'"
    >
      {{ props.text }}
    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

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
        default: '#E04B37',
      },

  iconSize:
      {
        type: Number,
        default: 20,
      },

  iconColor:
      {
        type: String,
        default: '#E04B37',
      },
});


</script>

<style scoped>
.edu-warn-panel-text {
  padding-left: 8px;
  display: flex;
  text-align: left;
  align-items: flex-start;
}

.edu-warn-panel-icon {
  padding-top: 3px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.edu-warn-panel {
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
}

</style>