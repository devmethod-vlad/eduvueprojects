<template>
  <div
      class="vue-modal"
      :class="{'vue-modal-block': !modalContentFlex, 'vue-modal-flex': modalContentFlex}"
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

        <template v-if="props.headerText!==''">
          <div
              class="vue-modalwindow-header"
              :class="{'vue-modalwindow-header-border':props.headerText!==''}"
          >
            <div
                class="vue-modalwindow-header-text"
            >
              <template v-if="props.headerAlert">
                <span class="vue-modalwindow-header-text-icon">
                  <app-icon
                      name="warning-fill"
                      :size="17"
                      color="#F05C46"

                  />
                </span>
              </template>
              {{ props.headerText }}
            </div>

            <div
                class="vue-modalwindow-header-closeicon"

            >
              <app-icon
                  @click.prevent.stop="closeModal()"
                  name="close"
                  hover-color="#333333"
                  :size="14"
                  color="#CCCCCC"
              />

            </div>
          </div>
        </template>
        <template v-else>
          <div
              class="vue-modalwindow-closeicon-absolute"

          >
            <app-icon
                @click="closeModal()"
                name="close"
                :size="14"
                color="#CCCCCC"
                hover-color="#333333"
            />

          </div>
        </template>

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
import {computed, onBeforeUnmount, onMounted, reactive, ref} from "vue";

// EMIT
const emit = defineEmits(['closeModal']);


// PROPS
const props = defineProps({
  headerText:
      {
        type: String,
        default: ''
      },

  headerAlert:
      {
        type: Boolean,
        default: false
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
const modalContentFlex = ref(false);

const measures = reactive({
  small: false,
  middle: false,
  large: false,
  responsive: false,

})


// METHODS
const resizeObserver = new ResizeObserver(() => {
  changeClassOnResize();
})

const changeClassOnResize = () => {
  // console.log("changeClassOnResize");
  let windowHeigth = window.innerHeight;
  // console.log("changeClassOnResize windowHeigth: ", windowHeigth);
  let modalHeight = vuemodalcontent.value.offsetHeight;
  // console.log("changeClassOnResize modalHeight: ", modalHeight);

  modalContentFlex.value = Number(modalHeight) < Number(windowHeigth);
}


let closeModal = () =>{
  emit('closeModal');
}

const multilistener = (event) => {

  // console.log("multilistener event.target: ", event.target);
  // console.log("multilistener vuemodalcontent.value: ", vuemodalcontent.value);
  if (!vuemodalcontent.value) {
    // console.log("multilistener !vuemodalcontent.value");
    return
  }

  if (event.target !== vuemodalcontent.value && event.composedPath().includes(vuemodalcontent.value)) {
    return
  }

  if(props.ignoreElements.length !==0){

    // console.log("multilistener props.ignoreElements.length !==0");
    let existElArray = [];

    for (let elItem of props.ignoreElements){
      let item = document.getElementById(elItem);
      if (item){
        existElArray.push(item);
      }
    }

    if(existElArray.length !== 0){
      for (let eventItem of existElArray){
        if(event.target !== eventItem && event.composedPath().includes(eventItem)){
          // console.log("multilistener event.target !== eventItem && event.composedPath().includes(eventItem)");
          return;
        }
      }
    }
    else {
      // console.log("multilistener existElArray.length === 0");
      return
    }
    emit('closeModal');
  }
  if(props.actionelement !==''){
    // console.log("multilistener props.actionelement !==''");
    let actionElement = document.getElementById(props.actionelement);
    if (actionElement){
      if(event.target !== actionElement && event.composedPath().includes(actionElement)){
        // console.log("multilistener event.target !== actionElement && event.composedPath().includes(actionElement)");
        return;
      }
    }
    emit('closeModal');
  }
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

  window.addEventListener('resize', changeClassOnResize);

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

  // window.addEventListener('click', multilistener);
  window.addEventListener('pointerdown', multilistener);

  changeClassOnResize();

  if(vuemodalcontent.value){
    resizeObserver.observe(vuemodalcontent.value);
  }

});

onBeforeUnmount(() => {
  // window.removeEventListener('click', multilistener)
  window.removeEventListener('pointerdown', multilistener)
  window.removeEventListener('resize', changeClassOnResize);
  if(vuemodalcontent.value){
    resizeObserver.unobserve(vuemodalcontent.value);
  }
});


</script>

<style scoped>
.vue-modalwindow-closeicon-absolute {
  cursor: pointer;
  z-index: 999;
  position: absolute;
  top:24px;
  right: 24px;
}

.vue-modalwindow-closeicon {
  font-size: 1.3em;
}

.vue-modal{
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

.vue-modal-block {
  display: block;
}

.vue-modal-flex {
  display: flex;
  justify-content: center;
  align-items: center;

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
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
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
  width: 95%;
}

.vue-modal-dialog-middle{
  position: relative;
  width: 95%;
}

.vue-modal-dialog-large{
  position: relative;
  width: 95%;
}

.vue-modal-dialog-responsive {
  width: 95%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (min-width: 320px) {
  .vue-modal-dialog-small{
    width: 95%;
  }
  .vue-modal-dialog-middle {
    width: 95%;
  }
  .vue-modal-dialog-large {
    width: 95%;
  }
}

@media (min-width: 576px) {
  .vue-modal-dialog-responsive {
    width: 95%;
  }
  .vue-modal-dialog-small{
    width: 75%;
  }
  .vue-modal-dialog-middle {
    width: 90%;
  }
  .vue-modal-dialog-large {
    width: 90%;
  }
}

@media (min-width: 768px) {
  .vue-modal-dialog-responsive {
    width: auto;
  }
  .vue-modal-dialog-small{
    width: 60%;
  }
  .vue-modal-dialog-middle {
    width: 65%;
  }
  .vue-modal-dialog-large {
    width: 90%;
  }
}

@media (min-width: 992px) {
  .vue-modal-dialog-responsive {
    width: auto;
  }
  .vue-modal-dialog-small{
    width: 45%;
  }
  .vue-modal-dialog-middle {
    width: 60%;
  }
  .vue-modal-dialog-large {
    width: 90%;
  }

}

@media (min-width: 1200px) {
  .vue-modal-dialog-responsive {
    width: auto;
  }
  .vue-modal-dialog-small{
    width: 40%;
  }
  .vue-modal-dialog-middle {
    width: 55%;
  }
  .vue-modal-dialog-large {
    width: 85%;
  }
}

@media (min-width: 1400px) {
  .vue-modal-dialog-responsive {
    width: auto;
  }

  .vue-modal-dialog-small{
    width: 33%;
  }
  .vue-modal-dialog-middle {
    width: 45%;
  }

  .vue-modal-dialog-large {
    width: 85%;
  }

}

@media (min-width: 1600px) {

  .vue-modal-dialog-small{
    width: 30%;
  }
  .vue-modal-dialog-middle {
    width: 40%;
  }

  .vue-modal-dialog-large {
    width: 85%;
  }

}

</style>