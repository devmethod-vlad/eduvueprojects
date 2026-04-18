<template>

  <div v-if="isLoading" class="survey-info-loading">
    <img alt="Загрузка" :src="app_config.apiUrl+app_config.loadingSrc" />
  </div>

  <template v-else>

    <div v-if="surveyErrorText !== ''" class="survey-params-error-wr"
         :class="{'surveyform-nolmal-style': normalErrorStyle}"
    >
      {{ surveyErrorText }}
    </div>

    <div v-else class="survey-redactor-container">

      <div class="em-redactor-navigation-wr">

        <a :href="app_config.projectListUrl">
          <div class="em-redactor-navigation-item">
            К списку проектов
          </div>
        </a>
      </div>

      <div class="survey-route-buttons-wr">

        <div class="survey-gotocreator-wr">

          <template v-if="!surveyRedactorVisible">
            <a :href="goSurveyUrl" v-if="isSurveyActive">
              <button class="vue-btn vue-btn-normal gotosurvey-button">
                  Пройти
              </button>
            </a>
            <button v-else class="vue-btn vue-btn-disable gotosurvey-button">
              Недоступен для прохождения
            </button>
          </template>

          <button @click="onClickRedactor()" class="vue-btn vue-btn-normal to-creator-button">

            <span v-tippy="{ content: 'Редактировать параметры' }" v-if="surveyRedactorVisible">
              <app-icon name="clipboard-notes"
                        :size="20"
                        color="white"
              />
            </span>

            <span v-else v-tippy="{ content: 'Перейти к редактору' }">
              <app-icon name="create-dashboard"
                        :size="20"
                        color="white"
              />
            </span>
          </button>
        </div>

      </div>


      <div v-if="surveyRedactorVisible" class="survey-creator-container">
        <SurveyCreator />
      </div>

      <div v-else class="survey-redactor-form-wr">

        <template v-if="paramsVisible">
          <div v-if="surveyInfoText !=='' " class="vue-form-item">
            <div class="surveyform-info-wr" :class="{'surveyform-nolmal-style': normalInfoStyle}">
              {{ surveyInfoText }}
            </div>
          </div>
        </template>

        <form @submit.prevent="validateSurveyForm()" method="post"
              class="survey-redactor-form"
        >
          <fieldset class="vue-fieldset">

            <div class="vue-form-item surveyform-name-wr">
              <label for="surveyform-name-input" class="vue-form-label">
                Название опроса | теста | анкеты *:
              </label>
              <input @focus="processOnFosus('name')" aria-describedby="surveynameHelp"
                     name="surveyform-name-input" type="text"
                     class="vue-form-control" :class="{'vue-input-error':surveyStyle.nameStyleError}"
                     id="surveyform-name-input" v-model="surveyObject.name"
              >
              <div id="surveynameHelp" class="vue-form-helptext">
                Уникальное названия активности
              </div>
            </div>

            <div class="vue-form-item surveyform-description-wr">
              <label for="surveyform-description-input" class="vue-form-label">Описание :</label>
              <textarea @focus="processOnFosus('description')" aria-describedby="surveyDescriptionHelp"
                        name="surveyform-description-input" type="text"
                        class="vue-form-control" :class="{'vue-input-error':surveyStyle.descriptionStyleError}"
                        id="surveyform-description-input" v-model="surveyObject.description"
              >
              </textarea>
              <div id="surveyDescriptionHelp" class="vue-form-helptext">
                Уточняющий текст для активности
              </div>
            </div>

            <div @click="paramsVisible = !paramsVisible" class="vue-form-item surveyform-showparams-title-wr">
              <div v-if="!paramsVisible" class="surveyform-showparams-title">
                Показать все параметры
              </div>
              <div v-else class="surveyform-showparams-title">
                Скрыть параметры
              </div>

              <div class="surveyform-showparams-icon">
                <template v-if="!paramsVisible">
                  <app-icon name="chevron-down"
                            :size="16"
                            color="#1e8686"
                  />
                </template>
                <template v-else>
                  <app-icon name="chevron-up"
                            :size="16"
                            color="#1e8686"
                  />
                </template>
              </div>

            </div>

            <template v-if="paramsVisible">
              <div class="vue-form-item surveyform-showname-wr">
                <label for="surveyform-showname-input" class="vue-form-label">
                  Название проводимого мероприятия *:
                </label>
                <input @focus="processOnFosus('showname')" aria-describedby="surveyshownameHelp"
                       name="surveyform-showname-input" type="text"
                       class="vue-form-control" :class="{'vue-input-error':surveyStyle.shownameStyleError}"
                       id="surveyform-showname-input" v-model="surveyObject.showname"
                >
                <div id="surveyshownameHelp" class="vue-form-helptext">
                  Например: "опрос" или "тестирование"
                </div>
              </div>
              <div class="vue-form-item surveyform-maxentries-wr">
                <label for="surveyform-maxentries-input" class="vue-form-label">
                  Количество попыток *:
                </label>
                <input step="1" @focus="processOnFosus('maxentries')"
                       type="number" aria-describedby="maxentriesHelp"
                       name="surveyform-maxentries-input" class="vue-form-control"
                       :class="{'vue-numeric-error':surveyStyle.maxentriesStyleError}" id="surveyform-maxentries-input"
                       v-model="surveyObject.maxentries"
                >
                <div id="maxentriesHelp" class="vue-form-helptext">
                  Укажите число от 0 (неограничено) до 10
                </div>
              </div>
              <div class="vue-form-item surveyform-itemscount-wr">
                <label for="surveyform-itemscount-input" class="vue-form-label">
                  Кол-во вопросов *:
                </label>
                <input step="1" @focus="processOnFosus('itemscount')"
                       type="number" aria-describedby="itemscountHelp"
                       name="surveyform-itemscount-input" class="vue-form-control"
                       :class="{'vue-numeric-error':surveyStyle.itemscountStyleError}" id="surveyform-itemscount-input"
                       v-model="surveyObject.itemscount"
                >
                <div id="itemscountHelp" class="vue-form-helptext">
                  Число не менее 1 и не более общего кол-ва элементов
                </div>
              </div>

              <div class="vue-form-item surveyform-userawcontent-container">
                <div class="surveyform-select-disclaimer vue-form-label">
                  Использовать конфигурацию из редактора без изменений:
                </div>
                <select v-model="surveyObject.use_raw_content"
                        @focus="processOnFosus('userawcontent')"
                        class="vue-form-select surveyform-selectprogress"
                        aria-label="Использовать конфигурацию из редактора без изменений"
                        :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
                        style="background-position: right 0.75rem center;"
                >
                  <option value="0">
                    Нет
                  </option>
                  <option value="1">
                    Да
                  </option>
                </select>
              </div>

              <div class="vue-form-item surveyform-htmlid-wr">
                <label for="surveyform-htmlid-input" class="vue-form-label">
                  Html ID элемента в котором отображается опрос/тестирование*:
                </label>
                <input @focus="processOnFosus('htmlid')" aria-describedby="surveyhtmlidHelp"
                       name="surveyform-htmlid-input" type="text"
                       class="vue-form-control" :class="{'vue-input-error':surveyStyle.htmlidStyleError}"
                       id="surveyform-htmlid-input" v-model="surveyObject.htmlid"
                >
                <div id="surveyhtmlidHelp" class="vue-form-helptext">
                  Например "surveyContainer"
                </div>
              </div>
              <div class="vue-form-item surveyform-groupid-wr">
                <label for="surveyform-groupid-input" class="vue-form-label">
                  Идентификатор для группы (банка) вопросов *:
                </label>
                <input @focus="processOnFosus('groupid')" aria-describedby="groupidHelp"
                       name="surveyform-groupid-input" type="text"
                       class="vue-form-control" :class="{'vue-input-error':surveyStyle.groupidStyleError}"
                       id="surveyform-groupid-input" v-model="surveyObject.groupid"
                >
                <div id="groupidHelp" class="vue-form-helptext">
                  Например: 'bank'
                </div>
              </div>
              <div class="vue-form-item surveyform-complexid-wr">
                <label for="surveyform-complexid-input" class="vue-form-label">
                  Идентификатор для сложных(комплексных) вопросов *:
                </label>
                <input @focus="processOnFosus('complexid')" aria-describedby="complexidHelp"
                       name="surveyform-complexid-input" type="text"
                       class="vue-form-control" :class="{'vue-input-error':surveyStyle.complexidStyleError}"
                       id="surveyform-complexid-input" v-model="surveyObject.complexid"
                >
                <div id="complexidHelp" class="vue-form-helptext">
                  Например: 'complex'
                </div>
              </div>
              <div class="vue-form-item surveyform-selectprogress-container">
                <div class="surveyform-select-disclaimer vue-form-label">
                  Сохранять состояние прохождения:
                </div>
                <select v-model="surveyObject.saveprogress"
                         @focus="processOnFosus('saveprogress')"
                         class="vue-form-select surveyform-selectprogress"
                         aria-label="Сохранять состояние прохождения"
                         :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
                         style="background-position: right 0.75rem center;"
                >
                  <option value="0">
                    Нет
                  </option>
                  <option value="1">
                    Да
                  </option>
                </select>
              </div>
              <div class="vue-form-item surveyform-selectcheckresult-container">
                <div class="surveyform-select-disclaimer vue-form-label">
                  Проверять результат прохождения:
                </div>
                <select v-model="surveyObject.checkresult"
                        @focus="processOnFosus('checkresult')"
                        class="vue-form-select surveyform-selectcheckresult"
                        aria-label="Проверять результат прохождения"
                        :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
                        style="background-position: right 0.75rem center;"
                >
                  <option value="1">
                    Да
                  </option>
                  <option value="0">
                    Нет
                  </option>
                </select>
              </div>
              <div class="vue-form-item surveyform-selectshowresult-container">
                <div class="surveyform-select-disclaimer vue-form-label">
                  Показывать результат прохождения:
                </div>
                <select v-model="surveyObject.showresult"
                        @focus="processOnFosus('showresult')"
                        class="vue-form-select surveyform-selectshowresult"
                        aria-label="Показывать результат прохождения"
                        :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
                        style="background-position: right 0.75rem center;"
                >
                  <option value="1">
                    Да
                  </option>
                  <option value="0">
                    Нет
                  </option>
                </select>
              </div>

              <div class="vue-form-item surveyform-percentrigth-wr">
                <label for="surveyform-percentrigth-input" class="vue-form-label">
                  Процент правильных ответов для прохождения *:
                </label>
                <input step="1" @focus="processOnFosus('percentrigth')"
                       type="number" aria-describedby="percentrigthHelp"
                       name="surveyform-percentrigth-input" class="vue-form-control"
                       :class="{'vue-input-error':surveyStyle.percentrigthStyleError}"
                       id="surveyform-percentrigth-input" v-model="surveyObject.percentrigth"
                >
                <div id="percentrigthHelp" class="vue-form-helptext">
                  Укажите число от 5 до 100
                </div>
              </div>

              <div class="vue-form-item surveyform-selectattemptsinfo-container">
                <div class="surveyform-select-disclaimer vue-form-label">
                  Показывать информацию о попытках:
                </div>
                <select v-model="surveyObject.attemptsinfo"
                        @focus="processOnFosus('attemptsinfo')"
                        class="vue-form-select surveyform-selectattemptsinfo"
                        aria-label="Показывать информацию о попытках:"
                        :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
                        style="background-position: right 0.75rem center;"
                >
                  <option value="1">
                    Да
                  </option>
                  <option value="0">
                    Нет
                  </option>
                </select>
              </div>

              <div class="vue-form-item surveyform-selectcustompanel-container">
                <div class="surveyform-select-disclaimer vue-form-label">
                  Показывать свою панель с информацией по завершению вместо дефолтной (задается в редакторе):
                </div>
                <select v-model="surveyObject.showcustompanel"
                        @focus="processOnFosus('showcustompanel')"
                        class="vue-form-select surveyform-selectcustompanel"
                        aria-label="Показывать свою панель с информацией по завершению вместо дефолтной (задается в редакторе):"
                        :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
                        style="background-position: right 0.75rem center;"
                >
                  <option value="1">
                    Да
                  </option>
                  <option value="0">
                    Нет
                  </option>
                </select>
              </div>

              <div class="vue-form-item surveyform-exectime-wr">
                <label for="surveyform-exectime-input" class="vue-form-label">
                  Время, отведенное на прохождение *:
                </label>
                <input @focus="processOnFosus('exectime')" type="number"
                       aria-describedby="exectimeHelp" name="surveyform-exectime-input"
                       class="vue-form-control" :class="{'vue-input-error':surveyStyle.exectimeStyleError}"
                       id="surveyform-exectime-input" v-model="surveyObject.exectime"
                >
                <div id="exectimeHelp" class="vue-form-helptext">
                  Время в секундах. 0 - время не задано
                </div>
              </div>

              <div class="vue-form-item surveyform-selectshufflequestions-container">
                <div class="surveyform-select-disclaimer vue-form-label">
                  Перемешивать вопросы:
                </div>
                <select v-model="surveyObject.shufflequestions"
                        @focus="processOnFosus('shufflequestions')"
                        class="vue-form-select surveyform-selectshufflequestions"
                        aria-label="Перемешивать вопросы"
                        :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
                        style="background-position: right 0.75rem center;"
                >
                  <option value="0">
                    Нет
                  </option>
                  <option value="1">
                    Да
                  </option>
                </select>
              </div>

              <div class="vue-form-item surveyform-selectshufflegroups-container">
                <div class="surveyform-select-disclaimer vue-form-label">
                  Перемешивать группы вопросов:
                </div>
                <select v-model="surveyObject.shufflegroups"
                         @focus="processOnFosus('shufflegroups')"
                         class="vue-form-select surveyform-selectshufflegroups"
                         aria-label="Перемешивать группы вопросов"
                         :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
                         style="background-position: right 0.75rem center;"
                >
                  <option value="0">
                    Нет
                  </option>
                  <option value="1">
                    Да
                  </option>
                </select>
              </div>

              <div class="vue-form-item surveyform-selectshuffleanswers-container">
                <div class="surveyform-select-disclaimer vue-form-label">
                  Перемешивать варианты ответов (где это возможно):
                </div>
                <select v-model="surveyObject.shuffleanswers"
                        @focus="processOnFosus('shuffleanswers')"
                        class="vue-form-select surveyform-selectshuffleanswers"
                        aria-label="Перемешивать варианты ответов"
                        :style="{ backgroundImage: 'url(' + selectArrow + ')' }"
                        style="background-position: right 0.75rem center;"
                >
                  <option value="0">
                    Нет
                  </option>
                  <option value="1">
                    Да
                  </option>
                </select>
              </div>

              <div class="vue-form-item surveyform-excludequestiontypes-wr">
                <label for="surveyform-excludequestiontypes-input" class="vue-form-label">
                  Типы вопросов, которые следует исключить:
                </label>
                <input type="text" @focus="processOnFosus('excludequestiontypes')"
                       aria-describedby="excludequestiontypesHelp" name="surveyform-excludequestiontypes-input"
                       class="vue-form-control" :class="{'vue-input-error':surveyStyle.excludequestiontypesStyleError}"
                       id="surveyform-excludequestiontypes-input" v-model="surveyObject.excludetypes"
                >
                <div id="excludequestiontypesHelp" class="vue-form-helptext">
                  Например: "['html','image']"
                </div>
              </div>

              <div class="vue-form-item surveyform-countbygroups-wr">
                <label for="surveyform-countbygroups-input" class="vue-form-label">
                  Кол-во вопросов по группам*:
                </label>
                <textarea rows="5" @focus="processOnFosus('countbygroups')"
                          aria-describedby="countbygroupsHelp" name="surveyform-countbygroups-input"
                          class="vue-form-control" :class="{'vue-input-error':surveyStyle.countbygroupsStyleError}"
                          id="surveyform-countbygroups-input" v-model="surveyObject.countbygroups">

                </textarea>
                <div id="countbygroupsHelp" class="vue-form-helptext">
                  Например: "'Общие':4,'Основные': 5"
                </div>
              </div>

              <div class="vue-form-item surveyform-updateinterval-wr">
                <label for="surveyform-updateinterval-input" class="vue-form-label">
                  Интервал обновления состояния (мс) *:
                </label>
                <input step="1000" min="1000"
                       max="10000" @focus="processOnFosus('updateinterval')"
                       type="number" aria-describedby="updateintervalHelp"
                       name="surveyform-updateinterval-input" class="vue-form-control"
                       :class="{'vue-numeric-error':surveyStyle.updateintervalStyleError}" id="surveyform-updateinterval-input"
                       v-model="surveyObject.updateinterval"
                >
                <div id="updateintervalHelp" class="vue-form-helptext">
                  Время обновления в милисекундах
                </div>
              </div>
            </template>

            <div v-if="surveyInfoText !=='' " class="vue-form-item">
              <div class="surveyform-info-wr" :class="{'surveyform-nolmal-style': normalInfoStyle}">
                {{ surveyInfoText }}
              </div>
            </div>

            <div class="vue-form-item surveyform-button-wr">
              <button type="submit" class="vue-btn vue-btn-normal">
                <strong>
                  Сохранить
                </strong>
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>

  </template>

