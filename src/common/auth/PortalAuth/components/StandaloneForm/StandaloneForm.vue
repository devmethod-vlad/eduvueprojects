<template>
  <template v-if="app.$state.standaloneFormSubmitPanelVisible">

    <div class="login-form-standalone-submit-panel">
      <submit-panel
          panel-type="modal"
      />
    </div>
  </template>

  <template v-else>
    <div class="standalone-login-form">
      <LoginForm
          :show-loading="true"
          @show-submit-panel="app.standaloneFormSubmitPanelVisible=true"
      />
    </div>
  </template>

</template>

<script setup>
import SubmitPanel from "@/common/auth/PortalAuth/components/SubmitPanel/SubmitPanel.vue";
import LoginForm from "@/common/auth/PortalAuth/components/LoginForm/LoginForm.vue";
import {useUrlStore} from "@/common/auth/PortalAuth/store/url";
import {usePortalAuthAppStore} from "@/common/auth/PortalAuth/store/app";


// STORE
const urlState = useUrlStore();
const app = usePortalAuthAppStore();

</script>

<style scoped>

</style>