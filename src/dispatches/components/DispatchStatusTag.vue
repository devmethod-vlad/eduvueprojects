<template>
  <template v-if="props.db_name === 'draft'">
    <tag-component
        :tag-text="props.name"
        tag-color="#D9D9D9"
    />
  </template>

  <template v-if="props.db_name === 'pending'">
    <tag-component
        :tag-text="props.name"
        tag-color="#FFF5B3"
    />
  </template>

  <template v-if="props.db_name === 'sending'">
    <tag-component
        :tag-text="props.name"
        tag-color="#FFF5B3"
    />
  </template>

  <template v-if="props.db_name === 'dispatched'">
    <tag-component
        :tag-text="props.name"
        tag-color="#DFF0C0"
    />
  </template>
</template>

<script setup>
import TagComponent from "@/common/ui/TagComponent/TagComponent.vue";

// PROPS
const props = defineProps({
  db_name:
      {
        type: String,
        default: ''
      },
  name:
      {
        type: String,
        default: ''
      }
});

</script>

<style scoped>

</style>