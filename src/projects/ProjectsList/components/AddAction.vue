<template>
  <div class="action-submit-wr">
    <div class="action-submit-title">
      <template v-if="props.actionFlag">
        Вы хотите добавить "{{ props.actionName }}" в проект?
      </template>

      <template v-else>
        Вы хотите удалить "{{ props.actionName }}" из проекта?
      </template>

    </div>
    <div class="action-submit-buttons">
      <button
          @click="emits('submityes', {actionName: props.actionName, actionFlag: props.actionFlag})"
          type="button"
          class="vue-btn vue-btn-normal"
      >
        Да
      </button>
      <button
          style="margin-left: 20px;"
          @click="emits('submitno', props.actionFlag)"
          type="button"
          class="vue-btn vue-btn-warn"
      >
        Нет
      </button>
    </div>
  </div>
</template>

<script setup>

// EMITS
const emits = defineEmits(['submityes', 'submitno']);

// PROPS
const props = defineProps({
  actionId: {
    type: Number,
    default: 0
  },

  actionName:{
    type: String,
    default: ''
  },

  actionFlag:{
    type: Boolean,
    default: false
  }
});

</script>

<style scoped>
.action-submit-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-submit-title {
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 1.1em;
  color: #000000;
}

.action-submit-wr {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
}

</style>