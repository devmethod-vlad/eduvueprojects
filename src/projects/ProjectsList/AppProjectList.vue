<template>
  <div class="em-projectlist-container">
    <template v-if="!isUserAuth">
      <portal-auth
          v-if="portalAuthConfig"
          :show-anonym-form="false"
          :app-config="portalAuthConfig"
          @setuserinfo="(userInfo, urlState)=>{getUserInfo(userInfo, urlState)}"
      />
    </template>

    <template v-else>
      <ProjectList/>
    </template>
  </div>
</template>

<script setup>
import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import ProjectList from "@/projects/ProjectsList/ProjectList";
import {auth_config} from "@/projects/config/setconfig";
import {ref} from "vue";
import {useUserStore} from "@/projects/global/store/user";

// STORE
const userStore = useUserStore();

// DATA
const portalAuthConfig = ref({...auth_config});
const isUserAuth = ref(false);

//METHODS
const getUserInfo = (newUserObject, urlState)=>{

  if (newUserObject.auth){
    userStore.$patch(newUserObject);
    isUserAuth.value = true;
  }
};

</script>

<style>
@import "@/css/tippy.css";
@import "@/css/form-v1.css";

#app-container {
  padding-top: 60px;
  font-family: Helvetica;
  width: 60%;
  margin: auto;
  padding-bottom: 60px;
}
.em-projectlist-container {
  min-height: 500px;
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
.article__toc.show-for-xlarge {
  display: none !important;
}

</style>