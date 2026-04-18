<template>
  <div class="vue-survey-container">

    <!-- БЛОК ИНДИКАТОРА ЗАГРУЗКИ : НАЧАЛО -->
    <div v-if="surveyLoading" class="vue-survey-loading-wr">
      <div class="vue-survey-loading-text">
        Проверяем данные...
      </div>
      <div class="vue-survey-loading-image">
        <img :src="app_config.apiUrl+app_config.loadingSrc" alt="загрузка" />
      </div>

    </div>
    <!-- БЛОК ИНДИКАТОРА ЗАГРУЗКИ : КОНЕЦ-->

    <!-- КОНТЕЙНЕР ДЛЯ ОПРОСА : НАЧАЛО-->
    <div v-else class="vue-survey-workspace">

      <template v-if="surveyError !==''">
        <div class="vue-survey-errors" :class="{'vue-survey-normal': enableNormalStyle}">
          {{ surveyError }}
        </div>

        <template v-if="[app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)">
          <div v-if="goToRedactVisible" class="goto-redactbutton-wr">
            <a :href="app_config.portalSurveyRedactUrl+'?surveyid='+reactiveSurveyId.toString()">
              <button type="button" class="vue-btn vue-btn-normal">
                К редактированию
              </button>
            </a>
          </div>
        </template>
      </template>

      <template v-else>

        <!-- ТЕКСТ, ВЫВОДИМЫЙ ПО ОКОНЧАНИЮ ТЕСТИРОВАНИЯ-->
        <div v-if="resultsPanelVisible" class="vue-survey-results-wr">
          {{ resultText }}
        </div>

        <!-- КОНТЕЙНЕР ДЛЯ РЕНДЕРА ОПРОСА/ТЕСТА-->
        <div v-if="surveyContainerVisible" class="vue-survey-wr">
          <div ref="surveycontainer">

          </div>
        </div>

        <!-- ИНФОРМАЦИЯ О ПОПЫТКАХ-->
        <template v-if="attemptsText!==''">
          <div class="vue-survey-attempts-text">
            {{ attemptsText }}
          </div>
<!--          <div v-if="againButtonVisible" class="again-button-wr">-->
<!--            <button @click="window.location.reload()" type="button" class="vue-btn vue-btn-normal">Попробовать снова</button>-->
<!--          </div>-->
        </template>


        <!-- КНОПКА ПЕРЕЗАПУСКА-->
        <div v-if="reloadButtonVisible" class="vue-survey-reloadbutton-wr">
          <button @click="reloadPage()" class="vue-btn vue-btn-normal">
            Попробовать заново
          </button>
        </div>

      </template>

    </div>
    <!-- КОНТЕЙНЕР ДЛЯ ОПРОСА : КОНЕЦ-->

  </div>
</template>

<script setup>
import {requestSurveyInfo, setWorkspaceParams} from "@/projects/SurveyRender/services/getparams";
import {prepareQuestions} from "@/projects/SurveyRender/services/preparequestions";
import {formSurvey} from "@/projects/SurveyRender/services/formsurvey";
import {checkSurveyData} from "@/projects/SurveyRender/services/checksurveydata";
import * as Survey from "survey-jquery";
import {getAnswerObject} from "@/projects/SurveyRender/services/getanswerobject";
import {saveAnswer} from "@/projects/SurveyRender/services/saveanswer";
import {setSurveyOptions} from "@/projects/SurveyRender/services/setsurveyoptions";
import {checkUserAccess} from "@/projects/SurveyRender/services/checkuseraccess";
import jQuery from "jquery";
import {useUserStore} from "@/projects/global/store/user";
import {checkSurveyAccess} from "@/projects/SurveyRender/services/checksurveyaccess";
import {
  GetIdError, CheckAccessError, GetSurveyInfoError,
  CheckUserAccesError, SetParamsError, PrepareItemsError,
  FormSurveyError, CheckDataError, ProcessLogicError

} from "@/projects/SurveyRender/exceptions/exceptions";
import {onMounted, ref} from "vue";
import {app_config} from "@/projects/config/setconfig";

