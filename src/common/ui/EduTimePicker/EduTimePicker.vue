<template>
  <div class="edu-timepicker-container">
    <div class="edu-timepicker">
      <div
          class="edu-timepicker-input-wr"
          ref="eduTimePicker"
      >
        <input
            class="edu-timepicker-input"
            readonly
            name="edu-timepicker-input"
            :placeholder="props.placeholder"
            v-model="inputValue"
        />

        <div class="edu-timepicker-icon">
          <app-icon
              name="clock-icon"
              :size="22"
              color="#999999"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {onMounted, onUnmounted, ref} from "vue";
import { TimepickerUI } from "timepicker-ui";

// EMITS
const emits = defineEmits(['settime', 'showpicker']);


// DATA
const options = ref({
  clockType: '24h',
  switchToMinutesAfterSelectHour: true,
  delayHandler: 50,
  cancelLabel: 'Отменить',
  timeLabel: 'Выберите время',
  incrementMinutes: 5
});

const inputValue = ref('10:00');

// PROPS
const props = defineProps({
  placeholder:
      {
        type: String,
        default: 'чч:мм'
      },
  initialTime:
      {
        type: String,
        default: ''
      }
});

// DATA
const eduTimePicker = ref(null);


// LIFECYCLE
onMounted(()=>{
  if(props.initialTime !==''){
    inputValue.value = props.initialTime;
  }
  const timepicker = new TimepickerUI(eduTimePicker.value, options.value);
  timepicker.create();
  eduTimePicker.value.addEventListener("show", () => {emits('showpicker');});
  eduTimePicker.value.addEventListener("accept", ({detail})=>{
    inputValue.value = `${detail.hour}:${detail.minutes}`;
    emits('settime', `${detail.hour}:${detail.minutes}`);
  });
});

onUnmounted(()=>{
  if(eduTimePicker.value){
    eduTimePicker.value.removeEventListener("show");
    eduTimePicker.value.emoveEventListener("accept");
  }
})

</script>
<style>
.timepicker-ui-hour.active {
  color: #269999 !important;
  background-color: #C2E8E8 !important;
}
.timepicker-ui-circle-hand {
  background-color: #269999 !important;
}
.timepicker-ui-cancel-btn {
  color: #269999 !important;
}

.timepicker-ui-ok-btn {
  color: #269999 !important;
}

.timepicker-ui-dot {
  background-color: #269999 !important;
}

.timepicker-ui-clock-hand {
  background-color: #269999 !important;
}

.timepicker-ui-minutes:hover {
  color: #269999 !important;
  background-color: #C2E8E8 !important;
}

.timepicker-ui-minutes.active {
  color: #269999 !important;
  background-color: #C2E8E8 !important;
}
.timepicker-ui-wrapper-time input[type=number] {
  height: 1.5em !important;
}
.timepicker-ui-wrapper {
  height: 550px !important;
}

.timepicker-ui-hour-time-12, .timepicker-ui-minutes-time, .timepicker-ui-hour-time-24 {
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
}
.timepicker-ui-modal {
  font-family: OpenSans !important;
}

.timepicker-ui-clock-face {
  background-color: #eeeeee !important;
}
.timepicker-ui-hour, .timepicker-ui-minutes, .timepicker-ui-hour.mobile, .timepicker-ui-minutes.mobile {
  background-color: #eeeeee !important;
}


</style>

<style scoped>


.edu-timepicker-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.edu-timepicker-input-wr {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px #999999 solid;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
  padding-left: 16px;
}

.edu-timepicker-input:focus-visible {
  outline: 0 !important;
}

.edu-timepicker-input {
  max-width: 100px;
  color: #999999;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  border: none;
}

.edu-timepicker {
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>