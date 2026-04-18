<template>
	<div class="portalauth-tab-panel">

		<template v-if="portalProps.$state.showTabTitle">
      <div class="portalauth-tab-title-wr">
        <div class="portalauth-tab-title-text">
          {{ portalProps.$state.tabTitle }}
        </div>
        <div class="portalauth-tab-title-divider">
          <hr>
        </div>
      </div>
    </template>
    <div class="portalauth-tab-panel-workspace">

      <div
          v-show="loading"
          class="portalauth-tab-panel-loading"
          ref="tabsLoading"
      >
        <content-loader />
      </div>

      <div v-show="!loading">
        <template v-if="app.tabsSubmitPanelVisible">
          <submit-panel v-show="!loading"
                        panel-type="modal"
                        @closereportpanel="()=>{resetSubmitInfo(); app.tabsSubmitPanelVisible = false}"
                        @startloading="prepareLoading=true"
                        @stoploading="prepareLoading=false"
          />
        </template>

        <template v-else>
          <div
              ref="tabsWr"
              class="portalauth-tabs-wr">
            <div @click="setActiveContent('login')"
                 class="portalauth-tabs-login"
                 :class="{'portalauth-active-tab': activeTab==='login'}"
            >
              Я знаю свой логин в ЕМИАС
            </div>
            <div @click="setActiveContent('anonym')"
                 class="portalauth-tabs-anonym"
                 :class="{'portalauth-active-tab': activeTab==='anonym'}"
            >
              Я не знаю свой логин в ЕМИАС
            </div>
          </div>

          <div
              class="portalauth-tabs-content"
              ref="tabsContent"
          >
            <template v-if="activeTab === 'login'">
              <LoginForm
                  :show-loading="false"
                  @startloading="prepareLoading=true"
                  @stoploading="prepareLoading=false"
                  @show-submit-panel="app.tabsSubmitPanelVisible=true"
              />
            </template>
            <template v-if="activeTab === 'anonym'">
              <slot name="anonymform"></slot>
            </template>
          </div>
        </template>
      </div>
    </div>

	</div>
</template>

<script setup>
import SubmitPanel from "../SubmitPanel/SubmitPanel.vue";
import ContentLoader from "@/common/ui/ContentLoader/ContentLoader.vue";
import LoginForm from "../LoginForm/LoginForm.vue";
import {ref, watch} from "vue";
import {submitInfoInitial} from "@/common/auth/PortalAuth/objects/submitinfo";
import {usePortalAuthAppStore} from "@/common/auth/PortalAuth/store/app";
import {usePropsStore} from "@/common/auth/PortalAuth/store/props";


// STORE
const app = usePortalAuthAppStore();
const portalProps = usePropsStore();


// DATA
const activeTab = ref('login');
const prepareLoading = ref(false);
const loading = ref(false);
const tabsWr = ref(null);
const tabsLoading = ref(null);
const tabsContent = ref(null);

// METHODS
const resetSubmitInfo = () =>{
  app.submitInfo = {...submitInfoInitial}
}


const setActiveContent = (tabname)=>{
    if(activeTab.value !==tabname){
        if(activeTab.value === 'login'){
            activeTab.value = 'anonym';
        }
        else{
            activeTab.value = 'login';
        }
		}
}

// WATCH
watch(
    prepareLoading,
    (newVal) => {
      // console.log("WATCH TABS LOADING");
      if(newVal){
        let containerHeight = Number(tabsWr.value.offsetHeight)+Number(tabsContent.value.offsetHeight);
        // console.log("WATCH TABS LOADING containerHeight: ", containerHeight);
        tabsLoading.value.style.height = containerHeight.toString()+"px";
        loading.value = true
      }
      else {
        loading.value = false;
      }
    }
);

</script>

<style scoped>
@import "css/tabpanel.css";
</style>