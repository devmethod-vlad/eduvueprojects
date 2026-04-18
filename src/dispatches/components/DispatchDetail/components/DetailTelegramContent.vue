<template>
  <div class="telegram-setcontent-message">

    <div class="telegram-setcontent-message-lable">
      Текст сообщения
    </div>

    <div class="telegram-setcontent-message-badges">
      <div class="setcontent-badge-item">
        <badge-component
            badge-text="Ж"
            :show-mode="true"
            badge-color="#2699991A"
            active-badge-color="#2699991A"
            @clickonbadge="insertDispatchTag('bold')"
        />
      </div>

      <div class="setcontent-badge-item">
        <badge-component
            badge-text="<i>К</i>"
            :show-mode="true"
            badge-color="#2699991A"
            active-badge-color="#2699991A"
            @clickonbadge="insertDispatchTag('italic')"
        />
      </div>

      <div class="setcontent-badge-item">
        <badge-component
            badge-text="<u>Ч</u>"
            badge-color="#2699991A"
            active-badge-color="#2699991A"
            :show-mode="true"
            @clickonbadge="insertDispatchTag('underline')"
        />
      </div>

      <div class="setcontent-badge-item">
        <badge-component
            badge-text="<s>abc</s>"
            badge-color="#2699991A"
            active-badge-color="#2699991A"
            :show-mode="true"
            @clickonbadge="insertDispatchTag('cross')"
        />
      </div>

      <div class="setcontent-badge-item">
        <badge-component
            badge-text="ссылка"
            badge-color="#2699991A"
            active-badge-color="#2699991A"
            :show-mode="true"
            @clickonbadge="insertDispatchTag('link')"
        />
      </div>

    </div>

    <div class="telegram-setcontent-message-textarea">

      <template v-if="appStore.$state.activeComponent === 'newdispatch'">
                <textarea
                    @focus="onFocusTelMessage()"
                    placeholder="Введите текст"
                    class="vue-form-control"
                    rows="9"
                    @keydown.ctrl.b.exact="insertDispatchTag('bold')"
                    @keydown.ctrl.i.exact="insertDispatchTag('italic')"
                    @keydown.prevent.stop.ctrl.u.exact="insertDispatchTag('underline')"
                    @keydown.ctrl.shift.x.exact="insertDispatchTag('cross')"
                    @keydown.prevent.stop.ctrl.k.exact="insertDispatchTag('link')"
                    ref="newteltextarea"
                    v-model="reactNewDispatch.telegram_text.value"
                    :class="{'vue-input-error': newDispatch.$state.telMessageError}"
                />
      </template>

      <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
                <textarea
                    @focus="onFocusTelMessage()"
                    placeholder="Введите текст"
                    class="vue-form-control"
                    rows="9"
                    ref="redacteltextarea"
                    @keydown.ctrl.b.exact="insertDispatchTag('bold')"
                    @keydown.ctrl.i.exact="insertDispatchTag('italic')"
                    @keydown.prevent.stop.ctrl.u.exact="insertDispatchTag('underline')"
                    @keydown.ctrl.shift.x.exact="insertDispatchTag('cross')"
                    @keydown.prevent.stop.ctrl.k.exact="insertDispatchTag('link')"
                    v-model="reactRedactDispatch.telegram_text.value"
                    :class="{'vue-input-error': redactDispatch.$state.telMessageError}"
                />
      </template>

    </div>

    <template
        v-if="newDispatch.$state.telMessageError || redactDispatch.$state.telMessageError"
    >
      <div class="telegram-setcontent-error-wr error-margin-top">

        <template v-if="appStore.$state.activeComponent === 'newdispatch'">
          <error-panel
              :text="newDispatch.$state.telMessageInfoText"
          />
        </template>

        <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
          <error-panel
              :text="redactDispatch.$state.telMessageInfoText"
          />
        </template>

      </div>
    </template>

  </div>
</template>

<script setup>
import BadgeComponent from "@/common/ui/BadgeComponent/BadgeComponent.vue";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import {useAppStore} from "@/dispatches/store/app";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";
import {storeToRefs} from "pinia";
import {insertTag} from "@/dispatches/components/DispatchDetail/services/inserttags";
import {ref} from "vue";

// STORE
const newDispatch = useNewDispatchStore();
const redactDispatch = useRedactDispatchStore();
const appStore = useAppStore();

const reactNewDispatch = storeToRefs(useNewDispatchStore());
const reactRedactDispatch = storeToRefs(useRedactDispatchStore());

// DATA
const newteltextarea = ref(null);
const redacteltextarea = ref(null);


// METHODS
const onFocusTelMessage = ()=>{

  if (appStore.$state.activeComponent === 'newdispatch'){
    newDispatch.telMessageError = false;
    newDispatch.telMessageInfoText = '';
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    redactDispatch.telMessageError = false;
    redactDispatch.telMessageInfoText = '';
  }
}

const insertDispatchTag = (target)=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    insertTag(newteltextarea.value, target, newDispatch);
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    insertTag(redacteltextarea.value, target, redactDispatch);
  }
}

</script>

<style scoped>
.vue-form-control {
  width: 100%;
}

.error-margin-top {
  margin-top: 12px;
}

.telegram-setcontent-message-textarea {
  display: flex;
}

.telegram-setcontent-message-textarea textarea{
  border-color: #999999 !important;
}

.setcontent-badge-item {
  margin-right: 8px;
}


.telegram-setcontent-message-badges {
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
}

.telegram-setcontent-message-lable {
  font-weight: 600;
  margin-bottom: 12px;
}

.telegram-setcontent-message {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

</style>