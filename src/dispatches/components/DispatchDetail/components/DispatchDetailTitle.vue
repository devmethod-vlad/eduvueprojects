<template>
  <div class="dispatch-setcontent-title">

    <div class="dispatch-setcontent-title-lable">
      Заголовок сообщения
    </div>

    <div class="dispatch-setcontent-title-input-wr">

      <template v-if="appStore.$state.activeComponent === 'newdispatch'">
        <input
            @focus="onFocusTitle()"
            type="text"
            placeholder="Введите текст"
            class="vue-form-control"
            v-model="reactNewDispatch.title.value"
            :class="{'vue-input-error': newDispatch.$state.titleError}"
        />
      </template>

      <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
        <input
            @focus="onFocusTitle()"
            type="text"
            placeholder="Введите текст"
            class="vue-form-control"
            v-model="reactRedactDispatch.title.value"
            :class="{'vue-input-error': redactDispatch.$state.titleError}"
        />
      </template>
    </div>

    <template
        v-if="(newDispatch.$state.titleError && newDispatch.$state.titleInfoText !=='') || (redactDispatch.$state.titleError && redactDispatch.$state.titleInfoText !=='')"
    >

      <div class="dispatch-setcontent-error-wr error-margin-top">

        <template v-if="appStore.$state.activeComponent === 'newdispatch'">
          <error-panel
              :text="newDispatch.$state.titleInfoText"
          />
        </template>

        <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
          <error-panel
              :text="redactDispatch.$state.titleInfoText"
          />
        </template>

      </div>

    </template>

  </div>

</template>

<script setup>
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import {useAppStore} from "@/dispatches/store/app";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";
import {storeToRefs} from "pinia";

// STORE
const newDispatch = useNewDispatchStore();
const redactDispatch = useRedactDispatchStore();
const appStore = useAppStore();

const reactNewDispatch = storeToRefs(useNewDispatchStore());
const reactRedactDispatch = storeToRefs(useRedactDispatchStore());

// METHODS
const onFocusTitle = ()=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    newDispatch.titleError = false;
    newDispatch.titleInfoText = '';
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    redactDispatch.titleError = false;
    redactDispatch.titleInfoText = '';
  }
}

</script>

<style scoped>
.vue-form-control {
  width: 100%;
}

.error-margin-top {
  margin-top: 12px;
}

.dispatch-setcontent-title-input-wr {
  display: flex;
}

.dispatch-setcontent-title-input-wr input{
  border-color: #999999 !important;
}

.dispatch-setcontent-title-lable {
  font-weight: 600;
  margin-bottom: 8px;
}

.dispatch-setcontent-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
}

</style>