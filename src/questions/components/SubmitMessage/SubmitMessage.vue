<template>
	<div class="qst-submit-message-wr">
			<modal-content
							modalsize="responsive"
							@close-modal="emits('closesubmitmessage')"
			>
					<div class="qst-submit-message-text">
							{{ submitText }}
					</div>
			</modal-content>
	</div>
</template>

<script setup>
import ModalContent from "@/common/ui/ModalContent/ModalContent.vue";
import {useSubmitMessageStore} from "@/questions/store/submitmessage";
import {computed} from "vue";

// EMITS
const emits = defineEmits(['closesubmitmessage']);

// PROPS
const props = defineProps({
		text:
				{
						type: String,
						default: ''
				}
});

// STORE
const submitStore = useSubmitMessageStore();


// COMPUTED
const submitText = computed(()=>{
    if(props.text !==''){
        return props.text;
		}
    else {
        return submitStore.$state.message;
		}
})


</script>

<style scoped>
.qst-submit-message-text {
		padding: 10px;
		font-size: 20px;
		font-weight: 400;
}
</style>