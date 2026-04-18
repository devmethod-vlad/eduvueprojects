<template>
		<div
						class="em-vue-dropdown-menu"
						ref="dropdownpanel"
						:class="{
            'em-vue-dropdown-right-align':dropDownAlign === 'right',
            'em-vue-dropdown-left-align':dropDownAlign === 'left',

						}"
						:style="'top: '+props.top.toString()+'px;'+'width: '+props.width.toString()+'px;'"
		>
				<div class="em-vue-dropdown-menu-content">
						<slot />
				</div>
		</div>
</template>

<script setup>

import {computed, ref} from "vue";
import {useDetectOutsideClick} from "@/directives/clickoutside";

// EMITS
const emits = defineEmits(['closepanel'])

// PROPS
const props = defineProps({
		align:
				{
						type: String,
						default: 'right'
				},

		top:
				{
						type: Number,
						default: 20
				},

    width:
				{
						type: Number,
						default: 250
				}
});

// DATA
const panel = ref(null);

// METHODS
useDetectOutsideClick(panel, () => {
    emits('closepanel');
});


// COMPUTED
const dropDownAlign = computed(()=>{
    if(props.align === ''){
        return 'right';
		}
    else {
        return props.align;
		}
});


</script>

<style scoped>

.em-vue-dropdown-right-align {
		right: 0;
}

.em-vue-dropdown-left-align {
    left: 0;
}

.em-vue-dropdown-right-align:before {
		right: 8px;
}

.em-vue-dropdown-right-align:after {
    right: 9px;
}

.em-vue-dropdown-left-align:before {
    left: 8px;
}

.em-vue-dropdown-left-align:after {
    left: 9px;
}

 .em-vue-dropdown-menu {
		 border-radius: 4px;
		 position: absolute;
		 background-color: white;
		 border: 1px #ced4da solid;
 }

 .em-vue-dropdown-menu:before {
     content: '';
     display: block;
     position: absolute;
     bottom: 100%;
     width: 0;
     height: 0;
     border: 5px solid transparent;
     border-bottom-color: #ced4da;
 }

 .em-vue-dropdown-menu:after {
     content: '';
     display: block;
     position: absolute;
     bottom: 100%;
     width: 0;
     height: 0;
     border: 4px solid transparent;
     border-bottom-color: white;
 }

</style>