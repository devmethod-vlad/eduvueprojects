<template>
  <ModalContentNew
      @close-modal="emits('closeAuthErrorModal')"
      header-text="Ошибка авторизации"
      modalsize="small"
      :header-alert="true"
      :ignore-elements="['auth-form-error-wr']"
  >
    <div class="auth-form-error-modal-wr" id="auth-form-error-wr">
      <div class="auth-form-error-modal-disc">
        Проверьте правильность введенных данных
      </div>

      <div class="auth-form-error-modal-items">

        <div class="auth-form-error-modal-item-wr">
          <div class="auth-form-error-modal-item-number">
            1.
          </div>
          <div class="auth-form-error-modal-item-content">
            <div class="form-error-modal-item-content-top">
              Логин не может состоять только из цифр
            </div>
            <div
                class="form-error-modal-item-content-bottom error-modal-bottom-spacebetween"
            >
              <div class="modal-bottom-spacebetween-item">
                <div class="modal-bottom-spacebetween-item-icon">
                  <app-icon
                      name="close-fill"
                      :size="15"
                      color="#F05C46"
                  />
                </div>
                <div
                    class="modal-bottom-spacebetween-item-text"
                >
                  1234
                </div>
              </div>

              <div class="modal-bottom-spacebetween-item">
                <div class="modal-bottom-spacebetween-item-icon">
                  <app-icon
                      name="check-fill"
                      :size="15"
                      color="#79B821"
                  />
                </div>
                <div class="modal-bottom-spacebetween-item-text">
                  Mpetrov1
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="auth-form-error-modal-item-wr">
          <div class="auth-form-error-modal-item-number">
            2.
          </div>
          <div class="auth-form-error-modal-item-content">
            <div class="form-error-modal-item-content-top">
              Логин не может содержать email
            </div>
            <div
                class="form-error-modal-item-content-bottom error-modal-bottom-spacebetween"
            >
              <div class="modal-bottom-spacebetween-item">
                <div class="modal-bottom-spacebetween-item-icon">
                  <app-icon
                      name="close-fill"
                      :size="15"
                      color="#F05C46"
                  />
                </div>
                <div
                    class="modal-bottom-spacebetween-item-text"
                >
                  makspetrov@mail.ru
                </div>
              </div>

              <div class="modal-bottom-spacebetween-item">
                <div class="modal-bottom-spacebetween-item-icon">
                  <app-icon
                      name="check-fill"
                      :size="15"
                      color="#79B821"
                  />
                </div>
                <div class="modal-bottom-spacebetween-item-text">
                  Mpetrov
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="auth-form-error-modal-item-wr">
          <div class="auth-form-error-modal-item-number">
            3.
          </div>

          <div class="auth-form-error-modal-item-content">
            <div class="form-error-modal-item-content-top">
              Логин не может содержать русские буквы
            </div>
            <div
                class="form-error-modal-item-content-bottom error-modal-bottom-spacebetween"
            >
              <div class="modal-bottom-spacebetween-item">
                <div class="modal-bottom-spacebetween-item-icon">
                  <app-icon
                      name="close-fill"
                      :size="15"
                      color="#F05C46"
                  />
                </div>
                <div
                    class="modal-bottom-spacebetween-item-text"
                >
                  Петров М. А.
                </div>
              </div>

              <div class="modal-bottom-spacebetween-item">
                <div class="modal-bottom-spacebetween-item-icon">
                  <app-icon
                      name="check-fill"
                      :size="15"
                      color="#79B821"
                  />
                </div>
                <div class="modal-bottom-spacebetween-item-text">
                  Mpetrov
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="auth-form-error-modal-item-wr">
          <div class="auth-form-error-modal-item-number">
            4.
          </div>

          <div class="auth-form-error-modal-item-content">
            <div class="form-error-modal-item-content-top">
              Соблюдайте регистр символов:
            </div>
            <div
                class="form-error-modal-item-content-bottom"
            >
              MPetrov, Mpetrov и mpetrov — разные логины
            </div>
          </div>


        </div>

        <div class="auth-form-error-modal-item-wr">
          <div class="auth-form-error-modal-item-number">
            5.
          </div>
          <div class="auth-form-error-modal-item-content">
            <div class="form-error-modal-item-content-top">
              Не путайте схожие буквы:
            </div>
            <div
                class="form-error-modal-item-content-bottom"
            >
                <p>·&nbsp;строчная “I” (L) и заглавная “I” (i)</p>
                <p>·&nbsp;“с” русская и “с” английская</p>
                <p>·&nbsp;“O” буква и “0” цифра</p>
            </div>
          </div>

        </div>

        <div class="auth-form-error-modal-item-wr">
          <div class="auth-form-error-modal-item-number">
            6.
          </div>
          <div class="auth-form-error-modal-item-content">
            <div class="form-error-modal-item-content-top">
              Убедитесь в правильности ввода СНИЛС:
            </div>
            <div
                class="form-error-modal-item-content-bottom"
            >
              <p>·&nbsp;вводите последние 4 цифры вашего СНИЛС</p>
              <p>·&nbsp;не используйте пин-код от смарт-карты</p>
              <p>·&nbsp;не вводите любые другие цифры и коды</p>
            </div>
          </div>
        </div>


      </div>

      <div class="auth-form-error-modal-bottom-text">
        За помощью можно обратиться к ответственному за ЕМИАС в вашей МО
      </div>

      <div class="auth-form-error-modal-button">
        <button
            class="vue-btn vue-btn-normal auth-form-error-modal-button-repeat"
            @click="emits('closeAuthErrorModal')"
        >
          Повторить авторизацию
        </button>
      </div>

    </div>

  </ModalContentNew>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";

