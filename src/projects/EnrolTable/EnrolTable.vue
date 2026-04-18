<template>

  <div v-if="isloadingActive" class="em-enroltable-loading-wr">

    <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />

  </div>

  <template v-else>

    <div v-if="globalTableInfoText !==''" class="em-globaltable-info-wr"
         :class="{'infotext-warnstyle': globalInfoTableWarnStyle}"
    >
      {{ globalTableInfoText }}
    </div>

    <template v-else>

      <div v-if="Number(targetMoId) === 0 && moList.length > 0" class="em-enroltable-choosemo-wr">
        <ChooseMo
            :mo-list="moList"
            @submitmo="(moId)=>{submitMo(moId)}"
        />
      </div>

      <template v-else>

        <div class="en-enroltable-container">

          <div class="em-enroltable-navigation-wr">
            <a :href="projectStatUrl">
              <div class="em-enroltable-navigation-item">
                К статистике проекта
              </div>
            </a>

            <a :href="app_config.projectListUrl">
              <div class="em-enroltable-navigation-item">
                К списку проектов
              </div>
            </a>
          </div>


          <div class="enroltable-common-info">
            <div class="enroltable-mo-title">
              <template v-if="moDbName !=='' ">
                {{ moDbName }}
              </template>
              <template v-else>
                Название MO не определено
              </template>
            </div>

            <div v-if="commonInfoText !== ''" class="enroltable-commoninfo-infotext">
              {{ commonInfoText }}
            </div>

            <div v-if="![app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name) && userInfoBlockVisible" class="enroltable-userinfo-wr">

              <div @click="userInfoBlockVisible=false" class="enroltable-userinfo-close-wr">

                <app-icon name="multiply"
                          :size="30"
                          color="#1e8686"
                />

              </div>

              <div class="enroltable-userinfo">

                <div class="enroltable-userinfo-db">

                  <div class="enroltable-userinfo-dbitem">
                    <template v-if="userDbFio !== ''">
                      Вы зашли как:&nbsp;&nbsp;<span class="dbitem-span">{{ userDbFio }}</span>
                    </template>
                    <template v-else>
                      Вы зашли как:&nbsp;&nbsp;<span class="dbitem-span">не определено</span>
                    </template>
                  </div>

                  <div class="enroltable-userinfo-dbitem">
                    <template v-if="userDbPhone !== ''">
                      Ваш телефон в базе ЕМИАС:&nbsp;&nbsp;<span class="dbitem-span">{{ userPhone }}</span>
                    </template>
                    <template v-else>
                      Ваш телефон в базе ЕМИАС:&nbsp;&nbsp;<span class="dbitem-span">не найден</span>
                    </template>
                  </div>

                  <div class="enroltable-userinfo-dbitem">
                    <template v-if="userDbMail !== ''">
                      Ваша почта в базе ЕМИАС:&nbsp;&nbsp;<span class="dbitem-span">{{ userMail }}</span>
                    </template>
                    <template v-else>
                      Ваша почта в базе ЕМИАС:&nbsp;&nbsp;<span class="dbitem-span">не найдена</span>
                    </template>

                  </div>

                </div>

                <div class="enroltable-userinfo-input" :class="{'userinfo-input-center': !userIputPanelVisible}">
                  <div @click="userIputPanelVisible = true" v-if="!userIputPanelVisible"
                       class="enroltable-userinfo-button"
                  >
                    <button v-if="!commonInfoLoading" class="vue-btn vue-btn-normal">
                      Указать актуальные данные
                    </button>
                  </div>
                  <div v-else class="enroltable-userinfo-input-wr">
                    <div class="enroltable-userinfo-input-title">
                      Укажите ваши актуальные данные:
                    </div>

                    <div class="vue-form-item enroltable-userinfo-input-item">
                      <label for="userinfo-input-phone" class="vue-form-label">
                        <strong>
                          Телефон:
                        </strong>
                      </label>
                      <input type="tel" v-mask="'+7(###)###-##-##'"
                             class="vue-form-control" name="userinfo-input-phone"
                             id="userinfo-input-phone"
                             v-model="userPhoneInput"
                      >
                    </div>

                    <div class="vue-form-item enroltable-userinfo-input-item">
                      <label for="userinfo-input-mail" class="vue-form-label">
                        <strong>
                          Почта:
                        </strong>
                      </label>
                      <input type="text" class="vue-form-control"
                             name="userinfo-input-mail" id="userinfo-input-mail"
                             v-model="userMailInput"
                      >
                    </div>

                    <div v-if="userInfoText !== ''" class="vue-form-item user-infotext-wr"
                         :class="{'infotext-warnstyle': enableUserInfoWarnStyle}"
                    >
                      {{ userInfoText }}
                    </div>

                    <div class="vue-form-item enroltable-userinfo-input-item">
                      <button @click="saveUserInfo()" class="vue-btn vue-btn-normal">
                        Сохранить
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              <div class="enroltable-userinfo-notion">
                Внимание! На указанные контакты будет направлена информация об обучении.
              </div>
            </div>

          </div>

          <div class="enroltable-disclaimer">
            Поставьте галочку напротив тех работников, которые должны участвовать в курсе
          </div>

          <div class="em-table-search-container" :class="{'em-disable-style': tableLoadingActive}">

            <div class="em-search-wr">

              <div @click="searchProcess()" v-tippy="{ content: 'Искать в любом поле таблицы', placement : 'top-start' }"
                   class="em-search-icon"
              >
                <app-icon name="search"
                          :size="20"
                          color="#1e8686"
                />

              </div>

              <div class="em-search-input-wr">

                <input @keyup.enter="searchProcess()" class="em-search-input"
                       type="text" name="em-search-input"
                       v-model="searchInput"
                >

                <template v-if="searchInput !== ''">
                  <div v-tippy="{ content: 'Сбросить поиск', placement : 'top-start' }" @click="resetSearch()"
                       class="em-search-close-icon"
                  >
                    <app-icon name="times-circle"
                              :size="20"
                              color="#1e8686"
                    />
                  </div>
                </template>
                <template v-else>
                  <div class="em-search-close-icon">

                  </div>
                </template>
              </div>

            </div>
          </div>

          <div :class="{'em-disable-style': tableLoadingActive}" class="em-table-pagecount-container">

            <div v-if="Number(totalItems) >5" class="em-table-pagecount-select">
              <select :style="{ backgroundImage: 'url(' + selectArrow + ')'}"
                      :class="{'select-background-position': !app_config.prod}"
                      v-tippy="{ content: 'Кол-во элементов на странице',placement : 'top-start'}"
                      class="vue-form-select"
                      @change="onPageCountChange()"
                      v-model="pageCount"
              >

                <option value="все">
                  все
                </option>
                <option value="5">
                  5
                </option>
                <option v-if="Number(totalItems) >5" value="10">
                  10
                </option>
                <option v-if="Number(totalItems) >15" value="15">
                  15
                </option>
                <option v-if="Number(totalItems) >20" value="20">
                  20
                </option>

              </select>
            </div>

            <div v-tippy="{ content: 'Сбросить фильтры и сортировки',placement : 'top-start'}" @click="fullReset()"
                 v-if="resetIconVisibility" class="em-table-reseticon-wr"
            >
              <app-icon name="times-circle"
                        :size="38"
                        color="#dc3545"
              />
            </div>

            <div v-if="Number(projectMembers) !== 0" class="em-table-export-wr"
                 :class="{'em-disable-style':exportActive}"
            >
              <button @click="exportExcel()" class="vue-btn vue-btn-normal download-button">Экспорт в excel&nbsp;&nbsp;
                <app-icon name="download-alt"
                          :size="20"
                          color="white"
                />
              </button>
            </div>

          </div>

          <div v-if="commonInfoText !== ''" class="enroltable-infotext-wr">
            {{ commonInfoText }}
          </div>

          <div class="em-table-container">

            <div class="em-table-wr" @scroll="handleScroll"
                 :class="pageCount === 'все' ? 'em-table-wr-scroll' : 'em-table-wr-scrollauto'"
            >

              <div class="em-body-item-row">

                <template v-if="!tableLoadingActive && totalItems > 5">

                  <div @click="filterProcess('projpart')" class="em-table-item em-header-item"
                       style="flex:0 0 200px;"
                  >
                    <div class="header-item-text">
                      Запись на проект
                    </div>
                    <div class="header-item-icon">

                      <template v-if="filters.projectPart === 'notset'">
                        <app-icon name="filter"
                                  :size="20"
                                  color="#808080FF"
                        />
                      </template>

                      <template v-else>
                        <template v-if="filters.projectPart === '1'">
                          <app-icon name="filter-slash"
                                    :size="20"
                                    color="#1e8686"
                          />
                        </template>

                        <template v-else>
                          <app-icon name="filter"
                                    :size="20"
                                    color="#1e8686"
                          />
                        </template>
                      </template>

                    </div>

                  </div>

                </template>

                <template v-else>

                  <div class="em-table-item em-header-item" style="flex:0 0 200px;">
                    <div class="header-item-text">
                      Запись на проект
                    </div>
                  </div>

                </template>

                <template v-if="!tableLoadingActive && totalItems > 5">

                  <div @click="sortingProcess('login')" class="em-table-item em-header-item"
                       style="flex: 0 0 200px;"
                  >
                    <div class="header-item-text">
                      Логин
                    </div>
                    <div class="header-item-icon">
                      <template v-if="sorting.login === 'notset'">
                        <app-icon name="sorting"
                                  :size="20"
                                  color="#808080FF"
                        />
                      </template>

                      <template v-else>
                        <template v-if="sorting.login === 'desc'">
                          <app-icon name="sort-amount-down"
                                    :size="20"
                                    color="#1e8686"
                          />
                        </template>
                        <template v-else>
                          <app-icon name="sort-amount-up"
                                    :size="20"
                                    color="#1e8686"
                          />
                        </template>
                      </template>
                    </div>
                  </div>

                </template>

                <template v-else>

                  <div class="em-table-item em-header-item" style="flex: 0 0 200px;">
                    <div class="header-item-text">
                      Логин
                    </div>

                  </div>

                </template>

                <template v-if="!tableLoadingActive && totalItems > 5">

                  <div @click="sortingProcess('fio')" class="em-table-item em-header-item"
                       style="flex: 0 0 350px;"
                  >
                    <div class="header-item-text">
                      ФИО
                    </div>
                    <div class="header-item-icon">
                      <template v-if="sorting.fio === 'notset'">
                        <app-icon name="sorting"
                                  :size="20"
                                  color="#808080FF"
                        />
                      </template>

                      <template v-else>
                        <template v-if="sorting.fio === 'desc'">
                          <app-icon name="sort-amount-down"
                                    :size="20"
                                    color="#1e8686"
                          />
                        </template>
                        <template v-else>
                          <app-icon name="sort-amount-up"
                                    :size="20"
                                    color="#1e8686"
                          />
                        </template>
                      </template>
                    </div>
                  </div>

                </template>

                <template v-else>

                  <div class="em-table-item em-header-item"
                       style="flex: 0 0 350px;"
                  >
                    <div class="header-item-text">
                      ФИО
                    </div>
                  </div>

                </template>


                <div class="em-table-item em-header-item" style="flex: 0 0 200px;">
                  <div class="header-item-text">
                    СНИЛС
                  </div>
                </div>

                <template v-for="n in specColumnCount" :key="n">

                  <template v-if="!tableLoadingActive && totalItems > 5">

                    <div @click="sortingProcess('spec')" class="em-table-item em-header-item"
                         style="flex: 0 0 250px;"
                    >
                      <div class="header-item-text">
                        Должность {{ n.toString() }}
                      </div>
                      <div class="header-item-icon">
                        <template v-if="sorting.spec === 'notset' || Number(n) !== sorting.spec_column">
                          <app-icon name="sorting"
                                    :size="20"
                                    color="#808080FF"
                          />
                        </template>

                        <template v-else>
                          <template v-if="sorting.spec === 'desc' && Number(n) === sorting.spec_column">
                            <app-icon name="sort-amount-down"
                                      :size="20"
                                      color="#1e8686"
                            />
                          </template>
                          <template>
                            <app-icon name="sort-amount-up"
                                      :size="20"
                                      color="#1e8686"
                            />
                          </template>
                        </template>
                      </div>
                    </div>

                  </template>

                  <template v-else>

                    <div @click="sortingProcess('spec', n)" class="em-table-item em-header-item"
                         style="flex: 0 0 250px;"
                    >
                      <div class="header-item-text">
                        Должность {{ n.toString() }}
                      </div>
                    </div>

                  </template>


                </template>

              </div>

              <template v-if="tableLoadingActive">
                <div class="em-table-loading-wr">
                  <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка" />
                </div>
              </template>

              <template v-else>
                <div v-if="userList.length === 0" class="em-table-noresults-wr">
                  Нет результатов
                </div>

                <template v-else v-for="(user, userIndex) in userList"
                          :key="user.userid"
                >
                  <div class="em-body-item-row">
                    <div class="em-table-item table-parts-checkbox-wr em-td-border-right" style="flex:0 0 200px;"
                         :class="{'em-even-color': Number(userIndex) % 2 === 0, 'em-even-td-border-right': Number(userIndex) % 2 === 0}"
                    >
                      <input v-if="Number(user.is_part) === 1" checked
                             :id="'parts-checkbox-'+user.userid.toString()"
                             @change="partsCheckboxClick($event, user.userid)" type="checkbox"
                      />
                      <input v-else :id="'parts-checkbox-'+user.userid.toString()"
                             @change="partsCheckboxClick($event, user.userid, 'parts-checkbox-'+user.userid.toString())" type="checkbox"
                      />
                    </div>

                    <div class="em-table-item table-login-wr em-td-border" style="flex: 0 0 200px; text-align: center;"
                         :class="{'em-even-color': Number(userIndex) % 2 === 0, 'em-even-td-border': Number(userIndex) % 2 === 0}"
                    >
                      {{ user.login }}
                    </div>

                    <div class="em-table-item table-fio-wr em-td-border" style="flex: 0 0 350px; text-align: center;"
                         :class="{'em-even-color': Number(userIndex) % 2 === 0, 'em-even-td-border': Number(userIndex) % 2 === 0}"
                    >
                      {{ user.fio }}
                    </div>

                    <div class="em-table-item table-snils-wr em-td-border" style="flex: 0 0 200px; text-align: center;"
                         :class="{'em-even-color': Number(userIndex) % 2 === 0, 'em-even-td-border': Number(userIndex) % 2 === 0}"
                    >
                      {{ user.snils }}
                    </div>

                    <template v-for="(n, nIndex) in specColumnCount" :key="n">

                      <div class="em-table-item table-spec-wr em-td-border" style="flex: 0 0 250px; text-align: center;"
                           :class="{'em-even-color': Number(userIndex) % 2 === 0, 'em-even-td-border': Number(userIndex) % 2 === 0}"
                      >
                        {{ user.spec_list[nIndex] }}
                      </div>

                    </template>

                  </div>
                </template>
              </template>

            </div>

          </div>

          <div class="em-table-pagination-wr" v-if="servicePageCount !==0 && totalItems > servicePageCount && !tableLoadingActive">
            <vue-awesome-paginate
                :total-items="totalItems"
                :items-per-page="servicePageCount"
                v-model="activePage"
                :on-click="getUserList"
            />
          </div>

        </div>

      </template>
    </template>

  </template>

