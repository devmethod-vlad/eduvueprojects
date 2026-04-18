<template>
  <div class="filter-machine-container">
    <div
        v-if="!machine.$state.showMode && machine.$state.sendMethodsInclude"
        class="filter-machine-type-badges-wr"
        :class="{'em-disabled-style': machine.$state.loadingInfo  || machine.$state.downloadActive}"
    >
      <machine-type-badges
          @refreshstate="updateFilterInfo()"
      />
    </div>

    <div
        class="filter-machine-header-wr"
        :class="{'em-disabled-style': machine.$state.loadingInfo || machine.$state.downloadActive}"
    >
      <machine-header
          @change-page-count="updateFilterInfo()"
          @resetsearch="resetGlobal()"
          @globalsearch="globalSearch()"
      />
    </div>

    <div
        class="filter-machine-maintable-wr"
        :class="{'em-disabled-style': machine.$state.loadingInfo  || machine.$state.downloadActive}"
    >
      <template v-if="mainTableVisible">
        <machine-main-table
            @updateinfo="updateFilterInfo()"
            @acceptfilter="setAcceptFilterInfo()"

        />
      </template>
    </div>

    <div
        v-if="result.$state.total === 0 && !machine.$state.loadingInfo"
        class="filter-machine-noresults-wr">
      <machine-no-results
          @reset-filters-and-search="resetGlobal()"
      />
    </div>

    <div
        v-if="machine.$state.loadingInfo  || machine.$state.downloadActive"
        class="filter-machine-container-loader"
    >
      <content-loader/>
    </div>
  </div>
</template>

<script setup>
import MachineNoResults from "@/filtermachine/components/MachineNoResults.vue";
import MachineMainTable from "@/filtermachine/components/MachineMainTable/MachineMainTable.vue";
import MachineHeader from "@/filtermachine/components/MachineHeader.vue";
import MachineTypeBadges from "@/filtermachine/components/MachineTypeBadges.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useMachineStore} from "@/filtermachine/store/machine";
import {useFilterStore} from "@/filtermachine/store/filter";
import {useResultStore} from "@/filtermachine/store/result";
import {useMoStore} from "@/filtermachine/store/mo";
import {useMuStore} from "@/filtermachine/store/mu";
import {useRoleStore} from "@/filtermachine/store/role";
import {useSpecStore} from "@/filtermachine/store/spec";
import {useUsersStore} from "@/filtermachine/store/users";
import {getFilterInfo} from "@/filtermachine/services/getfilterinfo";
import {setFromPredefinedFilter} from "@/filtermachine/services/setfrompredefinedfilter";
import ContentLoader from "@/questions/components/ContentLoader/ContentLoader.vue";
import {prepareCheckBoxes} from "@/filtermachine/services/checklist";
import {acceptTableFilters} from "@/filtermachine/components/MachineMainTable/services/acceptfilters";


// EMITS
const emits = defineEmits(['machineReady', 'setFilters', 'startDownload', 'endDownload']);


// PROPS
const props = defineProps({

  predefinedFilter:
      {
        type: Object,
        default(){
          return {

          }
        }
      },

  filterUrl:
      {
        type: String,
        default: '',
        required: true
      },

  roleFilterUrl:
      {
        type: String,
        default: '',
        required: true
      },

  roleDownloadUrl:
      {
        type: String,
        default: '',
        required: true
      },

  specFilterUrl:
      {
        type: String,
        default: '',
        required: true
      },

  specDownloadUrl:
      {
        type: String,
        default: '',
        required: true
      },

  moFilterUrl:
      {
        type: String,
        default: '',
        required: true
      },

  moDownloadUrl:
      {
        type: String,
        default: '',
        required: true
      },

  moNameCategoryUrl:
      {
        type: String,
        default: '',
        required: true
      },

  muFilterUrl:
      {
        type: String,
        default: '',
        required: true
      },

  muDownloadUrl:
      {
        type: String,
        default: '',
        required: true
      },

  muNameCategoryUrl:
      {
        type: String,
        default: '',
        required: true
      },

  usersDownloadUrl:
      {
        type: String,
        default: '',
        required: true
      },

  showMode:
      {
        type: Boolean,
        default: false
      },

  sendMethodsInclude:
      {
        type: Boolean,
        default: false
      }


});

// STORE
const machine = useMachineStore();
const filter = useFilterStore();
const result = useResultStore();
const mo = useMoStore();
const mu = useMuStore();
const role = useRoleStore();
const spec = useSpecStore();
const users = useUsersStore();

// DATA
const mainTableVisible = ref(false);

// METHODS
const renderIdList = ()=>{
  let id_list = [];
  result.$state.users.forEach((item)=>{
    id_list.push(item.userid.toString())
  });
  return id_list;
}

const checkBoxState = async ()=>{
  let id_list = await renderIdList();
  await prepareCheckBoxes(users, id_list, users.$state.prefill);
}
const updateFilterInfo = async ()=>{
  await getFilterInfo(machine, filter, result);
  await checkBoxState();
}


