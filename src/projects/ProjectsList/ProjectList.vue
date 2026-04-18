<template>
  <template v-if="isLoading">
    <div class="vue-projectlist-loading-image">
      <img alt="Загрузка" :src="app_config.apiUrl+app_config.loadingSrc" />
    </div>
  </template>

  <template v-else>

    <template v-if="projectsError !==''">
      <div class="vue-projectlist-error-wr">
        {{ projectsError }}
      </div>
    </template>

    <template v-else>
      <div class="vue-projectslist-title-wr">
        <template v-if="[app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)">

          <div class="vue-projectslist-title">
            Добавить проект
          </div>

          <div v-if="[app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)"
               @click.stop.prevent="newProjectFormVisible = true"
               class="vue-projectslist-plus"
               id="vue-projectslist-plus"
               v-tippy="{ content: 'Новый проект', placement : 'top-start'}"
          >
            <app-icon
                name="plus-square"
                :size="40"
                color="#5ea4cd"
            />
          </div>

        </template>

      </div>


      <div v-if="Number(woSearchCount)>2" class="vue-projectlist-search-wr">

        <div
            v-tippy="{ content: 'Искать по слову или фразе', placement : 'top-start' }"
            @click.stop.prevent="onSearchClick()"
            class="vue-projectlist-search-icon-wr">
          <app-icon name="search"
                    :size="20"
                    color="#1e8686"
          />
        </div>
        <div class="vue-projectlist-search-wr">
          <input
              @keyup.enter="onSearchClick()"
              type="text"
              class="vue-form-control vue-form-control-search"
              :class="{'vue-input-error':errorSearchStyle}"
              name="vue-search-input"
              id="vue-search-input"
              v-model="searchInput"
          >
        </div>
        <div
            v-tippy="{ content: 'Сбросить поиск', placement : 'top-start'}"
            @click.stop.prevent="resetSearch()"
            v-if="searchInput !==''"
            class="vue-projectlist-del-icon-wr"
        >
          <app-icon name="close"
                    :size="14"
                    color="#1e8686"
          />

        </div>

      </div>


      <div v-if="Number(projectCount)>5" class="vue-projectlist-sorting-wr">

        <div
            v-if="[app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)"
            @click.stop.prevent="onFilterClick()"
            class="vue-active-filter-wr"
        >
          <template v-if="renderActivityFilter === 'set' ">
            <span
                v-if="filterActivityFlag === 'set'"
                v-tippy="{ content: 'Сбросить фильтр', placement : 'left'}"
            >
              <app-icon name="filter-slash"
                        :size="20"
                        :color="filterInitialColor"
              />
            </span>
            <span
                v-else
                v-tippy="{ content: 'Отсортировать все активные', placement : 'left'}"
            >
              <app-icon name="filter"
                        :size="20"
                        :color="filterInitialColor"
              />

            </span>
          </template>
        </div>

        <div
            @click.stop.prevent="onTitleSortClick()"
            class="vue-title-sort-wr"
             :style="[app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name) ? 'width: 59%;': 'width: 67%; padding-left: 30px;'"
        >
          <span
              v-if="sortTitleFlag === 'notset'"
              v-tippy="{ content: 'Отсортировать по заголовку', placement : 'top-start'}"
          >
            <app-icon name="sort"
                      :size="20"
                      :color="titleSortInitialColor"
            />
          </span>
          <span
              v-else-if="sortTitleFlag === 'asc'"
              v-tippy="{ content: 'Отсортировать по убыванию', placement : 'left'}"
          >
            <app-icon name="sort-amount-up"
                      :size="20"
                      :color="titleSortInitialColor"
            />

          </span>
          <span
              v-else
              v-tippy="{ content: 'Отсортировать по возрастанию', placement : 'left'}"
          >
               <app-icon name="sort-amount-down"
                         :size="20"
                         :color="titleSortInitialColor"
               />
          </span>

        </div>

        <div @click.stop.prevent="onDateSortClick()" class="vue-date-sort-wr">

          <span
              v-if="sortDateFlag === 'notset'"
              v-tippy="{ content: 'Отсортировать по дате', placement : 'top-start'}"
          >
            <app-icon name="sort"
                      :size="20"
                      :color="dateSortInitialColor"
            />
          </span>
          <span
              v-else-if="sortDateFlag === 'asc'"
              v-tippy="{ content: 'Отсортировать дату по убыванию',placement : 'top-start'}"
          >
            <app-icon name="sort-amount-up"
                      :size="20"
                      :color="dateSortInitialColor"
            />

          </span>
          <span
              v-else
              v-tippy="{ content: 'Отсортировать дату по возрастанию',placement : 'top-start'}"
          >
            <app-icon name="sort-amount-down"
                      :size="20"
                      :color="dateSortInitialColor"
            />
          </span>
        </div>

        <div class="vue-select-pagecount-wr">
          <div
              v-tippy="{ content: 'Сбросить фильтры и сортировки',placement : 'top-start'}"
              @click.stop.prevent="resetSortingAndFilters()"
              v-if="resetIconVisibility"
              class="em-table-reseticon-wr"
          >
            <app-icon name="times-circle"
                      :size="38"
                      color="#dc3545"
            />

          </div>
          <template v-if="Number(projectCount)>5">
            <select v-tippy="{ content: 'Кол-во элементов на странице',placement : 'top-start'}"
                    :style="{ backgroundImage: 'url(' + selectArrow + ')'}"
                    class="vue-form-select"
                    :class="{'select-background-position': !app_config.prod}"
                    @change="onPageCountChange()"
                    v-model="pageCount"
            >

              <option v-if="Number(projectCount)>5" value="5">
                5
              </option>
              <option v-if="Number(projectCount)>5" value="10">
                10
              </option>
              <option v-if="Number(projectCount)>10" value="15">
                15
              </option>
              <option v-if="Number(projectCount)>15" value="20">
                20
              </option>
            </select>
          </template>
        </div>

      </div>


      <div
          v-if="projectsList.length>0"
          class="vue-projectslist-wr"
          :class="{'vue-projectlist-paddingtop':paddingTopStyle}"
      >

          <template
              v-for="project in projectsList"
              :key="project.name"
          >
              <ProjectItem

                  :project-info="project"
                  @refreshlist="getProjectsList()"

              />

          </template>
      </div>
      <div v-else class="vue-projectslist-no-projects">
        Нет данных по проектам
      </div>

      <div
          class="vue-pagination-wr"
          v-if="Number(projectCount) > Number(pageCount)">
        <vue-awesome-paginate
            :total-items="Number(projectCount)"
            :items-per-page="Number(pageCount)"
            v-model="activePage"
            :on-click="getProjectsList"
        />
      </div>

    </template>

    <ProjectForm
        v-if="newProjectFormVisible"

        @formrefreshlist="newProjectFormVisible = false; getProjectsList();"
        @closeprojectformmodal="newProjectFormVisible = false"

        form-header="Новый проект"
        form-target="create"
    />
  </template>

