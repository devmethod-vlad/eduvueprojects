<template>
  <div
      class="aisearch-attachment"
  >
    <div
        class="aisearch-attachment-badge"
        @click.prevent.stop="processLigthBox()"
    >
      <file-badge
          :filename="props.url"
      />
    </div>
    <div
        class="aisearch-attachment-name"
        @click.prevent.stop="processLigthBox()"
    >
      {{ props.name }}
    </div>

    <div
        class="aisearch-attachment-icon"
    >
      <a :href="props.url" download>
        <app-icon
            name="download"
            :size="16"
            color="#999999"
            hover-color="#269999"
            press-color="#157171"
        />
      </a>
    </div>
  </div>

  <template v-if="isImage">
    <vue-easy-lightbox
        :visible="ligthboxVisible"
        :imgs="props.url"
        :index="props.index"
        @hide="()=>{ligthboxVisible=false}"
    ></vue-easy-lightbox>
  </template>

</template>

<script setup>
import FileBadge from "@/questions/components/QuestionDetail/components/FileBadge/FileBadge.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {computed, ref} from "vue";
import {app_config} from "@/aisearch/config/setconfig";

// PROPS
const props = defineProps({
  url:
      {
        type: String,
        default: ''
      },
  name:
      {
        type: String,
        default: ''
      },
  index:
      {
        type: Number,
        default: 0
      }
});


// DATA
const ligthboxVisible = ref(false);

// METHODS
function getFileExtension(url) {
  const lastSegment = url.split('/').pop();
  const dotIndex = lastSegment.lastIndexOf('.');
  if (dotIndex === -1) {
    return null;
  }
  return lastSegment.slice(dotIndex + 1).toLowerCase();
}

const manualDownload = () =>{
  const link = document.createElement('a');
  link.href = props.url;
  link.target = '_blank';
  link.download = props.name+'.'+getFileExtension(props.url);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const processLigthBox = () =>{
  if (isImage.value){
    ligthboxVisible.value = !ligthboxVisible.value;
  }
  else {
    manualDownload();
  }
}


// COMPUTED
const isImage = computed(()=>{
  let fileExt = getFileExtension(props.url);
  return app_config.IMAGE_EXT_ARR.includes(fileExt);
});

</script>

<style scoped>
.aisearch-attachment-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.aisearch-attachment-badge {
  cursor: pointer;
  margin-right: 16px;
}

.aisearch-attachment-name {
  cursor: pointer;
  font-family: OpenSans;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: #333333;
  margin-right: 16px;
}

.aisearch-attachment {
  border: 1px solid #E6E6E6;
  border-radius: 4px;
  display: flex;
  margin-bottom: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
}

.aisearch-attachment:hover {
  background-color: #EBF8F8;
}
</style>