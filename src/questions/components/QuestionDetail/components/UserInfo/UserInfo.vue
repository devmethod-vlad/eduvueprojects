<template>
	<div v-if="compPermissions.visible && userInfoVisible" class="qst-question-detail-userinfo">

    <template v-if="props.target === 'inwork'">
      <div class="question-detail-userinfo-item">
        <span class="userinfo-item-span">В работе: </span>
      </div>
    </template>
			<template v-if="fio !==''">
          <div class="question-detail-userinfo-item">
					<span class="userinfo-item-span">
							ФИО:&nbsp;
					</span>
              {{ fio }}
          </div>
			</template>

      <template v-if="emiaslogin !==''">
        <div class="question-detail-userinfo-item">
					<span class="userinfo-item-span">
							Логин ЕМИАС:&nbsp;
					</span>
          {{ emiaslogin }}
        </div>
      </template>

			<template v-if="organization !==''">
          <div class="question-detail-userinfo-item">
					<span class="userinfo-item-span">
							Организация:&nbsp;
					</span>
              {{ organization }}
          </div>
			</template>


      <template v-if="phone !==''">
          <div class="question-detail-userinfo-item">
					<span class="userinfo-item-span">
							Телефон:&nbsp;
					</span>
              {{ phone }}
          </div>
      </template>

      <template v-if="mail !==''">
          <div class="question-detail-userinfo-item">
					<span class="userinfo-item-span">
							Почта:&nbsp;
					</span>
              {{ mail }}
          </div>
      </template>

      <template v-if="telegramLogin !==''">
          <div class="question-detail-userinfo-item">
					<span class="userinfo-item-span">
							Логин в Telegram:&nbsp;
					</span>
              {{ telegramLogin }}
          </div>
      </template>

      <template v-if="telegramID !==''">
        <div class="question-detail-userinfo-item">
					<span class="userinfo-item-span">
							ID в Telegram:&nbsp;
					</span>
          {{ telegramID }}
        </div>
      </template>

      <template v-if="questionUnionRole !=='' && !isFeedback">
          <div class="question-detail-userinfo-item">
					<span class="userinfo-item-span">
							Задан от роли:&nbsp;
					</span>
              {{ questionUnionRole }}
          </div>
      </template>
	</div>
</template>

<script setup>
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {useUserStore} from "@/questions/store/user";
import {computed} from "vue";
import {setCompPermissions} from "@/questions/components/QuestionDetail/services/setcomppermissions";

// PROPS
const props = defineProps({

    target:
        {
            type: String,
            default: '',
            required: true
        }
});

// STORE
const activeQuestion = useActiveQuestionStore();
const userStore = useUserStore();

// COMPUTED
const isFeedback = computed(()=>{
  let feedBack = false;
  if(activeQuestion.$state.feedback_id !== null && activeQuestion.$state.feedback_id !==0 && activeQuestion.$state.feedback_id.toString() !=='0'){
    feedBack = true;
  }
  return feedBack;
});

const compPermissions = computed(()=>{
    return setCompPermissions('userinfo', activeQuestion.$state,props.target, userStore.$state);
});

const userInfoVisible = computed(()=>{

    return !(
        fio.value === ''
        && emiaslogin.value === ''
        && organization.value === ''
        && phone.value === ''
        && mail.value === ''
        && telegramLogin.value === ''
        && telegramID.value === ''
        && questionUnionRole.value === ''
		);
})

