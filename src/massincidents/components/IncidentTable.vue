<template>
  <template v-if="appStore.$state.dataArr.length !==0">
    <div class="edu-massincident-incident-table">
      <div class="edu-incident-table-header">
        <div class="edu-incident-table-header-item header-incident-item">
          <div class="incident-header-item-text">
            <span class="incident-header-text-gray">Инцидент</span> / Дата создания
          </div>
          <div @click="freezeArrStore.$state.dataArr.length >2 ? changeSort('open_time') : null" class="incident-header-item-icon">
            <template v-if="appStore.$state.dataArr.length >2">
              <template v-if="appStore.$state.openTimeSort === 1 || appStore.$state.openTimeSort === null">
                <VTooltip theme="qst-arrow-tooltip-black">
                  <app-icon
                      name="sorting-increase"
                      :size="16"
                      color="#269999"
                  />
                  <template #popper>Сначала новые</template>
                </VTooltip>
              </template>
              <template v-else>
                <VTooltip theme="qst-arrow-tooltip-black">
                  <app-icon

                      name="sorting-decrease"
                      :size="16"
                      color="#269999"
                  />
                  <template #popper>Сначала старые</template>
                </VTooltip>
              </template>
            </template>

          </div>
        </div>
        <div
            class="edu-incident-table-header-item header-product-item"
            id="edu-incident-product-container"
        >
          <div class="incident-header-item-text">
            Продукт / <span class="incident-header-text-gray">Описание</span>
          </div>
          <div @click.prevent.stop="(appStore.$state.kpilist.length !==0 && freezeArrStore.$state.dataArr.length >2) ? processKpiDropDown() : null" class="incident-header-item-icon">
            <template v-if="kpiDropDownVisible">
              <app-icon
                  name="chevron-up"
                  :size="16"
                  color="#269999"
              />
            </template>
            <template v-else>

                <app-icon
                    name="chevron-down"
                    :size="16"
                    color="#269999"
                />

            </template>
          </div>
          <template v-if="kpiDropDownVisible">
              <kpi-drop-down
                  @closedropdown="kpiDropDownVisible = false"
              />
          </template>

        </div>
        <div class="edu-incident-table-header-item  header-count-item">
          <div class="incident-header-item-text">
            Количество обращений
          </div>
          <div @click="freezeArrStore.$state.dataArr.length >2 ? changeSort('cnt_sd') : null" class="incident-header-item-icon">

            <template v-if="appStore.$state.dataArr.length >2">
              <template v-if="appStore.$state.cntCountSort === 1 || appStore.$state.cntCountSort === null">
                <VTooltip theme="qst-arrow-tooltip-black">
                  <app-icon
                      name="sorting-increase"
                      :size="16"
                      color="#269999"
                  />
                  <template #popper>По убыванию</template>
                </VTooltip>
              </template>
              <template v-else>
                <VTooltip theme="qst-arrow-tooltip-black">
                  <app-icon
                      name="sorting-decrease"
                      :size="16"
                      color="#269999"
                  />
                  <template #popper>По возрастанию</template>
                </VTooltip>
              </template>
            </template>
          </div>
        </div>
      </div>

      <div class="edu-incident-table-body">
        <div
            v-for="(item, index) in appStore.$state.dataArr"
            :key="item.incident"
            class="edu-incident-body-item-wr"
        >
          <div @click.prevent.stop="openDescriptionModal(index)" class="edu-incident-body-item body-incident-item">
            <div class="body-incident-item-wr">
              <div class="body-incident-name-item">
                {{ item.incident }}
              </div>
              <div class="body-incident-date-item">
                {{ item.open_time }}
              </div>
              <div class="body-incident-tag-item">
                <template v-if="item.incident_type === 'problem'">
                  <tag-component
                      tag-text="проблема"
                      tag-color="#FCD6CE"
                  />
                </template>
                <template v-else>
                  <tag-component
                      tag-text="предложение"
                      tag-color="#C9EAF7"
                  />
                </template>

              </div>
            </div>
          </div>
          <div @click.prevent.stop="openDescriptionModal(index)" class="edu-incident-body-item body-product-item">
            <div class="body-product-item-productname">
              {{ item.incident_ke }}
            </div>
            <div class="body-product-item-desc">
              {{ item.description }}
            </div>
          </div>
          <div class="edu-incident-body-item body-count-item"
               :class="{'incident-disable-style': item.incident_checked === 'checked'}"
          >
            <div class="body-count-item-wr">
              <div class="body-count-number-item">
                {{ item.cnt_sd }}
              </div>
              <div @click.prevent.stop="openSubmitModal(index)" class="body-count-icon-item">
                <template v-if="item.incident_type === 'problem'">
                  <VTooltip theme="qst-arrow-tooltip-black">
                  <span
                      class="incident-table-icon"
                      @mouseenter="addVoteColor='#1E8686'"
                      @mouseleave="addVoteColor='#269999'"
                  >
                    <add-vote
                        :size="24"
                        :color="addVoteColor"
                    />
                  </span>
                    <template #popper>у меня такая же проблема</template>
                  </VTooltip>
                </template>

                <template v-else>
                  <VTooltip theme="qst-arrow-tooltip-black">
                  <span
                      class="incident-table-icon"
                      @mouseenter="addVoteColor='#1E8686'"
                      @mouseleave="addVoteColor='#269999'"
                  >
                    <add-vote
                        :size="24"
                        :color="addVoteColor"
                    />
                  </span>
                      <template #popper>поддержать предложение</template>
                  </VTooltip>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <template v-if="descriptionModalVisible">
      <ModalContentNew
          modalsize="small"
          @close-modal="closeDescriptionModal"
          :ignore-elements="['edu-incident-card']"
      >
        <incident-card
            @close-description-modal="closeDescriptionModal"
            @open-submit-modal="openSubmitModalFromCard"

        />
      </ModalContentNew>
    </template>

    <template v-if="submitFormModalVisible">
      <ModalContentNew
          modalsize="middle"
          @close-modal="closeSubmitModal"
          :ignore-elements="['edu-incident-submit-form']"
      >
        <incident-submit-form
            @sendsuccess="emits('sendsuccess')"
            @closemodal="closeSubmitModal"
        />
      </ModalContentNew>
    </template>
  </template>
  <template v-else>
    <empty-info
        @resetfilters="emits('resetfilters')"
    />
  </template>
