<template>
  <modal-content-new
      modalsize="small"
      @close-modal="emits('closeAuthBannerModal')"
      :ignore-elements="['em-reject-auth-banner-wr']"
  >
    <div class="em-reject-auth-banner-wr" id="em-reject-auth-banner-wr">
      <div class="em-reject-auth-banner-title">
        Войдите под своими данными
      </div>
      <div class="em-reject-auth-banner-text">
        Если вы работаете с АРМа, убедитесь, что в считыватель вставлена ваша смарт-карта.<br>
        Если нет возможности использовать смарт-карту, пройдите авторизацию вручную.
      </div>

      <div class="em-reject-auth-banner-buttons">
        <button
            type="button"
            class="vue-btn vue-btn-warn-wobg auth-banner-buttons-cancel"
            @click.stop.prevent="emits('cancelOnBanner')"
        >
          Отменить
        </button>

        <button type="button"
                class="vue-btn vue-btn-normal-wobg auth-banner-buttons-confirm"
                @click.stop.prevent="emits('authOnBanner')"
        >
          Пройти авторизацию
        </button>
      </div>
    </div>

  </modal-content-new>

</template>

<script setup>
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";

// EMITS
const emits = defineEmits(["closeAuthBannerModal", "cancelOnBanner", "authOnBanner"]);

</script>

<style scoped>
.auth-banner-buttons-confirm {
  margin-left: 16px;
}

.em-reject-auth-banner-buttons {
  display: flex;
  justify-content: flex-end;
}

.em-reject-auth-banner-text {
  margin-bottom: 32px;
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
}

.em-reject-auth-banner-title {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
}

.em-reject-auth-banner-wr {
  padding-top: 24px;
  display: flex;
  flex-direction: column;
}

</style>