const fio = computed(()=>{
    let compFio = '';
    if(props.target === 'question'){
        if (
            activeQuestion.$state.anonym_id !== null
            && activeQuestion.$state.anonym_id !== ''
            && activeQuestion.$state.anonym_id.toString().trim().toLowerCase() !== 'undefined'
        )
        {
            if(
                activeQuestion.$state.anonymorder_fio !== null
                && activeQuestion.$state.anonymorder_fio.toString().trim() !== ''
                && activeQuestion.$state.anonymorder_fio.toString().trim().toLowerCase() !== 'undefined'
            ){

              compFio = activeQuestion.$state.anonymorder_fio+' (Анонимный пользователь)';

            }
            else {
                compFio = 'Анонимный пользователь';
						}

        }
        else {
            if (activeQuestion.$state.order_user_fio !== null
                && activeQuestion.$state.order_user_fio.toString().trim() !== ''
                && activeQuestion.$state.order_user_fio.toString().trim().toLowerCase() !== 'undefined'
            ){
              compFio = activeQuestion.$state.order_user_fio;
            }
        }

    }
    else if (props.target === 'answer') {
        if (activeQuestion.$state.answer_user_fio !==null
            && activeQuestion.$state.answer_user_fio.toString().trim() !== ''
            && activeQuestion.$state.answer_user_fio.toString().trim().toLowerCase() !== 'undefined'
        ){
          compFio = activeQuestion.$state.answer_user_fio;
        }

    }
    else if (props.target === 'inwork') {
      console.log("computed fio activeQuestion.$state.inwork_user_fio: ", activeQuestion.$state.inwork_user_fio);
      if (activeQuestion.$state.inwork_user_fio !==null
          && activeQuestion.$state.inwork_user_fio.toString().trim() !== ''
          && activeQuestion.$state.inwork_user_fio.toString().trim().toLowerCase() !== 'undefined'
      ){
        compFio = activeQuestion.$state.inwork_user_fio;
      }
      console.log("computed fio compFio: ", compFio);
    }
    return compFio;

});

const emiaslogin = computed(()=>{
  let compEmiaslogin = '';
  if(props.target === 'question'){

      if (activeQuestion.$state.order_user_emiaslogin !== null
          && activeQuestion.$state.order_user_emiaslogin.toString().trim() !== ''
          && activeQuestion.$state.order_user_emiaslogin.toString().trim().toLowerCase() !== 'undefined'
      ){
        compEmiaslogin = activeQuestion.$state.order_user_emiaslogin;
      }
  }
  else if (props.target === 'answer') {
    if (activeQuestion.$state.answer_user_emiaslogin !==null
        && activeQuestion.$state.answer_user_emiaslogin.toString().trim() !== ''
        && activeQuestion.$state.answer_user_emiaslogin.toString().trim().toLowerCase() !== 'undefined'
    ){
      compEmiaslogin = activeQuestion.$state.answer_user_emiaslogin;
    }

  }
  else if (props.target === 'imwork'){
    if (activeQuestion.$state.inwork_user_emiaslogin !==null
        && activeQuestion.$state.inwork_user_emiaslogin.toString().trim() !== ''
        && activeQuestion.$state.inwork_user_emiaslogin.toString().trim().toLowerCase() !== 'undefined'
    ){
      compEmiaslogin = activeQuestion.$state.inwork_user_emiaslogin;
    }
  }
  return compEmiaslogin;

});


const organization = computed(()=>{

    let compOrganization= '';
    if(props.target === 'question'){
        if (
            activeQuestion.$state.anonym_id !== null
            && activeQuestion.$state.anonym_id !== ''
            && activeQuestion.$state.anonym_id.toString().trim().toLowerCase() !== 'undefined'
        ){
            if (activeQuestion.$state.anonymorder_muname !== null
                && activeQuestion.$state.anonymorder_muname.toString().trim() !== ''
                && activeQuestion.$state.anonymorder_muname.toString().trim().toLowerCase() !== 'undefined'
            ){
              compOrganization = activeQuestion.$state.anonymorder_muname;
            }
        }
    }
    return compOrganization;
});