</template>

<script setup>
import {auth_config, app_config} from "@/projects/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {survey} from "@/projects/global/objects/survey";
import {getSurveyParams} from "@/projects/SurveyRedactor/services/getsurveyparams";
import {useSurveyStore} from "@/projects/global/store/survey";
import SurveyCreator from "@/projects/SurveyRedactor/components/SurveyCreator";
import {saveSurveyParams} from "@/projects/SurveyRedactor/services/savesurveyparams";
import {useUserStore} from "@/projects/global/store/user";
import {computed, onMounted, ref, watch} from "vue";
import {checkUserToken} from "@/common/services/checkusertoken";

// PROPS
const props = defineProps({
  surveyId:{
    type: Number,
    default: 0
  },
  getParamActive: {
    type: Boolean,
    default: false
  },
});

// STORE
const userStore = useUserStore();
const surveyStore = useSurveyStore();

// DATA
const isLoading = ref(true);

const surveyObject = ref(survey);

const isSurveyActive = ref(false);

const surveyInfoText = ref('');

const normalErrorStyle = ref(false);

const normalInfoStyle = ref(false);

const surveyErrorText = ref('');

const surveyRedactorVisible = ref(false);

const paramsVisible = ref(false);

const surveyStyle = ref({
  nameStyleError: false,
  descriptionStyleError: false,
  shownameStyleError: false,
  maxentriesStyleError: false,
  itemscountStyleError: false,
  htmlidStyleError: false,
  groupidStyleError: false,
  complexidStyleError: false,
  percentrigthStyleError: false,
  exectimeStyleError: false,
  excludequestiontypesStyleError: false,
  countbygroupsStyleError: false,
  updateintervalStyleError: false
});


