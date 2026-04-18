<template>
  <div
      class="modal"
      tabindex="-1"
      role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header vue-modalwindow-header">
          <div class="vue-modalwindow-header-text">
          </div>
          <div
              @:click="emits('closemodal')"
              class="vue-modalwindow-header-closeicon"
          >
            <app-icon name="close"
                      :size="16"
            />
          </div>
        </div>
        <div class="modal-body">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

// EMITS
const emits = defineEmits(['closemodal'])

</script>

<style scoped>
.modal {
  display: block;
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(26, 30, 33, 0.4);
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}
.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 0.3rem;
  outline: 0;
}
.modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}
.vue-modalwindow-header{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.vue-modalwindow-header-text{
  flex: 5;
}
.vue-modalwindow-header-closeicon {
  color: #414141;
  display: flex;
  cursor: pointer;
  justify-content: flex-end;
  flex: 1;
}
.vue-modalwindow-header-closeicon:hover {
  color: black;
}
@media (min-width: 992px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
}


</style>