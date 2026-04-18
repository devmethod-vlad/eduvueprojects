<template>
  <modal-content-new
      modalsize="large"
      @close-modal="emits('closepreview')"
      :ignore-elements="['dispatch-preview-container']"
  >
    <div
        class="dispatch-preview-container"
        id="dispatch-preview-container"
    >
        <div
            v-show="preview.$state.loading"
            class="dispatch-preview-container-loader">
          <content-loader/>
        </div>

      <div
          class="dispatch-preview-wr"
          v-show="!preview.$state.loading">
        <div class="dispatch-preview-info">
          <div class="dispatch-preview-info-wr">
            <div class="dispatch-preview-info-status">
              <dispatch-status-tag
                  :db_name="preview.dispatchStatus.db_name"
                  :name="preview.dispatchStatus.name"
              />
            </div>
            <div class="dispatch-preview-info-datetime">
              {{ timeToShow }}
            </div>
          </div>

          <div class="dispatch-preview-info-closeicon">
            <app-icon
                @click.prevent.stop="emits('closepreview')"
                name="close"
                :size="14"
            />
          </div>

        </div>

        <div class="dispatch-preview-title">
          {{ preview.title }}
        </div>

        <div class="dispatch-preview-method">

          <div class="dispatch-preview-method-text">
            Способ отправки:
          </div>

          <div
              v-for="(method, index) in preview.$state.methodList"
              class="dispatch-preview-method-item"
              :key="method.id"
          >
            <template v-if="preview.$state.methodList.length>1 && (Number(index)+1) !== preview.$state.methodList.length">
              {{ method.name }},
            </template>
            <template v-else>
              {{ method.name }}
            </template>
          </div>

        </div>

        <div class="dispatch-preview-actuality">
          Дата актуальности не задана
        </div>

        <div
            class="dispatch-preview-telegram-text"
            :class="{'dispatch-preview-telegram-text-with-files': preview.$state.dispatch_files.length>0}"
        >
          {{ preview.telegram_text }}
        </div>

        <template v-if="preview.$state.dispatch_files.length>0">
          <div class="dispatch-preview-files">
            <div
                class="dispatch-preview-file-item"
                v-for="fileItem of preview.$state.dispatch_files"
                :key="fileItem.id"
            >
              <file-item-alternative
                  :file-size="fileItem.size"
                  :file-src="app_config.apiUrl+app_config.attachmentUrl+preview.$state.dispatch_id.toString()+'/'+fileItem.filename"
                  :file-name="fileItem.filename"
                  :file-index="fileItem.id"
              />
            </div>
          </div>
        </template>

        <template v-if="filterTableVisible">
          <div class="dispatch-preview-filter-machine">
            <filter-machine
                :predefined-filter="previewFilters.$state"
                :filter-url="app_config.filterUrl"
                :role-filter-url="app_config.roleFilterUrl"
                :role-download-url="app_config.roleDownloadUrl"
                :spec-filter-url="app_config.specFilterUrl"
                :spec-download-url="app_config.specDownloadUrl"
                :mo-filter-url="app_config.moFilterUrl"
                :mo-download-url="app_config.moDownloadUrl"
                :mo-name-category-url="app_config.moNameCategoryUrl"
                :mu-filter-url="app_config.muFilterUrl"
                :mu-download-url="app_config.muDownloadUrl"
                :mu-name-category-url="app_config.muNameCategoryUrl"
                :users-download-url="app_config.usersDownloadUrl"
                @machine-ready="()=>{console.log('MACHINE READY'); preview.loading=false}"
                @set-filters="()=>{console.log('SET FILTERS')}"
                :show-mode="true"
            />
          </div>
        </template>

        <div class="dispatch-preview-action-buttons">

          <template v-if="deleteButtonVisible">
            <button
                type="button"
                class="vue-btn vue-btn-warn-wobg"
                @click.stop.prevent="openPreviewModal('delete')"
                style="margin-left: 24px"
            >
              Удалить
            </button>
          </template>


          <template v-if="redactButtonVisible">
            <button
                type="button"
                class="vue-btn vue-btn-normal-wobg"
                @click.stop.prevent="modifyDispatch()"
                style="margin-left: 24px"
            >
              Редактировать
            </button>
          </template>

          <template v-if="templateButtonVisible">
            <button
                type="button"
                class="vue-btn vue-btn-normal"
                @click.stop.prevent="openPreviewModal('template')"
                style="margin-left: 24px"
            >
              Использовать как шаблон
            </button>
          </template>
        </div>
      </div>
    </div>
  </modal-content-new>
</template>

