<template>
    <div class="qst-block-error"
         :style="{height: `${blockHeight.toString()}px`}"
		>
        <div class="qst-block-error-icon">
            <app-icon name="warning" />
        </div>
				<div class="qst-block-error-text">
            {{ errorStore.$state.blockError.message }}
        </div>
		</div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {computed} from "vue";
import {app_config} from "@/questions/config/setconfig";
import {useErrorsStore} from "@/questions/store/errors";

// PROPS
const props = defineProps({
		height:
				{
						type: Number,
						default: 0
				}
});

// STORE
const errorStore = useErrorsStore();

// COMPUTED

const blockHeight = computed(()=>{
    if(props.height > app_config.minErrorPanelHeight){
        return props.height;
		}
    else {
        return app_config.minErrorPanelHeight;
		}
})

</script>

<style scoped>
@import "@/questions/components/BlockError/css/blockerror.css";
</style>