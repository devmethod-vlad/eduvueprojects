<template>
  <modal-content-new
      modalsize="small"
      @close-modal="emits('closeDispatchModal')"
      :ignore-elements="['new-dispatch-modal']"
  >
    <div id="new-dispatch-modal">
      <template v-if="newDispatch.$state.modalLoading">
        <div class="new-dispatch-modal-loading-wr">
          <content-loader/>
        </div>
      </template>
      <template v-else>

        <template v-if="newDispatch.$state.modalPurpose === 'confirmation'">
          <div class="new-dispatch-modal-confirmation">
            <div class="modal-confirmation-text">
              {{ newDispatch.$state.modalText }}
            </div>
            <div class="modal-confirmation-buttons">
              <button
                  @click.stop.prevent="emits('confirmNo')"
                  class="vue-btn vue-btn-warn-wobg modal-confirmation-button-no"
                  type="button"
              >
                <template v-if="newDispatch.modalTarget === 'test'">
                  Не отправлять
                </template>
                <template v-else>
                  Нет
                </template>
              </button>
              <button
                  @click.stop.prevent="emits('confirmYes')"
                  class="vue-btn vue-btn-normal modal-confirmation-button-yes"
                  type="button"
              >
                <template v-if="newDispatch.modalTarget === 'test'">
                  Отправить
                </template>
                <template v-else>
                  Да
                </template>
              </button>
            </div>
          </div>
        </template>

        <template v-if="newDispatch.$state.modalPurpose === 'success'">
          <div class="new-dispatch-modal-success">

            <div class="modal-success-icon">
              <app-icon
                  name="check-circle-big"
                  :size="48"
                  color="#79B821"
              />

            </div>

            <div class="modal-success-text">
              {{ newDispatch.$state.modalText }}
            </div>
          </div>
        </template>

        <template v-if="newDispatch.$state.modalPurpose === 'fail'">
          <div class="new-dispatch-modal-fail">

            <div class="modal-fail-icon">
              <app-icon
                  name="warning"
                  :size="48"
                  color="#F05C46"
              />
            </div>

            <div class="modal-fail-text">
              {{ newDispatch.$state.modalText }}
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

// EMITS
const emits = defineEmits(['closeDispatchModal', 'confirmYes', 'confirmNo'])


// STORE
const newDispatch = useNewDispatchStore();


</script>

<style scoped>
.modal-fail-text {
  text-align: center;
  margin-bottom: 38px;
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
  margin-bottom: 38px;
}
</style>