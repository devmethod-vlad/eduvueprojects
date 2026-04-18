<template>
  <span
        class="vue-tag"
        :style="backgroundColor"
  >
        {{ props.tagText }}
    </span>
</template>

<script setup>

// PROPS
import {computed} from "vue";

const props = defineProps({

  fontSize:
      {
        type: Number,
        default: 16
      },

  tagText:
      {
        type: String,
        default: 'Текст',
        required: true
      },

  tagColor:
      {
        type: String,
        default: '#2699991A'
      },
});


// COMPUTED
const backgroundColor = computed(()=>{
  return 'background-color: ' + props.tagColor + ';';
});

</script>

<style scoped>

.vue-tag {
  font-size: 13px;
  cursor: pointer;
  padding-right: 8px;
  padding-left: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
}

@media (min-width: 768px) {
  .vue-tag {
    font-size: 16px;
  }
}

</style>