const emits = defineEmits(['closeAuthErrorModal']);

</script>

<style>
.auth-form-error-modal-item-content p{
  margin-bottom: 0 !important;
  font-family: OpenSans !important;
  color: #333333 !important;
  font-size: 15px !important;
}

.standalone-login-form .vue-modal-dialog-responsive {
  position: unset !important;
  top: unset !important;
  left: unset !important;
  transform: unset !important;
}

.standalone-login-form .vue-modalwindow-header-text-icon {
  padding-top: 2px !important;
  margin-right: 8px !important;
}

.standalone-login-form .vue-modalwindow-header {
  padding-bottom: 8px !important;
}

.standalone-login-form .vue-modalwindow-header-text{
  font-size: 20px !important;
  font-weight: 600 !important;
  line-height: 24px !important;
  color: #333333 !important;
  display: flex !important;
  justify-content: flex-start !important;
}

@media (min-width: 576px) {
  .standalone-login-form .vue-modal-dialog-responsive {
    width: 70% !important;
  }
}

@media (min-width: 768px) {
  .standalone-login-form .vue-modal-dialog-responsive {
    width: auto !important;
  }
}


</style>

<style scoped>
.auth-form-error-modal-bottom-text {
  margin-top: 8px;
  margin-bottom: 32px;
}

.auth-form-error-modal-disc {
  margin-bottom: 8px;
}

.auth-form-error-modal-button-repeat {
  font-size: 16px !important;
  font-weight: 600 !important;
  line-height: 24px !important;
}

.auth-form-error-modal-button {
  display: flex;
  justify-content: flex-end;
}

.modal-bottom-spacebetween-item-icon {
  display: flex;
  align-items: center;
  padding-top: 2px;
  padding-right: 8px;
}

.modal-bottom-spacebetween-item {
  flex: 1;
  display: flex;
  align-items: center;
}

.auth-form-error-modal-item-content p{
  margin-top: 0;
  margin-bottom: 0;
}

.error-modal-bottom-spacebetween {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.auth-form-error-modal-item-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.auth-form-error-modal-item-number {
  padding-right: 4px;
}

.auth-form-error-modal-item-wr {
  display: flex;
}

.auth-form-error-modal-items {
  display: flex;
  flex-direction: column;
}

.auth-form-error-modal-wr {
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #333333;
}

@media (min-width: 450px) {
  .error-modal-bottom-spacebetween {
    flex-direction: row;
  }
}

</style>