// PROPS
const props = defineProps({
  surveyId:{
    type: Number,
    default:0
  },

  getParamsActive: {
    type: Boolean,
    default: true

  }
});

// STORE
const userStore = useUserStore();

// DATA
const workspaceParams = ref({});
const survey = ref(undefined);
const dbSurveyInfo = ref({});
const surveyContent = ref({});
const surveyData = ref([]);
const questionsInfo = ref({});

const reactiveSurveyId = ref(0);
const enableNormalStyle = ref(false);
const goToRedactVisible = ref(false);

const updateVar = ref(undefined);
const surveyLoading =ref(true);
const surveyError = ref('');
const resultsPanelVisible = ref(false);
const surveyContainerVisible = ref(true);
const reloadButtonVisible = ref(false);
const resultText = ref('');
const attemptsText = ref('');
const standartError = ref('В ходе работы произошла ошибка... Попробуйте перегрузить страницу или зайти позже');
const againButtonVisible = ref(false);
const surveycontainer = ref(null);

// METHODS
const enableNormalStyleByRole = ()=>{
  if (![app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
    enableNormalStyle.value = true;
  }
};

const getSurveyId = ()=>{

  if (props.getParamsActive){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('surveyid')) {
      reactiveSurveyId.value = Number(urlParams.get('surveyid'));
    }
  }
  if (reactiveSurveyId.value === 0){
    if (props.surveyId !== 0 ){
      reactiveSurveyId.value = props.surveyId;
    }
  }

  // if (!app_config.prod){
  //   if (reactiveSurveyId.value === 0){
  //     reactiveSurveyId.value = 7;
  //   }
  // }

  if (reactiveSurveyId.value === 0){
    if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
      throw new GetIdError("Внимание! Ошибка при попытке определить id целевого опроса. Повторите процедуру доступа заново или обратитесь к администратору!");
    }
    else {
      throw new GetIdError("Нет информации для отображения!");
    }
  }
};

const checkAccess = async()=>{

  let accResp = await checkSurveyAccess(reactiveSurveyId.value, userStore.$state.userid);

  await console.log("checkAccess accResp: ", accResp);

  if(accResp['status'] !== 'ok'){

    if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
      throw new CheckAccessError("Внимание! Ошибка при попытке определения доступности для конкретного пользователя!");
    }
    else {
      throw new CheckAccessError("Внимание! У вас нет доступа для прохождения данной активности!");
    }
  }

};

const stopSurvey = ()=>{
  surveyLoading.value = false;
  if(updateVar.value){
    clearInterval(updateVar.value)
  }
  surveyContainerVisible.value = false;
};

const reloadPage = ()=>{
  document.location.reload();
};

const updateTimer = async(timerflag)=>{
  if (timerflag){
    await saveAndUpdateState('updatestate');
  }
};

const saveAndUpdateState = async(action)=>{

  try {
    let updateResp = await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        "action":"stateprocess",
        "stateaction":action,
        "surveyinfo":surveyContent.value,
        "surveyid":workspaceParams.value.surveyID,
        "userid":workspaceParams.value.userID,
        "surveytime":workspaceParams.value.surveyTimeToFinish,
        "interdata":survey.value.data
      })
    });

    let updateAnswer = await updateResp.json();

    if(updateAnswer['status'] === 'ok'){

      if(Number(workspaceParams.value.surveyTime)>10){

        if (Number(updateAnswer.info.timexecute)<2){

          await window.clearInterval(updateVar.value);

          surveyError.value = '';
          surveyContainerVisible.value=false;

          workspaceParams.value.surveyTimeToFinish = 0;

          const requestAnswerObject = getAnswerObject(survey.value.data, questionsInfo.value, workspaceParams.value);
          const answerObject = await requestAnswerObject.answerObject;
          const resultObject = await requestAnswerObject.resultObject;

          await showAnswer(resultObject, true);
          await saveAnswer(answerObject, workspaceParams.value);

        }
        else {
          workspaceParams.value.surveyTimeToFinish = await Number(updateAnswer.info.timexecute);
        }
      }
    }
    else {
      await stopSurvey();
      if ([1,3].includes(userStore.$state.userrole.id)){
        surveyError.value="При попытке обновить состояние произошла ошибка. Ошибка: "+updateAnswer['error_mess'];
      }
      else {
        surveyError.value=standartError.value;
      }
    }
  }
  catch (e) {
    stopSurvey();
    await console.log("Ошибка при попытке сохранить состояние тестирования/опроса", e);
    surveyError.value = standartError.value;
  }
};

