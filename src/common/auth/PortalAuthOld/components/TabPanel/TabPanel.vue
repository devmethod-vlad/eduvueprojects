<template>
	<div class="portalauth-tab-panel">

			<div class="portalauth-tab-title-wr">
					<div class="portalauth-tab-title-text">
							Вопросы и ответы
					</div>
          <div class="portalauth-tab-title-divider">
							<hr>
          </div>
			</div>

      <div v-show="loading" class="portalauth-tab-panel-loading">
					<content-loader />
			</div>

			<div v-show="!loading">

					<template v-if="Object.keys(submitInfo).length !== 0">
							<submit-panel v-show="!loading"
											:app-config="props.appConfig"
											:submit-info="submitInfo"
											@closereportpanel="()=>{submitInfo={}}"
											@emituserstate="(userState)=>{emits('emituserstate', userState)}"
											@startloading="loading=true"
                      @stoploading="loading=false"
							/>
					</template>

					<template v-else>

              <div class="portalauth-tabs-wr">
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

              <div class="portalauth-tabs-content">
                  <template v-if="activeTab === 'login'">
                      <LoginForm
                              :app-config="props.appConfig"
                              :show-loading="false"
                              @startloading="loading=true"
                              @stoploading="loading=false"
                              @submitdata="(submitObject)=>{submitLoginFormData(submitObject)}"
                      />
                  </template>
                  <template v-if="activeTab === 'anonym'">
											<slot name="anonymform"></slot>
                  </template>
              </div>
					</template>
			</div>
	</div>
</template>

<script setup>
import SubmitPanel from "../SubmitPanel/SubmitPanel.vue";
import ContentLoader from "../ContentLoader/ContentLoader.vue";
import LoginForm from "../LoginForm/LoginForm.vue";
import {ref} from "vue";
import {portalConfigObject} from "@/objects/portalauthappconfig";

// EMITS
const emits = defineEmits(['emituserstate']);


// PROPS
const props = defineProps({
    appConfig:
        {
            type: Object,
            default(){
                return {...portalConfigObject};
            },

            required: true

        },
});

// DATA
const activeTab = ref('login');

const loading = ref(false);

const submitInfo = ref({});

// METHODS

const submitLoginFormData = (submitObject)=>{
    submitInfo.value = submitObject;
};

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

</script>

<style scoped>
@import "css/tabpanel.css";
</style>