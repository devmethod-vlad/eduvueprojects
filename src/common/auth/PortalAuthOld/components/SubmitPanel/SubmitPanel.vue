<template>
    <div>
        <div class="em-submit-panel">
            <div class="em-submit-panel-text-wr">
                {{ fio }}, это Вы?
            </div>
            <div class="em-submit-panel-button-wr">
                <button
                  type="button" @click.stop.prevent="openPanelAndReport()"
                  class="vue-btn vue-btn-warn em-submit-panel-button-no"
                  id="em-submit-panel-button-no"
                >
                    Нет
                </button>

                <button type="button"
                        @click="submitAuthInfo()"
                        class="vue-btn vue-btn-normal em-submit-panel-button-yes"
                >
                    Да, это я
                </button>
            </div>
        </div>
        <report-panel
          v-if="reportPanelVisible"
          :fio="fio"
          :login="submitInfo.login"
          :snils="submitInfo.snils"
          @closereport="closeReportPanel()"
        />
    </div>

</template>
<script setup>
import ReportPanel from "./components/ReportPanel/ReportPanel.vue";
import {sendReport} from "./components/ReportPanel/services/sendreport";
import {portalConfigObject} from "@/objects/portalauthappconfig";
import {submitAuth} from "./services/submitauth";
import {computed, ref} from "vue";
import {portalAuthUrlObject} from "../../objects/urlparams";

// EMITS
const emits = defineEmits(
  [
    'closereportpanel',
    'emituserstate',
    'startloading',
    'stoploading',
    'unsuccessubmitapi'
  ]);


// PROPS
const props = defineProps({
    appConfig:
      {
          type: Object,
          default(){
              return {...portalConfigObject};
          },

          required: true

      },
    submitInfo:
        {
            type: Object,
            default(){
                return {};
            },

        },
    urlState:
        {
          type: Object,
          default(){
            return {...portalAuthUrlObject};
          },
        }
});

// DATA
const reportPanelVisible = ref(false);

// METHODS
const closeReportPanel = ()=>{
    reportPanelVisible.value = false;
    emits('closereportpanel');
}

const openPanelAndReport = async ()=>{
    reportPanelVisible.value = true;

    const telMessage = '❗ <b>Пользователь веб-версии столкнулся с проблемой. Найденные в базе данные не соответствуют реальности.\nФИО: '+fio.value+' \nВведенный логин: '+props.submitInfo.login+'\nВведенный снилс: '+props.submitInfo.snils+'</b>';

    await sendReport(props.appConfig, telMessage);

}

const submitAuthInfo = async () =>{
    await emits('startloading');
    let submitInfoCopy = await {...props.submitInfo};

    if(props.urlState.webapp.webappauthtelid !==''){
      submitInfoCopy.usertelid = props.urlState.webapp.webappauthtelid;
    }
    if(props.urlState.webapp.webappauthtelname !==''){
      submitInfoCopy.usertelname = props.urlState.webapp.webappauthtelname;
    }

    let resp = await submitAuth(props.appConfig, submitInfoCopy);

    if (resp['status'] === 'ok'){
        let localInfo = {}
        localInfo[props.appConfig.localStorage.userInfo.props.token] = await resp['info']['userState']['token'];

        await localStorage.setItem(props.appConfig.localStorage.userInfo.key, JSON.stringify(localInfo));
        await emits('emituserstate', resp['info']['userState']);
    }
    else {
      await emits('unsuccessubmitapi');
    }
    await emits('stoploading');
}

//COMPUTED

const fio = computed(()=>{
    return props.submitInfo.lastname + ' ' + props.submitInfo.firstname + ' ' + props.submitInfo.secondname;
})

</script>

<style scoped>
.em-submit-panel-button-yes {
    margin-left: 20px;
    min-width: 150px;
}

.em-submit-panel-button-no {
    min-width: 150px;
}

.em-submit-panel-button-wr {
    display: flex;
    align-items: center;
    justify-content: center;
}

.em-submit-panel-text-wr {
    text-align: center;
    padding-top: 30px;
    color: #000000E5;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 30px;
}
</style>