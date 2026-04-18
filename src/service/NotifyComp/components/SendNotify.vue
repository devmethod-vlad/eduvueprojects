<template>
  <div v-if="successMessageVisible" class="vue-success-sendmessage-wr">
    <div class="vue-success-sendmessage-text">
      Вы успешно отправилии сообщение!
    </div>
    <div class="vue-success-sendmessage-button">
      <button
          class="vue-btn vue-btn-normal"
          @click="processBack()"
      >
        Вернуться назад
      </button>
    </div>

  </div>


  <template v-else >
    <div v-if="appVisible" class="vue-app-wr">
      <div
          class="vue-form-item vue-selectmethod-container"
          v-if="sendMethods.length>0"
      >
        <div class="vue-select-title vue-selectmethod-title">
          Выберите способ отправки:
        </div>
        <select
            @focus="processOnFocus('method')"
            v-model="selectedMethod"
            class="vue-form-select vue-selectmethod"
            :class="{'vue-select-error':selectMethodStyleError}"
            aria-label="Выбор метода отправки"
        >
          <option value="Не выбран">Не выбран</option>
          <option
              v-for="method in sendMethods"
              :key=method
              :value=method
          >
            {{method}}
          </option>
        </select>
      </div>
      <div class="vue-form-item vue-selectmail-container" v-if="selectedMethod==='Электронная почта' && emails.length>0">
        <div class="vue-select-title vue-selectmail-title">
          Выберите адрес почты для отправки:
        </div>
        <select
            @focus="processOnFocus('mail')"
            v-model="selectedMail"
            class="vue-form-select vue-selectmail"
            :class="{'vue-select-error':selectMailStyleError}"
            aria-label="Выбор адреса почты"
        >
          <option value="Не выбран">Не выбран</option>
          <option
              v-for="mail in emails"
              :key=mail.address
              :value=mail.address
          >
            {{mail.address}}
          </option>
        </select>
      </div>
      <div class="vue-form-item vue-selectbot-container" v-if="selectedMethod==='Telegram' && botinfo.length>0">
        <div class="vue-select-title vue-selectbot-title">
          Выберите бота для отправки:
        </div>
        <select
            @focus="processOnFocus('bot')"
            v-model="selectedBot"
            class="vue-form-select vue-selectbot"
            :class="{'vue-select-error':selectBotStyleError}"
            aria-label="Выбор бота"
        >
          <option value="Не выбран">
            Не выбран
          </option>
          <option
              v-for="bot in botinfo"
              :key=bot.botname
              :value=bot.botname
          >
            {{bot.botname}}
          </option>
        </select>
      </div>
      <div class="vue-form-item vue-bottargetid-container" v-if="botTargetIdVisible">
        <label for="vue-bottargetid-input" class="vue-form-label">ID получателя в telegram *</label>
        <input
            v-model="botTargetId"
            @focus="processOnFocus('bottargetid')"
            id="vue-bottargetid-input"
            class="vue-form-control"
            :class="{'vue-input-error':botTargetIdInputStyleError}"
            name="vue-bottargetid-input"
        />
      </div>
      <div class="vue-form-item vue-mailtarget-container" v-if="mailSubjectAddressVisible">
        <label for="vue-mailtarget-input" class="vue-form-label">Получатель *</label>
        <input
            v-model="mailTargetText"
            @focus="processOnFocus('mailtarget')"
            id="vue-mailtarget-input"
            class="vue-form-control"
            :class="{'vue-input-error':mailTargetInputStyleError}"
            name="vue-mailtarget-input"
        />
      </div>
      <div class="vue-form-item vue-mailsubject-container" v-if="mailSubjectAddressVisible">
        <label for="vue-mailsubject-input" class="vue-form-label">Тема письма *</label>
        <input
            v-model="mailSubjectText"
            @focus="processOnFocus('mailsubject')"
            id="vue-mailsubject-input"
            class="vue-form-control"
            :class="{'vue-input-error':mailSubjectInputStyleError}"
            name="vue-mailsubject-input"
        />
      </div>
      <div class="vue-form-item vue-message-container" v-if="messageInputVisible">
        <label for="vue-message-textarea" class="vue-form-label">Текст сообщения *</label>
        <textarea
            v-model="messageText"
            @focus="processOnFocus('message')"
            rows="5"
            id="vue-message-textarea"
            class="vue-form-control"
            :class="{'vue-input-error':messageInputStyleError}"
            name="vue-message-textarea"
        >

        </textarea>
      </div>

      <template v-if="messageInputVisible && selectedMethod==='Telegram'">
        <div @click="setHelpVisibility()" class="vue-helpicon-wr">

          <template v-if="!syntaxHelpVisible">
            <app-icon name="eyes-on"
                      :size="32"
                      color="#1e8686"
            />
          </template>
          <template v-else>
            <app-icon name="eyes-off"
                      :size="32"
                      color="#1e8686"
            />
          </template>
        </div>
        <div class="vue-syntaxhelp-container">
          <SyntaxHelp v-if="syntaxHelpVisible"/>
        </div>
      </template>

      <div v-if="sendButtonVisible" class="vue-form-item vue-sendmessage-button-container">
        <button class="vue-btn vue-btn-normal" @click="validateMessage()">Отправить</button>
      </div>
      <div
          v-if="resultInfo !==''"
          class="vue-resultinfo-wr"
          :class="{'result-infowarn':resultInfoWarnStyle}"
      >
        {{resultInfo}}
      </div>

    </div>

    <div v-else class="vue-appblank-wr">
      При инициализации приложения произошла ошибка. Перегрузите страницу или попробуйте немного позже!
    </div>

  </template>


  <ModalWindow v-on:closemodal="closeModal()" v-if="sendMessModalVisible">
    <div v-if="modalLoading" class="sendmessage-modal-loading">
      Выполняем отправку...
    </div>
    <div v-else class="sendmessage-modal-wr">
      <div class="sendmessage-modal-text">
        Вы действительно хотите отправить сообщение?
      </div>
      <div class="sendmessage-modal-buttons">
        <button
            class="vue-btn vue-btn-normal"
            @click="sendMessage()"
        >
          Да
        </button>
        <button
            style="margin-left: 20px;"
            class="vue-btn vue-btn-warn"
            @click="closeModal()"
        >
          Нет
        </button>
      </div>
    </div>
  </ModalWindow>


