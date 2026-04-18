<template>
  <div
      class="dispatch-maintable-wr"
      :class="{'em-disabled-style': activateDisableMain(dispatches)}"
  >
    <div class="dispatch-maintable">

      <div class="dispatch-maintable-header">
        <div class="dispatch-maintable-header-item maintable-header-info">
          <div
              class="maintable-header-item-icon"
              @click.prevent.stop="sortClick('date')"
          >
            <template v-if="dispatches.total>1">
              <template v-if="dispatches.created_sort.type === 'asc'">
                <VTooltip theme="qst-arrow-tooltip-black">
                  <span>
                    <app-icon
                      name="sorting-increase"
                      :size="16"
                      color="#269999"
                      hover-color="#1D8585"
                    />
                  </span>
                  <template #popper>Сначала новые</template>
                </VTooltip>

              </template>

              <template v-if="dispatches.created_sort.type === 'desc'">
                <VTooltip theme="qst-arrow-tooltip-black">
                  <span>
                    <app-icon
                        name="sorting-decrease"
                        :size="16"
                        color="#269999"
                        hover-color="#1D8585"
                    />
                  </span>
                  <template #popper>Сначала старые</template>
                </VTooltip>
              </template>

            </template>
          </div>
        </div>

        <div class="dispatch-maintable-header-item maintable-header-text">

        </div>

        <div class="dispatch-maintable-header-item maintable-header-actuality">
          <div
              class="maintable-header-item-icon em-disabled-style"
              @click.prevent.stop="sortClick('actuality')"
          >

            <template v-if="dispatches.total>1">
              <template v-if="dispatches.actuality_sort.type === 'asc'">
                <span>
                  <app-icon
                      name="sorting-increase"
                      :size="16"
                      color="#269999"
                      hover-color="#1D8585"
                  />
                </span>

              </template>

              <template v-if="dispatches.actuality_sort.type === 'desc'">
                <span>
                  <app-icon
                      name="sorting-decrease"
                      :size="16"
                      color="#269999"
                      hover-color="#1D8585"
                  />
                </span>

              </template>

            </template>

          </div>
        </div>

      </div>

      <template v-if="dispatches.$state.total > 0">

        <div class="dispatch-maintable-body">

          <div
              v-for="item in dispatches.$state.renderList"
              class="dispatch-maintable-body-item-wr"
              :key="item.dispatch_id"
              @click.stop.prevent="openDispatchPreview(preview, item)"
              @mouseenter="tableItemHoverId=item.dispatch_id"
              @mouseleave="tableItemHoverId=0"
          >

            <div
                class="dispatch-maintable-body-item maintable-body-info">
              <div class="maintable-body-info-wr">
                <div class="maintable-body-info-datetime">
                  {{ item.created_at }}
                </div>
                <div class="maintable-body-info-status">

                  <dispatch-status-tag
                      :db_name="item.status_db_name"
                      :name="item.status_name"

                  />

                </div>
                <div class="maintable-body-info-methods">

                  <div
                      v-for="method in item.method"
                      :key="method.id"
                      class="body-info-methods-icon"
                  >
                    <template v-if="method.db_name === 'telegram'">
                      <telegram-method-icon />
                    </template>

                    <template v-if="method.db_name === 'mail'">
                      <mail-method-icon />
                    </template>

                    <template v-if="method.db_name === 'arm'">
                      <arm-method-icon />
                    </template>
                  </div>

                </div>

              </div>

            </div>

            <div class="dispatch-maintable-body-item maintable-body-content">
              <div class="maintable-body-content-wr">
                <div class="maintable-body-content-title">
                  {{ item.title }}
                </div>
                <div class="maintable-body-content-text">
                  <template v-if="item.telegram_text.length > 300">
                    {{ item.telegram_text.slice(0, 300).replace(/(<([^>]+)>)/ig, '') }}...
                  </template>
                  <template v-else>
                    {{ item.telegram_text.replace(/(<([^>]+)>)/ig, '') }}
                  </template>

                </div>

              </div>

              <div
                  class="maintable-body-content-actions-wr"
                  v-if="tableItemHoverId === item.dispatch_id"
              >
                <div
                    v-if="redactIconVisible(item)"
                    class="body-content-actions-item"
                    @click.prevent.stop="redactFromTable(item)"
                >
                  <VTooltip theme="qst-arrow-tooltip-black">
                    <span>
                      <app-icon name="pencil"
                              :size="15"
                              color="#1D8585"
                              hover-color="#157171"
                      />
                    </span>
                    <template #popper>Редактировать</template>
                  </VTooltip>
                </div>

                <div
                    v-if="templateIconVisible(item)"
                    class="body-content-actions-item"
                    @click.prevent.stop="templateFromTable(item)"
                >
                  <VTooltip theme="qst-arrow-tooltip-black">
                    <span>
                      <app-icon name="copy"
                              color="#1D8585"
                              hover-color="#157171"
                              :size="15"
                      />
                    </span>
                    <template #popper>Использовать как шаблон</template>
                  </VTooltip>
                </div>

                <div
                    v-if="deleteIconVisible(item)"
                    class="body-content-actions-item"
                    @click.prevent.stop="deleteFromTable(item)"
                >
                  <VTooltip theme="qst-arrow-tooltip-black">
                    <span>
                      <app-icon name="to-trash"
                              color="#E04B37"
                              hover-color="#CD3B2B"
                              :size="15"
                      />
                    </span>
                    <template #popper>Удалить</template>
                  </VTooltip>
                </div>
              </div>
            </div>

            <div class="dispatch-maintable-body-item maintable-body-actuality">

            </div>

          </div>

        </div>

        <template v-if="dispatches.$state.total>dispatches.$state.pageCount">
          <div class="dispatch-maintable-pagination">
            <vue-awesome-paginate
                :total-items="dispatches.$state.total"
                :items-per-page="dispatches.$state.pageCount"
                v-model="reactDispatches.pageNumber.value"
                :on-click="clickPaginate"
            />
          </div>
        </template>

      </template>

    </div>

    <template v-if="preview.$state.dispatch_id !== 0 && !preview.$state.modalVisible">
      <div class="dispatch-preview-modal-modifier">
        <dispatch-preview
            @closepreview="()=>{preview.$reset(); previewFilters.$reset()}"
        />
      </div>
    </template>

    <template v-if="preview.$state.modalVisible">
      <div class="dispatch-preview-modal-modifier">
        <dispatch-preview-modal
            @close-preview-modal="closePreviewModal()"
            @confirm-yes="previewModalConfirm()"
            @confirm-no="closePreviewModal()"

        />
      </div>
    </template>

  </div>
