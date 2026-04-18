<template>
   <div class="webapp-anonym-question-viewer">
     <template v-if="loading">
       <div class="webapp-anonym-question-loading">
         <content-loader/>
       </div>
     </template>
     <template v-else>
       <template v-if="errorText !==''">
         <div class="webapp-anonym-question-error">
           {{ errorText }}
         </div>
       </template>

       <template v-else>

         <div class="webapp-anonym-question-number">
           № {{ question.$state.order_id.toString() }}
         </div>

         <question-text-area
             target="question"
         />

         <file-gallery
             target="question"
             :attachments="question.$state.order_attachments"
         />

         <div class="qst-question-detail-divider">

         </div>

         <question-text-area
             target="answer"
         />

         <file-gallery
             target="answer"
             :attachments="question.$state.answer_attachments"

         />
       </template>
     </template>
   </div>

</template>

<script setup>
import ContentLoader from "@/common/ui/ContentLoader/ContentLoader.vue";
import QuestionTextArea from "@/questions/components/QuestionDetail/components/QuestionTextArea/QuestionTextArea.vue";
import FileGallery from "@/questions/components/QuestionDetail/components/FileGallery/FileGallery.vue";
import {useUserStore} from "@/questions/store/user";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {useAppStore} from "@/questions/store/app";
import {onMounted, ref} from "vue";
import {user_object} from "@/objects/user";
import {app_object} from "@/questions/objects/app";
import {getAppConfig} from "@/questions/webappcomponents/AnonymQuestionView/services/getappconfig";
import {getQuestionInfo} from "@/questions/webappcomponents/AnonymQuestionView/services/getquestioninfo";
import {app_config} from "@/questions/config/setconfig";

const initialError = "Не получена необходимая информация для отображения. Повторите попытку позже";

// STORE
const user = useUserStore();
const question = useActiveQuestionStore();
const app = useAppStore();

// DATA
const userObject = ref({...user_object});
const appConfigObject = ref({...app_object});
const loading = ref(true);
const errorText = ref('');

// 189
const questionId = ref(0);

// METHODS
const checkGetParams = async ()=>{
  const queryString = await window.location.search;
  const urlParams = await new URLSearchParams(queryString);

  if (urlParams.get(app_config.getParams.webapp.webappquestionid)) {
    if(urlParams.get(app_config.getParams.webapp.webappquestionid) !==''){
      try {
        questionId.value = Number(urlParams.get(app_config.getParams.webapp.webappquestionid));
      }
      catch (e) {
        console.log(e);
      }
    }
  }
}

const setAppConfig = async ()=>{
  let confAnswer = await getAppConfig();
  if (confAnswer.status === 'ok'){
    appConfigObject.value.uploadsize = confAnswer.info.uploadsize;
    appConfigObject.value.maxuploadfiles = confAnswer.info.maxfiles;
    appConfigObject.value.anonymuserid = confAnswer.info.anonymuserid;
    await app.$patch(appConfigObject.value);
    return 'ok';
  }
  else {
    return 'error';
  }
}

const setUserData = async ()=>{

  userObject.value.auth = true;
  userObject.value.authSource = 'webapp';
  userObject.value.tokenExpire = false;
  userObject.value.userid = await app.$state.anonymuserid;
  userObject.value.userrole.id = app_config.BASE_ROLE.anonym.id;
  userObject.value.userrole.name = app_config.BASE_ROLE.anonym.db_name;

  await user.$patch(userObject.value);
}

const getInitialData = async ()=>{
  let configStatus = await setAppConfig();
  if (configStatus === 'ok'){

    await setUserData();

    let questionAnswer = await getQuestionInfo(app.$state.anonymuserid, questionId.value);
    console.log("questionAnswer : ", questionAnswer);

    if (questionAnswer.status === 'ok'){
      let questionInfo = await questionAnswer.info.render_list[0];
      await question.$patch(questionInfo);
      loading.value = false;
      console.log("user: ", user.$state);
      console.log("app: ", app.$state);
      console.log("question: ", question.$state);
    }
    else {
      loading.value = false;
      errorText.value = initialError;
    }
  }
  else {
    loading.value = false;
    errorText.value = initialError;
  }
}


// LIFECYCLE
onMounted(async () =>{
  await checkGetParams();

  if (questionId.value !==0 ){
    await getInitialData();
  }
  else {
    loading.value = false;
    errorText.value = initialError;
  }
})


</script>


<style scoped>
@font-face {
  font-family: "OpenSans";
  /*src: url(http://127.0.0.1:5000/eduportal/questions/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
   src: url(https://edu.emias.ru/edu-rest-api/questions-test/static/fonts/OpenSans-Medium.ttf) format("truetype");
}
@import "@/questions/webappcomponents/AnonymQuestionView/css/anonym-question-viewer.css";
</style>