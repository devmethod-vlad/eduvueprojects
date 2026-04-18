<template>
    <ModalContentNew
        :header-text="props.formHeader"
        modal-size="middle"
        @close-modal="emits('closeprojectformmodal')"
        :ignore-elements="['item-settings-'+props.projectInfo.id.toString(), 'vue-projectslist-plus']"
        :actionelement="'item-settings-'+props.projectInfo.id"
    >
      <div v-if="isLoading" class="vue-project-form-loading">

      </div>

      <div v-else class="vue-project-form-wr">
        <div class="vue-project-form">
          <form @submit.prevent="validateProjectForm()"
                method="post" class="vueprojectform"
          >
            <fieldset class="vue-fieldset">

              <div class="vue-form-item vueprojectform-name-wr">
                <label for="vueprojectform-name-input" class="vue-form-label"><strong>Название проекта</strong></label>
                <input @:focus="processOnFosus()" type="text"
                       class="vue-form-control" :class="{'vue-input-error':errorStyleName}"
                       name="vueprojectform-name-input" id="vueprojectform-name-input"
                       v-model="nameInput"
                >
              </div>

              <div class="vue-form-item vueprojectform-desc-wr">
                <label for="vueprojectform-desc-input" class="vue-form-label">
                  <strong>Описание проекта</strong>
                </label>
                <textarea rows="5" type="text"
                          class="vue-form-control" :class="{'vue-input-error':errorStyleDesc}"
                          name="vueprojectform-desc-input" id="vueprojectform-desc-input"
                          v-model="descInput"
                >
                </textarea>
              </div>

              <div class="vue-form-item vueprojectform-enroltypes-wr">
                <div class="vueprojectform-enroltypes-title-wr">
                  <div class="vueprojectform-enroltypes-icon">
                    <app-icon name="user-plus"
                              :size="20"
                              color="#1e8686"
                    />
                  </div>
                  <div class="vueprojectform-enroltypes-title">
                    Способы записи на проект:
                  </div>
                </div>
                <div v-for="enrol in listStore.$state.availEnrolTypes" :key="enrol.name"
                     class="vueprojectform-enroltypes-item"
                >
                  <div class="vueprojectform-enroltype-checkbox">
                    <input :id="'checkbox-enroltype-'+enrol.id.toString()" @click="onClickEnrolTypes($event, enrol.name)"
                           type="checkbox" name="vueprojectform-enroltype-checkbox"
                           :value="enrol.name"
                           v-model="checkedEnrolTypes"
                    >
                  </div>
                  <div @click="emulateClick('checkbox-enroltype-'+enrol.id.toString())" class="vueprojectform-enroltype-title">
                    <strong>
                      {{ enrol.name }}
                    </strong>
                  </div>
                </div>

              </div>

              <div class="vueprojectform-activecheckbox-maintitle-wr">
                <div class="vueprojectform-activecheckbox-maintitle-icon">
                  <app-icon name="eyes-on"
                            :size="20"
                            color="#1e8686"
                  />
                </div>
                <div class="vueprojectform-activecheckbox-maintitle">
                  Доступность для пользователей:
                </div>
              </div>

              <div class="vue-form-item vueprojectform-activecheckbox-wr">
                <div class="vueprojectform-activecheckbox">
                  <input type="checkbox" name="vueprojectform-activecheckbox"
                         id="vueprojectform-activecheckbox" v-model="activeCheckbox"
                  >
                </div>
                <div @click="activeCheckbox = !activeCheckbox" class="vueprojectform-activecheckbox-title">
                  <strong>
                    Доступен пользователям
                  </strong>
                </div>

              </div>

              <div class="vue-vueprojectform-actions-wr">

                <div class="vue-vueprojectform-actions-title-wr">
                  <div class="vue-vueprojectform-actions-icon">

                    <app-icon
                        name="create-dashboard"
                        :size="20"
                        color="#1e8686"
                    />

                  </div>
                  <div class="vue-vueprojectform-actions-title">
                    Активности, доступные для включения в проект:
                  </div>
                </div>

                <div v-for="action in listStore.$state.availActionsList" class="vueprojectform-action-item-container"
                     :key="action.name"
                >
                  <div class="vueprojectform-action-item" :class="Number(submitActionId) === Number(action.id) ? 'vue-disabled' : ''">
                    <div class="vueprojectform-action-checkbox">
                      <input :id="'action-checkbox-'+action.id.toString()" @click.prevent="actionClick($event, action.id)"
                             type="checkbox" :value="action.name"
                             v-model="actionChecked"
                      >
                    </div>
                    <div @click="emulateClick('action-checkbox-'+action.id.toString())" class="vueprojectform-action-title">
                      {{ action.name }}
                    </div>
                  </div>

                  <AddAction
                      v-if="Number(submitActionId) === Number(action.id)"

                      :action-id="action.id"
                      :action-name="action.name"
                      :action-flag="submitActionChecked"

                      @submitno="submitActionId=0"
                      @submityes="(actionObject)=>submitAction(actionObject)"
                  />
                </div>
              </div>


              <div class="vueprojectform-actionslist-container">

                <template v-if="actionChecked.includes(app_config.actionSurveyName)">
                  <div class="vueprojectform-surveylist-container">
                    <div class="vueprojectform-surveylist-title">
                      {{ app_config.actionSurveyName }} :
                    </div>
                    <template v-for="action in reactiveExistActions" :key="action.name">
                      <template v-if="action.action_name === app_config.actionSurveyName">
                        <div class="vueprojectform-surveylist-item">
                          <div v-tippy="{ content: 'Перейти к редактору' }" class="vueprojectform-surveylist-item-text">
                            &#x2022;&nbsp;&nbsp;<a :href="app_config.portalSurveyRedactUrl+'?surveyid='+action.id.toString()">
                            {{ action.name }}
                          </a>
                          </div>
                          <div v-tippy="{ content: 'Удалить' }" @click="deleteExistAction(action.action_name, action.id)"
                               class="vueprojectform-surveylist-item-deleteicon"
                          >
                            <app-icon name="trash-alt"
                                      :size="20"
                                      color="#1e8686"
                            />
                          </div>
                          <div v-tippy="{ content: 'Редактировать название' }" @click="redactActionId = Number(action.id)"
                               class="vueprojectform-surveylist-item-redacticon"
                          >
                            <app-icon name="edit-alt"
                                      :size="20"
                                      color="#1e8686"
                            />
                          </div>
                        </div>
                        <RedactActionName v-if="Number(redactActionId) === Number(action.id)"
                           :action-name="action.name"
                           @emitname="(newname)=>{changeExistActionName(newname, action.action_name, action.id)}"
                           @closeredact="redactActionId = 0"
                        />

                      </template>
                    </template>

                    <div v-if="newActions.length>0" class="vueprojectform-surveylist-new-title">
                      Новые
                    </div>
                    <template v-for="newaction in newActions" :key="newaction.name">
                      <template v-if="newaction.action_name === app_config.actionSurveyName">
                        <div class="vueprojectform-surveylist-item">
                          <div class="vueprojectform-surveylist-item-text">
                            &#x2022;&nbsp;&nbsp;{{ newaction.name }}
                          </div>
                          <div @click="deleteNewAction(newaction.action_name, newaction.name)" class="vueprojectform-surveylist-item-deleteicon">
                            <app-icon name="trash-alt"
                                      :size="20"
                                      color="#1e8686"
                            />

                          </div>
                          <div @click="redactNewActionObject.action_name = newaction.action_name; redactNewActionObject.name = newaction.name"
                               class="vueprojectform-surveylist-item-redacticon">
                            <span v-tippy="{ content: 'Редактировать название' }">
                              <app-icon name="edit-alt"
                                        :size="20"
                                        color="#1e8686"
                              />
                            </span>
                          </div>

                        </div>
                        <RedactActionName v-if="redactNewActionObject.action_name === newaction.action_name && redactNewActionObject.name === newaction.name"
                                          :action-name="newaction.name"
                                          @emitname="(newname)=>{changeNewActionName(newname, newaction.action_name, newaction.name)}"
                                          @closeredact="redactNewActionObject.action_name =''; redactNewActionObject.name = ''"
                        />

                      </template>
                    </template>


                  </div>

                  <div @click="addNewAction(app_config.actionSurveyName)" class="vueprojectform-surveylist-add-wr">
                    <div class="vueprojectform-surveylist-add-icon">
                      <app-icon name="plus-circle"
                                :size="20"
                                color="#1e8686"
                      />
                    </div>
                    <div class="vueprojectform-surveylist-add-title">
                      Добавить
                    </div>
                  </div>
                </template>

                <template v-if="actionChecked.includes(app_config.actionEnrolName) && existProjectActions.includes(app_config.actionEnrolName)">
                  <div class="vueprojectform-enrollist-container">
                    <div class="vueprojectform-enrollist-title">
                      <a :href="app_config.mainStatUrl+'?projectid='+projectInfo.id.toString()">Перейти к плагину набора сотрудников на проект</a>
                    </div>
                  </div>
                </template>

              </div>

              <div v-if="validateInfo !== ''" class="vueprojectform-validate-errors"
                   :class="{'validate-normal': validateNormalStyle}"
              >
                <div v-html="validateInfo">

                </div>
              </div>


              <div class="vue-form-item vueprojectform--button-wr">
                <button type="submit" class="vue-btn vue-btn-normal vueprojectform--button">
                  <strong>
                    {{ buttonText }}
                  </strong>
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </ModalContentNew>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import AddAction from "@/projects/ProjectsList/components/AddAction";
import {checkNewActionName} from "@/projects/ProjectsList/services/checknewactioname";
import {saveProject} from "@/projects/ProjectsList/services/saveproject";
import RedactActionName from "@/projects/ProjectsList/components/RedactActionName";
import {checkProjectName} from "@/projects/ProjectsList/services/checkprojname";
import {useListStore} from "@/projects/ProjectsList/store/list";
import {app_config} from "@/projects/config/setconfig";
import {computed, onMounted, ref} from "vue";

