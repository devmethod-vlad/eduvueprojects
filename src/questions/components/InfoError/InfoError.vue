<template>
    <div class="qst-info-error">
        <div class="qst-info-error-icon">
						<app-icon name="warning" />
				</div>
				<div class="qst-info-error-text">
						{{ errorStore.$state.infoError.message }}
				</div>
    </div>
</template>


<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {useErrorsStore} from "@/questions/store/errors";

// STORE
const errorStore = useErrorsStore();

</script>

<style scoped>
@import "@/questions/components/InfoError/css/infoerror.css";
</style>