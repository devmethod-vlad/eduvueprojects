<template>
  <div class="enrol-space-wr">

    <div class="enrol-space-title">
      Набор пользователей на проект
    </div>

    <div class="enrol-space-selectproject-wr">

      <div class="enrol-space-title-gray">
        Выбран проект&nbsp;&nbsp;
        <span v-if="projectsList.length > 0" @click="projectsList.length > 0 ? openSelectProject() : null"
              v-tippy="{ content: 'Уточнить проект',placement : 'top-start'}"
        >
          <app-icon name="setting"
                    :size="38"
                    color="#1e8686"
          />
        </span>
        &nbsp;&nbsp;
        <template v-if="Number(activeProject.id) !== 0">
          <span class="enrol-space-title-span">
            {{ activeProject.name }}
          </span>
        </template>
        <template v-else>
          <span @click="projectsList.length > 0 ? openSelectProject() : null" class="enrol-space-title-span">
            не определено
          </span>
        </template>
      </div>

      <div v-if="selectProjectVisible && projectsList.length > 0" class="select-project-wr">

        <div class="select-project-disclaimer">
          Вы можете уточнить проект, с которым собираетесь работать. Для этого укажите либо id проекта, либо найдите проект в выпадающем списке
        </div>

        <div class="select-project-id-input">
          <label for="project-id-input" class="vue-form-label">
            <strong>
              Введите id проекта:
            </strong>
          </label>
          <input @input="processIdInput()" type="number"
                 min="1" name="project-id-input"
                 id="project-id-input" class="vue-form-control"
                 :class="{'input-id-success': inputIdSuccess}" v-model="inputActiveProjId"
          />
        </div>

        <div class="select-project-dropdown">

          <div class="select-project-drop-title">
            Выберите из списка:
          </div>

          <drop-down-list
              :data-list="projectsList"
              id-field="id"
              value-field="name"
              :active-value="activeProject.name"
              @onselect="(item)=>{processSelectDropdown(item)}"
          />
        </div>

      </div>

      <div v-if="Number(activeProject.id) !==0 && filtersActive && !fmStore.$state.isFirstRequest" class="enrol-space-synchroswitch-wr">

        <label class="em-switch">
          <input type="checkbox" v-model="synchroSwitch">
          <span class="em-slider round"></span>
        </label>

        <div class="enrol-space-switch-title">
          <template v-if="synchroSwitch">
            Отключить синхронизацию проекта с фильтрами
          </template>
          <template v-else>
            Включить синхронизацию проекта с фильтрами
          </template>
        </div>

      </div>

      <div v-if="Number(activeProject.id) !==0 && filtersActive && !fmStore.$state.isFirstRequest" class="enrol-space-addsettings-wr">

        <label class="em-switch">
          <input type="checkbox" v-model="rewriteSwitch">
          <span class="em-slider round"></span>
        </label>

        <div class="enrol-space-switch-title">
          <template v-if="rewriteSwitch">
            Участники проекта будут перезаписаны
          </template>
          <template v-else>
            К проекту будут добалены новые участники
          </template>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import {getProjectsListEnrol} from "@/projects/FilterMachine/services/getprojlistforenrol";
import DropDownList from "@/projects/global/components/DropDownList/DropDownList.vue";
import {useFmStore} from "@/projects/global/store/fm";
import {updateFmState} from "@/projects/FilterMachine/services/updatefmstate";
import {computed, onMounted, ref, watch} from "vue";
import {app_config} from "@/projects/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

// PROPS
const props = defineProps({
  projectIdProps: {
    type: Number,
    default: 0
  }
});

// STORE
const fmStore = useFmStore();

// DATA
const rewriteSwitch = ref(true);

const synchroSwitch = ref(false);

const selectProjectVisible = ref(false);

const inputIdSuccess = ref(false);

const inputActiveProjId = ref(0);

const activeProject = ref({
  id: 0,
  name: ''
});

const projectsList = ref([]);

// METHODS
const checkProject =()=>{

  console.log("checkProject this.projectIdProps: ", props.projectIdProps);
  console.log("checkProject tthis.projectsList: ", projectsList.value);

  if (props.projectIdProps !== 0 && projectsList.value.length >0 ){
    for (let proj of projectsList.value){
      if(Number(proj.id) === Number(props.projectIdProps)){
        activeProject.value.id = Number(proj.id);
        inputActiveProjId.value = Number(proj.id);
        activeProject.value.name = proj.name;
      }
    }
  }

};


const processSelectDropdown = (item)=>{
  console.log("processSelectDropdown item:", item);

  if(Number(item.id) !==0 && item.value !==''){
    activeProject.value.id = Number(item.id);
    activeProject.value.name = item.value;
    inputActiveProjId.value = item.id;
    inputIdSuccess.value = true;
  }

};