</template>

<script setup>
import DispatchPreviewModal from "@/dispatches/components/DispatchPreview/components/DispatchPreviewModal.vue";
import DispatchStatusTag from "@/dispatches/components/DispatchStatusTag.vue";
import DispatchPreview from "@/dispatches/components/DispatchPreview/DispatchPreview.vue";
import TelegramMethodIcon from "@/dispatches/components/icons/TelegramMethodIcon.vue";
import MailMethodIcon from "@/dispatches/components/icons/MailMethodIcon.vue";
import ArmMethodIcon from "@/dispatches/components/icons/ArmMethodIcon.vue";
import {useDispatchesStore} from "@/dispatches/store/dispatches";
import {usePreviewStore} from "@/dispatches/store/preview";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {storeToRefs} from "pinia";
import {usePreviewFilterStore} from "@/dispatches/store/previewfilter";
import {activateDisableMain} from "@/dispatches/services/activatedisable";
import {openDispatchPreview} from "@/dispatches/services/openpreview";
import {deleteDispatch} from "@/dispatches/services/deletedispatch";
import {useDispatchAsTemplate} from "@/dispatches/services/usedispatchastemplate";
import {useAppStore} from "@/dispatches/store/app";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";
import {useNewDispatchFilterStore} from "@/dispatches/store/newdispatchfilter";
import {useRedactDispatchFilterStore} from "@/dispatches/store/redactdispatchfilter";
import {ref} from "vue";
import {setRedactFromId} from "@/dispatches/services/setredactfromid";


// EMITS
const emits = defineEmits(['refreshlist'])

// STORE
const appStore = useAppStore();
const redactDispatch = useRedactDispatchStore();
const newDispatch = useNewDispatchStore();
const newDispatchFilter = useNewDispatchFilterStore();
const dispatches = useDispatchesStore();
const reactDispatches = storeToRefs(useDispatchesStore());
const redactDispatchFilter = useRedactDispatchFilterStore();
const preview = usePreviewStore();
const previewFilters = usePreviewFilterStore();

// DATA
const tableItemHoverId = ref(0);


// METHODS
const clickPaginate = async ()=>{
  emits('refreshlist');
}

const sortClick = async (target)=>{
  dispatches.pageNumber = 1;
  if(target === 'date'){
    dispatches.actuality_sort.active=0;
    if (dispatches.$state.created_sort.type === 'desc'){
      dispatches.created_sort.type = 'asc';
    }
    else {
      dispatches.created_sort.type = 'desc';
    }
  }
  else if(target === 'actuality'){
    dispatches.created_sort.active=0;
    if (dispatches.$state.actuality_sort.type === 'desc'){
      dispatches.actuality_sort.type = 'asc';
    }
    else {
      dispatches.actuality_sort.type = 'desc';
    }
  }
  emits('refreshlist');
}