</template>

<script setup>
import ProjectItem from "@/projects/ProjectsList/components/ProjectItem";
import ProjectForm from "@/projects/ProjectsList/components/ProjectForm";
import {getprojectslist} from "@/projects/ProjectsList/services/getProjectsList";
import {useListStore} from "@/projects/ProjectsList/store/list";
import {useUserStore} from "@/projects/global/store/user";
import {computed, onMounted, ref, watch} from "vue";
import {app_config} from "@/projects/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

// STORE
const listStore = useListStore();
const userStore = useUserStore();


// DATA
const isLoading = ref(true);
const projectsList = ref([]);
const errorSearchStyle = ref(false);
const filterActivityFlag = ref('notset');
const filterInitialColor = ref('#808080');
const filterInitialColorHover = ref('#505050');
const titleSortInitialColor = ref('#808080');
const titleSortInitialColorHover = ref('#505050');
const dateSortInitialColor = ref('#808080');
const dateSortInitialColorHover = ref('#505050');
const sortTitleFlag = ref('notset');
const sortDateFlag = ref('desc');
const searchInput = ref('');
const activePage = ref(1);
const pageCount = ref(5);
const projectCount = ref(0);
const renderCount = ref(0);
const renderActivityFilter = ref('notset');
const woSearchCount = ref(0);
const newProjectFormVisible = ref(false);
const projectsError = ref('');