const getProjList = async()=>{
  let answer = await getProjectsListEnrol();
  await console.log("getProjList answer: ", answer);

  if(answer['status'] === 'ok') {
    projectsList.value = await answer['info']['project_list'];
  }
};

const openSelectProject =()=>{
  selectProjectVisible.value = !selectProjectVisible.value;
};

const processIdInput = ()=>{

  inputIdSuccess.value = false;
  console.log("processIdInput this.inputActiveProjId:", inputActiveProjId.value);

  let match = projectsList.value.find((item)=>{
    return Number(item.id) === Number(inputActiveProjId.value)
  });

  if(match){
    inputIdSuccess.value = true;
    activeProject.value.id = Number(match.id);
    activeProject.value.name = match.name;
  }
  else {
    activeProject.value.id = 0;
    activeProject.value.name = '';
  }

};

// COMPUTED
const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg"
});

const filtersActive = ()=>{

  let rolesEmpty = false;
  let specsEmpty = false;
  let mosEmpty = false;

  if (fmStore.$state.roleState.inactiveList.length === 0 && fmStore.$state.roleState.activeList.length === 0){
    rolesEmpty = true;
  }

  if (fmStore.$state.specState.inactiveList.length === 0 && fmStore.$state.specState.activeList.length === 0){
    specsEmpty = true;
  }

  if (fmStore.$state.moState.inactiveList.length === 0 && fmStore.$state.moState.activeList.length === 0){
    mosEmpty = true;
  }

  return !(rolesEmpty && specsEmpty && mosEmpty);

};

const requestParams = computed(()=>{
  return {
    'apiurl': app_config.apiUrl,
    'projectid': Number(activeProject.value.id),
    'role_activeall': fmStore.$state.roleState.activeAll ? 1 : 0,
    'role_activelist': fmStore.$state.roleState.activeList,
    'role_inactivelist': fmStore.$state.roleState.inactiveList,
    'spec_activeall': fmStore.$state.specState.activeAll ? 1 : 0,
    'spec_activelist': fmStore.$state.specState.activeList,
    'spec_inactivelist': fmStore.$state.specState.inactiveList,
    'mo_disableall': fmStore.$state.moState.disableAll ? 1 : 0,
    'mo_activelist': fmStore.$state.moState.activeList,
    'mo_inactivelist': fmStore.$state.moState.inactiveList,
    'user_disableall': fmStore.$state.userState.disableAll ? 1 : 0,
    'user_activelist': fmStore.$state.userState.activeList,
    'user_inactivelist': fmStore.$state.userState.inactiveList,
    'fm_rewrite': rewriteSwitch.value ? 1 : 0,
    'fm_synchronized': synchroSwitch.value ? 1 : 0,

  }
});

// LIFECYCLE
onMounted(async ()=>{
  await getProjList();
  await checkProject();
});

// WATCH
watch(
    rewriteSwitch,
    async (newValue) => {
      let copyFmStore = {...fmStore.$state};
      newValue ? copyFmStore.rewriteSwitch = 1 : copyFmStore.rewriteSwitch = 0;

      fmStore.$patch(copyFmStore);

      if(synchroSwitch.value){
        await updateFmState(requestParams.value);
      }
    }
);

watch(
    synchroSwitch,
    async () => {
      await updateFmState(requestParams.value);
    }
);
</script>

<style scoped>

.enrol-space-addsettings-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.enrol-space-switch-title {
  padding-left: 30px;
  font-weight: bold;
  font-size: 1.2em;
  color: #6c757d;
}

.enrol-space-synchroswitch-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.em-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.em-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.em-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.em-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .em-slider {
  background-color: #2196F3;
}

input:focus + .em-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .em-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.em-slider.round {
  border-radius: 34px;
}

.em-slider.round:before {
  border-radius: 50%;
}

.input-id-success:focus {
  border-color: #1e8686 !important;
  box-shadow: 0 0 0 0.25rem rgba(30, 134, 134, 0.3) !important;
}

.select-project-drop-title {
  font-weight: bold;
  color: #959595;
}

.select-project-dropdown {
  margin-bottom: 30px;
}

.select-project-id-input {
  margin-bottom: 30px;
}

.select-project-id-input input {
  width: auto !important;
}


.select-project-disclaimer {
  font-weight: bold;
  font-size: 1.2em;
  color: #1e8686;
  margin-bottom: 30px;
}

.select-project-wr {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 30px;
  border: 1px #ced4da dashed;
}

.enrol-space-title-span {
  color: #1768ab;
}

.enrol-space-title-gray {
  margin-bottom: 30px;
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  font-weight: bold;
  font-size: 1.4em;
  color: #6c757d;
}

.enrol-space-selectproject-wr {
  margin-top: 40px;
  margin-bottom: 40px;
}

.enrol-space-title {
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}

.enrol-space-wr {
  display: flex;
  flex-direction: column;
}

</style>