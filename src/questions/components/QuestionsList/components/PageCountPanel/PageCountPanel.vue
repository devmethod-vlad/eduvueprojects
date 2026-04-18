<template>
	<div v-if="pageCountArray.length !==0" class="qst-list-pagecount-wr">
			<div class="qst-list-pagecount-text">
					Элементов на странице:
			</div>

      <div class="qst-list-pagecount-items-wr">
          <template v-for="item in pageCountArray" :key="item">
							<div @click="setPerPageCount(Number(item))"
									 class="qst-list-pagecount-item"
									 :class="{'qst-list-pagecount-item-active': Number(item) === Number(questionsStore.$state.countPerPage)}">
									{{ item }}
							</div>
					</template>
      </div>

	</div>
</template>

<script setup>
import {useQuestionsStore} from "@/questions/store/questions";
import {ref, watch} from "vue";

// STORE
const questionsStore = useQuestionsStore();

// DATA
const pageCountArray = ref([]);

// METHODS
const setPerPageCount = (count)=>{
    if(count !== questionsStore.$state.countPerPage){
        let copyQuestionsStore = questionsStore.$state;
        copyQuestionsStore.countPerPage = count;
        copyQuestionsStore.activePage = 1;
        copyQuestionsStore.sorting = 'desc';
        copyQuestionsStore.updateFlag = !questionsStore.$state.updateFlag;
        questionsStore.$patch(copyQuestionsStore);
		}
}


// WATCH
watch(
    () => questionsStore.totalCountByConditions,
		() => {
        pageCountArray.value = [];
        if(Number(questionsStore.$state.totalCountByConditions)>5){
            pageCountArray.value.push('5','10')
				}
        if(Number(questionsStore.$state.totalCountByConditions)>10){
            pageCountArray.value.push('15')
        }
        if(Number(questionsStore.$state.totalCountByConditions)>15){
            pageCountArray.value.push('20')
        }
    },
    {immediate: true}
);

</script>

<style scoped>
.qst-list-pagecount-item-active {
		color: #269999 !important;
}

.qst-list-pagecount-item {
		cursor: pointer;
		margin-left: 10px;
}
.qst-list-pagecount-text {
		height: 100%;
    display: flex;
    align-items: flex-start;
}

.qst-list-pagecount-items-wr {
		height: 100%;
		display: flex;
		align-items: flex-start;
}

.qst-list-pagecount-wr {
		height: 20px;
		font-size: 15px;
		font-weight: 400;
		display: flex;
		align-items: center;
		justify-content: flex-end;
}

@media (min-width: 768px) {
  .qst-list-pagecount-wr {
    justify-content: flex-start;
  }
}

@media (min-width: 992px) {
    .qst-list-pagecount-wr {
        height: 50px;
    }
}
</style>