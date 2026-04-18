<template>
	<div
      id="edu-gloss-search-results"
      class="edu-gloss-search-results"
      :style="'max-height: '+resultsMaxHeight.toString()+'px;'"
  >

			<div v-if="props.results.length === 0 && props.noresultsinfo" class="edu-gloss-search-noresults">

          <div class="edu-gloss-search-noresults-text">
              <p>По вашему запросу ничего не найдено:<br>
              Что можно сделать:</p>
              <ul>
                <li>Проверить, что слова написаны без ошибок</li>
                <li>Использовать другие слова для поиска</li>
              </ul>
          </div>

			</div>
			<div v-if="props.results.length !== 0" class="gloss-search-results-render">
					<template v-for="result in props.results" :key="result.id">
							<div class="gloss-search-results-item">
									<div class="gloss-item-name">
										{{ result.abbreviation }}
									</div>
                  <div class="gloss-item-description">
                      {{ result.description }}
                  </div>
							</div>
					</template>
			</div>

	</div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";

// PROPS
const props = defineProps({
    results:
        {
            type: Array,
            default(){
                return []
						}
        },

		noresultsinfo:
				{
						type: Boolean,
						default: false
				}
});

// DATA
const windowHeight = ref(window.innerHeight);


// METHODS
const handleResize = () => {
    windowHeight.value = window.innerHeight
}

// LIFECYCLE
onMounted(() => {
    window.addEventListener('resize', handleResize)
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
});

// COMPUTED

const resultsMaxHeight = computed(()=>{
    return windowHeight.value - 350;
})

</script>

<style>
.edu-gloss-search-noresults-text p{
  margin-bottom: 8px !important;
}

</style>

<style scoped>

.gloss-search-results-render {
  padding-top: 5px;
  padding-right: 10px;
}

.edu-gloss-search-noresults-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

}

.edu-gloss-search-noresults {
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.gloss-item-description {
		font-size: 16px;
		font-weight: 400;
}

.gloss-item-name {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 8px;
}

.gloss-search-results-item {
  margin-left: 5px;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 24px;
  padding-bottom: 24px;
  box-shadow: 0px 4px 8px 0px #00000014;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.edu-gloss-search-results {
		overflow-y: auto !important;
		font-family: OpenSans;
}

</style>