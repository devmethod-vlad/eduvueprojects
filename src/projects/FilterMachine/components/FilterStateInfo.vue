<template>

  <div class="fm-stateinfo-wr">

    <div class="fm-stateinfo-resetstate">
      <div class="fm-stateinfo-resetstate-title">
        Сбросить состояние:
      </div>
      <div class="fm-stateinfo-resetstate-button">
        <button @click="resetModalVisible=true" class="vue-btn vue-btn-normal"
                :class="{'em-disabled-style': !resetStateVisibility}">
          Сбросить
        </button>
      </div>
    </div>

    <div class="fm-stateinfo-savestate">
      <div class="fm-stateinfo-savestate-title">
        Сохранение состояния между сессиями:
      </div>
      <div class="fm-stateinfo-savestate-checkbox">
        <input v-model="stateCheckBox" type="checkbox" />
      </div>
    </div>

  </div>

  <ModalWindow
      v-if="resetModalVisible"
      @closemodal="resetModalVisible=false"
      header-text=""
  >
    <div class="fm-stateinfo-modal-wr">
      <div class="fm-stateinfo-modal-text">
        Вы действительно хотите сбросить состояние ранее выставленных фильтров?
      </div>
      <div class="fm-stateinfo-modal-buttons">
        <button @click="resetState()" class="vue-btn vue-btn-normal">
          Да
        </button>
        <button style="margin-left: 20px;" @click="resetModalVisible=false"
                class="vue-btn vue-btn-warn"
        >
          Нет
        </button>
      </div>
    </div>

  </ModalWindow>

</template>

<script setup>
import ModalWindow from "@/projects/global/components/ModalWindow/ModalWindow.vue";
import {useFmStore} from "@/projects/global/store/fm";
import {onMounted, ref, watch} from "vue";

// EMITS
const emits = defineEmits(['resetstate']);

// STORE
const fmStore = useFmStore();


// DATA
const stateCheckBox = ref(false);

const resetButtonEnable = ref(false);

const resetModalVisible = ref(false);

// METHODS
const resetLocalState = ()=>{

  if(localStorage.getItem('em-fm-mos')){
    localStorage.setItem('em-fm-mos', JSON.stringify({'disableAll': 0, 'list':[]}))
  }
  if(localStorage.getItem('em-fm-roles')){
    localStorage.setItem('em-fm-roles', JSON.stringify({'activeAll': 0, 'list':[]}))
  }
  if(localStorage.getItem('em-fm-specs')){
    localStorage.setItem('em-fm-specs', JSON.stringify({'activeAll': 0, 'list':[]}))
  }
};

const resetState = ()=>{

  let copyFmStore = {...fmStore.$state};

  copyFmStore.roleState.activeList = [];
  copyFmStore.roleState.inactiveList = [];
  copyFmStore.roleState.activeAll = false;

  copyFmStore.specState.activeList = [];
  copyFmStore.specState.inactiveList = [];
  copyFmStore.specState.activeAll = false;

  copyFmStore.moState.activeList = [];
  copyFmStore.moState.inactiveList = [];
  copyFmStore.moState.disableAll = false;

  copyFmStore.userState.activeList = [];
  copyFmStore.userState.inactiveList = [];
  copyFmStore.userState.disableAll = false;

  copyFmStore.isFirstRequest = true;

  copyFmStore.rewriteSwitch = 1;

  fmStore.$patch(copyFmStore);

  resetLocalState();

  resetModalVisible.value = false;

  emits('resetstate');

};

// COMPUTED
const resetStateVisibility  = computed(()=>{

  let resetFlag = false;

  if (fmStore.$state.roleState.activeList.length >0 || fmStore.$state.roleState.inactiveList.length >0){
    resetFlag = true;
  }
  if (fmStore.$state.specState.activeList.length >0 || fmStore.$state.specState.inactiveList.length >0){
    resetFlag = true;
  }
  if (fmStore.$state.moState.activeList.length >0 || fmStore.$state.moState.inactiveList.length >0){
    resetFlag = true;
  }
  if (fmStore.$state.userState.activeList.length >0 || fmStore.$state.userState.inactiveList.length >0){
    resetFlag = true;
  }

  if (localStorage.getItem('em-fm-roles')){

    let rolesLocal = JSON.parse(localStorage.getItem('em-fm-roles'));

    if(rolesLocal.list.length >0){
      resetFlag = true;
    }
  }

  if (localStorage.getItem('em-fm-specs')){

    let specsLocal = JSON.parse(localStorage.getItem('em-fm-specs'));

    if(specsLocal.list.length >0){
      resetFlag = true;
    }
  }

  if (localStorage.getItem('em-fm-mos')){

    let mosLocal = JSON.parse(localStorage.getItem('em-fm-mos'));

    if(mosLocal.list.length >0){
      resetFlag = true;
    }
  }

  return resetFlag
});

// LIFECYCLE
onMounted(()=>{
  let copyFmStore = {...fmStore.$state};

  if (localStorage.getItem('em-fm-savestate')){

    let stateLocal = JSON.parse(localStorage.getItem('em-fm-savestate'));

    if (stateLocal.savestate){
      copyFmStore.saveState = true;
      stateCheckBox.value = true;
    }
    else {
      copyFmStore.saveState = false;
    }

  }
  else {

    copyFmStore.saveState = true;

    localStorage.setItem('em-fm-savestate', JSON.stringify({'savestate': true}));

    stateCheckBox.value = true;

  }
  fmStore.$patch(copyFmStore);

});

// WATCH
watch(
    stateCheckBox,
    (value) => {
      let copyFmStore = {...fmStore.$state};

      if(value){
        copyFmStore.saveState = true;
      }
      else {
        copyFmStore.saveState = false;
        resetLocalState();
      }

      fmStore.$patch(copyFmStore);
    },
    {deep: true}
);

</script>

<style scoped>

.fm-stateinfo-modal-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.fm-stateinfo-modal-text {
  padding-top: 50px;
  padding-bottom: 50px;
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}

.fm-stateinfo-savestate-checkbox {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fm-stateinfo-resetstate-button {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fm-stateinfo-resetstate-title {
  font-weight: bold;
  font-size: 1.2em;
  color: #58616a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fm-stateinfo-savestate-title {
  font-weight: bold;
  font-size: 1.2em;
  color: #58616a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fm-stateinfo-savestate {
  width: 50%;
  display: flex;
  flex-direction: column;

}

.fm-stateinfo-resetstate {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.fm-stateinfo-wr {
  transition: box-shadow .2s;
  border: 1px #ced4da solid;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 25px;
  padding-top: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.fm-stateinfo-wr:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2);
}

</style>