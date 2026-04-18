<template>
  <modal-content-new
      modalsize="small"
      @close-modal="emits('closeRejectBanner')"
      :ignore-elements="['em-reject-banner-wr']"
  >
    <div class="em-reject-banner-wr" id="em-reject-banner-wr">
      <div class="em-reject-banner-title">
        Войдите под своими данными
      </div>
      <div class="em-reject-banner-text">
        Если вы работаете с АРМа, убедитесь, что в считыватель вставлена ваша смарт-карта.<br>
        Если нет возможности использовать смарт-карту, пройдите авторизацию вручную.
      </div>

      <div class="em-reject-banner-buttons">
        <button
            type="button"
            class="vue-btn vue-btn-warn-wobg banner-buttons-cancel"
            @click.stop.prevent="emits('cancelOnRejectBanner')"
        >
          Отменить
        </button>

        <button type="button"
                class="vue-btn vue-btn-normal-wobg banner-buttons-confirm"
                @click.stop.prevent="emits('submitOnRejectBanner')"
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
const emits = defineEmits(["closeRejectBanner", "cancelOnRejectBanner", "submitOnRejectBanner"]);

</script>

<style scoped>
.banner-buttons-confirm {
  margin-left: 16px;
}

.em-reject-banner-buttons {
  display: flex;
  justify-content: flex-end;
}

.em-reject-banner-text {
  margin-bottom: 32px;
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
}

.em-reject-banner-title {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
}

.em-reject-banner-wr {
  padding-top: 24px;
  display: flex;
  flex-direction: column;
}

</style>