</template>

<script setup>
import {notify_config} from "@/service/NotifyComp/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import SyntaxHelp from "@/service/NotifyComp/components/SyntaxHelp.vue";
import ModalWindow from "@/service/NotifyComp/components/ModalWindow.vue";
import {computed, onMounted, ref} from "vue";

// DATA
const modalLoading = ref(false);
const sendMessModalVisible = ref(false);
const selectMethodStyleError = ref(false);
const selectMailStyleError = ref(false);
const selectBotStyleError = ref(false);
const messageInputStyleError = ref(false);
const mailSubjectInputStyleError = ref(false);
const mailTargetInputStyleError = ref(false);
const botTargetIdInputStyleError = ref(false);
const resultInfo = ref('');
const resultInfoWarnStyle = ref(false);
const syntaxHelpVisible = ref(false);
const messageText = ref('');
const mailSubjectText = ref('');
const mailTargetText = ref('');
const botTargetId = ref('');
const selectedMail = ref('Не выбран');
const selectedBot = ref('Не выбран');
const selectedMethod = ref('Не выбран');
const appVisible = ref(true);
const successMessageVisible = ref(false);
const sendMethods = ref([]);
const emails = ref([]);
const botinfo = ref([]);

// METHODS
const processBack = ()=>{

  sendMessModalVisible.value = false;
  selectMethodStyleError.value = false;
  selectMailStyleError.value = false;
  selectBotStyleError.value = false;
  messageInputStyleError.value = false;
  mailSubjectInputStyleError.value = false;
  mailTargetInputStyleError.value = false;
  botTargetIdInputStyleError.value = false;
  resultInfo.value = '';
  resultInfoWarnStyle.value = false;
  syntaxHelpVisible.value = false;
  messageText.value = '';
  mailSubjectText.value = '';
  mailTargetText.value = '';
  botTargetId.value = '';
  selectedMail.value = 'Не выбран';
  selectedBot.value = 'Не выбран';
  selectedMethod.value = 'Не выбран';
  appVisible.value = true;
  successMessageVisible.value = false;
};

const closeModal = ()=>{
  sendMessModalVisible.value = false;
};