// METHODS
const setUserParams = () => {
  userStore.auth = true;
  userStore.authSource = 'localtoken';
  userStore.tokenExpire = false;
  userStore.userrole.id = auth_config.BASE_ROLE['redactor'].id;
  userStore.userrole.name = auth_config.BASE_ROLE['redactor'].db_name;
}


const checkLocalToken = async () =>{
  let flag = false;
  try {
    // console.log("checkLocalToken");
    let storageKey = app_config.localStorage.userInfo.key;
    // console.log("checkLocalToken storageKey: ", storageKey);
    if (localStorage.getItem(storageKey)){
      // console.log("if (localStorage.getItem(storageKey))");
      let userLocalStore = await JSON.parse(localStorage.getItem(storageKey));
      // console.log("checkLocalToken userLocalStore: ", userLocalStore);
      let checkAnswer = await checkUserToken(auth_config.apiUrl + auth_config.authUrl, userLocalStore.userToken);
      // console.log("checkLocalToken checkAnswer: ", checkAnswer);
      if (checkAnswer.status === 'ok'){
        await setUserParams();
        flag = true;
      }
    }
  }
  catch (e) {
    console.log(e);
  }
  // console.log("app_config.fakeLocalAuth: ", auth_config.fakeLocalAuth);

  if(auth_config.fakeLocalAuth || auth_config.enableFakeEduAuth){
    await setUserParams();
    flag = true;

  }
  return flag;
}

