<template>
  <div class="ai-search-pagination-wr">
    <div
        class="ai-search-pagination-back-icon"
        :class="{'ai-search-pagination-disable': app.$state.activePage === 1}"
        @click.stop.prevent="goBack()"
    >
      <app-icon
          name="chevron-left"
          :size="18"
          color="#1D8585"
      />
    </div>
    <div
        class="ai-search-pagination-back-text"
        @click.stop.prevent="goBack()"
        :class="{'ai-search-pagination-disable': app.$state.activePage === 1}"
    >
      Назад
    </div>
    <div class="ai-search-pagination-badge">
      <badge-component-v2
          :check-list="[]"
          badge-id="ai-search-pagination-badge"
          :badge-text="badgeText"
          :font-size="13"
      />
    </div>
    <div
        class="ai-search-pagination-forward-text"
        @click.stop.prevent="goForward()"
        :class="{'ai-search-pagination-disable': app.$state.activePage === app.$state.pageCount}"
    >
      Вперед
    </div>
    <div
        class="ai-search-pagination-forward-icon"
        @click.stop.prevent="goForward()"
        :class="{'ai-search-pagination-disable': app.$state.activePage === app.$state.pageCount}"
    >
      <app-icon
          name="chevron-right"
          :size="18"
          color="#1D8585"
      />
    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import BadgeComponentV2 from "@/common/ui/BadgeComponentV2/BadgeComponentV2.vue";
import {useAppAiSearchStore} from "@/aisearch/store/appaisearch";
import {computed} from "vue";
import {setRenderParams} from "@/aisearch/services/getresults";

// STORE
const app = useAppAiSearchStore();

// METHODS
const goBack = async () => {
  app.activePage = app.$state.activePage - 1;
  await setRenderParams(app);
}

const goForward = async () => {
  app.activePage = app.$state.activePage + 1;
  await setRenderParams(app);
}


// COMPUTED
const badgeText = computed(()=>{
  return app.$state.activePage.toString()+" из " + app.$state.pageCount.toString();
})


</script>

<style scoped>
.ai-search-pagination-disable {
  pointer-events: none;
  opacity: 0.4;
}

.ai-search-pagination-back-text {
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #1D8585;
  cursor: pointer;
}

.ai-search-pagination-forward-text {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #1D8585;
  cursor: pointer;
  margin-left: 8px;
}

.ai-search-pagination-back-icon {
  cursor: pointer;
  padding-top: 1px;
  display: flex;
  align-items: center;
  margin-right: 4px;
}

.ai-search-pagination-forward-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 4px;
  padding-top: 3px;
}

.ai-search-pagination-wr {
  display: flex;
}

</style>