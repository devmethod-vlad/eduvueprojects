<template>
    <div v-if="errorInfo !==''" class="em-search-error-info">
        {{ errorInfo }}
    </div>
    <div class="em-search-container-glossary" :class="{'em-disabled-style': disableStyle, 'em-search-container-results': appStore.$state.results.length !==0 && !elemScrollToTop}">
        <div class="em-search-wr">
            <div class="em-search-input-wr">

                    <div @click="search()" class="em-search-close-icon">
                        <AkSearch />
                    </div>

                <input @keyup.enter="search()" class="em-search-input"
                       type="text" name="em-search-input"
                       v-model="inputValue"
                       :placeholder="placeholder"
                       @focus="onFocus()"
                >
                <template v-if="inputValue !==''">
                    <div @click.prevent.stop="resetSearch()"
                         id="input-glossary-close-icon"
                         class="em-search-close-icon">
                        <GlClose />
                    </div>
                </template>
            </div>
        </div>
      <template v-if="appStore.$state.results.length !==0">
        <div class="em-search-overlap">
          Совпадений:&nbsp;&nbsp;{{ appStore.$state.results.length.toString() }}
        </div>
      </template>
    </div>
</template>

<script setup>
import { GlClose,  AkSearch } from "@kalimahapps/vue-icons";
import {onMounted, ref, watch} from "vue";
import {getGlossResults} from "@/glossary/components/SearchPanel/services/getglossresults";
import {useAppStore} from "@/glossary/store/app";

const dayjs = require('dayjs')

let placeholderText = "Аббревиатура или ключевое слово";

// EMITS
const emits = defineEmits(['getresults', 'resetsearch']);

// STORE
const appStore = useAppStore();

// DATA
const inputValue = ref('');
const placeholder = ref(placeholderText);
const errorInfo = ref('');
const elemScrollToTop = ref(true);

const disableStyle = ref(false);


// METHODS
const search = async () =>{
    if (inputValue.value !==''){
        let resp = await getGlossResults(inputValue.value);
        // console.log("resp: ", resp);
        if (resp.status === 'ok'){
            if (resp.info.results.length !==0){
                let results = await resp.info.results;
                emits('getresults', results);
            }
            else {
                emits('getresults', []);
            }
        }
        else {
            emits('getresults', []);
            errorInfo.value = 'В процессе поиска возникли проблемы. Попробуйте повторить позже';
        }
    }
}

const resetSearch = ()=>{
    inputValue.value = '';
    localStorage.removeItem('em-glossary-state');
    emits('getresults', []);
    emits('resetsearch');
}

const onFocus = ()=>{
    errorInfo.value = '';
}

// WATCH
watch(
  inputValue,
  async (newInput) => {

      localStorage.setItem('em-glossary-state', JSON.stringify({'input_date': dayjs(), 'gloss_input':newInput}));

      if(newInput === ''){
          resetSearch();
      }
      else {
          if(newInput.length > 1){
              await search();
          }
      }
  },
);

// LIFECYCLE

onMounted(()=>{
    let resElem = document.getElementById("edu-gloss-search-results");
    if(resElem){
      resElem.onscroll = ()=>{
        elemScrollToTop.value = resElem.scrollTop === 0;
      };

    }

    if (localStorage.getItem('em-glossary-state')){
        let glossLocalStore = JSON.parse(localStorage.getItem('em-glossary-state'));
        let localDate = dayjs(glossLocalStore.input_date);
        let glossInput = glossLocalStore.gloss_input;
        let nowDate = dayjs();
        let diff = nowDate.diff(localDate, "minute");
        if(diff < 30){
            inputValue.value = glossInput;
        }
        else {
            localStorage.removeItem('em-glossary-state');
        }
    }
});

</script>

<style>
.edu-gloss-search-wr .em-search-input-wr:hover {
  border-color: #757575 !important;
}

.edu-gloss-search-wr .em-search-input-wr:focus-within {
  border-width: 2px !important;
  border-color: #3dcfcf !important;
  box-shadow: unset !important;
  border-right: 2px #3dcfcf solid !important;
}
</style>

<style scoped>
@import "@/glossary/css/search.css";
.em-search-container-results {
  padding-bottom: 24px !important;
  box-shadow: 0px 10px 10px -10px rgba(117, 117, 117, 0.53)
}

.em-search-overlap {
  font-size: 13px;
  color: #757575;
  text-align: right;
  margin-top: 24px;
}

input.em-search-input::placeholder {
  font-size: 16px !important;
}

.em-search-container-glossary {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 24px;
}

.em-search-input:focus {
    border: none !important;
}

.em-search-error-info {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 40px;
    font-size: 20px;
    color: #E04B37;
}

.em-search-input {
    font-size: 16px !important;
    font-weight: 400 !important;
    box-shadow: none !important;
    margin: 0 !important;
}

.em-search-input::placeholder {
    font-size: 15px !important;
    display: flex;
    align-items: center;
    vertical-align: center !important;
}

.em-search-close-icon {
    font-size: 20px;
    color: #999999;
    width: 15%;
}
.em-search-input-wr {
    border: 1px #999999 solid !important;
    border-top-right-radius: unset !important;
    border-bottom-right-radius: unset !important;
    padding: unset !important;
}
.em-search-input {
  width: 70% !important;
}

@media (min-width: 576px) {
  .em-search-input::placeholder {
    font-size: 19px !important;
  }
  .em-search-close-icon {
    width: 10%;
  }
  .em-search-input {
    width: 80% !important;
  }
}

@media (min-width: 768px) {
  .em-search-input::placeholder {
    font-size: 20px !important;
  }
  .em-search-close-icon {
    width: 5%;
  }
  .em-search-input {
    width: 90% !important;
  }
}

@media (min-width: 992px) {
  .em-search-input::placeholder {
    font-size: 20px !important;
  }
  .em-search-close-icon {
    width: 5%;
  }
  .em-search-input {
    width: 90% !important;
  }
}

@media (min-width: 1200px) {
  .em-search-input::placeholder {
    font-size: 22px !important;
  }
  .em-search-close-icon {
    width: 5%;
  }
  .em-search-input {
    width: 90% !important;
  }
}

</style>