<template>
<div class="em-moprojectmembers">

  <div v-if="infoText !==''" class="em-table-info-container"
       :class="{'em-table-warn-style':enableInfoWarnStyle}"
  >
      {{ infoText }}
  </div>

  <div class="em-table-container">

    <div class="em-table-title">
      Список участников проекта <template v-if="lastUpdate !== ''">(последнее обновление {{ lastUpdate }})</template>:
    </div>

    <div class="em-table-wr">

      <div class="em-body-item-row">

        <div @click="Number(totalItems) > 1 ? sortingProcess('login') : null" ref="headerlogin"
             class="em-table-item em-header-item" style="flex: 0 0 200px; text-align: center;"
        >

          <div class="header-item-text">
            Логин
          </div>

          <div v-if="Number(totalItems) > 1" v-tippy="{ content: 'Сортировка по логину пользователя',placement : 'top-start'}"
               class="header-item-icon"
          >
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

        <div @click="Number(totalItems) > 1 ? sortingProcess('fio') : null" ref="headerfio"
             class="em-table-item em-header-item" style="flex: 0 0 350px; text-align: center;"
        >

          <div class="header-item-text">
            ФИО
          </div>

          <div v-if="Number(totalItems) > 1" v-tippy="{ content: 'Сортировка ФИО пользователя',placement : 'top-start'}"
               class="header-item-icon"
          >
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

        <div ref="headersnils" class="em-table-item em-header-item"
             style="flex: 0 0 150px; text-align: center;"
        >
          СНИЛС
        </div>

        <div ref="headercomment" class="em-table-item em-header-item"
             style="flex: 0 0 300px; text-align: center;"
        >
          Комментарий
        </div>

      </div>

      <template v-if="tableLoadingActive">
        <div class="em-table-loading-wr" :style="'width: '+headerWidth+'px;'">
          <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка" />
        </div>
      </template>

      <template v-else>

        <div v-if="userList.length === 0" class="em-body-item-row"
             :style="'width: '+headerWidth+'px;'"
        >
          <div class="em-usertable-noresults" :style="'width: '+headerWidth+'px;'">
            Пользователи не добавлены в проект
          </div>
        </div>

        <template v-else>

          <template v-for="(user, userIndex) in userList" :key="user.userid">

            <div class="em-body-item-row">

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

              <div class="em-table-item table-snils-wr em-td-border" style="flex: 0 0 150px; text-align: center;"
                   :class="{'em-even-color': Number(userIndex) % 2 === 0, 'em-even-td-border': Number(userIndex) % 2 === 0}"
              >
                {{ user.snils }}
              </div>

              <div class="em-table-item table-comment-wr em-td-border" style="flex: 0 0 300px; text-align: center;"
                   :class="{'em-even-color': Number(userIndex) % 2 === 0, 'em-even-td-border': Number(userIndex) % 2 === 0}"
              >
                <textarea :id="'usercomment-input-ident-'+user.userid.toString()" @focusout="saveUserComment($event, user.userid, 'usercomment-input-ident-'+user.userid.toString())"
                          rows="2" class="vue-form-control"
                          v-model="user.comment">

                </textarea>
              </div>

            </div>

          </template>

        </template>

      </template>

    </div>

  </div>

</div>
</template>

<script setup>
import {saveUserCommentInfo} from "@/projects/MainStatsTable/components/RespTable/services/saveusercomment";
import {getProjectMembers} from "@/projects/MainStatsTable/components/RespTable/services/getprojectmembers";
import {onMounted, ref} from "vue";
import {app_config} from "@/projects/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

// PROPS
const props = defineProps({
  moId: {
    type: Number,
    default: 0
  },

  projectId: {
    type: Number,
    default: 0
  }
});

// DATA
const headerWidth = ref('');

const lastUpdate = ref('');

const enableInfoWarnStyle = ref(false);

const infoText = ref('');

const noPaginOffset = ref(0);

const totalItems = ref(0);

const userList = ref([]);

const userListFreeze = ref([]);

const tableLoadingActive = ref(false);

const sorting = ref({
  login:'0',
  fio: '0',
});

const headerlogin = ref(null);
const headerfio = ref(null);
const headersnils = ref(null);
const headercomment = ref(null);