// METHODS
const resetSortingAndFilters = ()=>{

  filterActivityFlag.value = 'notset';
  sortTitleFlag.value = 'notset';
  sortDateFlag.value = 'desc';
  activePage.value = 1;
  titleSortInitialColor.value = "#505050";
  titleSortInitialColorHover.value = "#808080";
  dateSortInitialColor.value = "#505050";
  dateSortInitialColorHover.value = "#808080";
  filterInitialColor.value = "#505050";
  filterInitialColor.value = "#808080";
  getProjectsList();
};

const getProjectsList = async()=>{
  // console.log("getProjectsList");
  while (true) {
    // console.log("getProjectsList iter");

    isLoading.value = true;

    let projectAnswer = await getprojectslist(renderParams.value);

    console.log("getProjectsList iter projectAnswer: ", projectAnswer);

    if(projectAnswer['status'] === 'ok'){

      projectsList.value = await projectAnswer['info']['projects_list'];
      projectCount.value = await projectAnswer['info']['project_count'];
      renderCount.value = await projectAnswer['info']['render_count'];
      renderActivityFilter.value = await projectAnswer['info']['activity_filter'];
      woSearchCount.value = await projectAnswer['info']['wo_search_count'];

      listStore.availActionsList = await projectAnswer['info']['avail_actions'];
      listStore.availEnrolTypes = await projectAnswer['info']['avail_enrol_types'];
      if (projectAnswer['info']['projects_list'].length > 0){
        for (let pItem of projectAnswer['info']['projects_list']){
          listStore.activeList[Number(pItem.id)] = pItem
        }
      }

      if(Number(projectAnswer['info']['project_count']) !== 0){
        if(Number(projectAnswer['info']['render_count']) === 0){
          if(Number(activePage.value) > 1){
            activePage.value = activePage.value - 1;
          }
        }
        else {
          isLoading.value = false;
          break;
        }
      }
      else {
        isLoading.value = false;
        break;
      }
    }
    else {
      isLoading.value = false;
      projectsError.value = 'В процессе получения данных о проектах произошла ошибка!';
      break;
    }
  }
};

const onFilterClick = async()=>{
  if(filterActivityFlag.value === 'notset'){
    filterActivityFlag.value = 'set';
  }
  else {
    filterActivityFlag.value = 'notset';
  }

  filterInitialColor.value = "#1e8686";
  filterInitialColor.value = "#176C6CFF";

  activePage.value = 1;
  await getProjectsList();
};

const onTitleSortClick = async()=>{
  if(sortTitleFlag.value === 'notset'){
    sortTitleFlag.value = 'asc';
  }
  else if (sortTitleFlag.value === 'asc'){
    sortTitleFlag.value = 'desc';
  }
  else {
    sortTitleFlag.value = 'asc';
  }
  titleSortInitialColor.value = "#1e8686";
  titleSortInitialColorHover.value = "#176C6CFF";

  sortDateFlag.value = 'notset';
  dateSortInitialColor.value = "#505050";
  dateSortInitialColorHover.value = "#808080";

  activePage.value = 1;
  await getProjectsList();

};

const onDateSortClick = async()=>{
  if (sortDateFlag.value === 'notset'){
    sortDateFlag.value = 'desc';
  }
  else {
    if(sortDateFlag.value === 'desc'){
      sortDateFlag.value = 'asc';
    }
    else {
      sortDateFlag.value = 'desc';
    }
  }

  dateSortInitialColor.value = "#1e8686";
  dateSortInitialColorHover.value = "#176C6CFF";

  sortTitleFlag.value = 'notset'
  titleSortInitialColor.value = "#505050";
  titleSortInitialColorHover.value = "#808080";

  activePage.value = 1;
  await getProjectsList();
};

