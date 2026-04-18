<template>
  <template v-if="props.title !==''">
    <div class="em-search-title">
      {{ props.title }}
    </div>
  </template>
  <div class="em-search-container" :class="{'em-disabled-style': searchInProcess}">
    <div
        class="em-search-wr"
        :id="props.searchElementId !=='' ? props.searchElementId : false"
    >
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
                color="#999999"
                hover-color="#757575"
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
      },

  searchElementId:
      {
        type: String,
        default: ''
      }
});

// DATA
const searchInProcess = ref(false);


// METHODS
const search = (isButtonClick=false)=>{
  if (props.modelValue !==''){
    if(isButtonClick){
      emits('searchButton', props.modelValue);
    }
    else {
      emits('search', props.modelValue);
    }
  }
}

const resetSearch = ()=>{
  emits('update:modelValue', '');
  emits('resetsearch');
}

// WATCH
watch(
    () => props.searchActive,
    (newVal) => {
      searchInProcess.value = !!newVal;
    },
);

</script>

<style scoped>
@import "@/common/ui/SearchPanelV2/css/searchpanel.css";

</style>