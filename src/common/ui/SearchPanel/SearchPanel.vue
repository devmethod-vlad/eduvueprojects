<template>
  <template v-if="props.title !==''">
    <div class="em-search-title">
      {{ props.title }}
    </div>
  </template>
  <div class="em-search-container" :class="{'em-disabled-style': searchInProcess}">
    <div class="em-search-wr">
      <div class="em-search-input-wr">
        <div class="em-search-find-icon">
          <app-icon
              name="search"
              :size="20"
              color="#757575"
          />
        </div>
        <input
               @keyup.enter="search(true)" class="em-search-input"
               type="text" name="em-search-input"
               :value="props.modelValue"
               @input="emits('update:modelValue', $event.target.value)"
               :placeholder="props.placeholder"
        >
        <template v-if="props.modelValue !==''">
          <div @click.prevent.stop="resetSearch()" class="em-search-close-icon">
            <app-icon
                name="close"
                :size="12"
                color="#1e8686"
            />
          </div>
        </template>
      </div>

      <div @click="search(true)" class="em-search-text">
        {{ props.buttonText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {ref, watch} from "vue";

// EMITS
const emits = defineEmits(['search', 'resetsearch', 'update:modelValue', 'searchButton']);

// PROPS
const props = defineProps({
  modelValue:
      {
        type: String,
        default: ''
      },

  title:
      {
        type: String,
        default: ''
      },
  placeholder:
      {
        type: String,
        default: 'Поиск'
      },
  buttonText:
      {
        type: String,
        default: 'Найти'
      },

  searchActive:
      {
        type: Boolean,
        default: false
      }
});

// DATA
const searchInProcess = ref(false);


// METHODS
const search = (isButtonClick=false)=>{
  if (props.modelValue !==''){
    emits('search', props.modelValue);
    if(isButtonClick){
      emits('searchButton', props.modelValue);
    }
  }
}

const resetSearch = ()=>{
  emits('resetsearch');
}

// WATCH
watch(
    ()=>props.modelValue,
    () => {
      if(props.modelValue === ''){
        resetSearch();
      }
      else{
        emits('search', props.modelValue);
      }
    },
);

watch(
    () => props.searchActive,
    (newVal) => {
      searchInProcess.value = !!newVal;
    },
);

</script>

<style scoped>
@import "@/common/ui/SearchPanel/css/searchpanel.css";

</style>