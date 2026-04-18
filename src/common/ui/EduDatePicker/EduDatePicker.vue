<template>
  <div class="edu-datepicker-container">
    <div class="edu-datepicker">
      <div class="edu-datepicker-input-wr">
        <input
            ref="eduDatePicker"
            class="edu-datepicker-input"
            readonly
            name="edu-datepicker-input"
            :placeholder="props.placeholder"
        />

        <div class="edu-datepicker-icon">
          <app-icon
              name="calendar"
              :size="16"
              color="#999999"
              hover-color="#999999"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {onMounted, ref} from "vue";

// EMITS
const emits = defineEmits(['setdate', 'showpicker']);

// DATA
const options = ref({
  minDate: new Date(),
  onSelect: ({date, formattedDate, datepicker}) => {
    emits('setdate', formattedDate);
    datepicker.hide();
  },
  onShow: ()=>{
    emits('showpicker');
  }
})

// PROPS
const props = defineProps({
  placeholder:
      {
        type: String,
        default: 'дд.мм.гггг'
      },

  initialDate:
      {
        type: String,
        default: ''
      }
});


// DATA
const eduDatePicker = ref(null);

// LIFECYCLE
onMounted(()=>{
  if(props.initialDate !==''){

    options.value.selectedDates = props.initialDate.split(".")[2]+"-"+props.initialDate.split(".")[1]+"-"+props.initialDate.split(".")[0];
  }
  new AirDatepicker(
      eduDatePicker.value,
      options.value
  );
})


</script>

<style scoped>
.edu-datepicker-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.edu-datepicker-input-wr {
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

.edu-datepicker-input:focus-visible {
  outline: 0 !important;
}

.edu-datepicker-input {
  min-width: 150px;
  color: #999999;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  border: none;
}

.edu-datepicker {
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>