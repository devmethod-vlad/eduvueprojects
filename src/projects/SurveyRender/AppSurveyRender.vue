<template>
  <div>
    <template v-if="!isUserAuth">
      <portal-auth
          v-if="portalAuthConfig"
          :show-anonym-form="false"
          :app-config="portalAuthConfig"
          @setuserinfo="(userInfo, urlState)=>{getUserInfo(userInfo, urlState)}"
      />
    </template>

    <template v-else>

      <SurveyRender
          :get-params-active="true"
      />

    </template>

  </div>
</template>

<script setup>
import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import SurveyRender from "@/projects/SurveyRender/SurveyRender.vue";
import {useUserStore} from "@/projects/global/store/user";
import {auth_config} from "@/projects/config/setconfig";
import {ref} from "vue";

// STORE
const userStore = useUserStore();

// DATA
const portalAuthConfig = ref({...auth_config});
const isUserAuth = ref(false);

//METHODS
const getUserInfo = (newUserObject, urlState)=>{
  console.log("newUserObject: ", newUserObject);
  if (newUserObject.auth){
    userStore.$patch(newUserObject);
    isUserAuth.value = true;
  }
};
</script>

<style>
@import "@/css/form-v1.css";

#app-container {
  padding-top: 60px;
  font-family: Helvetica;
  width: 85%;
  margin: auto;
  padding-bottom: 60px;
}

#action-dialog-target {
  display: none;
}

.sticky-container {
  display: none;
}

div.cell.large-2.article__navigation.show-for-large {
  display: none !important;
}
h1.cell.article__heading {
  text-align: center;
}
ul.breadcrumbs {
  display: none !important;
}

</style>