// EMITS
const emits = defineEmits(['formrefreshlist', 'closeprojectformmodal']);

// PROPS
const props = defineProps({
  projectInfo:{
    type: Object,
    default(){
      return {

        id: 0,
        name: '',
        description: '',
        created_at: '',
        created_at_format: '',
        active: 0,
        cross_project_actions: [],
        project_actions: [],
        project_enrols: [],
        totalmembers: []

      };
    }
  },

  formTarget: {
    type: String,
    default: ''
  },

  formHeader:{
    type: String,
    default: ''
  }
});

// STORE
const listStore = useListStore();


// DATA
const isLoading = ref(false);
const nameInput = ref('');
const descInput = ref('');
const activeCheckbox = ref(true);
const errorStyleName = ref(false);
const errorStyleDesc = ref(false);
const submitActionId = ref(0);
const submitActionChecked = ref(false);
const redactActionId = ref(0);
const actionDisabled = ref(false);

const validateInfo = ref('');

const validateNormalStyle = ref(false);

//["Тестирование | Опрос | Анкета"]
const actionChecked = ref([]);

//[{action_name: "Тестирование | Опрос | Анкета", name: "Новый опрос 5"}]
const newActions = ref([]);

//[{action_name: "Тестирование | Опрос | Анкета", id: 8}]
const actionsToDelete = ref([]);