const processSurvey = async()=>{

  survey.value = await new Survey.Model(surveyContent.value);

  survey.value = await setSurveyOptions(survey.value);

  // await console.log("processSurvey survey: ", this.survey);

  await jQuery(surveycontainer.value).Survey({
    model : survey.value,
    onComplete : (e)=>{
      onCompleteSurvey(e)
    }
  });
};

const onCompleteSurvey = (e)=>{
  if (updateVar.value){
    window.clearInterval(updateVar.value);
  }

  let answer = e.data;

  let requestAnswerObject = getAnswerObject(answer, questionsInfo.value, workspaceParams.value);

  let answerObject = requestAnswerObject.answerObject;

  let resultObject = requestAnswerObject.resultObject;

  showAnswer(resultObject);

  saveAnswer(answerObject, workspaceParams.value);
};


const showAnswer = async(resultObject, endtime=false)=>{

  // await console.log("showAnswer resultObject: ", resultObject);

  if(Number(workspaceParams.value.maxAttemptsCount)===0 || (Number(workspaceParams.value.userAttemptNumber)+1)<Number(workspaceParams.value.maxAttemptsCount)){
    if(Number(workspaceParams.value.surveyTime)>10 && Number(workspaceParams.value.surveyTimeToFinish)>2){
      reloadButtonVisible.value = true;
    }
  }

  if(Number(workspaceParams.value.showCustomresultsPanel)===1){
    resultsPanelVisible.value = false;
    resultText.value = '';
    attemptsText.value = ''
  }
  else {

    surveyContainerVisible.value=false;

    if (Number(workspaceParams.value.showAttemptsInfo) === 1){

      if(Number(workspaceParams.value.maxAttemptsCount) === 0){
        attemptsText.value='';
      }
      else {
        if(Number(workspaceParams.value.userAttemptNumber)+1<Number(workspaceParams.value.maxAttemptsCount)){

          let attDiff = Number(workspaceParams.value.maxAttemptsCount) - Number(workspaceParams.value.userAttemptNumber)-1;
          let stayText = 'осталось';
          let attText = 'попыток';
          if(attDiff === 1){
            stayText = 'осталась';
            attText = 'попытка';
          }
          else if ([2,3].includes(attDiff)) {
            attText = 'попытки'
          }
          attemptsText.value = 'У вас еще '+stayText+' '+attDiff.toString()+' '+attText+'!';
          againButtonVisible.value = true;
        }
        else{
          attemptsText.value='Извините, у вас не осталось больше попыток...'
        }
      }
    }

    if(Number(workspaceParams.value.checkResult) === 1 && Number(workspaceParams.value.showResult) === 1){

      let percent = await resultObject.percent;
      let success = await Number(resultObject.success);

      if (success===1){

        if (endtime){
          resultText.value = 'Отведенное время истекло. Поздравляем! Вы успешно завершили '+workspaceParams.value.surveyName+'!';
        }
        else {
          resultText.value = 'Поздравляем! Вы успешно завершили '+workspaceParams.value.surveyName+'!';
        }
      }
      else {

        if (endtime){
          resultText.value = 'Отведенное время истекло. Вы не смогли правильно ответить на нужное кол-во вопросов';
        }
        else {
          resultText.value = 'Вы не смогли правильно ответить на нужное кол-во вопросов';
        }
      }
      resultText.value = resultText.value+' Процент правильных ответов - '+ percent.toString()+'%';

    }
    else {
      if (endtime){
        resultText.value = 'Отведенное время истекло. Cпасибо за участие! Ваши данные учтены!';
      }
      else {
        resultText.value = 'Cпасибо за участие! Ваши данные учтены!';
      }
    }
    if(resultText.value !== ''){
      resultsPanelVisible.value = true;
    }
  }

};