</template>

<script setup>
import AddVote from "@/massincidents/components/AddVote.vue";
import EmptyInfo from "@/massincidents/components/EmptyInfo.vue";
import KpiDropDown from "@/massincidents/components/KpiDropDown/KpiDropDown.vue";
import {makeSort} from "@/massincidents/service/makesort";
import IncidentSubmitForm from "@/massincidents/components/IncidentSubmitForm.vue";
import IncidentCard from "@/massincidents/components/IncidentCard.vue";
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import {useAppStore} from "@/massincidents/store/app";
import {useFreezeArrayStore} from "@/massincidents/store/freezearray";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import TagComponent from "@/common/ui/TagComponent/TagComponent.vue";
import {ref} from "vue";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// EMITS
const emits = defineEmits(['sendsuccess', 'resetfilters']);


// STORE
const appStore = useAppStore();
const freezeArrStore = useFreezeArrayStore();

//DATA
const addVoteColor = ref('#269999');
const descriptionModalVisible = ref(false);
const submitFormModalVisible = ref(false);
const kpiDropDownVisible = ref(false);

// METHODS
const processKpiDropDown = ()=>{
  kpiDropDownVisible.value = !kpiDropDownVisible.value;
}

const changeSort = (key)=>{

  if(key === 'open_time'){
    if (appStore.$state.openTimeSort === null || appStore.$state.openTimeSort === 1){
      appStore.cntCountSort = null;
      appStore.openTimeSort = 0;
    }
    else if (appStore.$state.openTimeSort === 0){
      appStore.cntCountSort = null;
      appStore.openTimeSort = 1;
    }
  }

  if(key === 'cnt_sd'){
    if (appStore.$state.cntCountSort === null || appStore.$state.cntCountSort === 1){
      appStore.openTimeSort = null;
      appStore.cntCountSort = 0;
    }
    else if (appStore.$state.cntCountSort === 0){
      appStore.openTimeSort = null;
      appStore.cntCountSort = 1;
    }
  }

  makeSort(appStore, freezeArrStore);

}

