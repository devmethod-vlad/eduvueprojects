<template>
<div class="em-respinfo-container">
  <div class="em-respinfo-wr">

    <div class="em-table-container">

      <div class="em-table-title">
        Ответственные:
      </div>

      <div class="em-table-wr">
        <div class="em-body-item-row">
          <div ref="headerfio" class="em-table-item em-header-item"
               style="flex: 0 0 300px; text-align: center;"
          >
            ФИО
          </div>
          <div ref="headerphone" class="em-table-item em-header-item"
               style="flex: 0 0 150px; text-align: center;"
          >
            Телефон
          </div>
          <div ref="headermail" class="em-table-item em-header-item"
               style="flex: 0 0 150px; text-align: center;"
          >
            Почта
          </div>
          <div ref="headermaincheckbox" class="em-table-item em-header-item"
               style="flex: 0 0 150px; text-align: center;"
          >
            Ответственный
          </div>
          <div ref="headersubcheckbox" class="em-table-item em-header-item"
               style="flex: 0 0 150px; text-align: center;"
          >
            Зам. ответственного
          </div>
          <div ref="headerdelete" class="em-table-item em-header-item"
               style="flex: 0 0 150px; text-align: center;"
          >
            Удалить
          </div>
        </div>

        <div v-if="respList.length === 0" class="em-body-item-row"
             :style="'width: '+headerWidth+'px;'"
        >
          <div class="em-resptable-noresults" :style="'width: '+headerWidth+'px;'">
            Ответственные еще не добавлены
          </div>
        </div>

        <template v-else>
          <template v-for="(resp, respIndex) in respList" :key="resp.userid">
            <div class="em-body-item-row">

              <div class="em-table-item table-fio-wr em-td-border" style="flex: 0 0 300px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                {{ resp.lastname }} {{ resp.firstname }} {{ resp.secondname }}
              </div>

              <div class="em-table-item table-phone-wr em-td-border" style="flex: 0 0 150px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                {{ resp.phone }}
              </div>

              <div class="em-table-item table-mail-wr em-td-border" style="flex: 0 0 150px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                {{ resp.mail }}
              </div>

              <div class="em-table-item table-mainresp-wr em-td-border" style="flex: 0 0 150px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                <input @click="processRespCheckbox($event,'main', resp.userid)" type="checkbox"
                       :value="resp.userid" v-model="mainRespList"
                >
              </div>

              <div class="em-table-item table-subresp-wr em-td-border" style="flex: 0 0 150px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                <input @click="processRespCheckbox($event,'sub', resp.userid)" type="checkbox"
                       :value="resp.userid" v-model="subRespList"
                >
              </div>

              <div class="em-table-item table-delresp-wr em-td-border" style="flex: 0 0 150px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                <div v-if="Number(activeDeleteUserId) !== resp.userid" @click="clickDelResp(resp.userid)"
                     class="table-del-icon"
                >
                  <app-icon name="to-trash"
                            :size="23"
                            color="#dc3545"
                  />
                </div>

                <div v-else class="table-del-icon em-disabled-style">
                  <app-icon name="to-trash"
                            :size="23"
                            color="#808080FF"
                  />
                </div>

                <div v-if="Number(activeDeleteUserId) === resp.userid" class="table-add-submit-wr">
                  <SubmitPanel
                      :user-id="resp.userid"
                      @reject="activeDeleteUserId = 0"
                      @submit="(userid)=>{onSubmitDelResp(userid)}"
                  />
                </div>
              </div>

            </div>
          </template>

        </template>

      </div>
    </div>

    <div class="em-respinfo-searchresp">
      <SearchResp
          :mo-id="moParams['moid']"
          @submitrespuser="getRespList()"
          @stoprefresh="()=>{refreshSearchResults = false}"
          :refresh-search-results="refreshSearchResults"
      />
    </div>

    <div class="em-moprojectmembers-wr">
      <MoProjectMembers
          :mo-id="moParams['moid']"
          :project-id="projectId"
      />
    </div>

  </div>
</div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import SearchResp from "@/projects/MainStatsTable/components/RespTable/components/SearchResp.vue";
import {getRespUserList} from "@/projects/MainStatsTable/components/RespTable/services/getresplist";
import SubmitPanel from "@/projects/MainStatsTable/components/RespTable/components/SubmitPanel.vue";
import {processRespUser} from "@/projects/MainStatsTable/components/RespTable/services/processrespuser";
import {deleteRespUser} from "@/projects/MainStatsTable/components/RespTable/services/delrespuser";
import MoProjectMembers from "@/projects/MainStatsTable/components/RespTable/components/MoProjectMembers.vue";
import {onMounted, ref} from "vue";
import {app_config} from "@/projects/config/setconfig";

// PROPS
const props = defineProps({
  projectId: {
    type: Number,
    default: 0
  },

  moParams: {
    type: Object,
    default() {
      return {}
    }
  }
});


