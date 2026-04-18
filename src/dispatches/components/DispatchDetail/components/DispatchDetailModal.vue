<template>
  <modal-content-new
      modalsize="small"
      @close-modal="emits('closeDispatchModal')"
      :ignore-elements="['dispatch-detail-modal']"
  >
    <div id="dispatch-detail-modal">
      <template
          v-if="newDispatch.$state.modalLoading || redactDispatch.$state.modalLoading"

      >
        <div class="dispatch-detail-modal-loading-wr">
          <content-loader/>
        </div>
      </template>
      <template v-else>

        <template
            v-if="newDispatch.$state.modalPurpose === 'confirmation' || redactDispatch.$state.modalPurpose === 'confirmation'"
        >
          <div class="dispatch-detail-modal-confirmation">
              <div class="dispatch-detail-modal-close-container">

              </div>

              <div class="modal-confirmation-text">
                <template v-if="appStore.$state.activeComponent === 'newdispatch'">
                  {{ newDispatch.$state.modalText }}
                </template>

                <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
                  {{ redactDispatch.$state.modalText }}
                </template>
              </div>

            <div class="modal-confirmation-buttons">
              <button
                  @click.stop.prevent="emits('confirmNo')"
                  class="vue-btn vue-btn-warn-wobg modal-confirmation-button-no"
                  type="button"
              >
                  Нет
              </button>
              <button
                  @click.stop.prevent="emits('confirmYes')"
                  class="vue-btn vue-btn-normal modal-confirmation-button-yes"
                  type="button"
              >
                  Да
              </button>
            </div>
          </div>
        </template>

        <template
            v-if="newDispatch.$state.modalPurpose === 'success' || redactDispatch.$state.modalPurpose === 'success'"
        >
          <div class="dispatch-detail-modal-success">

            <div class="dispatch-detail-modal-close-container">

            </div>

            <div class="modal-success-icon">
              <app-icon
                  name="check-circle-big"
                  :size="48"
                  color="#79B821"
              />

            </div>

            <div class="modal-success-text">
              <template v-if="appStore.$state.activeComponent === 'newdispatch'">
                {{ newDispatch.$state.modalText }}
              </template>

              <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
                {{ redactDispatch.$state.modalText }}
              </template>
            </div>
          </div>
        </template>

        <template v-if="newDispatch.$state.modalPurpose === 'fail' || redactDispatch.$state.modalPurpose === 'fail'">
          <div class="dispatch-detail-modal-fail">

            <div class="dispatch-detail-modal-close-container">

            </div>

            <div class="modal-fail-icon">
              <app-icon
                  name="warning"
                  :size="48"
                  color="#F05C46"
              />
            </div>

            <div class="modal-fail-text">
              <template v-if="appStore.$state.activeComponent === 'newdispatch'">
                {{ newDispatch.$state.modalText }}
              </template>

              <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
                {{ redactDispatch.$state.modalText }}
              </template>
            </div>
          </div>
        </template>

      </template>
    </div>
  </modal-content-new>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import ContentLoader from "@/questions/components/ContentLoader/ContentLoader.vue";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";
import {useAppStore} from "@/dispatches/store/app";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";

// EMITS
const emits = defineEmits(['closeDispatchModal', 'confirmYes', 'confirmNo']);


// STORE
const newDispatch = useNewDispatchStore();
const redactDispatch = useRedactDispatchStore();
const appStore = useAppStore();


</script>


<style scoped>

.dispatch-detail-modal-success {
  position: relative;
}

.dispatch-detail-modal-fail {
  position: relative;
}

.dispatch-detail-modal-confirmation {
  position: relative;
}

.dispatch-detail-modal-close-container {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 5px;
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