const openDescriptionModal = (index) =>{

  let ind = Number(index);

  appStore.targetIncident = appStore.$state.dataArr[ind];

  descriptionModalVisible.value = true;

};

const closeDescriptionModal = ()=>{
  appStore.targetIncident = {};
  descriptionModalVisible.value = false;
}

const openSubmitModal = (index)=>{
  let ind = Number(index);
  appStore.targetIncident = appStore.$state.dataArr[ind];
  descriptionModalVisible.value = false;
  submitFormModalVisible.value = true;
}

const openSubmitModalFromCard = ()=>{
  descriptionModalVisible.value = false;
  submitFormModalVisible.value = true;
}

const resetInputs = ()=>{
  appStore.fioInput = '';
  appStore.roleInput = '';
  appStore.moInput = '';
  appStore.mailInput = '';
  appStore.phoneInput = '';
}

const closeSubmitModal = ()=>{
  appStore.targetIncident = {};
  resetInputs();
  descriptionModalVisible.value = false;
  submitFormModalVisible.value = false;
}

</script>

<style>
.vue-modalwindow-header-closeicon {
  padding-top: 10px !important;
  padding-right: 20px !important;
}

</style>

<style scoped>
.body-count-icon-item {
  cursor: pointer;
}

.body-count-number-item {
  min-width: 35px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.incident-table-icon {
  margin-left: 30px;
  display: flex;
  align-items: center;
}

.incident-disable-style {
  pointer-events: none;
  opacity: 0.5;
}

.body-product-item-productname {
  word-break: break-all;
  font-weight: 600;
  margin-bottom: 10px;
}

.body-product-item-desc {
  word-break: break-all;
}

.incident-header-text-gray {
  color: #757575;
}

.incident-inline-icon {
  cursor: pointer;
  margin-left: 40px;
}

.body-count-item-wr {
  display: flex;
  flex-direction: row;
}

.body-incident-item-wr {
  display: flex;
  flex-direction: column;
}

.body-incident-name-item {
  font-weight: 600;
  padding-bottom: 7px;
}
.body-incident-date-item {
  padding-bottom: 7px;
}
.body-incident-tag-item {
  padding-bottom: 7px;
}

.edu-incident-body-item {
  padding: 7px;
}

.edu-incident-body-item-wr:hover {
  background-color: #ebf8f8;
}

.edu-incident-body-item-wr {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px #CCCCCC solid;
}

.incident-header-item-text {
  display: flex;
  align-items: center;
  width: 80%;
}

.incident-header-item-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.edu-incident-table-header-item {
  font-size: 12px;
  word-break: break-all;
  padding: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #269999;
}

.header-incident-item {
  width: 35%;
}
.header-product-item {
  position: relative;
  width: 45%;
}

.header-count-item .incident-header-item-text {
  justify-content: center;
}

.header-count-item {
  width: 20%;
}

.body-incident-item {
  cursor: pointer;
  display: flex;
  width: 35%;
  align-items: center;
}
.body-product-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 45%;
}

.body-count-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.edu-incident-table-body {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.edu-incident-table-header {
  min-height: 70px;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 2px #CCCCCC solid;
}

.edu-massincident-incident-table {
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .body-count-number-item {
    min-width: 50px;
  }

  .edu-incident-table-header-item {
    font-size: 14px;
  }
  .body-product-item-desc {
    word-break: break-word;
  }
  .header-incident-item {
    width: 22%;
  }
  .header-product-item {
    width: 56%;
  }

  .header-count-item {
    width: 22%;
  }

  .body-incident-item {
    width: 22%;
  }
  .body-product-item {
    width: 56%;
  }

  .body-count-item {
    width: 22%;
  }
}

@media (min-width: 992px) {
  .edu-incident-table-header-item {
    font-size: 16px;
  }
}

</style>