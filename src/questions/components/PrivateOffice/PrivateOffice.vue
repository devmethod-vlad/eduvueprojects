<template>
  <div
      class="qst-private-office-wr">
    <div class="qst-po-header">
      <div class="qst-po-header-text">
        Личный кабинет
      </div>
      <div class="qst-po-header-icons">
        <template v-if="role === 'admin' || role === 'redactor'">
          <div
            id="qst-account-icon"
            class="qst-account-icon-wr"
            @click.stop.prevent="profileMenuVisible=!profileMenuVisible"
          >
            <app-icon
              name="profile"
              :size="25"
            />
            <template v-if="profileMenuVisible">
              <drop-down-menu
                @closemenu="profileMenuVisible=false"
                @openadminmenu="(action)=>{openAdminMenu(action)}"
              />
            </template>

          </div>
        </template>

        <template v-else>

          <template v-if="appStore.$state.questionShowMode === 'modal'">
            <VDropdown theme="qst-arrow-tooltip">
              <div
                id="qst-account-icon"
                class="qst-account-icon-wr"
              >
                <app-icon
                  name="profile"
                  :size="25"
                />

              </div>
              <template #popper>
                <div class="qst-profile-menu-personal-info">
                  <div class="qst-profile-menu-user-name">
                    {{ userName }}
                  </div>
                  <div class="qst-profile-menu-user-role">
                    {{ app_config['BASE_ROLE'][role]['show_name'] }}
                  </div>
                </div>
              </template>
            </VDropdown>
          </template>

          <template v-else>
            <VTooltip theme="qst-arrow-tooltip">
              <div
                id="qst-account-icon"
                class="qst-account-icon-wr"
              >
                <app-icon
                  name="profile"
                  :size="25"
                />

              </div>
              <template #popper>
                <div class="qst-profile-menu-personal-info">
                  <div class="qst-profile-menu-user-name">
                    {{ userName }}
                  </div>
                  <div class="qst-profile-menu-user-role">
                    {{ app_config['BASE_ROLE'][role]['show_name'] }}
                  </div>
                </div>
              </template>
            </VTooltip>
          </template>
        </template>

        <template v-if="exitIconVisible">
          <VTooltip theme="qst-arrow-tooltip">
            <div @click.prevent.stop="exitAccount()" class="qst-exit-icon-wr">
              <app-icon
                name="exit"
                :size="27"
              />
            </div>

            <template #popper>
              Выйти из аккаунта
            </template>
          </VTooltip>
        </template>
      </div>
    </div>
    <div class="qst-po-content">
    </div>

    <template v-if="modalVisible">
      <ModalContent
        @close-modal="modalVisible=false"
        actionelement="qst-account-icon"
        modalsize="responsive"
      >
        <div>
          Какой-то текст
        </div>
      </ModalContent>
    </template>

    <template v-if="addNewAdminVisible">
      <add-new-admin
        @closeaddadmin="addNewAdminVisible=false"
      />
    </template>

    <template v-if="changeAdminPassVisible">
      <change-admin-pass
        @closechangepass="changeAdminPassVisible=false"
      />
    </template>

    <template v-if="changeAppParamsVisible">
      <change-app-params
        @closeappconfig="changeAppParamsVisible=false"
      />
    </template>

    <template v-if="botStatVisible">
      <tel-bot-stat
        @closebotstat="botStatVisible=false"
      />
    </template>

    <template v-if="enterAdminVisible">
      <enter-admin
        @closenteradmin="enterAdminVisible=false"
      />
    </template>

  </div>
</template>

<script setup>
import {exitAdminAcc} from "@/questions/components/PrivateOffice/components/DropDownMenu/services/exitadmin";
import EnterAdmin from "@/questions/components/PrivateOffice/components/DropDownMenu/components/EnterAdmin/EnterAdmin.vue";
import TelBotStat from "@/questions/components/PrivateOffice/components/DropDownMenu/components/TelBotStat/TelBotStat.vue";
import ChangeAppParams
  from "@/questions/components/PrivateOffice/components/DropDownMenu/components/ChangeAppParams/ChangeAppParams.vue";
import ChangeAdminPass
  from "@/questions/components/PrivateOffice/components/DropDownMenu/components/ChangeAdminPass/ChangeAdminPass.vue";
import AddNewAdmin from "@/questions/components/PrivateOffice/components/DropDownMenu/components/AddNewAdmin/AddNewAdmin.vue";
import DropDownMenu from "@/questions/components/PrivateOffice/components/DropDownMenu/DropDownMenu.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalContent from "@/common/ui/ModalContent/ModalContent.vue";
import {computed, ref} from "vue";
import {useUserStore} from "@/questions/store/user";
import {getRoleInfo} from "@/questions/services/getrole";
import {app_config} from "@/questions/config/setconfig";
import {useAppStore} from "@/questions/store/app";


// STORE
const userStore = useUserStore();
const appStore = useAppStore();

// DATA
const addNewAdminVisible = ref(false);
const changeAdminPassVisible = ref(false);
const changeAppParamsVisible = ref(false);
const botStatVisible = ref(false);
const enterAdminVisible = ref(false);

const modalVisible = ref(false);
const profileMenuVisible = ref(false);


// METHODS

const openAdminMenu = (action)=>{
  if(action === 'addadmin'){
    addNewAdminVisible.value = true;
  }
  if(action === 'changepass'){
    changeAdminPassVisible.value = true;
  }
  if(action === 'appconfig'){
    changeAppParamsVisible.value = true;
  }
  if(action === 'botstat'){
    botStatVisible.value = true;
  }
  if(action === 'enteradmin'){
    enterAdminVisible.value = true;
  }
  if(action === 'exitadmin'){
    existAdmin();
  }
}

const existAdmin = async ()=>{
  let exitAnswer = await exitAdminAcc(userStore.$state.userid);
  console.log("exitAnswer: ", exitAnswer);
  if (exitAnswer.status === 'ok'){
    await exitAccount();
  }
}

const exitAccount = ()=>{
  let storageKey = app_config.localStorage.userInfo.key;

  if (localStorage.getItem(storageKey)){
    //'userToken'
    localStorage.removeItem(storageKey);
  }
  location.reload();
}

// COMPUTED
const exitIconVisible = computed(()=>{
  let visibleFlag = true;
  if(userStore.$state.authSource === 'localhostservice'){
    visibleFlag = false;
  }

  if(userStore.$state.authSource === 'wiki'){
    visibleFlag = false;
  }

  if(userStore.$state.authSource === 'telegram'){
    visibleFlag = false;
  }
  return visibleFlag;
});

const role = computed(()=>{
  let roleInfo = getRoleInfo(userStore.$state.userrole.id);
  if (roleInfo !== null){
    return roleInfo[0];
  }
  else {
    return null;
  }
});

const userName = computed(()=>{
  let name = '';

  if(userStore.$state.lastname === '' && userStore.$state.firstname === '' && userStore.$state.secondname === ''){
    if (role.value === 'personal'){
      if(userStore.$state.emiaslogin !==''){
        name = userStore.$state.emiaslogin;
      }
    }
  }
  else {
    name = userStore.$state.lastname+' '+userStore.$state.firstname+' '+ userStore.$state.secondname;
  }

  return name;
});


</script>

<style scoped>

@import "@/questions/components/PrivateOffice/css/privateoffice.css";
@import "@/css/icons.css";
</style>