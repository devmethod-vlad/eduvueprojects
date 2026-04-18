<template>
	<div class="edu-gloss-container">

			<div class="edu-gloss-search-wr">
					<search-panel
									@getresults="(results)=>{getSearchResults(results)}"
									@resetsearch="onResetSearch()"
					/>
			</div>
			<div class="edu-gloss-search-results-wr">
					<search-results
									:results="appStore.$state.results"
									:noresultsinfo="noResultsInfo"
					/>
			</div>
	</div>
</template>

<script setup>
import SearchPanel from "@/glossary/components/SearchPanel/SearchPanel.vue";
import SearchResults from "@/glossary/components/SearchResults/SearchResults.vue";
import {ref} from "vue";
import {useAppStore} from "@/glossary/store/app";

// STORE
const appStore = useAppStore();


// DATA
const noResultsInfo = ref(false);

// METHODS
const getSearchResults = (results)=>{
    appStore.results = results;
    if(appStore.$state.results.length === 0){
        noResultsInfo.value = true;
		}
}

const onResetSearch = ()=>{
    noResultsInfo.value = false;
}

</script>

<style>
@font-face {
  font-family: "OpenSans";
  src: url(https://edu.example.com/edu-rest-api/glossary/static/fonts/OpenSans-Medium.ttf) format("truetype");
  /*src: url(http://127.0.0.1:5000/edu-rest-api/glossary/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
}

#edu-glossary-app {
  font-family: OpenSans;
}
#edu-glossary-modal-header {
  padding-top: 24px !important;
}
.edu-glossary-modal-body {
  padding-bottom: 24px !important;
}

</style>

<style scoped>
@import "@/glossary/css/glossary.css";
.edu-gloss-search-results-wr {
  line-height: 24px;
}
</style>