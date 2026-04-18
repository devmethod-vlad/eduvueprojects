<template>
    <div
						class="edu-filegallery-item"
						:class="{'filegallery-item-border': showMode === 'modal'}"
		>
        <div class="filegallery-item-header">
            <div class="filegallery-item-header-badge">
                <file-badge
                        :filename="props.filename"
                />
            </div>

            <div class="filegallery-item-header-name">
                <VTooltip theme="qst-standart-tooltip">
								<span>
										{{ fileNameComputed }}
								</span>
                    <template #popper>
                        {{ props.filename }}
                    </template>
                </VTooltip>
            </div>

            <div @click.prevent.stop="openDeleteSubmitModal()" class="filegallery-item-header-icon">
                    <VTooltip theme="qst-standart-tooltip">

                        <app-icon
                                name="close"
                                :size="15"
                        />
                        <template #popper>
                            Удалить вложение
                        </template>
										</VTooltip>
            </div>
        </div>
        <div
								@click.stop.prevent="isImage ? ligthboxVisible = true : null"
								class="filegallery-item-body"
								:style="styleBackgroundImage">
        </div>

				<div class="filegallery-item-bottom">

          <a :href="props.fileSrc"
             download
             class="filegallery-item-bottom-download"
          >
            <div class="fg-item-bottom-download-icon">
              <app-icon
                  name="download"
                  :size="15"
              />
            </div>
            <div class="fg-item-bottom-download-text">
              Скачать
            </div>
          </a>

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

    </div>
</template>

<script setup>
import FileBadge from "@/common/ui/FileBadge/FileBadge.vue";
import {computed, ref} from "vue";
import {app_config} from "@/dispatches/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";

// EMITS
const emits = defineEmits(['deleteAttachment']);


// PROPS
const props = defineProps({
  filename:
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
  fileIndex:
      {
        type: Number,
        default: 0,
        required: true
      }
});


// DATA
const showMode = ref('modal');
const deleteSubmitText = ref('');
const ligthboxVisible = ref(false);


// METHODS
const openDeleteSubmitModal = ()=>{
  let delFilename = props.filename;

  if (props.filename.length > 100){
    delFilename = '...' + props.filename.slice(-100)
  }

  deleteSubmitText.value = 'Вы точно хотите удалить вложение: '+delFilename + '?';
}


const deleteAttachment = async () =>{
  emits('deleteAttachment', props.fileIndex);
}

// COMPUTED
const fileExt = computed(()=>{
  return props.filename.split(".").pop();
});

const fileNameComputed = computed(()=>{
  if(props.filename.length > 9){
    return props.filename.slice(0,9)+'...';
  }
  else {
    return props.filename;
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
@import "@/common/ui/FileGallery/components/FileGalleryItem/css/filegalleryitem.css";
</style>