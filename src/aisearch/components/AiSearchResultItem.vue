<template>
  <div
      class="aisearch-results-item"
  >
    <div
        class="aisearch-results-item-number-wr"

    >
      <div
          v-show="props.showNumber"
          class="aisearch-results-item-number"
      >
        {{ (Number(props.index)+1).toString() }}
      </div>
    </div>

    <template v-if="!props.isLlmAnswer">
      <div
          class="aisearch-results-item-text"
          v-html="marked.parseInline(props.answer)"
      >
      </div>
    </template>

    <template v-else>
      <div
          class="aisearch-results-item-text"
      >
        <type-writer
            :text="props.answer"
            @text-complete="llmTextComplete=true"
        />
      </div>
    </template>

    <template v-if="props.attachments.length > 0">
      <template v-if="!isLlmAnswer || (isLlmAnswer && llmTextComplete)">
        <ai-search-attachments
            :attachments="props.attachments"
        />
      </template>
    </template>
  </div>


</template>

<script setup>
import {marked} from "marked";
import AiSearchAttachments from "@/aisearch/components/AiSearchAttachments/AiSearchAttachments.vue";
import TypeWriter from "@/aisearch/components/TypeWriter.vue";
import {ref} from "vue";

// PROPS
const props = defineProps({

  index:
      {
        type: Number,
        default: 0
      },
  answer:
      {
        type: String,
        default: ''
      },
  attachments:
      {
        type: Array,
        default(){
          return [];
        }
      },

  showNumber:
      {
        type: Boolean,
        default: false
      },

  isLlmAnswer:
      {
        type: Boolean,
        default: false
      }

});

const llmTextComplete = ref(false);

</script>

<style scoped>
.aisearch-results-item {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
}

.aisearch-results-item-text {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
}

.aisearch-results-wr-top-actions {
  display: flex;
  justify-content: space-between;
}


.aisearch-results-item-text {
  word-break: normal;
  color: #333333;
}

.aisearch-results-item-number {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #C2E8E8;
  border-radius: 50%;
  color: #157171;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
}

.aisearch-results-item-number-wr {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 4px;
  cursor: pointer;
}

</style>