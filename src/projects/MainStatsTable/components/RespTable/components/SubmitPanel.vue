<template>
    <div class="em-submit-panel-container">
      <div @click="emits('submit', userId)" class="em-panel-submit"
           v-tippy="{ content: 'Подтвердить', placement : 'top-start'}"
      >
        <app-icon name="check-circle"
                  :size="30"
                  color="#1e8686"
        />
      </div>

      <div @click="emits('reject', userId)" class="em-panel-reject"
           v-tippy="{ content: 'Отменить', placement : 'top-start'}"
      >
        <app-icon name="ban"
                  :size="30"
                  color="#dc3545"
        />
      </div>

    </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

// EMITS
const emits = defineEmits(['reject', 'submit']);

// PROPS
const props = defineProps({
  userId: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.em-panel-reject {
  margin-left: 20px;
}
.em-submit-panel-container {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

</style>