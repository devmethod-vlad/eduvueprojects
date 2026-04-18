<template>
  <ModalContentNew
      header-text="Доступность для пользователей"
      @close-modal="emits('closechangeactivity')"
      modalsize="responsive"
      :ignore-elements="['project-item-activity-'+props.projectId.toString()]"
  >
    <div
        v-if="isLoading"
        class="projectitem-change-activity-loading"
    >
      <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
    </div>


    <template v-else>
      <div v-if="errorText !=='' " class="projectitem-change-activity-error">
        {{ errorText }}
      </div>

      <div v-else class="projectitem-change-activity-wr">
        <div class="projectitem-change-activity-desc">
          Вы действительно хотите изменить доступность проекта для пользователей?
        </div>
        <div class="projectitem-change-activity-buttons">
          <button
              @click="changeProjectActivity()"
              type="button"
              class="vue-btn vue-btn-normal projectitem-activity-button"
          >
            Да
          </button>
          <button
              style="margin-left: 20px;"
              @click="emits('closechangeactivity')"
              type="button"
              class="vue-btn vue-btn-warn projectitem-activity-button"
          >
            Нет
          </button>
        </div>
      </div>
    </template>
  </ModalContentNew>

</template>

<script setup>
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import {changeActivity} from "@/projects/ProjectsList/services/changeActivity";
import {ref} from "vue";
import {app_config} from "@/projects/config/setconfig";

// EMITS
const emits = defineEmits(['changesuccess', 'closechangeactivity'])

// DATA
const isLoading = ref(false);
const errorText = ref('');

// PROPS
const props = defineProps({
  projectId: {
    type: Number,
    default: 0
  }
});

// METHODS
const changeProjectActivity = async ()=>{
  isLoading.value = true;
  let actAnswer = await changeActivity(props.projectId);

  if (actAnswer['status'] === 'ok'){
    emits('changesuccess')
  }
  else {
    errorText.value = "Возникли проблемы при попытке изменить статус доступности проекта!"
  }
  isLoading.value = false;
}
</script>

<style scoped>
.projectitem-activity-button {
  min-width: 100px;
}

.projectitem-change-activity-loading {
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.projectitem-change-activity-error {
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  font-size: 1.3em;
  font-weight: bold;
  color: #dc3545;
}

.projectitem-change-activity-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.projectitem-change-activity-desc {
  text-align: center;
  font-weight: bold;
  font-size: 1.3em;
  color: #000000;
  padding-bottom: 30px;
}

.projectitem-change-activity-wr {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

</style>