// LIFECYCLE
onMounted(async ()=>{
  try {

    await getSurveyId();

    await checkAccess();

    await Survey.StylesManager.applyTheme("default");

    const surveyInfoResp = await requestSurveyInfo(reactiveSurveyId.value, userStore.$state.userid).catch((e)=>{

      console.log("Ошибка при попытке получить данные по опросу/тестированию", e);

      if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
        throw new GetSurveyInfoError("Внимание! Ошибка при попытке получения параметров опроса! Текст ошибки: "+e);
      }
      else {
        throw new GetSurveyInfoError("Внимание! В процессе получения необходимых данных произошла ошибка!");
      }
    });

    dbSurveyInfo.value = await surveyInfoResp;

    // await console.log("dbSurveyInfo: ", this.dbSurveyInfo);

    const userAccessInfo = await checkUserAccess(surveyInfoResp['info']).catch((e)=>{
      console.log("Ошибка при проверке доступа пользователя к тестированию/опросу", e);

      if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
        throw new CheckUserAccesError("Внимание! Ошибка при попытке проверки доступа пользователя к опросу! Текст ошибки: "+e);
      }
      else {
        throw new CheckUserAccesError("Внимание! В процессе обработки данных, необходимых для опроса, произошла ошибка!");
      }
    });

    // await console.log("userAccessInfo: ", userAccessInfo);

    if(!userAccessInfo.showSurvey){

      await stopSurvey();
      if (userAccessInfo.resultsText !==''){
        resultsPanelVisible.value=true;
        resultText.value = await userAccessInfo.resultsText;
      }
      if (userAccessInfo.attemptsText !==''){
        attemptsText.value =await userAccessInfo.attemptsText;
      }


    }
    else {

      const workspaceData = await setWorkspaceParams(surveyInfoResp['info'], userStore.$state.userid).catch((e)=>{
        console.log("Ошибка при попытке установить параметры тестирования/опроса в пространстве пользователя", e);

        if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
          throw new SetParamsError("Внимание! Ошибка при попытке установить параметры опроса! Текст ошибки: "+e);
        }
        else {
          throw new SetParamsError("Внимание! В процессе обработки необходимых данных, произошла ошибка!");
        }

      });

      surveyContent.value = await workspaceData['surveyContent'];

      workspaceParams.value = await workspaceData['workspaceParams'];


      if (Object.keys(workspaceParams.value).length !== 0){

        //Трансформируем исходные вопросы в структуры, которые в дальнейшем будут использоваться для
        //формирования опроса, определения правильных ответов и т.д.
        questionsInfo.value = await prepareQuestions(surveyContent.value.pages, workspaceParams.value).catch((e)=>{
          console.log("Ошибка при попытке трансформации исходных вопросов в необходимые структуры", e);

          if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
            throw new PrepareItemsError("Внимание! Ошибка при подготовке элементов опроса! Текст ошибки: "+e);
          }
          else {
            throw new PrepareItemsError("Внимание! В процессе обработки необходимых данных, произошла ошибка!");
          }

        });

        // await console.log("questionsInfo: ", this.questionsInfo);

        //Формируем опрос/тест в том виде, в котором он будет выводиться на экран
        surveyData.value = await formSurvey(questionsInfo.value, workspaceParams.value).catch((e)=>{
          console.log("Ошибка при попытке формирвания окончательнй структуры опроса/теста", e);

          if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
            throw new FormSurveyError("Внимание! Ошибка в процессе формирования структуры опроса! Текст ошибки: "+e);
          }
          else {
            throw new FormSurveyError("Внимание! В процессе обработки необходимых данных, произошла ошибка!");
          }

        });

        // await console.log("formSurvey surveyData: ", this.surveyData);

        surveyData.value = await checkSurveyData(surveyData.value, workspaceParams.value).catch((e)=>{
          console.log("Ошибка при проверке массива вопросов", e);

          if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
            throw new CheckDataError("Внимание! При проверке структуры данных выявлена ошибка! Текст ошибки: "+e);
          }
          else {
            throw new CheckDataError("Внимание! В процессе обработки необходимых данных, произошла ошибка!");
          }

        });


        //Обновляем содержание опроса/теста полученными данными
        //здесь оставлена возможность использования в дальнейшем разбивки по страницам
        surveyContent.value.pages = [];
        surveyContent.value.pages[0] = {}
        surveyContent.value.pages[0]['elements'] = await surveyData.value;


        surveyLoading.value = false;
        //Логика исполнения
        if (Number(workspaceParams.value.surveyHasState) === 0 && Number(workspaceParams.value.saveProgress) === 0){

          // await console.log("surveyLogic surveyHasState=0 & saveProgress=0");

          let startTimerFlag = false;

          if (Number(workspaceParams.value.surveyTime) !== 0){

            startTimerFlag = true;
            await saveAndUpdateState('save');

          }

          updateVar.value = await setInterval(()=>{updateTimer(startTimerFlag)}, workspaceParams.value.updateInterval);

          await processSurvey();

        }

        else if(Number(workspaceParams.value.surveyHasState) === 1 && Number(workspaceParams.value.saveProgress) === 0){

          // await console.log("surveyLogic surveyHasState=1 & saveProgress=0");

          if (Number(workspaceParams.value.surveyTime) > 10){

            let resp = await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
              method: "POST",
              headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
              },
              body: JSON.stringify({
                "action":"stateprocess",
                "stateaction":"updatestate",
                "surveyid":Number(workspaceParams.value.surveyID),
                "userid":Number(workspaceParams.value.userID),
                "surveyinfo": surveyContent.value,
                "surveytime": workspaceParams.value.surveyTimeToFinish,
                "interdata": ''
              })
            });

            let answer = await resp.json();

            if(answer['status'] === 'ok'){

              if (Number(answer['info']['timexecute']) === 0){
                await document.location.reload();
              }
              else {

                surveyContent.value.maxTimeToFinish = Number(answer['info']['timexecute']);
                workspaceParams.value.surveyTimeToFinish = Number(answer['info']['timexecute']);

                updateVar.value = await setInterval(()=>{updateTimer(true)}, workspaceParams.value.updateInterval);

                await processSurvey();
              }
            }
            else {
              console.log("Ошибка при попытке обновить состояние: ", answer['error_mess']);

              if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
                throw new ProcessLogicError("Внимание! Ошибка в процессе формирования структуры опроса! Текст ошибки: "+answer['error_mess']);
              }
              else {
                throw new ProcessLogicError("Внимание! В процессе обработки необходимых данных, произошла ошибка!");
              }
            }

          }
          else {

            let delResp = await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
              method: "POST",
              headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
              },
              body: JSON.stringify({
                "action":"stateprocess",
                "stateaction":"deletestate",
                "surveyid":Number(workspaceParams.value.surveyID),
                "userid":Number(workspaceParams.value.userID)})
            });

            let delAnswer = await delResp.json();

            if(delAnswer['status'] === 'ok'){

              updateVar.value = await setInterval(()=>{updateTimer(true)}, workspaceParams.value.updateInterval);

              await processSurvey();
            }
            else {

              let errorMess = '';
              if (delAnswer['eror_mess']){
                errorMess = delAnswer['eror_mess'];
              }

              if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
                throw new ProcessLogicError("Внимание! Ошибка при попытке удалить состояние опроса "+errorMess);
              }
              else {
                throw new ProcessLogicError("Внимание! В процессе обработки необходимых данных, произошла ошибка!");
              }
            }
          }

        }
        else if(Number(workspaceParams.value.surveyHasState) === 0 && Number(workspaceParams.value.saveProgress) === 1){

          // await console.log("surveyLogic surveyHasState=0 & saveProgress=1");

          let saveResp = await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
            method: "POST",
            headers: {
              Accept: "application/json",
              'Content-Type': "application/json"
            },
            body: JSON.stringify({
              "action":"stateprocess",
              "stateaction":"save",
              "surveyid":Number(workspaceParams.value.surveyID),
              "userid":Number(workspaceParams.value.userID),
              "surveyinfo": surveyContent.value,
              "surveytime" : workspaceParams.value.surveyTime,
              "interdata":'{}'
            })
          });

          let saveAnswer = await saveResp.json();

          if(saveAnswer['status'] === 'ok'){

            updateVar.value =await setInterval(()=>{updateTimer(true)}, workspaceParams.value.updateInterval);

            await processSurvey();
          }
          else {

            let errorMess = '';
            if (saveAnswer['eror_mess']){
              errorMess = saveAnswer['eror_mess'];
            }

            if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
              throw new ProcessLogicError("Внимание! Ошибка при попытке сохранить состояние опроса "+errorMess);
            }
            else {
              throw new ProcessLogicError("Внимание! В процессе обработки необходимых данных, произошла ошибка!");
            }
          }

        }
        else if(Number(workspaceParams.value.surveyHasState)===1 && Number(workspaceParams.value.saveProgress)===1){

          // await console.log("surveyLogic surveyHasState=1 & saveProgress=1");

          let resp = await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
            method: "POST",
            headers: {
              Accept: "application/json",
              'Content-Type': "application/json"
            },
            body: JSON.stringify({
              "action":"stateprocess",
              "stateaction":"load",
              "surveyid":Number(workspaceParams.value.surveyID),
              "userid":Number(workspaceParams.value.userID)}
            )
          });

          let answer = await resp.json();

          if(answer['status']==='ok'){
            let loadSurvey = '';

            if (answer['info'].surveyinfo===''){
              loadSurvey = await surveyContent.value;
            }
            else{
              loadSurvey = await JSON.parse(answer['info'].surveyinfo);
            }

            if (Number(answer['info'].timexecute) === 0 && workspaceParams.value.surveyTime !== 0){
              await document.location.reload();
            }
            else {
              loadSurvey.maxTimeToFinish = await Number(answer['info'].timexecute);
              workspaceParams.value.surveyTimeToFinish = await Number(answer['info'].timexecute);

              survey.value =

              if(answer['info'].interdata !=='' && answer['info'].interdata!=='{}'){
                survey.value.data = await JSON.parse(answer['info'].interdata);
              }

              updateVar.value = await setInterval(()=>{updateTimer(true)}, workspaceParams.value.updateInterval);
              await processSurvey();
            }
          }

          else {
            let errorMess = '';
            if (answer['eror_mess']){
              errorMess = answer['eror_mess'];
            }

            if ([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
              throw new ProcessLogicError("Внимание! Ошибка при попытке загрузить состояние опроса "+errorMess);
            }
            else {
              throw new ProcessLogicError("Внимание! В процессе обработки необходимых данных, произошла ошибка!");
            }

          }
        }

      }
      else {

        await stopSurvey();
        surveyError.value="Внимание! Произошла ошибка в процессе установки необходимых параметров!";

      }

    }

  }
  catch (e) {
    await stopSurvey();
    surveyError.value = e.message;

    if(e instanceof GetIdError || e instanceof CheckAccessError){
      enableNormalStyleByRole();
    }

    if(e instanceof SetParamsError || e instanceof CheckDataError){
      goToRedactVisible.value = true;
    }

  }
})

</script>

<style scoped>
@import "@/projects/SurveyRender/css/modern.css";
@import "@/projects/SurveyRender/css/survey.min.css";
@import "@/projects/SurveyRender/css/custom.css";

.goto-redactbutton-wr,.again-button-wr {
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vue-survey-normal {
  color: #1e8686 !important;
}

.vue-survey-reloadbutton-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-survey-results-wr {
  padding-top: 40px;
  padding-bottom: 40px;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  color: #1e8686;
}
.vue-survey-errors {
  padding-top: 40px;
  padding-bottom: 40px;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  color: #dc3545;
}
.vue-survey-attempts-text {
  padding-top: 40px;
  padding-bottom: 40px;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  color: #1e8686;
}
.vue-survey-loading-text {
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 1.4em;
  text-align: center;
  color: #1e8686;
}
.vue-survey-loading-wr {
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>