//["Доступ по списку логинов ЕМИАС"]
const checkedEnrolTypes = ref([]);

const reactiveExistActions = ref([]);

const existActionsToRedactName = ref([]);

const redactNewActionObject  = ref({'action_name':'','name':''});

// METHODS
const emulateClick=(id)=>{
  validateInfo.value = '';
  document.getElementById(id).click();
};

const changeExistActionName = (newname, action_name, id)=>{
  for (let exItem of reactiveExistActions.value){
    if (exItem.action_name === action_name && Number(exItem.id) === Number(id)){
      exItem.name = newname;
      existActionsToRedactName.value.push({'action_name': action_name, 'id': id, 'newname': newname});
    }
  }
  redactActionId.value = 0;
};

const changeNewActionName = (newname, action_name, name)=>{
  for (let newItem of newActions.value){
    if(newItem.action_name === action_name && name === newItem.name){
      newItem.name = newname;
    }
  }
};

const deleteNewAction = (action_name, name)=>{
  for (let [index, item] of Object.entries(newActions.value)){
    if(item.action_name === action_name && name === item.name){
      newActions.value.splice(Number(index),1);
    }
  }
};

const deleteExistAction = (action_name, actionid)=>{

  for (let [exIndex, exItem] of Object.entries(reactiveExistActions.value)){
    if(exItem.action_name === action_name && actionid === exItem.id){
      reactiveExistActions.value.splice(Number(exIndex),1);
      actionsToDelete.value.push({'action_name':action_name, 'id': actionid});
    }
  }
  let filterByActionName = reactiveExistActions.value.map((item)=>{
    if(item.action_name === action_name){
      return item;
    }
  });
  if (filterByActionName.length === 0){
    if (actionChecked.value.includes(action_name )){
      let actIndex = actionChecked.value.indexOf(action_name);
      if (actIndex !== -1){
        actionChecked.value.splice(actIndex, 1);
      }
    }
  }
};

