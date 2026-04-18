<template>
  <SurveyRedactor
      :get-param-active="true"
  />
</template>

<script setup>
import SurveyRedactor from "@/projects/SurveyRedactor/SurveyRedactor.vue";
import {useUserStore} from "@/projects/global/store/user";


// STORE
const userStore = useUserStore();

</script>

<style>

#app-container {
  padding-top: 10px;
  font-family: Helvetica;
  width: 80%;
  margin: auto;
  padding-bottom: 10px;
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