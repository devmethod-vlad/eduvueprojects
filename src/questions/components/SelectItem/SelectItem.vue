<template>
	<div ref="selectComponent"
       class="em-select-item-component"
       :class="{'qst-select-item-warnstyle': errorStyle}"
  >
			<div class="em-select-item-click-zone-hover">
          <div
                  class="em-select-item-click-zone"
                  :class="{'em-select-item-click-zone-active': activeSelectId !==''}"
                  @click.stop.prevent="()=>{showDropArea = !showDropArea; emits('itemclick')}"
          >
              {{ placeholder }}
          </div>
          <div @click="()=>{showDropArea = !showDropArea}" class="em-select-item-icon-zone">
              <template v-if="showDropArea">
                  <app-icon
                          name="chevron-up"
                          :size="14"
                  />
              </template>
              <template v-else>
                  <app-icon
                          name="chevron-down"
                          :size="14"
                  />
              </template>
          </div>
			</div>

			<Transition name="qst-modal">
          <template v-if="showDropArea">
              <div
                      class="em-select-item-droparea"
                      :style="'top: '+selectHeight.toString()+'px;'"
              >
                  <div
                          class="em-select-item-droparea-zone"
                          :style="'max-height: '+props.maxheight.toString() +'px;'"
                  >
                      <template v-for="item in props.data" :key="item[props.uniqidname]">
                          <div
                                  @click="selectActiveItem(item[props.uniqidname])"
                                  class="em-select-droparea-item"
                                  :class="{'em-select-droparea-item-active': item[props.uniqidname].toString() === activeSelectId.toString()}"
                          >
                              {{ item[props.itemname].toString() }}
                          </div>
                      </template>
                  </div>
              </div>
          </template>
			</Transition>

	</div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {onMounted, ref, watch} from "vue";
import {useDetectOutsideClick} from "@/questions/components/SelectItem/directives/clickoutside";

// EMITS
const emits = defineEmits(['emitactiveitem', 'itemclick']);

let initialData = [
    {
        id: 1,
        name: 'Позиция 1'
    },
    {
        id: 2,
        name: 'Позиция 2'
    },
    {
        id: 3,
        name: 'Позиция 3'
    },
    {
        id: 4,
        name: 'Позиция 4'
    },
]

// PROPS
const props = defineProps({

		data:
				{
            type: Array,
						default(){
                return [
                    // {
                    //     id: 1,
                    //     name: 'Позиция 1'
                    // },
                    // {
                    //     id: 2,
                    //     name: 'Позиция 2'
                    // },
                    // {
                    //     id: 3,
                    //     name: 'Позиция 3'
                    // },
                    // {
                    //     id: 4,
                    //     name: 'Позиция 4'
                    // },
								];
						},
						required:true
				},

    uniqidname:
        {
            type: String,
            default: 'id',
						required: true
        },

    itemname:
        {
            type: String,
            default: 'name',
            required: true
        },

		activeid:
				{
            type: String,
						default: ''
				},

		placeholder:
				{
						type: String,
						default: 'Выберите значение'
				},
		debugtarget:
				{
            type: String,
            default: ''
				},
		maxheight:
				{
						type: Number,
						default: 350
				},
    errorstyle:
      {
        type: Boolean,
        default: false
      }

});


// DATA
const selectComponent = ref(null);

const selectHeight = ref(0);

const showDropArea = ref(false);

const placeholder = ref('');

const activeSelectId = ref('');

const errorStyle = ref(false);


// METHODS

useDetectOutsideClick(selectComponent, () => {
    showDropArea.value=false;
});

const selectActiveItem = (id)=>{
    activeSelectId.value = id.toString();
    props.data.forEach((item)=>{
        if(item[props.uniqidname].toString() === activeSelectId.value.toString()){
            emits('emitactiveitem', item);
        }
    });
  showDropArea.value=false;
}

const updatePlaceholder = ()=>{
    props.data.forEach((item)=>{
        if(item[props.uniqidname].toString() === activeSelectId.value.toString()){
            placeholder.value = item[props.itemname].toString();
        }
    });
}

// WATCH
watch(
    ()=>props.activeid,
    (newId) => {
        activeSelectId.value = newId;
    }
);

watch(
    ()=>props.data,
    () => {
        props.data.forEach((item)=>{
            updatePlaceholder();
        });
    }
);

watch(
  ()=>props.errorstyle,
  (newstyle) => {
    if(newstyle){
      errorStyle.value = true;
    }
    else{
      errorStyle.value = false;
    }
  }
);

watch(
    activeSelectId,
    () => {
        if(props.debugtarget==='role'){
            console.log("changeActiveSelectID");
				}

        if(activeSelectId.value !==''){
            placeholder.value = props.placeholder;
            updatePlaceholder();
            showDropArea.value = false;
        }
        else {
            placeholder.value = props.placeholder;
				}
    },
    {immediate: true}
);

// LIFECYCLE
onMounted(()=>{
    selectHeight.value = selectComponent.value.clientHeight;
    if (props.activeid !==''){
        activeSelectId.value = props.activeid.toString();
		}
})

</script>

<style scoped>
.em-select-item-click-zone-hover:hover{
    background-color: #eaf5f5;
}

.em-select-item-click-zone-hover {
		display: flex;
		width: 100%;
}

.em-select-droparea-item-active{
    background-color: #eaf5f5;
}

.em-select-item-click-zone-active {
		color: #000000E5!important;
}

.em-select-droparea-item {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-height: 35px;
		padding-left: 10px;
		padding-right: 10px;
}

.em-select-droparea-item:hover {
		background-color: #eaf5f5;
}

.em-select-item-droparea-zone {
		display: flex;
		flex-direction: column;
}

.em-select-item-droparea {
		width: 100%;
		position: absolute;
		background-color: white;
    border: 1px #00000033 solid;
		overflow-x: auto;
		left: -1px;
		z-index: 2000;
}

.em-select-item-click-zone {
		cursor: pointer;
		color: #00000082;
		padding-left: 10px;
		padding-right: 10px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 90%;
}

.em-select-item-icon-zone {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 10%;
}

.qst-select-item-warnstyle {
  border: 1px #F05C46 solid !important;
}

.em-select-item-component {
		position: relative;
		display: flex;
    width: 100%;
		min-height: 35px;
		border: 1px #00000033 solid;
}

@media (min-width: 576px) {
    .em-select-item-click-zone {
        width: 95%;
    }

    .em-select-item-icon-zone {
        width: 5%;
    }
}

</style>