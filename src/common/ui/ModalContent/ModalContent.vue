<template>
    <div
      class="vue-modal"
      tabindex="-1"
      role="dialog"
      ref="vuemodal"
    >
      <div
        class="vue-modal-dialog"
        role="document"
        :class="{'vue-modal-dialog-small': measures.small,
               'vue-modal-dialog-middle': measures.middle,
               'vue-modal-dialog-large': measures.large,
               'vue-modal-dialog-responsive': measures.responsive}"
      >
        <div
            class="vue-modal-content"
            ref="vuemodalcontent"
        >
          <div
            class="vue-modalwindow-header"
            :class="{'vue-modalwindow-header-border':props.headerText!==''}"
          >
            <div
              v-if="props.headerText!==''"
              class="vue-modalwindow-header-text"
            >
              {{ props.headerText }}
            </div>

            <div
              class="vue-modalwindow-header-closeicon"

            >
              <app-icon
                  @click="closeModal()"
                  name="close"
                  :size="14"
              />

            </div>
          </div>
          <div
            class="vue-modal-body"
            :style="bodyMinHeightStyle"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {useDetectOutsideClickMulti, useDetectOutsideClickMultiNew} from "@/directives/clickoutsidemulti";


// EMIT
const emit = defineEmits(['closeModal']);


// PROPS
const props = defineProps({
    headerText:
        {
            type: String,
            default: ''
        },

    modalsize:
        {
          type: String,
          default: ''
        },

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

    bodyMinHeight:
      {
        type: Number,
        default: 0
      }

});

// DATA

const vuemodal = ref(null);
const vuemodalcontent = ref(null);

const measures = reactive({
  small: false,
  middle: false,
  large: false,
  responsive: false,
  
})


// METHODS
let closeModal = () =>{
  emit('closeModal');
}

if(props.ignoreElements.length !==0){
  useDetectOutsideClickMultiNew(vuemodalcontent.value, props.ignoreElements, () => {
    closeModal();
  });
}
else {
  useDetectOutsideClickMulti(vuemodal, props.actionelement, () => {
    closeModal();
  });
}

// COMPUTED

const bodyMinHeightStyle = computed(()=>{
  if(props.bodyMinHeight !==0){
    return 'min-height: '+props.bodyMinHeight.toString()+'px;'
  }
  else {
    return '';
  }
})

// LIFECYCLE
onMounted(()=>{

  if (props.size !==''){
    if(props.modalsize.toLowerCase().trim() === 'small'){
      measures.small = true;
    }
    else if (props.modalsize.toLowerCase().trim() === 'middle'){
      measures.middle = true;
    }
    else if (props.modalsize.toLowerCase().trim() === 'large'){
      measures.large = true;
    }
    else if (props.modalsize.toLowerCase().trim() === 'responsive'){
      measures.responsive = true;
    }
    else {
      measures.middle = true;
    }
  }
})

</script>

<style scoped>
.vue-modalwindow-closeicon {
  font-size: 1.3em;
}

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
  background-color: rgba(51, 51, 51, 0.35);
}
.vue-modal-dialog {
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
  padding: 0.5rem 0.5rem;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}

.vue-modalwindow-header-border {
  border-bottom: 1px solid #dee2e6;
  padding: 1rem 1rem;
}

.vue-modalwindow-header-text{
  font-size: 1.4em;
  font-weight: 600;
  text-align: left;
  color: #000000;
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

.vue-modal-dialog-small{
  position: relative;
  width: 30%;
}

.vue-modal-dialog-middle{
  position: relative;
  width: 50%;
}

.vue-modal-dialog-large{
  position: relative;
  width: 80%;
}

.vue-modal-dialog-responsive {
  width: 95%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (min-width: 576px) {
  .vue-modal-dialog-responsive {
    width: 95%;
  }
}

@media (min-width: 768px) {
  .vue-modal-dialog-responsive {
    width: auto;
  }
}

@media (min-width: 992px) {
  .vue-modal-dialog-middle {
    width: 50%;
  }
  .vue-modal-dialog-large {
    width: 80%;
  }
  .vue-modal-dialog-responsive {
    width: auto;
  }
}

@media (min-width: 1200px) {
  .vue-modal-dialog-responsive {
    width: auto;
  }
}

@media (min-width: 1400px) {
  .vue-modal-dialog-responsive {
    width: auto;
  }
}

</style>