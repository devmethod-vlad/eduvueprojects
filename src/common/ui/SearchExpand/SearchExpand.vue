<template>
  <div
      class="edu-search-expand-wr"
      ref="searchWr"
  >

    <div class="edu-search-expand-input-space">

      <div class="edu-search-expand-input-wr">
        <textarea
            rows="1"
            ref="expandTextarea"
            @keydown.enter.prevent="processKeyUpEnter()"
            class="edu-search-expand-textarea"
            type="text"
            :value="props.modelValue"
            @input="processInput($event)"
            :placeholder="props.placeholder"
        ></textarea>
      </div>

      <template v-if="props.modelValue !==''">
        <div
            class="edu-search-expand-closeicon-wr"
            @click.prevent.stop="resetSearch()"
        >
          <app-icon
              name="close"
              :size="10"
              color="#999999"
              hover-color="#757575"
          />
        </div>
      </template>

    </div>

    <div
        class="edu-search-expand-searchicon-wr"
        @click="search(true)"
    >
      <div class="edu-search-expand-searchicon">
        <app-icon
            name="search-fill"
            :size="32"
            color="#269999"
            hover-color="#1D8585"
            press-color="#157171"
        />
      </div>
    </div>

      <div
          v-show="wordsCount >= 2"
          class="edu-search-expand-tooltip-wr"
          ref="tooltip"
      >
        <div
            class="edu-search-expand-tooltip"
        >
          <div
              class="edu-search-expand-tooltip-top"
          >
            {{ tooltipText }}
          </div>

          <template v-if="inputLimit">
            <div
                class="edu-search-expand-tooltip-bottom"
            >
              <div
                  class="edu-tooltip-bottom-icon"
              >
                <app-icon
                    name="warning-fill"
                    :size="14"
                    color="#FF941A"
                />
              </div>

              <div
                  class="edu-tooltip-bottom-text"
              >
                Достигнут лимит символов
              </div>

            </div>
          </template>
        </div>
      </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import ResizeObserver from "resize-observer-polyfill";

// EMITS
const emits = defineEmits(['search', 'resetsearch', 'update:modelValue', 'clickSearchIcon']);

// PROPS
const props = defineProps({
  modelValue:
      {
        type: String,
        default: ''
      },

  placeholder:
      {
        type: String,
        default: 'Поиск'
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
      },

  searchIconUrl:
      {
        type: String,
        default: ''
      },

  tooltipText:
      {
        type: String,
        default: 'Чтобы посмотреть результаты, нажмите на кнопку поиска'
      },

  inputLimitCount:
      {
        type: Number,
        default: 1000
      },

});

// DATA

const expandTextarea = ref(null);
const searchWr = ref(null);
const tooltip = ref(null);
const inputLimit = ref(false);

// METHODS
const resizeSearchElemObserver = new ResizeObserver(() => {
  setToolTipOffset();
})

const getSearchWrHeigth = () =>{
  if (searchWr.value) {
    return Number(searchWr.value.clientHeight) + 2;
  }
  else {
    return 0;
  }
}

const setToolTipOffset = ()=>{
  let topOffset = getSearchWrHeigth().toString();
  if(tooltip.value){
    tooltip.value.style.top = `${topOffset}px`;
  }
}

const cleanString = (input)=>{
  let result = input.replace(/<[^>]*>/g, '');
  result = result.replace(/\s*\n+\s*/g, ' ');
  result = result.replace(/\s+/g, ' ');
  result = result.trim();

  return result;
}

const search = (isSearchIconClick=false)=>{
  let cleanInput = cleanString(props.modelValue);

  if (cleanInput !==''){
    if(isSearchIconClick){
      emits('clickSearchIcon', props.modelValue);
    }
    else {
      emits('search', props.modelValue);
    }
  }
}

const processKeyUpEnter = ()=>{
  search(true);
}

const processInput = (event)=>{
  let userInput = event.target.value;
  if(userInput.length >= props.inputLimitCount){
    inputLimit.value = true;
    userInput = userInput.slice(0, props.inputLimitCount);
  }
  else {
    inputLimit.value = false;
  }
  expandTextarea.value.value = userInput;
  emits('update:modelValue', userInput)
}

const resetSearch = ()=>{
  emits('update:modelValue', '');
  emits('resetsearch');
  if (expandTextarea.value){
    expandTextarea.value.style.height = 'auto';
  }
}

const setTextAreaHeight = ()=>{
  if (expandTextarea.value){
    expandTextarea.value.style.height = 'auto';
    expandTextarea.value.style.height = expandTextarea.value.scrollHeight + 'px';
  }
}

const countWords = (input) => {
  input = input.trim();
  const words = input.split(/\s+/);
  return words.filter(word => word.length > 0).length;
}

// COMPUTED
const wordsCount = computed(()=>{
  return countWords(props.modelValue);
})

// LIFECYCLE
onMounted(()=>{
  if (expandTextarea.value){
    expandTextarea.value.addEventListener('input', setTextAreaHeight);
  }
  if(searchWr.value){
    resizeSearchElemObserver.observe(searchWr.value);
  }
});

onUnmounted(()=>{
  if (expandTextarea.value){
    expandTextarea.value.removeEventListener('input', setTextAreaHeight);
  }
  if(searchWr.value){
    resizeSearchElemObserver.unobserve(searchWr.value);
  }
})

</script>

<style scoped>
.edu-tooltip-bottom-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.edu-search-expand-tooltip-bottom {
  margin-top: 4px;
  display: flex;
  justify-content: flex-start;
}

.edu-search-expand-tooltip {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 14px;
  padding-left: 14px;
}

.edu-search-expand-tooltip-wr {
  background-color: #EAF5F5;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  position: absolute;
  width: 100%;
  left: 0;
  color: #757575;
}

.edu-search-expand-closeicon-wr {
  padding-top: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  width: 25px;
}

.edu-search-expand-input-wr {
  display: flex;
  align-items: center;
  width: 100%;
}

.edu-search-expand-textarea:focus-visible {
  outline: 0 !important;
}

.edu-search-expand-textarea {
  width: 100%;
  border: unset !important;
  box-sizing: border-box;
  overflow: hidden;
  resize: none;
}

.edu-search-expand-searchicon-wr img {
  width: 100%;
  height: auto;
  max-height: 32px;
}

.edu-search-expand-searchicon-wr {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 14px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  background-color: white;
}
.edu-search-expand-searchicon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  min-height: 32px;
}

.edu-search-expand-input-space {
  display: flex;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  background-color: white;
}

.edu-search-expand-wr {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
  border: 1px #999999 solid;
}

.edu-search-expand-wr:hover {
  border: 1px #757575 solid;
}

.edu-search-expand-wr:focus-within {
  border: 2px #3DCFCF solid;
}
</style>