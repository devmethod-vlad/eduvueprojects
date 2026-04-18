<template>
  <template v-if="props.viewportWidth < 578">
    <ModalContentNew
        modalsize="small"
        @close-modal="emits('closedropdown');"
        :ignore-elements="['edu-dropdown-wr']"
    >
      <drop-down-content
          :item-list="props.itemList"
          :active-item-list="props.activeItemList"
          @update-active-list="(activeList)=>{emits('updateActiveList', activeList)}"
      />
    </ModalContentNew>
  </template>
  <template v-else>
    <div ref="dropdown" class="edu-table-dropdown">
      <drop-down-content
          :item-list="props.itemList"
          :active-item-list="props.activeItemList"
          @update-active-list="(activeList)=>{emits('updateActiveList', activeList)}"
      />
    </div>
  </template>

</template>

<script setup>
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import DropDownContent from "@/common/ui/DropDown/DropDownContent.vue";
import {onMounted, onUnmounted, ref} from "vue";

// EMITS
const emits = defineEmits(['closedropdown', 'updateActiveList']);

// PROPS
const props = defineProps({
  viewportWidth:
      {
        type: Number,
        default: 0,
        required: true
      },
  itemList:
      {
        type: Array,
        default(){
          return []
        },
        required: true
      },
  activeItemList:
      {
        type: Array,
        default(){
          return []
        },
        required: true
      },
});

// DATA
const dropdown = ref(null);

const listener = (event)=>{
  if (!dropdown.value) {
    return
  }
  if (event.target !== dropdown.value && event.composedPath().includes(dropdown.value)) {
    return
  }
  emits('closedropdown');
};

// LIFECYCLE
onMounted(()=>{
  window.addEventListener('click', listener);
});

onUnmounted(()=>{
  window.removeEventListener('click', listener)
});


</script>

<style scoped>
.edu-table-dropdown {
  border: 1px #CCCCCC solid;
  position: absolute;
  right: 35px;
  top: 72px;
  width: auto;
  min-width: 350px;
  height: auto;
  max-height: 500px;
  overflow: auto;
  background-color: white;
  z-index: 100;
}
</style>