const validateMessage = ()=>{
  resultInfoWarnStyle.value = false;
  resultInfo.value='';
  let sendFlag = true;
  if (selectedMethod.value ==='Telegram'){
    if (botTargetId.value ==='' || botTargetId.value==='Укажите ID получателя' || botTargetId.value ==='ID получателя может содержать только цифры'){
      sendFlag = false;
      botTargetIdInputStyleError.value = true;
      if(botTargetId.value ===''){
        botTargetId.value = 'Укажите ID получателя';
      }
    }
    else{
      let checkDigit = /^\d+$/.test(botTargetId.value);
      if (!checkDigit){
        sendFlag = false;
        botTargetIdInputStyleError.value = true;
        botTargetId.value = 'ID получателя может содержать только цифры';
      }
    }
  }
  if (selectedMethod.value ==='Электронная почта'){
    if(mailSubjectText.value ==='' || mailSubjectText.value === 'Укажите тему письма'){
      sendFlag = false;
      mailSubjectInputStyleError.value = true;
      mailSubjectText.value='Укажите тему письма';
    }
    if(mailTargetText.value ==='' || mailTargetText.value ==='Укажите адрес получателя' || mailTargetText.value ==='Указан некорректный почтовый адрес'){
      sendFlag = false;
      mailTargetInputStyleError.value = true;
      if(mailTargetText.value ===''){
        mailSubjectText.value ='Укажите адрес получателя';
      }
    }
    else {
      let validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(!mailTargetText.value.match(validMailRegex)){
        sendFlag = false;
        mailTargetInputStyleError.value = true;
        mailTargetText.value='Указан некорректный почтовый адрес';
      }
    }
  }
  if (messageText.value === '' || messageText.value === 'Добавьте текст сообщения'){
    sendFlag=false;
    messageText.value = 'Добавьте текст сообщения';
    messageInputStyleError.value = true;
  }
  if (selectedMethod.value === 'Электронная почта' && emails.value.length>1 && selectedMail.value ==='Не выбран'){
    sendFlag=false;
    selectMailStyleError.value = true;
  }
  if (selectedMethod.value === 'Telegram' && botinfo.value.length>1 && selectedBot.value === 'Не выбран'){
    sendFlag=false;
    selectBotStyleError.value = true;
  }
  if(sendFlag){
    sendMessModalVisible.value = true;
  }
};


const processOnFocus = (target)=>{
  // console.log("processOnFocus ");
  resultInfo.value = '';
  resultInfoWarnStyle.value = false;
  if(target==='method'){
    selectMethodStyleError.value=false;
  }
  else if(target==='mail'){
    selectMailStyleError.value=false;
  }
  else if(target==='bot'){
    selectBotStyleError.value=false;
  }
  else if(target==='message'){
    messageInputStyleError.value=false;
    if (messageText.value === 'Добавьте текст сообщения'){
      messageText.value = '';
    }
  }
  else if (target==='bottargetid'){
    botTargetIdInputStyleError.value = false;
    if (botTargetId.value === 'Укажите ID получателя' || botTargetId.value === 'ID получателя может содержать только цифры'){
      botTargetId.value = '';
    }
  }
  else if (target==='mailtarget'){
    mailTargetInputStyleError.value = false;
    if (mailTargetText.value === 'Укажите адрес получателя' || mailTargetText.value === 'Указан некорректный почтовый адрес'){
      mailTargetText.value = '';
    }
  }
  else if (target==='mailsubject'){
    mailSubjectInputStyleError.value = false;
    if (mailSubjectText.value === 'Укажите тему письма'){
      mailSubjectText.value = '';
    }
  }
};


const sendMessage = async () => {
  // console.log("sendMessage");
  let serviceMail='Не выбран';
  let serviceBot = 'Не выбран';
  if (selectedMethod.value === 'Электронная почта'){
    if(emails.value.length===1){
      serviceMail = emails.value[0].address;
    }
    else {
      serviceMail = selectedMail.value;
    }
  }
  else if(selectedMethod.value === 'Telegram'){
    if(botinfo.value.length===1){
      serviceBot = botinfo.value[0].botname;
    }
    else {
      serviceBot = selectedBot.value;
    }
  }
  // console.log("serviceMail: ", serviceMail);
  let resp = await fetch(notify_config.mainUrl, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json"
    },
    body: JSON.stringify(
        {
          "action": 'sendmess',
          "method":selectedMethod.value,
          "bot":serviceBot,
          "mail":serviceMail,
          "message":messageText.value,
          "mailsubject":mailSubjectText.value,
          "mailtarget": mailTargetText.value,
          "bottargetid": botTargetId.value
        })
  });
  let answer = await resp.json();
  // console.log("sendMessage resp: ", answer);
  if(answer['status']==='ok'){

    successMessageVisible.value = true;
    resultInfoWarnStyle.value = false;
    resultInfo.value = 'Вы успешно отправили сообщение!';
    sendMessModalVisible.value = false;
  }
  else{
    resultInfoWarnStyle.value = true;
    if(answer['user_error']){
      resultInfo.value = 'Ошибка: '+answer['user_error'];
    }
    resultInfo.value = 'При попытке отправить сообщение возникла ошибка!';
  }
};


