<template>
	<ModalContent
					modalsize="responsive"
					:body-min-height="100"
					@close-modal="emits('closesubmitaction')"
	>
			<div class="qst-submit-modal-content">
					<div class="qst-submit-modal-text">
							{{ props.text }}
					</div>
					<div class="qst-submit-modal-buttons">
							<div class="qst-submit-modal-buttons-cancel">
                  <button
                          type="button"
                          class="vue-btn vue-btn-warn-wobg"
                          @click="emits('submitaction', props.action, 'cancel')"
                  >
                      Отменить
                  </button>
							</div>

							<div class="qst-submit-modal-buttons-submit">
                  <button
                          type="button"
                          class="vue-btn vue-btn-normal-wobg"
                          @click="submitAction()"
                  >
                      Да
                  </button>
							</div>

					</div>
			</div>
	</ModalContent>
</template>

<script setup>
import ModalContent from "@/common/ui/ModalContent/ModalContent.vue";

// EMITS
const emits = defineEmits(['submitaction', 'closesubmitaction']);


// PROPS
const props = defineProps({
    action:
        {
            type:String,
            default:'',
            required: true
        },
    text:
        {
            type:String,
            default:'',
            required: true
        },
		orderid:
				{
						type: Number,
						default: 0
				}
});

// METHODS
const submitAction = ()=>{
    if (props.orderid !==0){
        emits('submitaction', props.action, 'submit', props.orderid);
		}
    else {
        emits('submitaction', props.action, 'submit');
		}
}


</script>

<style scoped>
.qst-submit-modal-text {
		text-align: center;
		font-weight: 400;
		font-size: 20px;
		margin-bottom: 30px;
}

.qst-submit-modal-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
}

.qst-submit-modal-buttons {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
}
.qst-submit-modal-buttons-cancel {
     width: 47%;
 }
.qst-submit-modal-buttons-cancel button{
    width: 100%;
}
.qst-submit-modal-buttons-submit {
    width: 47%;
}
.qst-submit-modal-buttons-submit button {
    width: 100%;
}
</style>