// METHODS
const getUserList = async()=>{

  tableLoadingActive.value = true;

  let answer = await getProjectMembers(app_config.apiUrl, props.projectId, props.moId, sorting.value, noPaginOffset.value);

  await console.log("getUserList answer: ", answer);

  if(answer['status'] === 'ok'){

    totalItems.value = await answer['info']['total_count'];
    noPaginOffset.value = Number(answer['info']['nopagin_offset']);
    lastUpdate.value = answer['info']['last_update']

    if(answer['info']['user_list'].length > 0) {

      userList.value = await userList.value.concat(answer['info']['user_list']);
      userListFreeze.value = await userListFreeze.value.concat(answer['info']['user_list']);

    }

  }
  else {
    infoText.value = "При попытке получить список участников возникла ошибка!";
    enableInfoWarnStyle.value = true;
  }
  tableLoadingActive.value = false;

};

const emulateClick = (target)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  document.getElementById(target).click();
};

const saveUserComment = async(event, userid, inputid)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  await console.log("saveUserComment event.target.value: ", event.target.value);

  let matchList = await userListFreeze.value.filter(item => Number(item.userid) === Number(userid));

  if (matchList.length > 0){

    if(Number(event.target.value.trim()) !== matchList[0].comment.trim()){

      let saveAnsw = await saveUserCommentInfo(app_config.apiUrl, props.projectId, userid, props.moId, event.target.value.trim());

      await console.log("saveUserCommentInfo answer: ", saveAnsw);

      if(saveAnsw['status'] === 'ok'){

        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(75 155 55 / 48%)";

        }

      }
      else {
        infoText.value = "При попытке сохранить комментарий произошла ошибка!";
        enableInfoWarnStyle.value = true;

        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(249 0 0 / 32%)";

        }
      }

      if(document.getElementById(inputid)){
        setTimeout(function() {
          if(document.getElementById(inputid)){
            document.getElementById(inputid).style.boxShadow = "unset";
          }
        }, 3000);
      }


    }
  }

};

const fullReset = ()=>{

  noPaginOffset.value = 0;

  sorting.value.fio = 'notset';

  sorting.value.login = 'notset';

  getUserList();
};

const resetFiltersAndSorting = (exclude)=>{

  if(!['login'].includes(exclude)){
    sorting.value.login = 'notset';
  }
  if(!['fio'].includes(exclude)){
    sorting.value.fio = 'notset';
  }

};

const sortingProcess = async(target)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  noPaginOffset.value = 0;
  userList.value = [];
  userListFreeze.value = [];

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

  await getUserList();
};

const handleScroll = (event)=>{

  if(Number(totalItems.value> Number(globalNoPaginOffset.value))){
    let elScrollTop = event.currentTarget.scrollTop;
    let elClientHeight = event.currentTarget.clientHeight;
    let elScrollHeight = event.currentTarget.scrollHeight;

    if(elScrollTop + elClientHeight >= elScrollHeight){
      // console.log("endOfElem");
      if (Number(noPaginOffset.value) <= Number(totalItems.value)){
        getUserList();
      }
    }
  }

};

// LIFECYCLE
onMounted(()=>{
  sorting.value.login = 'notset';
  sorting.value.fio = 'notset';

  let loginWidth = headerlogin.value.offsetWidth;
  let fioWidth = headerfio.value.offsetWidth;
  let snilsWidth = headersnils.value.offsetWidth;
  let commWidth = headercomment.value.offsetWidth;

  let sumWidth = Number(loginWidth) + Number(fioWidth) + Number(snilsWidth) + Number(commWidth);

  headerWidth.value = sumWidth.toString();

  getUserList();

})

</script>

<style scoped>
.table-comment-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-comment-wr {
  margin: unset !important;
}

.table-snils-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-fio-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-login-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-item-icon {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.header-item-text {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}

.em-table-loading-wr {
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-even-color {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-even-td-border {
  border-right: 1px solid white !important;
  border-left: 1px solid white !important;
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

.em-table-title {
  margin-bottom: 25px;
  font-size: 1.3em;
  color: #1e8686;
}

.em-table-item {
  word-break: break-word;
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
  overflow: auto;
}

.em-table-container {
  flex-direction: column;
  font-family: Helvetica;
  font-weight: bold;
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
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

.em-usertable-noresults {
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1e8686;
  font-size: 1.3em;
}

</style>