const setHelpVisibility = ()=>{
  syntaxHelpVisible.value = !syntaxHelpVisible.value;
}


// COMPUTED
const sendButtonVisible = computed (()=>{
  if (selectedMethod.value === 'Не выбран'){
    return false;
  }
  else {
    if (selectedMethod.value === 'Электронная почта'){
      let showMailFlag = true;
      if (messageText.value === '' || messageText.value === 'Добавьте текст сообщения'){
        showMailFlag = false;
      }
      if (mailTargetText.value === '' || mailTargetText.value === 'Укажите адрес получателя' || mailTargetText.value === 'Указан некорректный почтовый адрес'){
        showMailFlag = false;
      }
      if (mailSubjectText.value === '' || mailSubjectText.value === 'Укажите тему письма'){
        showMailFlag = false;
      }
      if (emails.value.length>1 && selectedMail.value === 'Не выбран'){
        showMailFlag = false;
      }
      return showMailFlag;
    }
    else if (selectedMethod.value==='Telegram'){
      let showBotFlag = true;
      if (messageText.value === '' || messageText.value === 'Добавьте текст сообщения'){
        showBotFlag = false;
      }
      if(botTargetId.value === '' || botTargetId.value === 'Укажите ID получателя' || botTargetId.value === 'ID получателя может содержать только цифры'){
        showBotFlag = false;
      }
      if (botinfo.value.length>1 && selectedBot.value === 'Не выбран'){
        showBotFlag = false;
      }
      return showBotFlag;
    }
    else {
      return false;
    }
  }
});


const messageInputVisible = computed(()=>{
      if (selectedMethod.value === 'Не выбран'){
        return false;
      }
      else {
        if(selectedMethod.value === 'Электронная почта' && selectedMail.value === 'Не выбран' && emails.value.length>1){
          return false;
        }
        else if(selectedMethod.value === 'Telegram' && selectedBot.value === 'Не выбран' && botinfo.value.length>1){
          return false;
        }
        else {
          return true;
        }
      }
    }
);

const botTargetIdVisible = computed(()=>{
  if(selectedMethod.value === 'Telegram'){
    return !(botinfo.value.length > 1 && selectedBot.value === 'Не выбран');
  }
  else{
    return false;
  }
});

const mailSubjectAddressVisible = computed(()=>{
  if(selectedMethod.value === 'Электронная почта'){
    return !(emails.value.length > 1 && selectedMail.value === 'Не выбран');
  }
  else{
    return false;
  }
});

// LIFECYCLE
onMounted(async ()=>{
  let resp = await fetch(notify_config.mainUrl, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json"
    },
    body: JSON.stringify(
        {
          "action": 'getinfo'
        })
  });

  let answer = await resp.json();
  // console.log("answer: ", answer);
  if (answer['status']==='ok'){
    sendMethods.value=await answer.info.methods;
    emails.value = await answer.info.service_mail_list;
    botinfo.value = await answer.info.bot_info_list;
  }
  else{
    appVisible.value=false;
  }
});
</script>

<style scoped>
.vue-success-sendmessage-text {
  padding-top: 60px;
  padding-bottom: 20px;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  color: #1e8686;
}
.vue-success-sendmessage-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-appblank-wr {
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  color: #7d3434 !important;
}
.result-infowarn {
  color: #7d3434 !important;
}
.vue-resultinfo-wr {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}
.sendmessage-modal-text {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}
.sendmessage-modal-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sendmessage-modal-buttons button{
  width: 30%;
}
.vue-helpicon-wr {
  margin-bottom: 20px;
}
.vue-btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.vue-btn-normal {
  color: white;
  font-weight: bold;
  border-color: #1e8686;
  background-color: #1e8686;
}
.vue-btn-normal:hover {
  background-color: #145b5b;
  border-color: #145b5b;
}

.vue-btn-warn {
  color: white;
  font-weight: bold;
  border-color: #ad4848;
  background-color: #ad4848;
}
.vue-btn-warn:hover {
  border-color: #7d3434;
  background-color: #7d3434;
}

.vue-form-item {
  margin-bottom: 30px;
}
.vue-select-title {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.2em;
  color: #1e8686;
}
.vue-form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.vue-form-control:focus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}
.vue-form-label {
  margin-bottom: 0.5rem !important;
  font-weight: bold !important;
  color: #959595 !important;
}

.vue-input-error {
  border-color: #dc3545 !important;
  color: #dc3545;
}
.vue-form-select {
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.7;
  color: #212529;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  word-wrap: normal;
}
.vue-form-select:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}

.vue-select-error {
  border-color: #dc3545 !important;
}
</style>