<script setup>
import FileItemAlternative from "@/common/ui/FileItemAlternative/FileItemAlternative.vue";
import DispatchStatusTag from "@/dispatches/components/DispatchStatusTag.vue";
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import {usePreviewStore} from "@/dispatches/store/preview";
import FilterMachine from "@/filtermachine/FilterMachine.vue";
import {getDispatchFiltersInfo} from "@/dispatches/services/dispatchfiltersinfo";
import {computed, onMounted, ref} from "vue";
import {setPredifinedFilters} from "@/dispatches/services/setpredifinedfilters";
import {usePreviewFilterStore} from "@/dispatches/store/previewfilter";
import {setRedactFromId} from "@/dispatches/services/setredactfromid";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";
import {useDispatchesStore} from "@/dispatches/store/dispatches";
import {useAppStore} from "@/dispatches/store/app";
import ContentLoader from "@/questions/components/ContentLoader/ContentLoader.vue";
import {app_config} from "@/dispatches/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";


// EMITS
const emits = defineEmits(['closepreview']);


// STORE
const preview = usePreviewStore();
const previewFilters = usePreviewFilterStore();
const redactDispatch = useRedactDispatchStore();
const dispatches = useDispatchesStore();
const appStore = useAppStore();


// DATA
const filterTableVisible = ref(false);

// METHODS
const openPreviewModal = (target)=>{
  preview.modalVisible = true;
  preview.modalPurpose = 'confirmation';
  preview.modalTarget = target;
  if(target === 'delete'){
    preview.modalText = 'Вы действительно хотите удалить данную рассылку?';
  }
  else if (target === 'template'){
    preview.modalText = 'Вы хотите использовать данную рассылку как шаблон для новой?';
  }
}


const modifyDispatch = ()=>{
  setRedactFromId(preview.$state.dispatch_id, dispatches, redactDispatch);
  preview.$reset();
  appStore.activeComponent = 'modifydispatch';
}


// COMPUTED
const deleteButtonVisible = computed(()=>{
  let flag = true;
  if(preview.$state.dispatchStatus.db_name === 'sending'){
    flag = false;
  }
  return flag;
});

const redactButtonVisible = computed(()=>{
  let flag = true;
  if(['sending','dispatched'].includes(preview.$state.dispatchStatus.db_name)){
    flag = false;
  }
  return flag;
});

const templateButtonVisible = computed(()=>{
  let flag = true;
  return flag;
});

const timeToShow = computed(()=>{
  let showTime = preview.$state.created_at;

  if(preview.$state.dispatchStatus.db_name === 'pending'){
    if(preview.$state.start_time !==''){
      showTime = preview.$state.start_time;
    }
  }

  if(preview.$state.dispatchStatus.db_name === 'sending'){
    if(preview.$state.active_dispatch_start_time !==''){
      showTime = preview.$state.active_dispatch_start_time;
    }
  }

  if(preview.$state.dispatchStatus.db_name === 'dispatched'){
    if(preview.$state.dispatch_result_end_time !==''){
      showTime = preview.$state.dispatch_result_end_time;
    }
  }

  return showTime;
});

// LIFECYCLE
onMounted(async ()=>{
  let filters = await getDispatchFiltersInfo(preview.$state.dispatch_id);
  await setPredifinedFilters(filters.filters, previewFilters);
  filterTableVisible.value = true;
})


</script>

<style scoped>
.dispatch-preview-file-item {
  margin-bottom: 10px;
}


.dispatch-preview-files {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
}

.dispatch-preview-container-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.dispatch-preview-action-buttons {
  display: flex;
  justify-content: flex-end;
}

.dispatch-preview-telegram-text {
  font-weight: 400;
  font-size: 15px;
  color: #333333;
  line-height: 24px;
  margin-bottom: 82px;
}

.dispatch-preview-telegram-text-with-files {
  margin-bottom: 8px !important;
}

.dispatch-preview-actuality {
  font-weight: 400;
  font-size: 13px;
  color: #333333;
  line-height: 22px;
  margin-bottom: 16px;
}

.dispatch-preview-method-text {
  margin-right: 4px;
}

.dispatch-preview-method {
  display: flex;
  justify-content: flex-start;
  font-weight: 400;
  font-size: 13px;
  color: #333333;
  line-height: 22px;
  margin-bottom: 8px;
}


.dispatch-preview-title {
  text-align: left;
  font-size: 21px;
  font-weight: 600;
  line-height: 28px;
  color: #333333;
  margin-bottom: 8px;
}

.dispatch-preview-info-datetime {
  color: #757575;
  font-size: 13px;
  font-weight: 400;
}

.dispatch-preview-info-status {
  margin-right: 16px;
}

.dispatch-preview-info-wr {
  display: flex;
  justify-content: flex-start;
}

.dispatch-preview-info-closeicon {
  cursor: pointer;
}

.dispatch-preview-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.dispatch-preview-container {
  display: flex;
  flex-direction: column;
}

</style>