</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {processUserPart} from "@/projects/EnrolTable/services/processuserpart";
import {getUserListInfo} from "@/projects/EnrolTable/services/getuserlist";
import {getEnrolCommonInfo} from "@/projects/EnrolTable/services/getcommoninfo";
import {saveUserDbInfo} from "@/projects/EnrolTable/services/saveuserinfo";
import {checkMoresp} from "@/projects/EnrolTable/services/checkmoresp";
import ChooseMo from "@/projects/EnrolTable/components/ChooseMo.vue";
import * as dayjs from 'dayjs'
import {useUserStore} from "@/projects/global/store/user";
import {computed, onMounted, ref} from "vue";
import {app_config} from "@/projects/config/setconfig";

// PROPS
const props = defineProps({
  projectIdProps: {
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

// DATA
const targetMoId = ref(0);

const moList = ref([]);

const isloadingActive = ref(true);

const globalTableInfoText = ref('');

const globalInfoTableWarnStyle = ref(false);

const projectId = ref(0);

const exportActive = ref(false);

const enableUserInfoWarnStyle = ref(false);

const commonInfoText = ref('');

const userInfoText = ref('');

const enrolTableInfoText = ref('');

const noPaginOffset = ref(0);

const activePage = ref(1);

const totalItems = ref(0);

const searchInput = ref('');

const pageCount = ref('10');

const specColumnCount = ref(0);

const userList = ref([]);

const userInfoBlockVisible = ref(true);

const userIputPanelVisible = ref(false);

const userPhoneInput = ref('');

const userMailInput = ref('');

const userMailFreeze = ref('');

const userPhoneFreeze = ref('');

const userDbPhone = ref('');

const userDbMail = ref('');

const userDbFio = ref('');

const moDbName = ref('');

const moDbShortName = ref('');

const tableLoadingActive = ref(false);

const commonInfoLoading = ref(false);

const tableBodyDisableStyle = ref(false);

const projectMembers = ref(0);

const filters = ref({
  projectPart: '0'
});

const sorting = ref({
  login:'0',
  fio: '0',
  spec: '0',
  spec_column: 0
});

// METHODS
const checkAccess = async()=>{

  if (props.getParamActive){

    const queryString = await window.location.search;
    const urlParams = await new URLSearchParams(queryString);

    if (urlParams.get('projectid')) {
      projectId.value = Number(urlParams.get('projectid'));
    }
  }
  else {
    projectId.value = props.projectIdProps;
  }

  // if(!app_config.prod) {
  //   if (projectId.value === 0){
  //     projectId.value = 19;
  //   }
  // }

  if (Number(projectId.value) !==0){

    await checkResp();

  }
  else {
    globalTableInfoText.value = 'Нет информации для отображения!';
    isloadingActive.value = false;
  }

};

const checkResp = async()=>{

  let checkRespAnswer = await checkMoresp(projectId.value, userStore.$state.userid);

  await console.log("checkRespAnswer: ", checkRespAnswer);

  if(checkRespAnswer['status'] === 'ok'){

    isloadingActive.value = false;

    moList.value = await checkRespAnswer['info']['molist'];

    if(checkRespAnswer['info']['molist'].length === 1){

      targetMoId.value = await Number(checkRespAnswer['info']['molist'][0]['id']);
      await getCommonInfo();
      await getUserList();
    }
    // else if (checkRespAnswer['info']['molist'].length === 0){
    //   globalTableInfoText.value = 'Нет информации для отображения!';
    //   globalInfoTableWarnStyle.value = false;
    // }

  }
  else {
    isloadingActive.value = false;
    globalTableInfoText.value = 'Во время сбора информации возникла ошибка!';
  }

};

const submitMo = async(moId)=>{
  targetMoId.value = Number(moId);
  await getCommonInfo();
  await getUserList();
};

const exportExcel = async()=>{

  await resetInfoText();

  exportActive.value = true;

  try{

    const expResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({"action": "exportinfo", "exportarget": "exportenrolinfo", "projectid": projectId.value,
        "moid": targetMoId.value
      })
    });

    if(expResp.status.toString() !== '200'){

      commonInfoText.value = 'При попытке экспорта данных возникла ошибка. Попробуйте повторить процедуру позже!';

    }
    else{

      let repAnswer = await expResp.blob();

      let fileUrl = await URL.createObjectURL(repAnswer);

      let link = await document.createElement("a");
      link.href = fileUrl;
      link.download =  moDbName.value+"_"+dayjs().format('DD_MM_YYYY')+".xlsx";
      await document.body.appendChild(link);
      await link.click();
      await document.body.removeChild(link);

    }
  }
  catch(e) {

    commonInfoText.value = 'При попытке экспорта данных возникла ошибка. Попробуйте повторить процедуру позже!';

  }
  exportActive.value = false;
};

const resetInfoText = ()=>{

  enableUserInfoWarnStyle.value = false;

  commonInfoText.value = '';

  userInfoText.value = '';

  enrolTableInfoText.value = '';
};

const saveUserInfo = async()=>{

  await resetInfoText();

  let saveFlag = false;

  if(userMailInput.value !== '' && userMailInput.value !== userMailFreeze.value){
    saveFlag = true;
  }

  if(userPhoneInput.value !== '' && userPhoneInput.value !== userPhoneFreeze.value){
    saveFlag = true;
  }

  if(saveFlag) {

    let answer = await saveUserDbInfo(userStore.$state.userid, userPhoneInput.value, userMailInput.value);

    await console.log("saveUserDbInfo answer: ", answer);

    if (answer['status'] === 'ok'){
      await getCommonInfo();
      userInfoText.value = 'Вы успешно сохранили данные!';
    }
    else {
      userInfoText.value = 'При попытке сохранить данные возникла проблема. Попробуйте повторить позже!';
      enableUserInfoWarnStyle.value = true;
    }
  }

};

const getCommonInfo = async()=>{

  if(globalTableInfoText.value === ''){

    commonInfoLoading.value = true;

    let answer = await getEnrolCommonInfo(projectId.value, targetMoId.value, userStore.$state.userid);

    await console.log("getEnrolCommonInfo answer: ", answer);

    if(answer['status'] === 'ok') {

      moDbName.value = await answer['info']['mo']['name'];
      moDbShortName.value = await answer['info']['mo']['shortname'];
      userDbFio.value = await answer['info']['user']['dbfio'];
      userDbPhone.value = await answer['info']['user']['dbphone'];
      userDbMail.value = await answer['info']['user']['dbmail'];
      userPhoneFreeze.value = await answer['info']['user']['phone'];
      userPhoneInput.value = await answer['info']['user']['phone'];
      userMailFreeze.value = await answer['info']['user']['mail'];
      userMailInput.value = await answer['info']['user']['mail'];

    }
    else {
      globalTableInfoText.value = 'При попытке получить данные пользователя и МО возникла ошибка. Попробуйте перегрузить страницу или зайдите позже!';
      globalInfoTableWarnStyle.value = true;
    }

    commonInfoLoading.value = false;

  }

};

const emulateClick = (target)=>{

  resetInfoText();
  document.getElementById(target).click();

};

const getUserList = async()=>{

  if(globalTableInfoText.value === ''){

    if(pageCount.value !== 'все'){
      tableLoadingActive.value = true;
    }
    else {
      tableBodyDisableStyle.value = true;
    }

    await console.log("getUserListInfo projectPostParams.value: ", projectPostParams.value);
    let answer = await getUserListInfo(projectPostParams.value);

    await console.log("getUserListInfo answer: ", answer);

    if(answer['status'] === 'ok'){

      totalItems.value = await answer['info']['total_count'];
      noPaginOffset.value = await Number(answer['info']['nopagin_offset']);
      specColumnCount.value = await Number(answer['info']['spec_count']);
      projectMembers.value = await Number(answer['info']['project_members']);

      if (pageCount.value === 'все'){

        if(answer['info']['user_list'].length > 0) {
          userList.value = await userList.value.concat(answer['info']['user_list']);
        }

      }
      else {
        userList.value = await answer['info']['user_list'];
      }
    }
    else {
      globalTableInfoText.value = 'При попытке получить список пользователей возникла ошибка! Попробуйте перегрузить страницу или зайти позже!';
      globalInfoTableWarnStyle.value = true;
    }

    tableLoadingActive.value = false;
    tableBodyDisableStyle.value = false;

  }

};

const partsCheckboxClick = async(event, userid, elemid)=>{

  await resetInfoText();

  let partFlag;
  if (event.target.checked){
    partFlag = 1;
  }
  else {
    partFlag = 0;
  }
  let answer = await processUserPart(projectId.value, targetMoId.value, userid, partFlag);

  console.log("processUserPart answer: ", answer);

  if (answer['status'] !=='ok') {

    enrolTableInfoText.value = "При попытке изменить параметр участия пользователя в проекте произошла ошибка!";

    document.getElementById(elemid).checked = partFlag !== 1;
  }
};

const sortingProcess = async(target, column=0)=>{

  activePage.value = 1;
  noPaginOffset.value = 0;
  await resetInfoText();

  await resetFiltersAndSorting(target);

  if(target === 'login'){
    if(sorting.value.login === 'notset' || sorting.value.login === 'desc'){
      sorting.value.login = 'asc';
    }
    else {
      sorting.value.login = 'desc';
    }
  }
  else if(target === 'fio'){
    if(sorting.value.fio === 'notset' || sorting.value.fio === 'desc'){
      sorting.value.fio = 'asc';
    }
    else {
      sorting.value.fio = 'desc';
    }
  }
  else if(target === 'spec' ){

    sorting.value.spec_column = column;
    if(sorting.value.spec === 'notset' || sorting.value.spec === 'desc'){

      sorting.value.spec = 'asc';
    }
    else {
      sorting.value.spec = 'desc';
    }
  }

  if(pageCount.value === 'все'){
    userList.value = [];
  }

  await getUserList();
};


const resetFiltersAndSorting = (exclude)=>{

  resetInfoText();

  if(!['login', 'fio', 'spec', 'projpart'].includes(exclude)){
    filters.value.projectPart = 'notset';
  }
  if(!['login', 'projpart'].includes(exclude)){
    sorting.value.login = 'notset';
  }
  if(!['fio', 'projpart'].includes(exclude)){
    sorting.value.fio = 'notset';
  }
  if(!['spec', 'projpart'].includes(exclude)){

    sorting.value.spec_column = 0;
    sorting.value.spec = 'notset';
  }

};

const filterProcess = async(target)=>{

  await resetInfoText();
  activePage.value = 1;
  noPaginOffset.value = 0;

  await resetFiltersAndSorting(target);

  if(target === 'projpart'){
    if(filters.value.projectPart === 'notset' || filters.value.projectPart === '0'){
      filters.value.projectPart = '1';
    }
    else {
      filters.value.projectPart = '0';
    }
  }

  if(pageCount.value === 'все'){
    userList.value = [];
  }
  await getUserList();
};

const fullReset = async()=>{

  noPaginOffset.value = 0;

  activePage.value = 1;

  pageCount.value = '10';

  filters.value.projectPart = 'notset';

  sorting.value.login = 'notset';

  sorting.value.fio = 'notset';

  sorting.value.spec = 'notset';

  sorting.value.spec_column = 0;

  await resetInfoText();

  await getUserList();

};

const searchProcess = async()=>{

  noPaginOffset.value = 0;

  await resetInfoText();

  if(searchInput.value !== ''){
    getUserList();
  }
};

const resetSearch = async()=>{

  await resetInfoText();

  noPaginOffset.value = 0;
  searchInput.value = '';
  activePage.value = 1;

  await getUserList();
};

const onPageCountChange = async()=>{

  await resetInfoText();

  noPaginOffset.value = 0;
  if (pageCount.value === 'все'){
    userList.value =[];
  }
  else {
    activePage.value = 1;
  }
  await getUserList();
};

const handleScroll = async(event)=>{
  if(pageCount.value === 'все' &&  Number(globalNoPaginOffset.value)){
    if (Number(totalItems.value) > Number(globalNoPaginOffset.value)){
      let elScrollTop = await event.currentTarget.scrollTop;
      let elClientHeight = await event.currentTarget.clientHeight;
      let elScrollHeight = await event.currentTarget.scrollHeight;

      if(elScrollTop + elClientHeight >= elScrollHeight){
        if (Number(noPaginOffset.value) <= Number(totalItems.value)){
          await getUserList();
        }
      }
    }
  }
};

// COMPUTED
const projectStatUrl = computed(()=>{
  return app_config.mainStatUrl + '?projectid='+projectId.value.toString();
});

const servicePageCount = computed(()=>{
  if(pageCount.value === 'все'){
    return 0
  }
  else {
    return Number(pageCount.value)
  }
});

const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg"
});

