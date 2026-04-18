<template>
  <template v-if="appStore.windowWidth < 578">
    <ModalContentNew
        modalsize="small"
        @close-modal="emits('closedropdown');"
        :ignore-elements="['incident-dropdown-wr']"
    >
      <kpi-drop-down-content />
    </ModalContentNew>
  </template>
  <template v-else>
    <div ref="kpidropdown" class="edu-incident-table-kpi-dropdown">
      <kpi-drop-down-content />
    </div>
  </template>

</template>

<script setup>
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import KpiDropDownContent from "@/massincidents/components/KpiDropDown/components/KpiDropDownContent.vue";
import {useAppStore} from "@/massincidents/store/app";
import {onMounted, onUnmounted, ref} from "vue";


// EMITS
const emits = defineEmits(['closedropdown']);

// STORE
const appStore = useAppStore();

// DATA
const kpidropdown = ref(null);

const listener = ()=>{
  if (!kpidropdown.value) {
    return
  }
  if (event.target !== kpidropdown.value && event.composedPath().includes(kpidropdown.value)) {
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
.edu-incident-table-kpi-dropdown {
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