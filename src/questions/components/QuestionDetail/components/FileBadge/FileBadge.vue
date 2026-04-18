<template>
    <div class="qst-file-badge-container">
				<svg aria-hidden="true" width="46"
						 height="23" viewBox="0 0 46 23"
						 fill="none" xmlns="http://www.w3.org/2000/svg"
				>
						<path :fill="badgeColor" d="M4.98591 23C1.89395 23 -0.0289061 19.6418 1.53625 16.9752L9.18125 3.9504C10.6177 1.50318 13.243 0 16.0806 0H42C44.2091 0 46 1.79086 46 4V19C46 21.2091 44.2091 23 42 23H4.98591Z"></path>
				</svg>
				<div
                :class="{'qst-file-badge-text-12':fileExt.length>=4}"
								aria-hidden="true"
								class="qst-file-badge-text"
				>
						{{ fileExt.toUpperCase() }}
				</div>
		</div>

</template>

<script setup>
import {computed, ref, watch} from "vue";

const props = defineProps({

		filename:
				{
            type:String,
            default: '',
            required: true
				}
});

// DATA
const badgeColor = ref('#86909C');
const badgeFontSize = ref(14);

// COMPUTED
const fileExt = computed(()=>{
    if(props.filename !==''){
        return props.filename.split(".").pop();
		}
    else {
        return ''
		}

});


watch(fileExt, (newExt) => {
    // console.log("newExt.length: ", newExt.length);
    if(newExt.length <=3){
        // console.log("newExt.length <=3");
				badgeFontSize.value = 14;
		}
    else {
				badgeFontSize.value = 12;
		}

    if(newExt.toLowerCase() === 'jpg'){
        badgeColor.value = '#16A086';
		}
        if(newExt.toLowerCase() === 'jpeg'){
            badgeColor.value = '#16A086';
        }
    else if(newExt.toLowerCase() === 'png'){
        badgeColor.value = '#FBC500';
    }
    else if(newExt.toLowerCase() === 'pdf'){
        badgeColor.value = '#E14C39';
		}
    else if(newExt.toLowerCase() === 'doc'){
        badgeColor.value = '#18669E';
    }
    else if(newExt.toLowerCase() === 'docx'){
        badgeColor.value = '#18669E';
    }
    else if(newExt.toLowerCase() === 'xls'){
        badgeColor.value = '#79B821';
    }
    else if(newExt.toLowerCase() === 'xlsx'){
        badgeColor.value = '#79B821';
    }
    else if(newExt.toLowerCase() === 'ppt'){
        badgeColor.value = '#FF8A00';
    }
    else if(newExt.toLowerCase() === 'pptx'){
        badgeColor.value = '#FF8A00';
    }
    else if(newExt.toLowerCase() === 'mp3'){
        badgeColor.value = '#AC46F0';
    }
    else if(newExt.toLowerCase() === 'mp4'){
        badgeColor.value = '#AC46F0';
    }
    else if(newExt.toLowerCase() === 'wav'){
        badgeColor.value = '#86909C';
    }
    else if(newExt.toLowerCase() === 'webm'){
        badgeColor.value = '#86909C';
    }
},
    {immediate:true}
)

</script>

<style scoped>
.qst-file-badge-container {
    position: relative;
    width: 46px;
    height: 24px;
}

.qst-file-badge-text {
		display: flex;
		align-items: center;
    color: #fff;
    line-height: 23px;
		font-size: 16px;
    position: absolute;
    bottom: 0;
    right: 4px;
}

.qst-file-badge-text-12 {
		font-size: 12px !important;
}
</style>