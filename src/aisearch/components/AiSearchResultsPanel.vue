<template>
  <div
      class="aisearch-results"
      ref="aisearchResults"
      :class="{'aisearch-shadow': isScrolled}"
  >
    <div
        class="aisearch-results-workspace"
        ref="aiSearchWorkspace"
    >
        <div
            class="aisearch-results-wr-top"
            :class="{'aisearch-shadow': !isScrolled}"
        >
          <div class="aisearch-results-wr-top-title">
            <div class="aisearch-results-wr-top-title-text">
              <template v-if="app.$state.noResults">
                Попробуйте следующее:
              </template>
              <template v-else>
                <template v-if="!app.$state.loadingResults">
                  <template v-if="app.$state.results.length > 1">
                    Возможно, эти ответы вам помогут:
                  </template>
                  <template v-else>
                    Возможно, этот ответ вам поможет:
                  </template>
                </template>
              </template>
            </div>

            <div
                v-if="!app.$state.noResults && !app.$state.loadingResults"
                class="aisearch-results-wr-top-noresult"
                @click="setNoResults()"
            >
              Нет подходящего ответа?
            </div>

            <div
                class="aisearch-results-wr-top-title-icon"
                @click="closeResultsPanel()"
            >
              <app-icon name="close"
                        :size="16"
                        color="#CCCCCC"
                        hover-color="#333333"
              />
            </div>
          </div>

<!--          <div-->
<!--              v-if="!app.$state.noResults && !app.$state.loadingResults"-->
<!--              class="aisearch-results-wr-top-actions"-->
<!--          >-->
<!--            <div class="aisearch-results-wr-top-pagination">-->
<!--              <ai-search-pagination />-->
<!--            </div>-->
<!--            <div-->
<!--                class="aisearch-results-wr-top-noresult"-->
<!--                @click="setNoResults()"-->
<!--            >-->
<!--              Нет подходящего ответа-->
<!--            </div>-->
<!--          </div>-->
        </div>

        <div
            class="aisearch-results-wr-divider"
        >
          <div
              class="aisearch-divider-left"
              :class="{'aisearch-divider-border': !isScrolled}"
          >

          </div>
          <div
              class="aisearch-divider-center"
          >
          </div>
          <div
              class="aisearch-divider-rigth"
              :class="{'aisearch-divider-border': !isScrolled}"
          >
          </div>

        </div>

        <div
            v-show="app.$state.loadingResults"
            class="aisearch-results-loader-wr">
          <content-loader
          />
        </div>

          <div
              v-show="!app.$state.loadingResults"
              class="aisearch-results-wr-main"
              ref="aiSearchMain"
          >
            <template v-if="app.$state.noResults">
              <ai-search-no-results />
            </template>

            <template v-else>

              <template
                  v-for="(result, index) in app.$state.renderList"
                  :key="result.id"
              >
                <ai-search-result-item
                    :index="index"
                    :attachments="result.attachments"
                    :answer="result.enable_llm ? result.llm_answer : result.answer"
                    :show-number="app.$state.renderList.length > 1"
                    :is-llm-answer="!!result.enable_llm"
                />
              </template>
            </template>
          </div>

    </div>
  </div>
</template>

<script setup>
import AiSearchResultItem from "@/aisearch/components/AiSearchResultItem.vue";
import ResizeObserver from 'resize-observer-polyfill';
import ContentLoader from "@/common/auth/PortalAuthOld/components/ContentLoader/ContentLoader.vue";
import AiSearchNoResults from "@/aisearch/components/AiSearchNoResults.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import AiSearchPagination from "@/aisearch/components/AiSearchPagination.vue";
import {useAppAiSearchStore} from "@/aisearch/store/appaisearch";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {app_config} from "@/aisearch/config/setconfig";

// STORE
const app = useAppAiSearchStore();

// DATA
const aisearchResults = ref(null);
const aiSearchMain = ref(null);
const aiSearchWorkspace = ref(null);
const isScrolled = ref(true);
const windowHeight = ref(0);

// METHODS
const getOffsetTop = (element)=> {
  const rect = element.getBoundingClientRect();
  // const scrollTop = window.scrollY || window.pageYOffset;
  // return rect.top + scrollTop;
  return rect.top;
}


const resizeSearchElemObserver = new ResizeObserver(() => {
  setSearchElemHeigth();
})