const resetIconVisibility = computed(()=>{

  let reset = false;

  if (filters.value.projectPart !== '0' && filters.value.projectPart !== 'notset'){
    reset = true;
  }

  if (sorting.value.login !== '0' && sorting.value.login !== 'notset'){
    reset = true;
  }

  if (sorting.value.fio !== '0' && sorting.value.fio !== 'notset'){
    reset = true;
  }

  if (sorting.value.spec !== '0' && sorting.value.spec !== 'notset'){
    reset = true;
  }

  return reset;
});

const projectPostParams = computed(()=>{

  return {
    apiurl: app_config.apiUrl,
    projectid: projectId.value,
    moid: targetMoId.value,
    filters: filters.value,
    sorting: sorting.value,
    pagecount: pageCount.value,
    searchinput: searchInput.value,
    nopaginoffset: noPaginOffset.value,
    activepage: activePage.value,
    userid: userStore.$state.userid

  }
});

// LIFECYCLE
onMounted(async()=>{
  await checkAccess();

  if(globalTableInfoText.value === ''){
    filters.value.projectPart = 'notset';

    sorting.value.login = 'notset';
    sorting.value.fio = 'notset';
    sorting.value.spec = 'notset';
  }
})

</script>


<style scoped>
.select-background-position {
  background-position: right 0.75rem center;
}

