<template>
	<div class="qst-warning-panel">
			<div class="qst-warning-panel-content">
					<div class="qst-warning-panel-icon">
							<app-icon
											name="warning"
											:size="24"
											:color="infoColor"
							/>
					</div>
          <div
									class="qst-warning-panel-text"
									:style="{color: infoColor}"
					>
							{{ props.text }}
          </div>
			</div>
	</div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {ref, watch} from "vue";

// PROPS
const props = defineProps({
		text:
				{
						type: String,
						default: '',
						required: true
				},
		color:
				{
						type: String,
						default: ''
				},
		textmode:
				{
						type: String,
						default: 'warning'
				}
});

// DATA
const infoColor = ref('');


// WATCH
watch(
    () => props.textmode,
    (newtextmode) => {
        if(props.color === ''){
            if (newtextmode === 'warning'){
                infoColor.value = '#F05C46';
						}
            else if (newtextmode === 'info'){
                infoColor.value = '#1e8686';
						}
        }
    },
    {immediate:true}
);

watch(
    () => props.color,
    (newcolor) => {
        if(newcolor !== ''){
            infoColor.value = newcolor
        }
    },
    {immediate:true}
);

</script>

<style scoped>
.qst-warning-panel-icon {
		padding-top: 3px;
		display: flex;
    align-items: flex-start;
		justify-content: flex-start;

}

.qst-warning-panel-text {
		margin-left: 20px;
		font-weight: 400;
		font-size: 16px;
		display: flex;
		align-items: center;
}

.qst-warning-panel {
		width: 100%;
		display: flex;
}

.qst-warning-panel-content {
		display: flex;
		justify-content: flex-start;

}
@media (min-width: 576px) {


}

@media (min-width: 768px) {

}

@media (min-width: 992px) {
    .qst-warning-panel-text {
        font-size: 20px;
    }
}

@media (min-width: 1200px) {

}

@media (min-width: 1400px) {

}

</style>