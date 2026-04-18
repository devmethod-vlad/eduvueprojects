<template>
  <div
      class="dispatch-header-wr"
      :class="{'em-disabled-style': activateDisableMain(dispatches)}"
  >
    <div class="dispach-header-main-title">
      Рассылки пользователям
    </div>
    <div class="dispach-header-add-wr">
      <div class="dispach-header-add-title">
        История рассылок
      </div>
      <div class="dispach-header-add-button">
        <button
            @click.stop.prevent = "appStore.activeComponent = 'newdispatch'"
            type="button"
            class="vue-btn vue-btn-normal"
        >
          <app-icon name="plus"
                    :size="12"
                    color="white"
          />

          &nbsp;&nbsp;Создать рассылку
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {useAppStore} from "@/dispatches/store/app";
import {activateDisableMain} from "@/dispatches/services/activatedisable";
import {useDispatchesStore} from "@/dispatches/store/dispatches";

// STORE
const appStore = useAppStore();
const dispatches = useDispatchesStore();

</script>

<style scoped>
.dispatch-header-wr {
  margin-bottom: 16px;
}

.dispach-header-add-button button{
  display: flex !important;
  align-items: center !important;
  font-family: OpenSans;
  font-size: 16px;
  font-weight: 600;
}

.dispach-header-main-title {
  margin-top: 24px;
  margin-bottom: 24px;
  text-align: center;
  font-size: 21px;
  font-weight: 600;
}

.dispach-header-add-wr {
  display: flex;
  flex-direction: row;
}

.dispach-header-add-title {
  font-size: 18px;
  font-weight: 600;
  width: 45%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.dispach-header-add-button {
  width: 55%;
  display: flex;
  justify-content: flex-end;
}

@media (min-width: 576px) {
  .dispach-header-add-title {
    font-size: 20px;
    width: 50%;
  }

  .dispach-header-add-button {
    width: 50%;

  }
}

</style>