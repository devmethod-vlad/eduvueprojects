<template>
  <div
      class="dispatch-search-wr"
      :class="{'em-disabled-style': activateDisableMain(dispatches)}"
  >
    <search-panel
        placeholder="Введите ключевое слово"
        v-model="reactDispatchesStore.search_phrase.value"
        @resetsearch="()=>{resetSearch()}"
        @search-button="()=>{searchButton()}"
    />
  </div>
</template>

<script setup>
import SearchPanel from "@/common/ui/SearchPanel/SearchPanel.vue";
import {storeToRefs} from "pinia";
import {useDispatchesStore} from "@/dispatches/store/dispatches";
import {dispatchesPartialReset} from "@/dispatches/services/partrset";
import {activateDisableMain} from "@/dispatches/services/activatedisable";

// EMITS
const emits = defineEmits(['refreshlist']);

// STORE
const reactDispatchesStore = storeToRefs(useDispatchesStore());
const dispatches = useDispatchesStore();

// METHODS
const resetSearch = () =>{
  dispatches.search_enable = false;
  dispatchesPartialReset(dispatches);
  emits('refreshlist');
}

const searchButton = () =>{
  dispatches.search_enable = true;
  dispatches.pageNumber = 1;
  dispatches.pageCount =10;
  emits('refreshlist');
}

</script>

<style scoped>
.dispatch-search-wr {
  margin-bottom: 16px;
}

</style>