const resetGlobal = async ()=>{
  filter.$reset();
  mo.$reset();
  mu.$reset();
  role.$reset();
  spec.$reset();

  // filter.search_phrase = "";
  // filter.page_number = 1;
  // filter.fio_sortm = {
  //   "active": 0,
  //       "type": "desc"
  // };
  // filter.mu_name_sort = {
  //   "active": 0,
  //   "type": "desc"
  // };
  // filter.mo_name_sort = {
  //   "active": 0,
  //   "type": "desc"
  // };
  // filter.mu_shortname_sort = {
  //   "active": 0,
  //   "type": "desc"
  // };
  // filter.mo_shortname_sort = {
  //   "active": 0,
  //   "type": "desc"
  // };
  // filter.role_sort = {
  //   "active": 0,
  //   "type": "desc"
  // };
  // filter.spec_sort = {
  //   "active": 0,
  //   "type": "desc"
  // };
  // filter.login_sort = {
  //   "active": 1,
  //   "type": "asc"
  // };
  await updateFilterInfo();
}

const globalSearch = async ()=>{
  filter.page_number = 1;
  await updateFilterInfo();
}

const setParamsFromProps = ()=>{
  machine.filterUrl = props.filterUrl;
  machine.roleFilterUrl = props.roleFilterUrl;
  machine.roleDownloadUrl = props.roleDownloadUrl;
  machine.specFilterUrl = props.specFilterUrl;
  machine.specDownloadUrl = props.specDownloadUrl;
  machine.moFilterUrl = props.moFilterUrl;
  machine.moDownloadUrl = props.moDownloadUrl;
  machine.moNameCategoryUrl = props.moNameCategoryUrl;
  machine.muFilterUrl = props.muFilterUrl;
  machine.muDownloadUrl = props.muDownloadUrl;
  machine.muNameCategoryUrl = props.muNameCategoryUrl;
  machine.showMode = props.showMode;
  machine.sendMethodsInclude = props.sendMethodsInclude;
  machine.usersDownloadUrl = props.usersDownloadUrl;

  if (machine.$state.showMode){
    machine.loginWidth = 140;

    machine.fioWidth = 220;

    machine.roleWidth = 280;

    machine.specWidth = 280;

    machine.moWidth = 280;

    machine.muWidth = 280;
  }
}

const handleResize = () => {
  machine.windowWidth = window.innerWidth
  machine.windowHeight = window.innerHeight
}

const createOutputInfo = ()=>{
  let infoData = {};

  infoData.mu_params = filter.$state.mu_params;
  infoData.mo_params = filter.$state.mo_params;
  infoData.spec_params = filter.$state.spec_params;
  infoData.role_params = filter.$state.role_params;
  infoData.user_params = filter.$state.user_params;
  return JSON.parse(JSON.stringify(infoData));
}

const emitOutputData = ()=>{
  let data = createOutputInfo();
  emits('setFilters', data);
}

const setAcceptFilterInfo = async ()=>{
  await acceptTableFilters(filter, role, spec, mu, mo);
  await updateFilterInfo();
}

// LEFICYCLE
onMounted(async ()=>{
  console.log("FILTER MACHINE MOUNTED");
  handleResize();
  window.addEventListener('resize', handleResize);
  setParamsFromProps();

  // console.log("props.predefinedFilter: ", props.predefinedFilter);
  if (Object.keys(props.predefinedFilter).length !== 0 && props.predefinedFilter.constructor === Object){
    await setFromPredefinedFilter(props.predefinedFilter, filter, mo, mu, role, spec, users, machine);
  }

  await updateFilterInfo();
  // console.log("updateFilterInfo after predefined");
  await emits('machineReady');
  mainTableVisible.value = true;
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  machine.$reset();
  filter.$reset();
  result.$reset();
  mo.$reset();
  mu.$reset();
  role.$reset();
  spec.$reset();
  users.$reset();
})

// WATCH
watch(
    () => [...filter.$state.user_params.user_list],
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => [...filter.$state.mu_params.mu_list],
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => filter.mu_params.mu_list,
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => [...filter.$state.mu_params.category_list],
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => [...filter.$state.mo_params.mo_list],
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => filter.mo_params.prefill,
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => [...filter.$state.mo_params.category_list],
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => [...filter.$state.role_params.role_list],
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => filter.role_params.prefill,
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => [...filter.$state.spec_params.spec_list],
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => filter.spec_params.prefill,
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        emitOutputData();
      }
    },
    {deep: true}
);

watch(
    () => machine.downloadActive,
    (newVal) => {
      if(newVal){
        emits('startDownload');
      }
      else {
        emits('endDownload');
      }
    }
);

</script>

<style scoped>
.filter-machine-container-loader {
  position: absolute;
  top: 50%;
  left: 50%;
}

.filter-machine-container {
  position: relative;
}

.filter-machine-type-badges-wr {
  margin-bottom: 24px;
}

.filter-machine-header-wr {
  margin-bottom: 32px;
}

</style>