const deleteFromTable = (item)=>{
  openDispatchPreview(preview, item);
  preview.modalVisible = true;
  preview.modalPurpose = 'confirmation';
  preview.modalTarget = 'delete';
  preview.modalText = 'Вы действительно хотите удалить данную рассылку?';
  preview.closePreviewAfterModal = true;
}

const redactFromTable = (item)=>{
  setRedactFromId(item.dispatch_id, dispatches, redactDispatch);
  appStore.activeComponent = 'modifydispatch';
  preview.$reset();
}

const  templateFromTable = (item)=>{
  openDispatchPreview(preview, item);
  preview.modalVisible = true;
  preview.modalPurpose = 'confirmation';
  preview.modalTarget = 'template';
  preview.modalText = 'Вы хотите использовать данную рассылку как шаблон для новой?';
  preview.closePreviewAfterModal = true;
}

const closePreviewModal = ()=>{
  if(preview.$state.modalPurpose === 'confirmation'
      && ['delete', 'template'].includes(preview.$state.modalTarget)
      && preview.$state.closePreviewAfterModal
  )
  {
    preview.$reset();
    previewFilters.$reset();
    emits('refreshlist');
  }

  if (preview.$state.modalPurpose === 'success' && preview.$state.modalTarget === 'delete'){
    preview.$reset();
    previewFilters.$reset();
    emits('refreshlist');
  }
  else {
    preview.modalVisible = false;
  }
}

const previewModalConfirm = () =>{
  if(preview.$state.modalTarget === 'delete'){
    deleteDispatch(preview.$state.dispatch_id, preview);
    emits('refreshlist');
  }
  else if (preview.$state.modalTarget === 'template') {
    let dispatch_id = preview.$state.dispatch_id;
    let templateParams = {
      dispatch_id: dispatch_id,
      dispatches: dispatches,
      appStore: appStore,
      newDispatch: newDispatch,
      newDispatchFilter: newDispatchFilter,
      redactDispatch: redactDispatch,
      redactDispatchFilter: redactDispatchFilter,
      preview: preview,
      previewFilters: previewFilters
    }
    useDispatchAsTemplate(templateParams);
  }
}

const deleteIconVisible = (item)=>{
  return item.status_db_name !== 'sending';
}

const redactIconVisible = (item)=>{
  return !['sending', 'dispatched'].includes(item.status_db_name);
}

const templateIconVisible = (item)=>{
  return true;
}

</script>

<style>
.dispatch-preview-modal-modifier .vue-modal-body{
  padding: 24px !important;
}

.dispatch-preview-modal-modifier .vue-modalwindow-header{
  display: none !important;
}
</style>

<style scoped>
.maintable-body-info-methods {
  display: flex;
}

.body-info-methods-icon {
  display: flex;
}

.body-content-actions-item {
  margin-left: 8px;
}

.maintable-body-content-actions-wr {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 5px;
  border-radius: 3px;
  background-image: linear-gradient(to right, rgba(255,0,0,0), rgb(251, 251, 251, 100));
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  right: 0;
  bottom: 0;
  padding-left: 16px;
}

.maintable-body-content {
  position: relative;
}

.dispatch-maintable-pagination {
  display: flex;
  justify-content: center;
}

.maintable-header-item-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.dispatch-maintable-body-item-wr:hover {
  background-color: #EBF8F8 !important;
}

.dispatch-maintable-body-item-wr:nth-child(odd) {
  background-color: #FAFAFA;
}

.dispatch-maintable-body-item-wr:nth-child(even) {
  background-color: #F2F2F2;
}

.maintable-body-content-text {
  overflow: hidden;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  max-height: 50px;
}

.maintable-body-content-title {
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 4px;
}

.maintable-body-content-wr {
  display: flex;
  flex-direction: column;
}

.maintable-body-info-status {
  margin-bottom: 8px;
}

.maintable-body-info-datetime {
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 4px;
}

.maintable-body-actuality {
  width: 15%;
}

.maintable-body-content {
  width: 70%;
}

.maintable-body-info {
  width: 15%;
}

.dispatch-maintable-body-item-wr {
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  max-height: 100px;
}

.dispatch-maintable-body {
  display: flex;
  flex-direction: column;
  margin-bottom: 33px;
}

.maintable-header-actuality {
  width: 15%;
}

.maintable-header-text {
  width: 70%;
}

.maintable-header-info {
  width: 15%;
}

.dispatch-maintable-header {
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
}

.dispatch-maintable {
  width: 100%;
  display: flex;
  flex-direction: column;
}

</style>