const phone = computed(()=>{
    let compPhone = '';
    if(props.target === 'question'){
        if (
            activeQuestion.$state.anonym_id !== null
            && activeQuestion.$state.anonym_id !== ''
            && activeQuestion.$state.anonym_id.toString().trim().toLowerCase() !== 'undefined'
        ){
            if(
                activeQuestion.$state.anonymorder_phone !== null
                && activeQuestion.$state.anonymorder_phone.toString().trim() !== ''
                && activeQuestion.$state.anonymorder_phone.toString().trim().toLowerCase() !== 'undefined'
            ){
              compPhone = activeQuestion.$state.anonymorder_phone;
            }

        }
        else {
            if (activeQuestion.$state.order_user_phone !== null
                && activeQuestion.$state.order_user_phone.toString().trim() !== ''
                && activeQuestion.$state.order_user_phone.toString().trim().toLowerCase() !== 'undefined'

            ){
              compPhone = activeQuestion.$state.order_user_phone;
            }
        }

    }
    // else if (props.target === 'answer') {
    //   if (activeQuestion.$state.answer_user_phone !== null
    //       && activeQuestion.$state.answer_user_phone.toString().trim() !== ''
    //       && activeQuestion.$state.answer_user_phone.toString().trim().toLowerCase() !== 'undefined'
    //
    //   ){
    //     compPhone = activeQuestion.$state.answer_user_phone;
    //   }
    //
    // }
    // else if (props.target === 'inwork'){
    //   if (activeQuestion.$state.inwork_user_phone !== null
    //       && activeQuestion.$state.inwork_user_phone.toString().trim() !== ''
    //       && activeQuestion.$state.inwork_user_phone.toString().trim().toLowerCase() !== 'undefined'
    //
    //   ){
    //     compPhone = activeQuestion.$state.inwork_user_phone;
    //   }
    // }
    return compPhone;
});

const mail = computed(()=>{
    let compMail = '';
    if(props.target === 'question'){
        if (
            activeQuestion.$state.anonym_id !== null
            && activeQuestion.$state.anonym_id !== ''
            && activeQuestion.$state.anonym_id.toString().trim().toLowerCase() !== 'undefined'
        )
        {
            if(
                activeQuestion.$state.anonymorder_mail !== null
                && activeQuestion.$state.anonymorder_mail.toString().trim() !== ''
                && activeQuestion.$state.anonymorder_mail.toString().trim().toLowerCase() !== 'undefined'
            ){
              compMail = activeQuestion.$state.anonymorder_mail;
						}

				}
        else {
            if (
                activeQuestion.$state.order_user_mail !== null
                && activeQuestion.$state.order_user_mail.toString().trim() !== ''
                && activeQuestion.$state.order_user_mail.toString().trim().toLowerCase() !== 'undefined'
            ){
              compMail = activeQuestion.$state.order_user_mail;
						}
				}

    }
    // else if (props.target === 'answer') {
    //     if (
    //         activeQuestion.$state.answer_user_mail !==null
    //         && activeQuestion.$state.answer_user_mail.toString().trim() !== ''
    //         && activeQuestion.$state.answer_user_mail.toString().trim().toLowerCase() !== 'undefined'
    //     )
    //     {
    //       compMail = activeQuestion.$state.answer_user_mail;
		// 		}
    //
    // }
    // else if (props.target === 'inwork'){
    //   if (
    //       activeQuestion.$state.inwork_user_mail !==null
    //       && activeQuestion.$state.inwork_user_mail.toString().trim() !== ''
    //       && activeQuestion.$state.inwork_user_mail.toString().trim().toLowerCase() !== 'undefined'
    //   )
    //   {
    //     compMail = activeQuestion.$state.inwork_user_mail;
    //   }
    // }
    return compMail;
});

