<template>
	<div v-if="(role === 'admin' || role === 'redactor') && listStore.$state.enableSearch === 0" class="qst-list-select-space-wr">
			<div class="qst-list-select-space-title">
					Выберите тему вопроса
			</div>
			<div class="qst-list-select-space">
          <select-item
                  itemname="title"
                  uniqidname="id"
									placeholder="Выбрать"
                  :data="listStore.$state.availableSpaces"
                  @emitactiveitem="(activeItem)=>changeActiveSpace(activeItem)"
									:activeid="activeSpaceId"
          />
			</div>

	</div>
</template>

<script setup>
import SelectItem from "@/questions/components/SelectItem/SelectItem.vue";
import {useQuestionsStore} from "@/questions/store/questions";
import {useUserStore} from "@/questions/store/user";
import {computed, ref, watch} from "vue";
import {getRoleInfo} from "@/questions/services/getrole";

// EMITS
const emits = defineEmits(['changespace']);

// STORE
const listStore = useQuestionsStore();
const userStore = useUserStore();

// DATA
const activeSpaceId = ref('');

// METHODS
const changeActiveSpace = (activeItem)=>{
    let copyListStore =  {...listStore.$state};
    copyListStore.spaceId = Number(activeItem.id);
    copyListStore.searchInput = '';
    listStore.$patch(copyListStore);
    activeSpaceId.value = activeItem.id.toString();
    emits('changespace');
}


// COMPUTED
const role = computed(()=>{
    let roleInfo = getRoleInfo(userStore.$state.userrole.id);
    if (roleInfo !== null){
        return roleInfo[0];
    }
    else {
        return null;
    }
});

watch(
    ()=>listStore.spaceId,
    (newspaceid) => {
				activeSpaceId.value = newspaceid.toString();
    }
);


</script>



<style scoped>
.qst-list-select-space-wr {
		margin-bottom: 50px;
}

.qst-list-select-space-title {
		font-size: 20px;
		font-weight: 400;
		margin-bottom: 10px;
}

</style>