const onPageCountChange = async()=>{
  await getProjectsList();
};

const onSearchClick = async()=>{
  if (searchInput.value !=='' ){
    activePage.value = 1;
    await getProjectsList();
  }
};

const resetSearch = async()=>{
  searchInput.value = '';
  activePage.value = 1;
  await getProjectsList();
};

// COMPUTED
const resetIconVisibility = computed(()=>{
  let reset = false;

  if (filterActivityFlag.value !== 'notset'){
    reset = true;
  }
  if (sortTitleFlag.value !== 'notset'){
    reset = true;
  }

  if (sortDateFlag.value !== 'notset' && sortDateFlag.value !== 'desc'){
    reset = true;
  }

  return reset;
});

const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg"
});

const paddingTopStyle = computed(()=>{
  return Number(projectCount.value) <= 1;
});

const renderParams = computed(()=>{
  return {
    apiurl: app_config.apiUrl,
    userid: userStore.$state.userid,
    token: userStore.$state.token,
    activityfilter: filterActivityFlag.value,
    sorttitle: sortTitleFlag.value,
    sortdate: sortDateFlag.value,
    pagecount: pageCount.value,
    searchfraze: searchInput.value,
    activepage: activePage.value
  }

});

// LIFECYCLE
onMounted(async ()=>{
  await getProjectsList();
});

// WATCH
watch(
    searchInput,
    async () => {
      if(searchInput.value === ''){
        await getProjectsList();
      }
    },
);

</script>

<style>
.vue-projectslist-wr {
  margin-top: 40px;
}

.em-table-reseticon-wr {
  cursor: pointer;
}

.vue-projectslist-no-projects {
  padding-top: 40px;
  padding-bottom: 40px;
  color: #1e8686;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
}

.vue-pagination-wr {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.paginate-buttons {
  cursor: pointer;
  position: relative;
  display: block;
  color: #1ab394;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #dee2e6;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  padding: 0.375rem .75rem;
  font-size: 1em;
  font-weight: bold;
}
.paginate-buttons:hover {
  z-index: 2;
  color: #0a58ca;
  background-color: #e9ecef;
  border-color: #dee2;
}
.active-page {
  z-index: 3;
  color: #0a58ca;
  background-color: #e9ecef;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}

</style>


<style scoped>
.select-background-position {
  background-position: right 0.75rem center;
}

.pagination-container {
  display: flex;
  padding-left: 0;
  list-style: none;
}

.vue-projectlist-paddingtop {
  padding-top: 40px !important;
}

.vue-projectlist-error-wr {
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 1.4em;
  color: #dc3545;
}

.vue-projectlist-loading-image {
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
}
.vue-form-control-search {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}

.vue-projectlist-search-icon-wr {
  border-top: 1px solid #757575;
  border-bottom: 1px solid #757575;
  border-left: 1px solid #757575;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.vue-projectlist-search-icon-wr:hover {
  background-color: #d5d4d4;
}

.vue-projectlist-del-icon-wr {
  position: absolute;
  z-index: 100;
  cursor: pointer;
  align-items: center;
  right: 2%;
  top: 30%;
}

.vue-projectlist-search-wr {
  display: flex;
  position: relative;
  width: 100%;
}
.vue-projectlist-search-wr input {
  width: 100%;
}

.vue-projectlist-sorting-wr{
  width: 100%;
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
}
.vue-active-filter-wr {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 8%;
}

.vue-title-sort-wr {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.vue-date-sort-wr {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 15%;
}

.vue-select-pagecount-wr select {
  margin-left: 20px;
}

.vue-select-pagecount-wr {
  display: flex;
  justify-content: flex-end;
  width: 18%;
}
.unicon {
  display: flex !important;
}
.vue-projectslist-plus {
  padding-left: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vue-projectslist-title-wr {
  margin-top: 30px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.vue-projectslist-title {
  display: flex;
  align-items: center;
  text-align: left;
  font-weight: bold;
  color: #1e8686;
  font-size: 1.7em;
}
.vue-form-select {
  width: auto !important;
  margin-bottom: 0 !important;
}
</style>