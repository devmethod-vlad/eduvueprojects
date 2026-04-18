<template>

  <div
      class="dispatch-detail-method-wr"
      :class="{'dispatch-detail-method-margin-bottom': !newDispatch.$state.methodError && !redactDispatch.$state.methodError}"
  >
    <div class="dispatch-detail-method-maintitle">
      Способ отправки:
    </div>

    <div class="dispatch-detail-method-items-wr">

      <div
          class="dispatch-detail-method-item"
      >
        <div class="dispatch-detail-item-checkbox">

          <template v-if="appStore.$state.activeComponent === 'newdispatch'">
            <custom-checkbox
                id="telegram"
                :check-list="newDispatch.$state.methodList"
                @active="newDispatch.methodList=['telegram']"
                @inactive="newDispatch.methodList=['telegram']"
            />
          </template>

          <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
            <custom-checkbox
                id="telegram"
                :check-list="redactDispatch.$state.methodList"
                @active="redactDispatch.methodList=['telegram']"
                @inactive="redactDispatch.methodList=['telegram']"
            />
          </template>

        </div>

        <div class="dispatch-method-item-title">
          Телеграм
        </div>

      </div>

      <div
          class="dispatch-detail-method-item em-disabled-style"
      >
        <div class="dispatch-detail-item-checkbox">

          <template v-if="appStore.$state.activeComponent === 'newdispatch'">
            <custom-checkbox
                id="arm"
                :check-list="newDispatch.$state.methodList"
            />
          </template>

          <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
            <custom-checkbox
                id="arm"
                :check-list="redactDispatch.$state.methodList"
            />
          </template>

        </div>
        <div class="dispatch-method-item-title">
          Арм
        </div>
      </div>

      <div
          class="dispatch-detail-method-item em-disabled-style"
      >
        <div class="dispatch-detail-item-checkbox">

          <template v-if="appStore.$state.activeComponent === 'newdispatch'">
            <custom-checkbox
                id="mail"
                :check-list="newDispatch.$state.methodList"
            />
          </template>

          <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
            <custom-checkbox
                id="mail"
                :check-list="redactDispatch.$state.methodList"
            />
          </template>

        </div>
        <div class="dispatch-method-item-title">
          Почта
        </div>
      </div>

    </div>

  </div>

  <template
      v-if="(newDispatch.$state.methodError && newDispatch.$state.methodInfoText !=='') || (redactDispatch.$state.methodError && redactDispatch.$state.methodInfoText !=='')"
  >

    <div class="telegram-setcontent-error-wr error-margin-top error-margin-bottom-24">

      <template v-if="appStore.$state.activeComponent === 'newdispatch'">
        <error-panel
            :text="newDispatch.$state.methodInfoText"
        />
      </template>

      <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
        <error-panel
            :text="redactDispatch.$state.methodInfoText"
        />
      </template>

    </div>

  </template>

</template>

<script setup>
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import {useAppStore} from "@/dispatches/store/app";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";

// STORE
const newDispatch = useNewDispatchStore();
const redactDispatch = useRedactDispatchStore();
const appStore = useAppStore();

</script>

<style scoped>
.error-margin-top {
  margin-top: 12px;
}

.dispatch-method-item-title {
  padding-left: 8px;
}

.dispatch-detail-method-item {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.dispatch-detail-method-items-wr {
  display: flex;
}

.dispatch-detail-method-maintitle {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

.dispatch-detail-method-margin-bottom {
  margin-bottom: 48px;
}

.dispatch-detail-method-wr {
  border: 1px #757575 solid;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 24px;
  padding-left: 24px;
  display: flex;
  flex-direction: column;

}

</style>