const checkAccess = async()=>{
  // console.log("checkAccess");
  let tokenAccess = await checkLocalToken();

  // console.log("checkAccess tokenAccess: ", tokenAccess);

  if (tokenAccess){

    if([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
      let getSurveyId = 0;
      if (props.getParamActive){
        const queryString = await window.location.search;
        const urlParams = await new URLSearchParams(queryString);
        if (urlParams.get('surveyid')) {
          getSurveyId = Number(urlParams.get('surveyid'));
        }
      }
      if (getSurveyId === 0){
        getSurveyId = props.surveyId;
      }

      if (getSurveyId !== 0){
        await loadSurvey(getSurveyId);
      }

      else {
        surveyErrorText.value = 'Нет информации для отображения!';
        normalErrorStyle.value = true;
      }
    }
    else {
      surveyErrorText.value = 'Нет информации для отображения!';
      normalErrorStyle.value = true;
    }
    isLoading.value = false;
  }
  else {
    isLoading.value = false;
    surveyErrorText.value = 'Нет информации для отображения!';
    normalErrorStyle.value = true;
  }
};

const loadSurvey = async(surveyid)=>{

  isLoading.value = true;

  let surveyAnsw = await getSurveyParams(surveyid);

  if (surveyAnsw['status'] === 'ok'){
    surveyObject.value = await surveyAnsw['info'];
    isSurveyActive.value = Number(surveyAnsw['is_empty']) !== 1;
  }
  else {
    surveyErrorText.value = 'В процессе загрузки данных произошла ошибка!'
  }

  isLoading.value = false;

};

const processOnFosus = (target)=>{
  surveyInfoText.value = '';
  normalInfoStyle.value = false;

  if(target === 'name'){
    if(surveyObject.value.name === 'Укажите название опроса | теста | анкеты'){
      surveyObject.value.name = '';
    }
    surveyStyle.value.nameStyleError = false;

  }

  if(target === 'showname'){
    if(surveyObject.value.showname === 'Укажите название мероприятия, которое будет видеть пользователь'){
      surveyObject.value.showname = '';
    }
    surveyStyle.value.shownameStyleError = false;

  }

  if(target === 'maxentries'){
    surveyStyle.value.maxentriesStyleError = false;

  }

  if(target === 'itemscount'){
    surveyStyle.value.itemscountStyleError = false;

  }

  if(target === 'htmlid'){

    if(surveyObject.value.htmlid === 'Укажите html id элемента, в котором будет отображаться опрос'){
      surveyObject.value.htmlid = '';
    }
    surveyStyle.value.htmlidStyleError = false;

  }

  if(target === 'groupid'){

    if(surveyObject.value.groupid === 'Укажите идентификатор для группы (банка) вопросов'){
      surveyObject.value.groupid = '';
    }
    surveyStyle.value.groupidStyleError = false;

  }

  if(target === 'complexid'){

    if(surveyObject.value.complexid === 'Укажите идентификатор для сложного (комплексного) вопроса'){
      surveyObject.value.complexid = '';
    }
    surveyStyle.value.complexidStyleError = false;

  }

  if(target === 'percentrigth'){

    surveyStyle.value.percentrigthStyleError = false;

  }

  if(target === 'attemptsinfo'){

    surveyStyle.value.attemptsinfoStyleError = false;

  }

  if(target === 'exectime'){

    surveyStyle.value.exectimeStyleError = false;

  }

  if(target === 'excludequestiontypes'){

    surveyStyle.value.excludequestiontypesStyleError = false;

  }

  if(target === 'countbygroups'){

    surveyStyle.value.countbygroupsStyleError = false;

  }

  if(target === 'updateinterval'){

    surveyStyle.value.updateintervalStyleError = false;

  }

};

const validateSurveyForm = ()=>{

  surveyInfoText.value = '';
  normalInfoStyle.value = false;
  let saveFlag=true;

  if (surveyObject.value.name === '' || surveyObject.value.name === 'Укажите название опроса | теста | анкеты'){
    surveyObject.value.name = 'Укажите название опроса | теста | анкеты';
    surveyStyle.value.nameStyleError = true;
    saveFlag=false;
  }

  if (Number(surveyObject.value.maxentries) > 10 || Number(surveyObject.value.maxentries) < 0){
    surveyStyle.value.maxentriesStyleError = true;
    saveFlag=false;
  }
  if (surveyObject.value.showname === '' || surveyObject.value.showname === 'Укажите название мероприятия, которое будет видеть пользователь'){
    surveyObject.value.showname = 'Укажите название мероприятия, которое будет видеть пользователь';
    surveyStyle.value.shownameStyleError = true;
    saveFlag=false;
  }
  if (Number(surveyObject.value.itemscount)<1 ){
    surveyStyle.value.itemscountStyleError = true;
    saveFlag=false;
  }
  if (surveyObject.value.htmlid === '' || surveyObject.value.htmlid === 'Укажите html id элемента, в котором будет отображаться опрос'){
    surveyObject.value.htmlid = 'Укажите html id элемента, в котором будет отображаться опрос';
    surveyStyle.value.htmlidStyleError = true;
    saveFlag=false;
  }
  if (surveyObject.value.groupid === '' || surveyObject.value.groupid === 'Укажите идентификатор для группы (банка) вопросов'){
    surveyObject.value.groupid = 'Укажите идентификатор для группы (банка) вопросов';
    surveyStyle.value.groupidStyleError = true;
    saveFlag=false;
  }
  if (surveyObject.value.complexid === '' || surveyObject.value.complexid === 'Укажите идентификатор для сложного (комплексного) вопроса'){
    surveyObject.value.complexid = 'Укажите идентификатор для сложного (комплексного) вопроса';
    surveyStyle.value.complexidStyleError = true;
    saveFlag=false;
  }

  if (Number(surveyObject.value.percentrigth)<5 || Number(surveyObject.value.percentrigth)>100){
    surveyStyle.value.percentrigthStyleError = true;
    saveFlag=false;
  }
  if (Number(surveyObject.value.exectime)<0){
    surveyStyle.value.exectimeStyleError = true;
    saveFlag=false;
  }
  if (surveyObject.value.excludetypes === '' || surveyObject.value.excludetypes === 'Укажите типы вопросов, которые не участвуют в обработке результата'){
    surveyObject.value.excludetypes = 'Укажите типы вопросов, которые не участвуют в обработке результата';
    surveyStyle.value.excludequestiontypesStyleError = true;
    saveFlag=false;
  }
  if (surveyObject.value.countbygroups === '' || surveyObject.value.countbygroups === 'Укажите кол-во вопросов по группам'){
    surveyObject.value.countbygroups = 'Укажите кол-во вопросов по группам';
    surveyStyle.value.countbygroupsStyleError = true;
    saveFlag=false;
  }
  if (Number(surveyObject.value.updateinterval)<1000 || Number(surveyObject.value.updateinterval)>10000){
    surveyStyle.value.updateintervalStyleError = true;
    saveFlag=false;
  }

  if (saveFlag){
    saveSurvey();
  }
  else {
    surveyInfoText.value = 'Проверьте правильность заполнения всех полей формы! Одно или несколько полей имеют ошибки!';
  }

};

const saveSurvey = async()=>{
  isLoading.value = true;
  let saveresp = await saveSurveyParams(surveyStore.$state);

  // await console.log("saveSurvey saveres: ", saveresp);

  if (saveresp['status'] === 'ok'){
    isLoading.value = false;
    surveyInfoText.value = "Вы успешно сохранили изменения!";
    normalInfoStyle.value = true;
  }
  else {
    isLoading.value = false;
    surveyInfoText.value = "При сохранении параметров произошла ошибка!";
  }

};

const onClickRedactor = async()=>{
  if (surveyRedactorVisible.value){
    surveyRedactorVisible.value = !surveyRedactorVisible.value;
    await loadSurvey(surveyObject.value.id);
  }
  else {
    surveyRedactorVisible.value = !surveyRedactorVisible.value;
  }

};

// COMPUTED
const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg"
});

