<template>
	<div v-if="pageCount > 5" class="qst-list-pagination-gotopage">
			<div class="pagination-gotopage-left-text">
					Страница
			</div>

      <div class="pagination-gotopage-input-wr">
					<input
									@focus="errorStyle=false"
									@keyup.enter="goToPage()"
									class="vue-form-control"
									:class="{'vue-input-error': errorStyle}"
									min="1"
									:max="pageCount.toString()"
									type="number"
									v-model="inputValue"
					/>
      </div>

      <div class="pagination-gotopage-rigth-text">
					из {{ pageCount.toString() }}
      </div>
	</div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useQuestionsStore} from "@/questions/store/questions";

// EMITS
const emits = defineEmits(['gotopage']);

// STORE
const questionsStore = useQuestionsStore();

// DATA
const inputValue = ref(1);
const errorStyle = ref(false);

// METHODS
const goToPage = ()=>{
    let pageCountNew = Math.ceil(Number(questionsStore.$state.totalCountByConditions)/Number(questionsStore.$state.countPerPage));
    if(!isNaN(Number(inputValue.value))){
        if(Number(inputValue.value)>0){
            if(Number(inputValue.value) <= Number(pageCountNew)){
                questionsStore.activePage = Number(inputValue.value);
                emits('gotopage');
						}
            else {
                errorStyle.value = true;
						}
				}
        else {
            errorStyle.value = true;
				}
		}
    else {
        errorStyle.value = true;
		}
}

// COMPUTED
const pageCount = computed(()=>{
    return Math.ceil(Number(questionsStore.$state.totalCountByConditions)/Number(questionsStore.$state.countPerPage))
});


</script>

<style scoped>
.pagination-gotopage-left-text {
		font-size: 14px;
		font-weight: 600;
		padding-right: 10px;
}
.pagination-gotopage-rigth-text {
    font-size: 14px;
    font-weight: 600;
    padding-right: 10px;
		padding-left: 10px;
}

.pagination-gotopage-input-wr {
		display: flex;
}

.pagination-gotopage-input-wr input{
		border: 1px #DDDDDD solid;
		border-radius: 2px;
		max-width: 60px;
    padding: 0.19rem 0.75rem !important;
		margin-bottom: 0 !important;
}

.qst-list-pagination-gotopage {
		display: flex;
		align-items: center;
}
</style>