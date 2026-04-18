<template>
  <modal-content-new
      modalsize="small"
      @close-modal="emits('closePreviewModal')"
      :ignore-elements="['dispatch-preview-modal']"
  >
    <div
        id="dispatch-preview-modal"
    >

      <template
          v-if="preview.$state.modalLoading"

      >
        <div class="dispatch-preview-modal-loading-wr">
          <content-loader/>
        </div>
      </template>

      <template v-else>
          <template
              v-if="preview.$state.modalPurpose === 'confirmation'"
          >
            <div class="dispatch-preview-modal-confirmation">
              <div class="dispatch-preview-modal-close-container">
                <app-icon
                    @click="emits('closePreviewModal')"
                    name="close"
                    :size="14"
                />
              </div>
              <div class="modal-confirmation-text">
                  {{ preview.$state.modalText }}
              </div>

              <div class="modal-confirmation-buttons">
                <button
                    @click.stop.prevent="emits('confirmNo')"
                    class="vue-btn vue-btn-warn-wobg modal-confirmation-button-no"
                    type="button"
                >
                  <template v-if="preview.modalTarget === 'delete'">
                    Отменить
                  </template>
                  <template v-if="preview.modalTarget === 'template'">
                    Нет
                  </template>
                </button>
                <button
                    @click.stop.prevent="emits('confirmYes')"
                    class="vue-btn vue-btn-normal modal-confirmation-button-yes"
                    type="button"
                >
                  <template v-if="preview.modalTarget === 'delete'">
                    Удалить
                  </template>
                  <template v-else>
                    Использовать
                  </template>
                </button>
              </div>
            </div>
          </template>

          <template
              v-if="preview.$state.modalPurpose === 'success'"
          >
            <div class="dispatch-preview-modal-success">

              <div class="dispatch-preview-modal-close-container">
                <app-icon
                    @click="emits('closePreviewModal')"
                    name="close"
                    :size="14"
                />
              </div>

              <div class="modal-success-icon">
                <app-icon
                    name="check-circle-big"
                    :size="48"
                    color="#79B821"
                />

              </div>

              <div class="modal-success-text">
                  {{ preview.$state.modalText }}
              </div>
            </div>
          </template>

          <template v-if="preview.$state.modalPurpose === 'fail'">
            <div class="dispatch-preview-modal-fail">

              <div class="dispatch-preview-modal-close-container">
                <app-icon
                    @click="emits('closePreviewModal')"
                    name="close"
                    :size="14"
                />
              </div>

              <div class="modal-fail-icon">
                <app-icon
                    name="warning"
                    :size="48"
                    color="#F05C46"
                />
              </div>

              <div class="modal-fail-text">
                  {{ preview.$state.modalText }}
              </div>
            </div>
          </template>

      </template>


    </div>

  </modal-content-new>
</template>

<script setup>
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import ContentLoader from "@/questions/components/ContentLoader/ContentLoader.vue";
import {usePreviewStore} from "@/dispatches/store/preview";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

// EMITS
const emits = defineEmits(['closePreviewModal', 'confirmYes', 'confirmNo']);


// STORE
const preview = usePreviewStore();


</script>

<style scoped>
.dispatch-preview-modal-close-container {
  position: absolute;
  right: 0;
  top: 5px;
  cursor: pointer;
}

.dispatch-preview-modal-confirmation {
  position: relative;
}

.dispatch-preview-modal-success {
  position: relative;
}

.dispatch-preview-modal-fail {
  position: relative;
}

.modal-fail-text {
  text-align: center;
}

.modal-fail-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
}

.modal-confirmation-button-yes {
  margin-left: 16px;
}

.modal-confirmation-buttons button {
  min-width: 70px;
}

.modal-confirmation-buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.modal-confirmation-text {
  font-size: 20px;
  line-height: 28px;
  color: #333333;
  font-weight: 600;
  margin-bottom: 24px;
}

.modal-success-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.modal-success-text {
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
  text-align: center;
}
</style>