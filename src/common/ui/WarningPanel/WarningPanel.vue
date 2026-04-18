<template>
  <div class="em-warning-panel-container">
    <div class="em-warning-panel-icon">
      <app-icon
          name="warning"
          :color="props.iconColor"
          :size="props.iconSize"
      />
    </div>
    <div class="em-warning-panel-title">
      {{ props.title }}
    </div>

    <template v-if="props.text !==''">
      <div
          v-html="props.text"
          class="em-warning-panel-text"
      >
      </div>
    </template>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

// PROPS
const props = defineProps({
  iconSize:
      {
        type: Number,
        default: 48
      },

  iconColor:
      {
        type: String,
        default: '#FF941A'
      },

  title:
      {
        type: String,
        default: '',
        required: true
      },

  titleFontSize:
      {
        type: Number,
        default: 15
      },

  text:
      {
        type: String,
        default: ''
      },

  textFontSize:
      {
        type: Number,
        default: 15
      },

})

</script>

<style>
.em-warning-panel-text a {
  color: #1D8585;
  text-decoration: none;
}

.em-warning-panel-title a {
  color: #1D8585;
  text-decoration: none;
}
</style>

<style scoped>

.em-warning-panel-text {
  text-align: center;
}

.em-warning-panel-title{
  text-align: center;
  font-weight: bold;
  margin-bottom: 4px;
}

.em-warning-panel-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
}

.em-warning-panel-container {
  color: #333333;
  line-height: 24px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

</style>