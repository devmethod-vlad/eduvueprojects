<template>
    <ModalContentNew
        @close-modal="closeDelModal()"
        header-text="Удаление проекта"
        modalsize="responsive"
        :ignore-elements="['item-actions-delete'+props.projectId.toString()]"
    >
      <div v-if="isLoading" class="modal-deleteproject-loading">
        <img :src="app_config.apiUrl+app_config.loadingSrc()" alt="Загрузка..." />
      </div>

      <template v-else>

        <div
            v-if="errorText !== ''"
            class="modal-deleteproject-errors"
        >
          {{ errorText }}
        </div>

        <div v-else class="modal-deleteproject-wr">
          <div class="modal-deleteproject-text">
            Вы действительно хотите удалить проект? Помните, что это повлечет за собой удаление всех, связанных с проектом, активностей.
          </div>
          <div class="modal-deleteproject-buttons">
            <button @click="delProject()" class="vue-btn vue-btn-normal deleteproject-button">
              Удалить
            </button>
            <button
                @click="closeDelModal()"
                style="margin-left: 20px;"
                class="vue-btn vue-btn-warn deleteproject-button"
            >
              Отменить
            </button>
          </div>
        </div>

      </template>


    </ModalContentNew>
</template>

<script setup>
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import {deleteProject} from "@/projects/ProjectsList/services/deleteproject";
import {ref} from "vue";
import {app_config} from "@/projects/config/setconfig";

// EMITS
const emits = defineEmits(['closedelmodal', 'delsuccess']);

// PROPS
const props = defineProps({
  projectId: {
    type: Number,
    default: 0
  }
});

// DATA
const isLoading = ref(false);
const errorText = ref('');


// METHODS

const closeDelModal = ()=>{
  emits('closedelmodal');
};

const delProject = async()=>{
  let delAnswer = await deleteProject(props.projectId);
  if (delAnswer['status'] === 'ok'){
    emits('delsuccess');
  }
  else {
    errorText.value = "При попытке удалить проект возникла ошибка!";
  }
}

</script>

<style scoped>

.modal-deleteproject-errors {
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: bold;
  text-align: center;
  font-size: 1.3em;
  color: #dc3545;
}

.modal-deleteproject-loading {
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.deleteproject-button {
  min-width: 200px;
}

.modal-deleteproject-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.modal-deleteproject-wr {
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
}
.modal-deleteproject-text {
  font-size: 1.4em;
  font-weight: bold;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  color: #000000;
}

</style>