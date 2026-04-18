<template>
	<div v-if="props.attachments.length !==0" class="qst-detail-filegallery">
			<template v-for="attach in props.attachments" :key="attach.attachid">
					<file-gallery-item
									:attachment="attach"
									:target="props.target"
					/>
			</template>
	</div>
</template>

<script setup>
import FileGalleryItem
    from "@/questions/components/QuestionDetail/components/FileGallery/components/FileGalleryItem/FileGalleryItem.vue";

const props = defineProps({
    attachments:
        {
            type: Array,
            default(){
                return [];
            },
						required: true
        },
		target:
				{
						type: String,
						default: ''
				}
});


</script>

<style scoped>
@import "@/questions/components/QuestionDetail/components/FileGallery/css/filegallery.css";
</style>