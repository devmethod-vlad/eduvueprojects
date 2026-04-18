<template>
  <div class="edu-fileitem-container">

    <template v-if="isImage">
      <div
          class="edu-fileitem-thumbnail"
          @click.stop.prevent="isImage ? ligthboxVisible = true : null"
          :style="styleBackgroundImage"
      >

      </div>
    </template>

    <div class="edu-fileitem-filebadge">
      <file-badge
          :filename="props.fileName"
      />
    </div>

    <div class="edu-fileitem-fileinfo">

      <div class="edu-fileitem-fileinfo-filename">
        {{ fileNameComputed }}
      </div>

      <div class="edu-fileitem-fileinfo-divider">
        |
      </div>

      <div class="edu-fileitem-fileinfo-size">
        {{ props.fileSize.toString() }} Mb
      </div>

    </div>

    <div class="edu-fileitem-download">
      <a :href="props.fileSrc" download>
        <VTooltip theme="qst-arrow-tooltip-black">
          <app-icon
              name="download"
              :size="18"
              color="#999999"
              hover-color="#269999"
          />
          <template #popper>Скачать</template>
        </VTooltip>
      </a>
    </div>

    <div
        v-if="props.deleteAction"
        class="edu-fileitem-download"
        style="margin-left: 8px"
    >
        <VTooltip theme="qst-arrow-tooltip-black">
          <app-icon
              @click="openDeleteSubmitModal()"
              name="close"
              :size="16"
              color="#999999"
              hover-color="#269999"
          />
          <template #popper>Удалить</template>
        </VTooltip>

    </div>

  </div>

  <template v-if="isImage">
    <vue-easy-lightbox
        :visible="ligthboxVisible"
        :imgs="props.fileSrc"
        :index="props.fileIndex"
        @hide="()=>{ligthboxVisible=false}"
    ></vue-easy-lightbox>
  </template>

  <template v-if="deleteSubmitText !==''">
    <modal-content-new
        modalsize="small"
        @close-modal="deleteSubmitText = ''"
    >
      <div class="filegallery-modal-content">
        <div class="filegallery-modal-text">
          {{  deleteSubmitText }}
        </div>
        <div class="filegallery-modal-buttons">
          <div class="filegallery-modal-buttons-cancel">
            <button
                type="button"
                class="vue-btn vue-btn-warn-wobg"
                @click="deleteSubmitText = ''"
            >
              Отменить
            </button>
          </div>

          <div class="filegallery-modal-buttons-submit">
            <button
                type="button"
                class="vue-btn vue-btn-normal-wobg"
                @click="deleteAttachment()"
            >
              Да
            </button>
          </div>

        </div>
      </div>
    </modal-content-new>
  </template>
</template>

<script setup>
import {app_config} from "@/dispatches/config/setconfig";
import {computed, ref} from "vue";
import FileBadge from "@/common/ui/FileBadge/FileBadge.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";

// EMITS
const emits = defineEmits(['deleteAttachment']);

// DATA
const ligthboxVisible = ref(false);
const deleteSubmitText = ref('');

// PROPS
const props = defineProps({
  fileName:
      {
        type: String,
        default: '',
        required: true
      },

  fileSrc:
      {
        type: String,
        default: '',
        required: true
      },
  fileSize:
      {
        type: Number,
        default: 0,
        required: true
      },
  fileIndex:
      {
        type: Number,
        default: 0,
        required: true
      },
  deleteAction:
      {
        type: Boolean,
        default: false
      }
});

// METHODS
const openDeleteSubmitModal = ()=>{
  let delFilename = props.fileName;

  if (props.fileName.length > 100){
    delFilename = '...' + props.fileName.slice(-100)
  }

  deleteSubmitText.value = 'Вы точно хотите удалить вложение: '+delFilename + '?';
}

const deleteAttachment = async () =>{
  emits('deleteAttachment', props.fileIndex);
}


// COMPUTED
const fileExt = computed(()=>{
  return props.fileName.split(".").pop();
});

const fileNameComputed = computed(()=>{
  if(props.fileName.length > 20){
    return props.fileName.slice(0,20)+'...';
  }
  else {
    return props.fileName;
  }
});

const isImage = computed(()=>{
  return app_config.IMAGE_EXT_ARR.includes(fileExt.value.trim().toLowerCase());
});

const styleBackgroundImage = computed(()=>{
  return 'background-image: url('+props.fileSrc+');';
});

</script>

<style scoped>
.edu-fileitem-download {
  height: 24px;
  width: 24px;
  padding-top: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edu-fileitem-filebadge {
  margin-right: 16px;
}

.edu-fileitem-fileinfo {
  margin-right: 16px;
  display: flex;
  justify-content: flex-start;
}

.edu-fileitem-thumbnail {
  margin-right: 16px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-size: cover;
  background-color: #D9D9D9;
}

.edu-fileitem-container {
  width: fit-content;
  border-radius: 4px;
  border: 1px #E6E6E6 solid;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

</style>