const validateProjectForm = async ()=>{

  validateInfo.value = '';
  validateNormalStyle.value = false;
  let validatePass = true;

  if (Number(props.projectInfo.id) === 0 ||
      (Number(props.projectInfo.id) !== 0 && props.projectInfo.name !== nameInput.value )
  ){
    let checkNameResp = await checkProjectName(nameInput.value);

    if (checkNameResp.status !== 'ok'){
      errorStyleName.value = true;
      validateInfo.value = validateInfo.value+'<p class="p-error">- проект с таким названием уже существует</p>';
      validatePass = false;
    }
  }

  if (checkedEnrolTypes.value.length === 0){
    validatePass = false;
    validateInfo.value = validateInfo.value+'<p class="p-error">- не указан способ записи пользователей на проект</p>';
  }
  if (nameInput.value === '' || nameInput.value === 'Укажите название проекта'){
    errorStyleName.value = true;
    nameInput.value = 'Укажите название проекта';
    validateInfo.value = validateInfo.value+'<p class="p-error">- укажите название проекта</p>';
    validatePass = false;
  }
  if (validatePass){
    saveProj();
  }

};

const saveProj = async()=>{
  let action='';
  if(props.formTarget === 'create'){
    action = 'savenewproject';
  }
  else if (props.formTarget === 'redact'){
    action = 'saveproject';
  }

  let saveResp = await saveProject(action, computedProjectParams.value);

  if (saveResp['status'] === 'ok'){
    validateInfo.value = '<p class="p-normal">Вы успешно сохранили изменения!</p>';
    validateNormalStyle.value = true;
    let copyListStore = await {...listStore.$state};
    if(props.formTarget === 'create'){
      copyListStore.projIdActiveModal = 0;
    }
    else if(props.formTarget === 'redact'){
      copyListStore.projValidateInfo = validateInfo.value;
    }

    await listStore.$patch(copyListStore);

    emits('formrefreshlist');

  }
  else{
    if(saveResp['user_mess']){
      validateInfo.value = await saveResp['user_mess'];
    }
    else {
      validateInfo.value = 'При попытке сохранить изменения произошла ошибка!';
    }
  }

};

const onClickEnrolTypes = (event, name)=>{
  validateInfo.value = '';
  if (event.target.checked){
    checkedEnrolTypes.value = [name];
  }
  else {
    checkedEnrolTypes.value = [];
  }
};

