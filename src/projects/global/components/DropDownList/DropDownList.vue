<template>

  <div class="em-dropdownlist-container" :style="'width: '+containerWidth.toString()+'px;'">

    <div class="em-dropdownlist">

      <div @click="openDropList()" id="dropdownlist-selected"
           class="em-dropdownlist-selected"
           :style="{ backgroundImage: 'url(' + selectArrow + ')'}"
           style="background-position: right 0.75rem center;"
      >

        <template v-if="activeFieldContent !==''">
          {{ activeFieldContent }}
        </template>
        <template v-else>
          {{ noSelected }}
        </template>

      </div>

      <template v-if="dataList.length !==0">

        <div style="display: none;"
             id="em-droplist"
             class="em-droplist-wr"
             :style="'width: '+containerWidth.toString()+'px; max-height: '+containerHeight.toString()+'px;'"

        >
          <div v-if="dataList.length > 5" class="em-droplist-search">
            <div class="em-search-wr">

              <div v-tippy="{ content: 'Искать по слову или фразе', placement : 'top-start' }" class="em-search-icon">
                <unicon name="search" width="20"
                        height="20" fill="#1e8686"
                        hover-fill="#176C6CFF"
                />
              </div>

              <div class="em-search-input-wr">

                <input @input="searchProcess()" class="em-search-input"
                       type="text" name="em-search-input"
                       v-model="searchInput"
                >

                <template v-if="searchInput !==''">
                  <div v-tippy="{ content: 'Сбросить поиск', placement : 'top-start' }" @click="resetSearch()"
                       class="em-search-close-icon"
                  >
                    <unicon  name="times-circle" width="20"
                             height="20" fill="#1e8686"
                             hover-fill="#176C6CFF"
                    />
                  </div>
                </template>
                <template v-else>
                  <div class="em-search-close-icon">

                  </div>
                </template>
              </div>

            </div>
          </div>

          <template v-for="(item, index) in reactiveList" :key="index">
            <div @click="onItemClick(item[idField], item[valueField])" class="em-droplist-item">
              {{ item[valueField] }}
            </div>
          </template>

        </div>

      </template>

    </div>

  </div>

</template>

<script setup>

// EMITS
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {app_config} from "@/projects/config/setconfig";

const emits = defineEmits(['onselect']);

// PROPS
const props = defineProps({
  dataList: {
    type: Array,
    default() {
      return []
    }
  },

  containerWidth: {
    type: Number,
    default: 500
  },

  containerHeight: {
    type: Number,
    default: 700
  },

  noSelected: {
    type: String,
    default: 'Не выбрано'
  },

  idField: {
    type: String,
    default:''
  },

  valueField: {
    type: String,
    default: ''
  },

  activeValue: {
    type: String,
    default: '',
  }
});

// DATA
const reactiveList = ref([]);

const searchInput = ref('');

const activeFieldContent = ref('');

// METHODS
const openDropList = ()=>{

  let dropList = document.getElementById("em-droplist");

  if(dropList.style.display === 'none'){
    dropList.style.display = "flex";
  }
  else {
    dropList.style.display = "none";
  }

};

const onItemClick = (id, value)=>{
  activeFieldContent.value = value;
  emits('onselect', {'id': id, 'value': value});
  searchInput.value = '';
  reactiveList.value = props.dataList;
  document.getElementById("em-droplist").style.display = "none";

};

const searchProcess = ()=>{
  console.log("searchInput: ", searchInput.value);
  if(searchInput.value !==''){
    reactiveList.value = props.dataList.filter((item)=>{
      return item[props.valueField].toLowerCase().trim().includes(searchInput.value.toLowerCase().trim())
    })
  }
  else {
    reactiveList.value = props.dataList;
  }
};

const resetSearch = ()=>{
  searchInput.value = '';
  reactiveList.value = props.dataList;
};

const handleOnClick = ()=>{
  let dropList = document.getElementById("em-droplist");
  let dropDownSelected = document.getElementById('dropdownlist-selected');

  if(dropList && dropDownSelected){

    if (!dropDownSelected.contains(event.target) && !dropList.contains(event.target)) {
      dropList.style.display = 'none';
    }

  }
};

// COMPUTED

const selectArrow = computed(()=>{
  let dropList = document.getElementById("em-droplist");

  if(dropList) {
    if(!dropList.style.display === 'flex'){
      return app_config.apiUrl+"/static/imgs/arrow.svg";
    }
    else {
      return app_config.apiUrl+"/static/imgs/arrow-reverse.svg";
    }
  }
  else {
    return app_config.apiUrl+"/static/imgs/arrow.svg";
  }
});

// LIFECYCLE
onMounted(()=>{
  this.reactiveList = this.dataList;
  window.addEventListener('click', handleOnClick);

  if (props.activeValue !==''){
    activeFieldContent.value = props.activeValue;
  }
});

onUnmounted(()=>{
  window.removeEventListener('click', handleOnClick);
});

// WATCH
watch(
    ()=>props.activeValue,
    (newValue) => {
      if(newValue !=='') {
        activeFieldContent.value = newValue;
      }
      else {
        activeFieldContent.value = props.noSelected;
      }
    },
    {deep: true}
);
</script>

<style scoped>
@import "@/css/search.css";

.em-droplist-search {
  padding-top: 3px;
  padding-right: 3px;
}

.em-droplist-item {
  font-weight: bold;
  color: #6c757d;
  word-break: break-word;
  cursor: pointer;
  padding: 10px;
}
.em-droplist-item:hover {
  background-color: #ced4da;
  border: 1px #ced4da dashed;
}

.em-droplist-wr {
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: white;
  overflow: auto;
  position: absolute;
  top: 40px;
  display: flex;
  flex-direction: column;
}

.em-dropdownlist-selected {
  background-repeat: no-repeat;
  background-size: 16px 12px;
  font-weight: bold;
  color: #6c757d;
  height: auto;
  word-break: break-word;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  border: 1px #ced4da solid;
}

.em-dropdownlist {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.em-dropdownlist-container {
  display: flex;
}

</style>