const goSurveyUrl = computed(()=>{
  return app_config.portalSurveyUrl +'?surveyid='+surveyObject.value.id;
});

// WATCH
watch(
    surveyObject,
    (newObject) => {
      surveyStore.$patch(newObject);
    },
    {deep: true}
);

// LIFECYCLE
onMounted(()=>{
  checkAccess();
})


</script>
<style>
.survey-redactor-form-wr {
  width: 70%;
  margin: auto;
}

.survey-redactor-container {
  width: 100%;
  margin: auto;
}

.em-redactor-navigation-item {
  display: inline-block;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px white solid;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  color: white;
  font-weight: bold;
  background-color: #1e8686;
}

.em-redactor-navigation-item:hover {
  background-color: #145b5b;
}

.em-redactor-navigation-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
}
</style>

<style scoped>
@import "@/css/tippy.css";
@import "@/css/form-v1.css";

.survey-gotoprojectlist-wr a{
  text-decoration: none !important;
}

.to-projectlist-button {
  display: flex;
  align-items: center;
}


.survey-route-buttons-wr {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.gotosurvey-button {
  margin-right: 30px;
}

.survey-params-error-wr {
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
  color: #dc3545;
}

.surveyform-showparams-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}

.surveyform-showparams-title-wr {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.surveyform-showparams-icon {
  cursor: pointer;
  padding-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.survey-info-loading {
  padding-bottom: 50px;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.surveyform-nolmal-style {
  color: #1e8686 !important;
}
.surveyform-info-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  color: #dc3545;
}

.survey-gotocreator-wr {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.unicon {
  display: flex !important;
}
.to-creator-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>