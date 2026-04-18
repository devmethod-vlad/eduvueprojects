<template>
  <template v-if="!isUserAuth">
    <portal-auth
        v-if="portalAuthConfig"
        :show-anonym-form="false"
        :app-config="portalAuthConfig"
        @setuserinfo="(userInfo, urlState)=>{getUserInfo(userInfo, urlState)}"
    />
  </template>

  <template v-else>
    <FilterMachine
        :get-param-active="true"
    />
  </template>
</template>

<script setup>
import FilterMachine from "@/FilterMachine/FilterMachine.vue";
import PortalAuth from "@/PortalAuth/PortalAuth.vue";
import {auth_config} from "@/config/setconfig";
import {ref} from "vue";
import {useUserStore} from "@/global/store/user";

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
@import "@/global/css/search.css";
@import "@/global/css/tippy.css";
@import "@/global/css/form.css";
@import "@/global/css/global.css";
@import "@/global/css/pagination.css";

#app-container {
  font-family: Helvetica;
  width: 80%;
  margin: auto;
}

div.cell.large-2.article__navigation.show-for-large {
  display: none !important;
}
h1.cell.article__heading {
  text-align: center;
}
.article__toc.show-for-xlarge {
  display: none !important;
}
.em-table-pagination-wr ul {
  list-style-type: none !important;
}

[type='text'] {
  margin: unset !important;
  box-shadow: unset !important;
}
[type='text']:focus {
  border: none !important;
}
.em-search-input-wr {
  padding: unset !important;
}
ul.breadcrumbs {
  display: none !important;
}
.unicon {
  display: flex !important;
}

</style>