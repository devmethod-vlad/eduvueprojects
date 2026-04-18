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
    <MoTable
        :get-param-active="true"
    />
  </template>

</template>

<script setup>
import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import MoTable from "@/projects/MoTable/MoTable.vue";
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

<style scoped>

</style>

<style>
@import "@/css/search.css";
@import "@/css/tippy.css";
@import "@/css/form-v1.css";

#app-container {
  font-family: Helvetica;
  padding-top: 40px;
  width: 90%;
  margin: auto;
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
.unicon {
  display: flex !important;
}
.pagination-container {
  display: flex;
  padding-left: 0;
  list-style: none;
}
.paginate-buttons {
  cursor: pointer;
  position: relative;
  display: block;
  color: #1ab394;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #dee2e6;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  padding: 0.375rem .75rem;
  font-size: 1em;
  font-weight: bold;
}
.paginate-buttons:hover {
  z-index: 2;
  color: #0a58ca;
  background-color: #e9ecef;
  border-color: #dee2;
}
.active-page {
  z-index: 3;
  color: #0a58ca;
  background-color: #e9ecef;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
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
.em-table-pagination-wr ul {
  list-style-type: none !important;
}
</style>
