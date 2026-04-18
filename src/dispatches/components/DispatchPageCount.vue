<template>
  <div
      class="dispatch-pagecount-wr"
      :class="{'em-disabled-style': activateDisableMain(dispatches)}"
  >
    <div class="dispatch-pagecount-text">
      Элементов на странице
    </div>

    <div class="dispatch-pagecount-items-wr">

      <div
          v-if="dispatches.total>10"
          class="dispatch-pagecount-item"
          :class="{'pagecount-item-active': dispatches.$state.pageCount === 10}"
          @click="dispatches.$state.pageCount !== 10 ? setPageCount(10): null"
      >
        10
      </div>

      <div
          v-if="dispatches.total>10"
          class="dispatch-pagecount-item"
          :class="{'pagecount-item-active': dispatches.$state.pageCount === 25}"
          @click="dispatches.$state.pageCount !== 25 ? setPageCount(25): null"
      >
        25
      </div>

      <div
          v-if="dispatches.total>25"
          class="dispatch-pagecount-item"
          :class="{'pagecount-item-active': dispatches.$state.pageCount === 50}"
          @click="dispatches.$state.pageCount !== 50 ? setPageCount(50): null"
      >
        50
      </div>

      <div
          v-if="dispatches.total>50"
          class="dispatch-pagecount-item"
          :class="{'pagecount-item-active': dispatches.$state.pageCount === 100}"
          @click="dispatches.$state.pageCount !== 100 ? setPageCount(100): null"
      >
        100
      </div>
    </div>

  </div>
</template>

<script setup>
import {useDispatchesStore} from "@/dispatches/store/dispatches";
import {activateDisableMain} from "@/dispatches/services/activatedisable";

// EMITS
const emits = defineEmits(['refreshlist']);

// STORE
const dispatches = useDispatchesStore();

// METHODS
const setPageCount = (pageCount)=>{
  dispatches.pageNumber = 1;
  dispatches.pageCount=pageCount;
  emits('refreshlist');
}

</script>

<style scoped>
.pagecount-item-active {
  color: #1D8585 !important;
}

.dispatch-pagecount-item {
  cursor: pointer;
  margin-right: 16px;
}

.dispatch-pagecount-text {
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  margin-right: 24px;
}

.dispatch-pagecount-items-wr {
  display: flex;
  justify-content: flex-start;
}

.dispatch-pagecount-wr {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}
</style>