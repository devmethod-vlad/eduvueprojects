<template>
  <div
      class="vue-side-modal"
      tabindex="-1"
      role="dialog"
      ref="vuesidemodal"
  >
    <div
        class="vue-side-modal-dialog"
        role="document"
    >
      <div
          class="vue-side-modal-content"
          ref="vuesidemodalcontent"
      >
        <div
            class="vue-side-modal-body"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";

// EMITS
const emits = defineEmits(['closeModal']);

// PROPS
const props = defineProps({
  actionelement:
      {
        type: String,
        default: ''
      },

  ignoreElements:
      {
        type: Array,
        default(){
          return [];
        }
      },

  ignoreElementsClass:
      {
        type: Array,
        default(){
          return [];
        }
      }
});

// DATA
const vuesidemodal = ref(null);
const vuesidemodalcontent = ref(null);

// METHODS
const multilistener = (event) => {
  if (!vuesidemodalcontent.value) {
    return
  }

  if (event.target !== vuesidemodalcontent.value && event.composedPath().includes(vuesidemodalcontent.value)) {
    return
  }

  if(props.ignoreElements.length !==0 || props.ignoreElementsClass.length !==0){

    let existElArray = [];

    for (let elItem of props.ignoreElements){
      let item = document.getElementById(elItem);
      if (item){
        existElArray.push(item);
      }
    }

    for (let elItem of props.ignoreElementsClass){
      let item = document.getElementsByClassName(elItem);
      if (item.length > 0){
        existElArray.push(item[0]);
      }
    }

    if(existElArray.length !== 0){
      for (let eventItem of existElArray){
        if(event.target !== eventItem && event.composedPath().includes(eventItem)){
          return;
        }
      }
    }
    else {
      return
    }
    emits('closeModal');
  }
  if(props.actionelement !==''){

    let actionElement = document.getElementById(props.actionelement);
    if (actionElement){
      if(event.target !== actionElement && event.composedPath().includes(actionElement)){
        return;
      }
    }
    emits('closeModal');
  }
}

// LIFECYCLE
onMounted(()=>{
  window.addEventListener('pointerdown', multilistener);

});

onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', multilistener)
})


</script>

<style scoped>
.vue-side-modal{
  display: flex;
  justify-content: flex-end;
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
  background-color: rgba(51, 51, 51, 0.35);
}
.vue-side-modal-dialog {
  pointer-events: none;
}
.vue-side-modal-content {
  position: relative;
  height: auto;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  outline: 0;
}
.vue-side-modal-body {
  position: relative;
  flex: 1 1 auto;
}
.vue-side-modal-header{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}
</style>