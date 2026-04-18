<template>
  <div class="edu-incident-card" id="edu-incident-card">
    <div class="incident-card-name">
      {{ appStore.$state.targetIncident.incident }}
    </div>
    <div class="incident-card-product">
      {{ appStore.$state.targetIncident.incident_ke }}
    </div>

    <div class="incident-card-tag-and-date">
      <div class="incident-card-tag">
        <template v-if="appStore.$state.targetIncident.incident_type === 'problem'">
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
      <div class="incident-card-date">
        {{ appStore.$state.targetIncident.open_time }}
      </div>
    </div>

    <div class="incident-card-sdcount">
      Количество обращений: {{ appStore.$state.targetIncident.cnt_sd }}
    </div>

    <div class="incident-card-description">
      {{ appStore.$state.targetIncident.action }}
    </div>

    <template v-if="appStore.$state.targetIncident.incident_checked !=='checked'">

      <div class="incident-card-divider">

      </div>

      <div class="incident-card-action-wr">
        <div class="incident-card-action-text">
          <template v-if="appStore.$state.targetIncident.incident_type === 'problem'">
            Вы столкнулись с этой проблемой?
          </template>
          <template v-else>
            Вы хотите поддержать это предложение по доработке?
          </template>
        </div>

        <div class="incident-card-action-buttons">
          <button
              type="button"
              @click.stop.prevent="emits('closeDescriptionModal')"
              class="vue-btn vue-btn-warn-wobg"
          >
            Нет
          </button>
          <button
              type="button"
              @click.stop.prevent="emits('openSubmitModal')"
              class="vue-btn vue-btn-normal incident-card-yes-button"
          >
            Да
          </button>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
import TagComponent from "@/common/ui/TagComponent/TagComponent.vue";
import {useAppStore} from "@/massincidents/store/app";

// EMITS
const emits = defineEmits(['closeDescriptionModal', 'openSubmitModal']);

// STORE
const appStore = useAppStore();

</script>

<style scoped>
.incident-card-action-buttons .vue-btn-warn-wobg:hover {
  background-color:  #fde4df !important;
}

.incident-card-yes-button {
  margin-left: 20px;
}

.incident-card-action-buttons button {
  min-width: 140px;
}
.incident-card-action-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.incident-card-action-text {
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.incident-card-action-wr {
  display: flex;
  flex-direction: column;
}

.incident-card-divider {
  border-bottom: 1px #E6E6E6 solid;
  margin-bottom: 20px;
}

.incident-card-description {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 15px;

}

.incident-card-sdcount {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 25px;
}

.incident-card-date {
  margin-left: 15px;
}

.incident-card-tag-and-date {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}

.incident-card-product {
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 15px;
}

.incident-card-name {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
}

.edu-incident-card {
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
}
</style>