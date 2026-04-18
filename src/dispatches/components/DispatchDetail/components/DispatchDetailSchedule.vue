<template>

  <div class="dispatch-detail-schedule">

    <div class="dispatch-detail-schedule-maintitle">
      График отправки:
    </div>

    <div class="dispatch-detail-schedule-type">

      <div
          class="dispatch-schedule-type-item"
          @click="switchScheduleProcess('rightaway')"
          :class="{'schedule-active-type': setActiveTab('rightaway')}"
      >
        Сразу
      </div>

      <div
          class="dispatch-schedule-type-item left-border-none"
          @click="switchScheduleProcess('scheduled')"
          :class="{'schedule-active-type': setActiveTab('scheduled')}"
      >
        По расписанию
      </div>
    </div>

    <div
        class="dispatch-schedule-datepicker-wr"
        :class="{'em-disabled-style': setPickerVisibility()}"
    >

      <template v-if="appStore.$state.activeComponent === 'newdispatch'">
        <edu-date-picker
            @setdate="(formattedDate)=>{newDispatch.dispatchDate=formattedDate}"
            @showpicker="onShowDatePicker()"
        />
      </template>

      <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
        <edu-date-picker
            :initial-date="redactDispatch.$state.dispatchDate"
            @setdate="(formattedDate)=>{redactDispatch.dispatchDate=formattedDate}"
            @showpicker="onShowDatePicker()"
        />
      </template>

    </div>

    <template
        v-if="(newDispatch.$state.dateError && newDispatch.$state.dateInfoText !=='') || (redactDispatch.$state.dateError && redactDispatch.$state.dateInfoText !=='')">

      <div class="telegram-setcontent-error-wr">

        <template v-if="appStore.$state.activeComponent === 'newdispatch'">
          <error-panel
              :text="newDispatch.$state.dateInfoText"
          />
        </template>

        <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
          <error-panel
              :text="redactDispatch.$state.dateInfoText"
          />
        </template>
      </div>

    </template>

    <div
        class="dispatch-schedule-timepicker-wr"
        :class="{'em-disabled-style': setPickerVisibility()}"
    >

      <template v-if="appStore.$state.activeComponent === 'newdispatch'">
        <edu-time-picker
            @settime="(dTime)=>{newDispatch.dispatchTime=dTime}"
            @showpicker="onShowTimePicker()"
        />
      </template>

      <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
        <edu-time-picker
            :initial-time="redactDispatch.$state.dispatchTime.trim()"
            @settime="(dTime)=>{redactDispatch.dispatchTime=dTime}"
            @showpicker="onShowTimePicker()"
        />
      </template>

    </div>

    <template
        v-if="(newDispatch.$state.timeError && newDispatch.$state.timeInfoText !=='') || (redactDispatch.$state.timeError && redactDispatch.$state.timeInfoText !=='')"
    >

      <div class="telegram-setcontent-error-wr error-margin-top">

        <template v-if="appStore.$state.activeComponent === 'newdispatch'">
          <error-panel
              :text="newDispatch.$state.timeInfoText"
          />
        </template>

        <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
          <error-panel
              :text="redactDispatch.$state.timeInfoText"
          />
        </template>

      </div>

    </template>

  </div>

</template>

<script setup>
import EduTimePicker from "@/common/ui/EduTimePicker/EduTimePicker.vue";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import EduDatePicker from "@/common/ui/EduDatePicker/EduDatePicker.vue";
import {useAppStore} from "@/dispatches/store/app";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";

// STORE
const newDispatch = useNewDispatchStore();
const redactDispatch = useRedactDispatchStore();
const appStore = useAppStore();

// METHODS
const switchScheduleProcess = (scheduleType)=>{
  if(appStore.$state.activeComponent === 'newdispatch'){
    switchScheduleType(scheduleType, newDispatch);
  }
  else if(appStore.$state.activeComponent === 'modifydispatch'){
    switchScheduleType(scheduleType, redactDispatch);
  }
}

const switchScheduleType = (scheduleType, dispatchStore)=>{
    dispatchStore.scheduleType = scheduleType;
    dispatchStore.dateError = false;
    dispatchStore.dateInfoText = '';
    dispatchStore.timeError = false;
    dispatchStore.timeInfoText = '';
}

const setActiveTab = (scheduleType)=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    return newDispatch.$state.scheduleType === scheduleType;
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    return redactDispatch.$state.scheduleType === scheduleType;
  }
}

const setPickerVisibility = ()=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    return newDispatch.$state.scheduleType === 'rightaway';
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    return redactDispatch.$state.scheduleType === 'rightaway';
  }
}


const onShowDatePicker = ()=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    newDispatch.dateError = false;
    newDispatch.dateInfoText = '';
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    redactDispatch.dateError = false;
    redactDispatch.dateInfoText = '';
  }
}

const onShowTimePicker = ()=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    newDispatch.timeError = false;
    newDispatch.timeInfoText = '';
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    redactDispatch.timeError = false;
    redactDispatch.timeInfoText = '';
  }
}

</script>

<style scoped>
.error-margin-top {
  margin-top: 12px;
}

.dispatch-schedule-datepicker-wr {
  margin-bottom: 12px;
}

.left-border-none {
  border-left: none !important;
}

.schedule-active-type {
  background-color: #FFF199;
}

.dispatch-schedule-type-item:hover {
  background-color: #FFF199;
}

.dispatch-schedule-type-item {
  cursor: pointer;
  border: 1px #999999 solid;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.dispatch-detail-schedule-type {
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-start;
}

.dispatch-detail-schedule-maintitle {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

.dispatch-detail-schedule {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px #757575 solid;
  padding-top: 16px;
  padding-bottom: 10px;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 62px;
}

</style>