const telegramLogin = computed(()=>{

    let compTelLogin = '';
    if(props.target === 'question'){
      if (
          activeQuestion.$state.order_user_tg_name !== null
          && activeQuestion.$state.order_user_tg_name.toString().trim() !== ''
          && activeQuestion.$state.order_user_tg_name.toString().trim().toLowerCase() !== 'undefined'
      )
      {
        compTelLogin = activeQuestion.$state.order_user_tg_name;
      }
    }
    // else if (props.target === 'answer') {
    //     if (
    //         activeQuestion.$state.answer_user_tg_name !==null
    //         && activeQuestion.$state.answer_user_tg_name.toString().trim() !== ''
    //         && activeQuestion.$state.answer_user_tg_name.toString().trim().toLowerCase() !== 'undefined'
    //     )
    //     {
    //       compTelLogin = activeQuestion.$state.answer_user_tg_name;
    //     }
    //
    // }
    // else if(props.target === 'inwork'){
    //   if (
    //       activeQuestion.$state.inwork_user_tg_name !==null
    //       && activeQuestion.$state.inwork_user_tg_name.toString().trim() !== ''
    //       && activeQuestion.$state.inwork_user_tg_name.toString().trim().toLowerCase() !== 'undefined'
    //   )
    //   {
    //     compTelLogin = activeQuestion.$state.inwork_user_tg_name;
    //   }
    // }
    return compTelLogin;
});

const telegramID = computed(()=>{

  let compTelId = '';
  if(props.target === 'question'){
    if (
        activeQuestion.$state.anonym_id !== null
        && activeQuestion.$state.anonym_id !== ''
        && activeQuestion.$state.anonym_id.toString().trim().toLowerCase() !== 'undefined'
    )
    {
      if (
          activeQuestion.$state.anonymorder_tg_id !== null
          && activeQuestion.$state.anonymorder_tg_id.toString().trim() !== ''
          && activeQuestion.$state.anonymorder_tg_id.toString().trim().toLowerCase() !== 'undefined'
      )
      {
        compTelId = activeQuestion.$state.anonymorder_tg_id;
      }
    }
    else {
      if (
          activeQuestion.$state.order_user_tg_id !== null
          && activeQuestion.$state.order_user_tg_id.toString().trim() !== ''
          && activeQuestion.$state.order_user_tg_id.toString().trim().toLowerCase() !== 'undefined'
      )
      {
        compTelId = activeQuestion.$state.order_user_tg_id;
      }
    }
  }
  // else if(props.target === 'answer'){
  //   if (
  //       activeQuestion.$state.answer_user_tg_id !==null
  //       && activeQuestion.$state.answer_user_tg_id.toString().trim() !== ''
  //       && activeQuestion.$state.answer_user_tg_id.toString().trim().toLowerCase() !== 'undefined'
  //   )
  //   {
  //     compTelId = activeQuestion.$state.answer_user_tg_id;
  //   }
  //
  // }
  // else if(props.target === 'inwork'){
  //   if (
  //       activeQuestion.$state.inwork_user_tg_id !==null
  //       && activeQuestion.$state.inwork_user_tg_id.toString().trim()!== ''
  //       && activeQuestion.$state.inwork_user_tg_id.toString().trim().toLowerCase() !== 'undefined'
  //   )
  //   {
  //     compTelId = activeQuestion.$state.inwork_user_tg_id;
  //   }
  // }
  return compTelId;
});

const questionUnionRole = computed(()=>{
    let compUnionRole = '';

    if(props.target === 'question'){
        if(
            activeQuestion.$state.order_unionrole_name !== null
            && activeQuestion.$state.order_unionrole_name.toString().trim() !== ''
            && activeQuestion.$state.order_unionrole_name.toString().trim().toLowerCase() !== 'undefined'
        )
        {
          compUnionRole = activeQuestion.$state.order_unionrole_name;
        }
    }
    return compUnionRole;
});

</script>

<style scoped>
.qst-question-detail-userinfo {
		margin-bottom: 30px;
}

.question-detail-userinfo-item {
    font-weight: 400;
    font-size: 16px;
		margin-bottom: 10px;
}

.userinfo-item-span {
		font-weight: 600;
		font-size: 16px;
}

@media (min-width: 992px) {

    .question-detail-userinfo-item {
        font-size: 20px;
    }
    .userinfo-item-span {
        font-size: 20px;
    }

}
</style>