.em-enroltable-navigation-item {

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
.em-enroltable-navigation-item:hover {
  background-color: #145b5b;
}

.em-enroltable-navigation-wr {

  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;

}

.enroltable-userinfo-close-wr {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  margin-bottom: 20px;
}

.em-enroltable-loading-wr {
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-globaltable-info-wr {
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
  font-size: 1.4em;
  font-weight: bold;
  color: #1e8686;
  justify-content: center;
}

.em-table-export-wr {
  margin-left: 20px;
}

.download-button {
  display: flex;
  align-items: center;
}

.em-disable-style {
  pointer-events: none;
  opacity: 0.4;
}

.enroltable-disclaimer {
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}

.infotext-warnstyle {
  color: #dc3545 !important;
}

.enroltable-infotext-wr {
  margin-bottom: 20px;
  font-size: 1.3em;
  font-weight: bold;
  color: #dc3545;
}

.user-infotext-wr {
  font-size: 1.3em;
  font-weight: bold;
  color: #1e8686;
}

.enroltable-commoninfo-infotext {
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 1.3em;
  color: #dc3545;
}

.table-spec-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-snils-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.userinfo-input-center {
  justify-content: center;
  align-items: center;
}

.enroltable-userinfo-input-title {
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 1.3em;
  color: #686868;
}

.dbitem-span {
  color: #3a80bd;
}

.enroltable-userinfo-notion {
  margin-top: 20px;
  text-align: left;
  font-weight: bold;
  font-size: 1.3em;
  color: #dc3545;
}

.enroltable-userinfo-dbitem {
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 1.3em;
  color: #686868;
  display: flex;
  align-items: center;
}

.enroltable-mo-title {
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
  margin-bottom: 40px;
}

.en-enroltable-container {
  margin-top: 40px;
}

.enroltable-userinfo-input {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.enroltable-userinfo-db {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.enroltable-userinfo-wr {
  border-radius: 7px;
  padding: 20px;
  border: 1px solid #ced4da;
  display: flex;
  flex-direction: column;
}
.enroltable-userinfo {
  display: flex;
}

.enroltable-common-info {
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
}

.em-table-pagination-wr {
  display: flex;
  justify-content: center;
}

.table-fio-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-login-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-even-color {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-td-border-right {
  border-right: 1px solid #ced4da;
  border-left: none;
}
.em-td-border-left {
  border-right: none;
  border-left: 1px solid #ced4da;
}

.em-even-td-border-left {
  border-right: none !important;
  border-left: 1px solid white !important;
}
.em-even-td-border-right {
  border-right: 1px solid white !important;
  border-left: none !important;
}

.em-td-border {
  border-right: 1px solid #ced4da;
  border-left: 1px solid #ced4da;
}
.em-even-td-border {
  border-right: 1px solid white !important;
  border-left: 1px solid white !important;
}

.em-table-noresults-wr {
  font-weight: bold;
  font-size: 1.5em;
  color: #1e8686;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-table-loading-wr {
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.parts-checkbox-wr input {
  margin: unset !important;
}

.table-parts-checkbox-wr {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-item-text {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}


.header-item-icon {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.em-header-item {
  color: #686868;
  cursor: pointer;
  border: 1px solid #ced4da;
  display: flex;
  align-items: center;
  justify-content: center;
}
.em-header-item:hover {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-table-item {
  box-sizing: border-box;
  padding: 10px;
}

.em-body-item-row {
  display: flex;
  justify-content: flex-start;
}

.em-table-wr {
  display: flex;
  flex-direction: column;
  width: inherit;
}

.em-table-wr-scroll {
  height: 900px;
  overflow: scroll;
}

.em-table-wr-scrollauto {
  overflow: auto;
}

.em-table-container {
  min-height: 400px;
  font-family: Helvetica;
  font-weight: bold;
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
}

.em-table-reseticon-wr {
  cursor: pointer;
}

.em-table-pagecount-select {

  padding-right: 20px;
}
.em-table-pagecount-select select{
  margin: unset !important;
}

.em-table-pagecount-container select {
  width: inherit !important;
}
.em-table-pagecount-container {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-table-search-container {
  margin-top: 40px;
  margin-bottom: 40px;
}
.em-table-search-container .em-search-wr {
  width: 40% !important;
}

</style>