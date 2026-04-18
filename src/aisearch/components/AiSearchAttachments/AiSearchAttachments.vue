<template>
  <div class="aisearch-results-item-attachments-wr">
    <div
        v-for="(url, index) in props.attachments"
        :key="index"
        class="aisearch-results-attachments-item"
    >
      <search-attachment
          :url="url"
          :name="'Приложение ' + (Number(index)+1).toString()"
          :index="index"
      />
    </div>
  </div>
</template>

<script setup>
import SearchAttachment from "@/aisearch/components/AiSearchAttachments/components/SearchAttachment.vue";

// PROPS
const props = defineProps({
  attachments:
      {
        type: Array,
        default(){
          return []
        }
      }
});

</script>

<style scoped>
.aisearch-results-attachments-item {
  display: flex;
}

.aisearch-results-item-attachments-wr {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
}
</style>