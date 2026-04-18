<template>
		<div class="qst-list-sorting-panel-wr">

				<div class="qst-list-sorting-panel-action">
						<div class="sorting-panel-action-text">
								Сортировка по дате:
						</div>
						<div @click="setSort()" class="sorting-panel-action-icon">

								<template v-if="questionsStore.$state.sorting === 'asc'">
										<app-icon
                        name="arrow-up"
                        :size="10"
                    />
								</template>

								<template v-else>
                  <app-icon
                      name="arrow-down"
                      :size="12"
                  />
								</template>

						</div>
				</div>
		</div>
</template>

<script setup>
import {useQuestionsStore} from "@/questions/store/questions";
import {useAppStore} from "@/questions/store/app";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";


// STORE
const questionsStore = useQuestionsStore();
const appStore = useAppStore();

// METHODS
const setSort = ()=>{

    let copyQuestionsStore = questionsStore.$state;
    if (questionsStore.$state.sorting === 'asc'){
        copyQuestionsStore.sorting = 'desc';
		}
    else {
        copyQuestionsStore.sorting = 'asc';
		}
    copyQuestionsStore.activePage = 1;
    copyQuestionsStore.countPerPage = 5;
    copyQuestionsStore.updateFlag = !questionsStore.$state.updateFlag;
    questionsStore.$patch(copyQuestionsStore);
}

</script>

<style scoped>
.sorting-panel-action-icon {
		display: flex;
		align-items: center;
		justify-content: flex-end;
}

.sorting-panel-action-text {
		font-size: 15px;
		font-weight: 400;
		display: flex;
		align-items: center;
		padding-right: 20px;
}

.qst-list-sorting-panel-title-text {
		font-size: 20px;
		font-weight: 400;
		display: flex;
		width: 100%;
		justify-content: flex-start;
}

.qst-list-sorting-panel-action {
		cursor: pointer;
		display: flex;
    width: 100%;
		align-items: center;
		justify-content: flex-end;
}

.qst-list-sorting-panel-wr {
		width: 100%;
		display: flex;
		flex-direction: column;
}

@media (min-width: 992px) {
    .qst-list-sorting-panel-wr {
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
				margin-bottom: 0;
		}

    .qst-list-sorting-panel-title-text {
        width: 50%;
    }

    .qst-list-sorting-panel-action {
        width: 50%;
    }
}
</style>