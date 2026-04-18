<template>
  <div class="em-enroltable-choosemo">

    <div class="em-enroltable-choosemo-title">

      Выберите организацию от которой будет производится набор сотрудников на проект:

    </div>

    <select
        class="vue-form-select em-enroltable-choosemo-select"
        v-model="moId"
        :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
        style="background-position: right 0.75rem center;"
    >
      <option value="0">
        Не выбрано
      </option>

      <template v-for="mo in moList" :key="mo.id">
        <option :value="mo.id.toString()">
          {{ mo.moname }}
        </option>
      </template>
    </select>

    <div v-if="moId !== '0' " class="em-enroltable-choosemo-button">

      <button @click="submitMo()" class="vue-btn vue-btn-normal">
        Подтвердить
      </button>

    </div>

  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {app_config} from "@/projects/config/setconfig";

// EMITS
const emits = defineEmits(["submitmo"]);

// PROPS
const props = defineProps({
  moList: {

    type: Array,
    default(){
      return [];
    }

  }
});

// DATA
const moId = ref('0');

// METHODS
const submitMo = ()=>{

  if (moId.value !=='0'){
    emits('submitmo', Number(moId.value));
  }

}

// COMPUTED
const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg";
});

</script>

<style scoped>

.em-enroltable-choosemo {
  padding-top: 100px;
  padding-bottom: 60px;
  width: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.em-enroltable-choosemo-title {
  margin-bottom: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}
.em-enroltable-choosemo-select {
  margin-bottom: 40px;
}

.em-enroltable-choosemo-button {
  display: flex;
  justify-content: center;
}
</style>