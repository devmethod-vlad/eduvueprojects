<template>
  <div>
    {{ displayedText }}
  </div>
</template>

<script setup>

const emits = defineEmits(['textComplete']);

// PROPS
import {onMounted, ref, watch} from "vue";

const props = defineProps({

  text: {
    type: String,
    required: true
  },

  typingSpeed: {
    type: Number,
    default: 20 // в миллисекундах
  }

});

// DATA
const displayedText = ref('');
const currentIndex = ref(0);

// METHODS
const typeText = () => {
  if (currentIndex.value < props.text.length) {
    displayedText.value += props.text.charAt(currentIndex.value);
    currentIndex.value++;
    setTimeout(typeText, props.typingSpeed);
  }
}

onMounted(()=>{
  typeText();
});


// WATCH
watch(
    displayedText,
    (newVal) => {
      if(newVal.length === props.text.length) {
        emits('textComplete');
      }
    }
);

</script>

<style scoped>

</style>