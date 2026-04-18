<template>
  <div class="vue-modal" tabindex="-1"
       role="dialog"
  >
    <div class="vue-modal-dialog" role="document"
         :class="{'vue-modal-dialog-small': smallSizeStyle, 'vue-modal-dialog-middle': middleSizeStyle, 'vue-modal-dialog-large': largeSizeStyle}">
      <div class="vue-modal-content">
        <div class="vue-modalwindow-header">
          <div class="vue-modalwindow-header-text">
            {{ headerText }}
          </div>
          <div @click="closeModal()" class="vue-modalwindow-header-closeicon">
            <app-icon name="multiply"
                      :size="20"
            />
          </div>
        </div>
        <div class="vue-modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {ref} from "vue";

// EMITS
const emits = defineEmits(['closemodal']);

// PROPS
const props = defineProps({
  headerText: {
    type: String,
    default:''
  },
  modalSize:{
    type: String,
    default: 'middle'
  }
});

// DATA
const smallSizeStyle = ref(false);
const middleSizeStyle = ref(false);
const largeSizeStyle = ref(false);

// METHODS
const closeModal = ()=>{
  emits('closemodal', true);
  console.log("modal emit");
}

// COMPUTED
if(props.modalSize === 'small'){
  smallSizeStyle.value = true;
}
else if(props.modalSize === 'middle'){
  middleSizeStyle.value = true;
}
else if (props.modalSize === 'large'){
  largeSizeStyle.value = true;
}
else {
  middleSizeStyle.value = true;
}

</script>

<style scoped>
.vue-modal{
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
.vue-modal-dialog {
  position: relative;
  width: auto;
  margin: 1.75rem auto;
  pointer-events: none;
}
.vue-modal-content {
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
.vue-modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}
.vue-modalwindow-header{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}
.vue-modalwindow-header-text{
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  color: #1e8686;
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
  .vue-modal-dialog-middle {
    width: 50%;
  }
  .vue-modal-dialog-large {
    width: 80%;
  }
}


</style>