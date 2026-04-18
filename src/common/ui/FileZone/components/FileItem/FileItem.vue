<template>
    <div class="qst-detail-filezone-files-item">

        <div class="qst-filezone-item-badge">
            <file-badge
                    :filename="props.filename"
            />
        </div>

        <VTooltip theme="qst-standart-tooltip">
        <div class="qst-filezone-files-item-text" :class="{'filezone-item-warnstyle': props.warnstyle}">
            {{ renderFileName }} | <span class="qst-fileitem-filesize">{{ renderFileSize }} Мб</span>
        </div>
            <template #popper>
                {{ props.filename }}
            </template>
        </VTooltip>
        <div
            @click="deleteFile()"
            class="qst-filezone-files-item-closeicon"
            @mouseenter="closeIconColor='#F05C46'"
            @mouseleave="closeIconColor='#333333'"
        >
          <VTooltip theme="qst-arrow-tooltip-black">
            <span>
              <app-icon
                  name="close"
                  :size="10"
                  :color="closeIconColor"
              />
            </span>
            <template #popper>Удалить</template>
          </VTooltip>

        </div>
    </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import FileBadge from "@/common/ui/FileBadge/FileBadge.vue";
import {computed, ref} from "vue";

// EMITS
const emits = defineEmits(['deleteitem', 'deletedenyitem']);

// PROPS
const props = defineProps({
    filename:
        {
            type:String,
            default: '',
            required: true
        },

    filesize:
        {
            type:Number,
            default: 0,
            required: true
        },

    warnstyle:
        {
            type: Boolean,
            default: false,
            required: true
        },

		denyreason:
				{
            type: String,
            default: ''
				},

		fileindex:
				{
            type: Number,
            default: null
				},
});

// DATA
const closeIconColor = ref('#999999');

// METHODS
const deleteFile = ()=>{

    if(props.warnstyle && props.denyreason !==''){
      emits('deletedenyitem', props.fileindex);
		}
    else {
      emits('deleteitem', props.fileindex);
		}
}


// COMPUTED
const renderFileName = computed(()=>{
    if(props.filename.length > 40){
        return props.filename.slice(0,40) + '...';
		}
    else {
        return props.filename;
		}
});

const renderFileSize = computed(()=>{
    if(props.filesize < 0.9){
        return props.filesize.toFixed(3).toString();
		}
    else {
        return props.filesize.toFixed(2).toString();
		}
});

</script>

<style scoped>
.filezone-item-warnstyle {
		color: #E04B37 !important;
}

.qst-detail-filezone-files-item {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
}

.qst-filezone-item-badge {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.qst-filezone-files-item-closeicon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
}

.qst-fileitem-filesize {
    color: #66727F;
}

.qst-filezone-files-item-text {
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    padding-left: 20px;
}
@media (min-width: 992px) {
    .qst-filezone-files-item-text {
        font-size: 20px;
    }
}
</style>