const addNewAction = async(name)=>{

  validateInfo.value = '';

  let needCheck = false;

  let newActionName = '';

  if (app_config.actionSurveyName === name){
    newActionName = app_config.newSurveyActionName+' 1';
  }

  let filter_newActions = await newActions.value.map((item)=>{if(item.action_name === name){return item}});

  if (filter_newActions.length === 0){

    needCheck = true;

  }
  else{

    let indexArr = [];
    for (let item of filter_newActions){
      if(item.name.includes(app_config.newSurveyActionName)){
        try{
          indexArr.push(Number(item.name.split(" ")[2]))
        }
        catch (e){
          console.log("");
        }
      }
    }

    if (indexArr.length === 0){
      needCheck = true;
    }
    else {
      let maxIndex = Math.max.apply(Math, indexArr);
      let nextIndex = maxIndex+1;
      newActionName = app_config.newSurveyActionName+' '+nextIndex.toString();

    }
  }
  if (needCheck){
    let checkAnswer = await checkNewActionName(name);
    if (checkAnswer['status'] === 'ok'){
      await newActions.value.push({'action_name': name, 'name': checkAnswer['info']['newname']})
    }
  }
  else {
    await newActions.value.push({'action_name': name, 'name': newActionName})
  }
};


const processOnFosus = ()=>{
  validateInfo.value = '';
  errorStyleName.value = false;
  if (nameInput.value === 'Укажите название проекта'){
    nameInput.value = '';
  }
};

const actionClick = (event, id)=>{

  validateInfo.value = '';

  if(event.target.checked){
    submitActionChecked.value = true;
  }
  else {
    submitActionChecked.value = false;
  }
  submitActionId.value = id;
};

const submitAction = (actionObject)=>{

  submitActionId.value = 0;

  if (actionObject.actionFlag){
    if(!actionChecked.value.includes(actionObject.actionName)){
      actionChecked.value.push(actionObject.actionName)
    }
  }
  else {
    for (let [exIndex, exItem] of Object.entries(reactiveExistActions.value)){
      if(exItem.action_name === actionObject.actionName){
        reactiveExistActions.value.splice(Number(exIndex),1);
        actionsToDelete.value.push({'action_name':actionObject.actionName, 'id': exItem.id});
      }
    }
    for (let [newIndex, newItem ] of Object.entries(newActions.value)){
      if(newItem.action_name === actionObject.actionName){
        newActions.value.splice(Number(newIndex),1);
      }
    }
    if(actionChecked.value.includes(actionObject.actionName)){
      let actionIndex = actionChecked.value.indexOf(actionObject.actionName);
      if (actionObject !== -1){
        actionChecked.value.splice(actionIndex, 1);
      }
    }
  }

  // console.log("submitAction this.actionChecked: ", this.actionChecked);
};

// COMPUTED
const existProjectActions = computed(()=>{

  if(props.projectInfo.cross_project_actions.length>0){

    return props.projectInfo.cross_project_actions.map((item)=>{
      return item.name
    })
  }
  else {
    return [];
  }

});

const computedProjectParams = computed(()=>{
  return {

    id: props.projectInfo.id,
    name: nameInput.value,
    description: descInput.value,
    active: activeCheckbox.value ? 'set' : 'notset',
    project_enrols: checkedEnrolTypes.value,
    project_actions: actionChecked.value,
    new_project_actions: newActions.value,
    actions_to_delete: actionsToDelete.value,
    actions_to_redact: existActionsToRedactName.value

  }

});

const buttonText = computed(()=>{
  if (props.formTarget === 'create'){
    return 'Создать';
  }
  else if (props.formTarget === 'redact'){
    return 'Сохранить';
  }
  else {
    return '';
  }
});

// LIFECYCLE
onMounted(()=>{

  reactiveExistActions.value = props.projectInfo.project_actions;

  if(props.projectInfo.cross_project_actions.length > 0){

    props.projectInfo.cross_project_actions.forEach((item)=>{
      actionChecked.value.push(item.name);
    })

  }

  if(props.formTarget === 'redact'){
    nameInput.value = props.projectInfo.name;
    descInput.value = props.projectInfo.description;
    Number(props.projectInfo.active) === 1 ? activeCheckbox.value = true : activeCheckbox.value = false;
  }

  checkedEnrolTypes.value = props.projectInfo.project_enrols.map((item)=>{return item.name});

  if(listStore.$state.projValidateInfo !== ''){
    validateInfo.value = listStore.$state.projValidateInfo;
    validateNormalStyle.value = true;
    let copyListStore = {...listStore.$state};
    copyListStore.projValidateInfo = '';
    listStore.$patch(copyListStore);
  }
});

