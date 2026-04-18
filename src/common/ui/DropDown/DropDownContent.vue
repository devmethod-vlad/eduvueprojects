<template>
  <div
      class="edu-dropdown-wr"
      id="edu-dropdown-wr"
  >
    <div
        v-for="item in props.itemList"
        class="edu-dropdown-item-wr"
        :key="item.id"
        :class="{'edu-dropdown-active-item': props.activeItemList.includes(item.id)}"
    >
      <div class="edu-dropdown-item-checkbox">
        <custom-checkbox
            :id="item.id.toString()"
            @active="(id)=>{addToActiveList(id)}"
            @inactive="(id)=>{removeFromActiveList(id)}"
            :check-list="props.activeItemList"
        />
      </div>
      <div class="edu-dropdown-item-text">
        {{ item.name }}
      </div>
    </div>

  </div>
</template>

<script setup>
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";

// EMITS
const emits = defineEmits(['updateActiveList']);


// PROPS
const props = defineProps({
  itemList:
      {
        type: Array,
        default(){
          return []
        },
        required: true
      },
  activeItemList:
      {
        type: Array,
        default(){
          return []
        },
        required: true
      },
});

// METHODS
const addToActiveList = (id)=>{
  let activeListCopy = [...props.activeItemList];
  if(!activeListCopy.includes(id)){
    activeListCopy.push(id);
    emits('updateActiveList', activeListCopy);
  }
};
const removeFromActiveList= (id)=>{
  let activeListCopy = [...props.activeItemList];
  let idIndex = activeListCopy.indexOf(id);
  if(idIndex !== -1){
    activeListCopy.splice(idIndex, 1);
    emits('updateActiveList', activeListCopy);
  }
};

</script>

<style scoped>
.edu-dropdown-item-checkbox {
  display: flex;
  align-items: center;
}

.edu-dropdown-active-item {
  background-color: #D4EBEB;
}

.edu-dropdown-item-text {
  margin-left: 20px;
}

.edu-dropdown-item-wr:hover {
  background-color: #EAF5F5;
}


.edu-dropdown-item-wr {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.edu-dropdown-wr {
  font-weight: 400;
  font-size: 16px;
  color: #757575;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>