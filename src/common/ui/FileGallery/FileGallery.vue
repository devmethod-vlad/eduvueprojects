<template>
	<div v-if="props.attachments.length !==0" class="qst-detail-filegallery">
			<template v-for="(attach, index) in props.attachments" :key="attach[props.idFieldName]">

					<file-gallery-item
              :filename="attach[props.fileNameField]"
              :file-src="props.mainUrl+attach[props.fileNameField]"
              :file-index="Number(index)"
              @delete-attachment="(index)=>{emits('deleteAttachment', index)}"
					/>

			</template>
	</div>
</template>

<script setup>
import FileGalleryItem from "@/common/ui/FileGallery/components/FileGalleryItem/FileGalleryItem.vue";

// EMITS
const emits = defineEmits(['deleteAttachment'])


// PROPS
const props = defineProps({
    attachments:
        {
            type: Array,
            default(){
                return [];
            },
						required: true
        },

    mainUrl:
      {
        type: String,
        default: ''
      },

    idFieldName:
        {
          type: String,
          default: 'attachid',
          required: true
        },

    fileNameField:
      {
        type: String,
        default: 'filename',
        required: true
      }

});

</script>

<style scoped>
@import "@/common/ui/FileGallery/css/filegallery.css";
</style>