</script>
<style>
.unicon {
  display: flex !important;
}
.p-error{
  font-weight: bold !important;
  color: #dc3545 !important;
}
.p-normal {
  font-weight: bold !important;
  color: #1e8686 !important;
  font-size: 1.2rem !important;
}

[type='text'] {
  margin-bottom: 0 !important;
}
</style>

<style scoped>
[type='checkbox'] {
  margin-bottom: 0 !important;
}
.vueprojectform-action-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vueprojectform-enroltype-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vueprojectform-activecheckbox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vueprojectform-enroltypes-title-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}
.vueprojectform-surveylist-item-deleteicon, .vueprojectform-surveylist-item-redacticon {
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vueprojectform-surveylist-new-title {
  font-weight: bold;
  text-align: left;
  color: #7a92b6;
  margin-bottom: 10px;
  font-size: 0.8em;
}

.validate-normal {
  color: #1e8686 !important;
  font-size: 1.2em !important;
}

.vueprojectform-validate-errors {
  font-size: 1.3em;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
  color: #dc3545;
}

.vueprojectform-enroltypes-title {
  padding-left: 20px;
  font-weight: bold;
  font-size: 1.3em;
  color: #3a80bd;
}
.vueprojectform-enroltypes-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vueprojectform-activecheckbox-maintitle {
  padding-left: 20px;
  font-weight: bold;
  font-size: 1.3em;
  color: #3a80bd;
}
.vueprojectform-activecheckbox-maintitle-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vueprojectform-activecheckbox-maintitle-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}

.vueprojectform-enroltypes-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.vueprojectform-enroltype-title {
  cursor: pointer;
  padding-left: 20px;
  font-weight: bold;
  color: #000000;
}

.vueprojectform-enroltypes-wr {
  display: flex;
  flex-direction: column;
}
.vueprojectform-surveylist-item-text:hover {
  color: #242426;
}
.vueprojectform-surveylist-item-text a {
  font-size: 1.1em;
}

.vueprojectform-surveylist-item,.vueprojectform-enrollist-item {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000000;
}
.vueprojectform-surveylist-title, .vueprojectform-enrollist-title {
  font-weight: bold;
  margin-bottom: 20px;
  color: #1e8686;
  font-size: 1.3em;
}
.vueprojectform-enrollist-title a {
  text-decoration: none !important;
  color: #1e8686 !important;
  font-size: 1.1em;
}

.vueprojectform-actionslist-container {
  margin-bottom: 30px;
}

.vueprojectform-surveylist-add-icon,.vueprojectform-enrollist-add-icon {
  cursor: pointer;
}
.vueprojectform-surveylist-add-title,.vueprojectform-enrollist-add-title {
  padding-left: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #000000;
  font-size: 1.1em;
}

.vueprojectform-surveylist-container,.vueprojectform-enrollist-container {
  padding-top: 30px;
}

.vueprojectform-surveylist-add-wr,.vueprojectform-enrollist-add-wr {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.vue-disabled {
  pointer-events: none;
  opacity: 0.4;
}

.vueprojectform-action-item-container {
  display: flex;
  flex-direction: column;
}
.vue-vueprojectform-actions-title-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}

.vue-vueprojectform-actions-title {
  padding-left: 20px;
  text-align: left;
  font-weight: bold;
  color: #3a80bd;
  font-size: 1.3em;
}

.vue-vueprojectform-actions-wr {
  display: flex;
  flex-direction: column;
}

.vueprojectform-action-title {
  cursor: pointer;
  padding-left: 20px;
  font-weight: bold;
  color: #000000;
  font-size: 1.1em;
}

.vueprojectform-action-item {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}

.vueprojectform-activecheckbox-title {
  cursor: pointer;
  padding-left: 20px;
  font-size: 1.1em;
}

.vueprojectform-activecheckbox-wr {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  color: #000000;
}
</style>