// DATA
const refreshSearchResults = ref(false);

const respList = ref([]);

const headerWidth = ref('0');

const mainRespList = ref([]);

const subRespList = ref([]);

const activeDeleteUserId = ref(0);

const headerfio = ref(null);
const headerphone = ref(null);
const headermail = ref(null);
const headermaincheckbox = ref(null);
const headersubcheckbox = ref(null);
const headerdelete = ref(null);

// METHODS
const processRespCheckbox = async(event, target, userid)=>{

  await console.log("processRespCheckbox this.mainRespList: ", mainRespList.value);
  await console.log("processRespCheckbox this.subRespList: ", subRespList.value);

  let answer = await processRespUser(app_config.apiUrl, target, event.target.checked ? 1 : 0, userid, props.moParams.moid, props.projectId);

  await console.log("processRespUser answer: ", answer);

  if(answer['status'] === 'ok'){
    if(target === 'main'){

      if (event.target.checked){


        mainRespList.value = [userid];

        if (subRespList.value.includes(userid)){
          let resIndex = subRespList.value.indexOf(userid);
          if (resIndex !== -1){
            subRespList.value.splice(resIndex, 1);
          }
        }
      }
      else {
        mainRespList.value = [];
      }
    }
    else if(target === 'sub'){

      if (event.target.checked){
        subRespList.value = [userid];
        if (mainRespList.value.includes(userid)){
          let resIndex = mainRespList.value.indexOf(userid);
          if (resIndex !== -1){
            mainRespList.value.splice(resIndex, 1);
          }
        }
      }
      else {
        subRespList.value = [];
      }

    }
  }
};

const clickDelResp = (userid)=>{

  if(Number(activeDeleteUserId.value) === 0){
    activeDeleteUserId.value = Number(userid);
  }
  else if(Number(activeDeleteUserId.value) === Number(userid)){
    activeDeleteUserId.value = 0;
  }
  else {
    activeDeleteUserId.value = Number(userid);
  }
};

const onSubmitDelResp = async(userid)=>{
  let delAnswer = await deleteRespUser(app_config.apiUrl, userid, props.moParams.moid, props.projectId);

  await console.log("onSubmitDelResp delAnswer: ", delAnswer);

  if (delAnswer['status'] === 'ok'){
    activeDeleteUserId.value = 0;
    await getRespList();
    refreshSearchResults.value = true;
  }
};

const getRespList = async()=>{
  let answer = await getRespUserList(app_config.apiUrl, props.projectId, props.moParams.moid);

  await console.log("getRespList answer: ", answer);

  if(answer['status'] === 'ok'){
    respList.value = await answer['info']['resp_lisp'];
    for(let rItem of respList.value){
      if(Number(rItem.is_main) === 1){
        if (!mainRespList.value.includes(rItem.userid)){
          mainRespList.value.push(rItem.userid);
        }
      }
      if(Number(rItem.is_sub) === 1){
        if (!subRespList.value.includes(rItem.userid)){
          subRespList.value.push(rItem.userid);
        }
      }
    }
  }
};

// COMPUTED
onMounted(()=>{
  let fioWidth = Number(headerfio.value.offsetWidth);
  let phoneWidth = Number(headerphone.value.offsetWidth);
  let mailWidth = Number(headermail.value.offsetWidth);
  let mainCheckWidth = Number(headermaincheckbox.value.offsetWidth);
  let subCheckWidth = Number(headersubcheckbox.value.offsetWidth);
  let delWidth = Number(headerdelete.value.offsetWidth);

  headerWidth.value = (fioWidth+phoneWidth+mailWidth+mainCheckWidth+subCheckWidth+delWidth).toString();
  console.log("headerWidth: ", headerWidth.value);

  getRespList();
});

</script>

<style scoped>
.em-moprojectmembers-wr {
  margin-top: 40px;
}

.table-del-icon {
  cursor: pointer;
}

.table-add-submit-wr {
  margin-left: 20px;
}

.table-delresp-wr {
  justify-content: center;
  display: flex;
  align-items: center;
}

.em-disabled-style {
  pointer-events: none;
  opacity: 0.4;
}

.table-fio-wr {
  display: flex;
  align-items: center;
}
.table-phone-wr {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-mainresp-wr {
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-mainresp-wr input {
  margin: unset !important;
}

.table-subresp-wr {
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-subresp-wr input{
  margin: unset !important;
}

.table-mail-wr {
  display: flex;
  align-items: center;
  justify-content: center;
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

.em-resptable-noresults {
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1e8686;
  font-size: 1.3em;
}

.em-table-title {
  margin-bottom: 25px;
  font-size: 1.3em;
}

.em-respinfo-wr {
  display: flex;
  flex-direction: column;
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

</style>