<template>
	<div v-if="isVisible" class="qst-detail-filezone-wr">
			<div v-if="props.infoArr.length !== 0 && (props.newFiles.length !== 0 || props.denyFiles.length !==0)" class="qst-detail-filezone-warn-block">
					<template v-for="infoText in props.infoArr" :key="infoText">
							<div class="qst-detail-filezone-warninfo-item">
									<div class="qst-filezone-warninfo-item-icon">
											<app-icon
															name="warning-fill"
															:size="20"
															:color="'#F05C46'"
											/>
									</div>
                  <div class="qst-filezone-warninfo-item-text">
											{{ infoText }}
                  </div>
							</div>
					</template>

      </div>

      <div class="qst-detail-filezone-files-block">

          <template v-if="props.denyFiles.length !== 0">
              <template v-for="(fileItem, index) in props.denyFiles" :key="fileItem.file">

                  <file-item
                          :warnstyle="true"
                          :filesize="fileItem.size"
                          :filename="fileItem.filename"
                          :denyreason="fileItem.deny_reason"
													:fileindex="Number(index)"
													@deleteitem="(count)=>{emits('deleteitem', count)}"
                          @deletedenyitem="(count)=>{emits('deletedenyitem', count)}"
                  />

              </template>
					</template>

					<div v-if="props.newFiles.length !== 0 || props.denyFiles.length !==0"
									class="qst-detail-filezone-files-title">
							Файлы
					</div>

					<template v-if="props.newFiles.length !== 0">
              <template v-for="(fileItem, index) in props.newFiles" :key="fileItem.name">

                  <file-item
                          :warnstyle="false"
                          :filesize="fileItem.size/1000000"
                          :filename="fileItem.name"
													:fileindex="Number(index)"
                          @deleteitem="(count)=>{emits('deleteitem', count)}"
                          @deletedenyitem="(count)=>{emits('deletedenyitem', count)}"
									/>

              </template>
					</template>
      </div>
	</div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import FileItem from "@/common/ui/FileZone/components/FileItem/FileItem.vue";
import {computed, watch} from "vue";

// EMITS
const emits = defineEmits(['deleteitem','resetinfoarr', 'deletedenyitem']);


// PROPS
const props = defineProps({
    infoArr:
        {
            type:Array,
            default(){
                return []
						},
            required: true
        },

    denyFiles:
        {
            type:Array,
            default(){
                return []
            },
            required: true
        },

		newFiles:
				{
            type:Array,
            default(){
                return []
            },
            required: true
				}
});


// COMPUTED
const isVisible = computed(()=>{
    return props.infoArr.length !== 0 || props.denyFiles.length !== 0 || props.newFiles.length !== 0;
});

// WATCH
watch(
    () => props.newFiles,
    (newfiles) => {
        if (newfiles.length === 0 && props.denyFiles.length === 0){
            emits('resetinfoarr');
				}

    },
    {deep:true}

);

watch(
    () => props.denyFiles,
    (denyfiles) => {
        if (denyfiles.length === 0 && props.newFiles.length === 0){
            emits('resetinfoarr');
        }
    },
    {deep: true}


);

</script>

<style scoped>
@import "@/common/ui/FileZone/css/filezone.css";
</style>