const setSearchElemHeigth = () =>{
  // console.log("setSearchElemHeigth");
  let searchElem = document.getElementById(app_config.searchElemId);
  if (searchElem){
    // console.log("Number(searchElem.clientHeight): ", Number(searchElem.clientHeight));
    app.searchElemHeight = Number(searchElem.clientHeight);
  }
}

const handleResize = () => {
  windowHeight.value = window.innerHeight;

  if(aiSearchWorkspace.value){
    let offSetTop = getOffsetTop(aiSearchWorkspace.value);
    aiSearchWorkspace.value.style.maxHeight = Math.round(0.9*(Number(windowHeight.value)-Number(offSetTop))).toString() +"px";

  }
}

const setIsScrolled = () => {
  if(aiSearchMain.value) {
    let scrollTop = aiSearchMain.value.scrollTop;

    isScrolled.value = scrollTop === 0;
  }
}

const closeResultsPanel = ()=>{
  let appCopy = JSON.parse(JSON.stringify(app.$state));
  app.$reset();
  app.query = appCopy.query;
  app.searchElemHeight = appCopy.searchElemHeight;
  if (appCopy.results.length > 0 && appCopy.noResults) {
    app.resultPanelVisible = true;
    app.results = appCopy.results;
    app.renderList = appCopy.renderList;
    app.searchElemHeight = appCopy.searchElemHeight;
  }
}

const setTopPosition = ()=>{
  // console.log("setTopPosition");
  if (aisearchResults.value){
    // console.log("if (aisearchResults.value)");
    aisearchResults.value.style.top = app.searchElemHeight.toString() + "px";
  }
}

const setNoResults = () =>{
  let appCopy = JSON.parse(JSON.stringify(app.$state));
  app.$reset();
  app.query = appCopy.query;
  app.resultPanelVisible = true;
  app.results = appCopy.results;
  app.renderList = appCopy.renderList;
  app.searchElemHeight = appCopy.searchElemHeight;
  app.noResults = true;
}

// LIFECYCLE
onMounted(()=>{
  setSearchElemHeigth();

  handleResize();

  setTopPosition();

  if(aisearchResults.value){
    aiSearchMain.value.addEventListener('scroll', () => {
      setIsScrolled()
    })
  }

  if(document.getElementById(app_config.searchElemId)){
    resizeSearchElemObserver.observe(document.getElementById(app_config.searchElemId));
  }

  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  if(aisearchResults.value){
    aiSearchMain.value.removeEventListener('scroll', () => {
      setIsScrolled()
    })
  }

  window.removeEventListener('resize', handleResize);

  if(document.getElementById(app_config.searchElemId)){
    resizeSearchElemObserver.unobserve(document.getElementById(app_config.searchElemId));
  }
});

// WATCH
watch(
    () => app.searchElemHeight,
    () => {
      setTopPosition();
    },
    {immediate: true}
);

watch(
    () => app.activePage,
    () => {
      setIsScrolled();
    },
    {immediate: true}
);

</script>

<style scoped>

.aisearch-results-add-info {
  border-top: 1px #E6E6E6 solid;
}

.aisearch-results-loader-wr {
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aisearch-shadow {
  box-shadow: 0px 4px 8px 0px #00000014;
}

.aisearch-divider-border {
  border-bottom: 1px #E6E6E6 solid;
}

.aisearch-results-wr-divider {
  display: flex;
  margin-bottom: 16px;
}

.aisearch-divider-center {
  width: 100%;
  border-bottom: 1px #E6E6E6 solid;
}

.aisearch-divider-rigth {
  width: 24px;
}

.aisearch-divider-left {
  width: 24px;
}

.aisearch-results-wr-main {
  padding-bottom: 24px;
  padding-right: 24px;
  padding-left: 24px;
  overflow-y: auto;
}

.aisearch-results-wr-top-noresult:hover {
  color: #157171;
}

.aisearch-results-wr-top-noresult {
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #1D8585;
  cursor: pointer;
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;
  padding-left: 16px;
}

.aisearch-results-wr-top-title-icon {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  flex: 1;
}


.aisearch-results-wr-top-title-text {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  flex: 20;
  color: #333333;
}

.aisearch-results-wr-top-title {
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.aisearch-results-wr-top {
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-top: 24px;
  padding-right: 24px;
}

.aisearch-results-workspace {
  display: flex;
  flex-direction: column;
}

.aisearch-results {
  width: 100%;
  position: absolute;
  background-color: white;
}
</style>