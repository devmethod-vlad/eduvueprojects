<template>
  <div class="fm-dbstate-info-wr">

    <div class="fm-dbstate-text">
      Время последнего обновления:&nbsp;&nbsp;
      <span v-if="lastUpdateTime !== ''" class="fm-dbstate-lastupdate">
        {{ lastUpdateTime }}
      </span>
      <span v-else class="fm-dbstate-lastupdate">
        не установлено
      </span>
    </div>

    <div class="fm-dbstate-icon">

          <span v-if="isUpdateProblem" v-tippy="{ content: 'В ходе последнего обновления базы возникли проблемы!', placement : 'top-start'}">
            <app-icon name="exclamation-circle"
                      :size="38"
                      color="#dc3545"
            />
          </span>

    </div>

    <div class="fm-dbstate-button">
      <button @click="updateModalVisible=true" class="vue-btn vue-btn-normal">
        Обновить данные
      </button>
    </div>

  </div>

  <ModalWindow
      v-if="updateModalVisible"
      @closemodal="updateModalVisible=false"
      header-text="Обновление данных в базе"
  >
    <div class="fm-dbstate-update-modal-wr">
      <div class="fm-dbstate-update-modal-text">
        Вы действительно хотите обновить данные в базе. Учтите, что это длительная по времени операция. Функционал в это время будет недоступен.
      </div>
      <div class="fm-dbstate-update-modal-buttons">
        <button @click="()=>{emits('updatedb'); updateModalVisible=false}" class="vue-btn vue-btn-normal">
          Обновить
        </button>
        <button style="margin-left: 20px;" @click="updateModalVisible=false"
                class="vue-btn vue-btn-warn"
        >
          Не обновлять
        </button>
      </div>
    </div>

  </ModalWindow>
</template>

<script setup>
import ModalWindow from "@/projects/global/components/ModalWindow/ModalWindow.vue";
import {getUpdateInfo} from "@/projects/FilterMachine/services/getdbupdateinfo";
import {onMounted, onUnmounted, ref, watch} from "vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

let updateTimer;

// EMITS
const emits = defineEmits(['updatedb', 'updateactive', 'getinfoerror']);

// DATA
const lastUpdateTime = ref('');

const isUpdateProblem = ref(false);

const isUpdateActive = ref(false);

const updateFunctionActive = ref(false);

const updateModalVisible = ref(false);

// METHODS
const getDbUpdateInfo = async()=>{

  if(!updateFunctionActive.value){

    updateFunctionActive.value = true;

    let answer = await getUpdateInfo();

    // await console.log("getDbUpdateInfo answer: ", answer);

    if (answer['status'] === 'ok') {

      lastUpdateTime.value = await answer['info']['endtime'];

      Number(answer['info']['isactive']) === 1 ? isUpdateActive.value = true : isUpdateActive.value = false;
      Number(answer['info']['lastupdatefail']) === 1 ? isUpdateProblem.value = true : isUpdateProblem.value = false;

    }
    else {
      emits('getinfoerror');
    }

    updateFunctionActive.value = false;

  }

};

// LIFECYCLE
onMounted(()=>{
  getDbUpdateInfo();
  updateTimer = setInterval(getDbUpdateInfo, 3000);
});

onUnmounted(()=>{
  if(updateTimer){
    window.clearInterval(updateTimer);
  }
});

// WATCH
watch(
    isUpdateActive,
    (value) => {
      if(value){
        emits('updateactive');
      }
    },
    {deep: true}
);
</script>

<style scoped>
.fm-dbstate-update-modal-buttons {

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

}

.fm-dbstate-update-modal-text {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 60px;
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}

.fm-dbstate-lastupdate {
  color: #3a80bd;
  font-size: 1.3em;
}

.fm-dbstate-button {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fm-dbstate-icon {
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fm-dbstate-text {
  width: 45%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #58616a;
}

.fm-dbstate-loading {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fm-dbstate-info-wr {
  transition: box-shadow .2s;
  border: 1px #ced4da solid;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.fm-dbstate-info-wr:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2);
}

.text-warnstyle {
  color: #dc3545;
}

</style>