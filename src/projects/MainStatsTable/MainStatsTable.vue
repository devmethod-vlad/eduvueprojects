<template>

  <div v-if="globalTableInfoText !==''" class="em-globaltable-info-wr"
       :class="{'em-table-warnstyle': globalTableWarnStyle}"
  >
    {{ globalTableInfoText }}
  </div>

  <template v-else>

    <div class="em-statsinfo-container">

      <div class="em-statsinfo-navigation-wr">

        <a :href="app_config.projectListUrl">
          <div class="em-statsinfo-navigation-item">
            К списку проектов
          </div>
        </a>
      </div>

      <div v-if="projectName !== ''" class="em-statsinfo-maintitle">
        CТАТИСТИКА ПО ПРОЕКТУ | {{ projectName }}
      </div>

      <div v-if="Number(totalItems) !== 0" class="em-statsinfo-item">
        <div class="em-statsinfo-item-text">
          В проекте участвует организаций: <span class="statsinfo-item-span">{{ totalItems.toString() }}</span>
        </div>
      </div>

      <div v-if="Number(totalItems) !== 0" class="em-statsinfo-item">
        <div class="em-statsinfo-item-text">
          Всего участников проекта: <span class="statsinfo-item-span">{{ projectMembersCount.toString() }}</span>
        </div>
      </div>

      <div v-if="Number(totalItems) !== 0" class="em-statsinfo-item">
        <div class="em-statsinfo-item-text">
          Организации, не подавшие заявки: <span class="statsinfo-item-span">{{ noMembersCount.toString() }}</span>
        </div>
        <div v-if="Number(noMembersCount)>0" class="em-statsinfo-item-button"
             :class="{'em-disabled-style': exportActive || tableLoadingActive}"
        >
          <button @click="exportInfo('exportmowomembers')" v-tippy="{ content: 'Выгрузить не подавших заявки',placement : 'top-start'}"
                  class="vue-btn vue-btn-normal"
          >
            <app-icon name="download-alt"
                      :size="20"
                      color="white"
            />
          </button>
        </div>
      </div>

      <div v-if="Number(totalItems) !== 0" class="em-statsinfo-item">
        <div class="em-statsinfo-item-text">
          Организации, где не назначены ответственные: <span class="statsinfo-item-span">{{ noMoRespCount.toString() }}</span>
        </div>
        <div v-if="Number(noMoRespCount)>0" class="em-statsinfo-item-button">
          <button :class="{'em-disabled-style': exportActive || tableLoadingActive}" @click="exportInfo('exportmoworesp')"
                  v-tippy="{ content: 'Выгрузить МО без ответственных',placement : 'top-start'}"
                  class="vue-btn vue-btn-normal"
          >
            <app-icon name="download-alt"
                      :size="20"
                      color="white"
            />
          </button>
        </div>
      </div>
    </div>

    <div class="em-table-search-container"
         :class="{'em-disabled-style': tableLoadingActive}"
    >

      <div class="em-search-wr">

        <div @click="searchProcess()" v-tippy="{ content: 'Искать по слову или фразе', placement : 'top-start' }"
             class="em-search-icon"
        >
          <app-icon name="search"
                    :size="20"
                    color="#1e8686"
          />
        </div>

        <div class="em-search-input-wr">

          <input @keyup.enter="searchProcess()" class="em-search-input"
                 type="text" name="em-search-input"
                 v-model="searchInput"
          >

          <template v-if="searchInput !==''">
            <div v-tippy="{ content: 'Сбросить поиск', placement : 'top-start' }" @click="resetSearch()"
                 class="em-search-close-icon"
            >
              <app-icon name="times-circle"
                        :size="20"
                        color="#1e8686"
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

    <div v-if="infoText !==''" class="em-table-info-container"
         :class="{'em-table-norm-style':enableInfoNormStyle}"
    >
      {{ infoText }}
    </div>

    <div class="em-table-pagecount-container" :class="{'em-disabled-style': tableLoadingActive}">
      <div v-if="Number(totalItems) >5" class="em-table-pagecount-select">
        <select :style="{ backgroundImage: 'url(' + selectArrow + ')'}"
                :class="{'select-background-position': !app_config.prod}"
                v-tippy="{ content: 'Кол-во элементов на странице',placement : 'top-start'}"
                class="vue-form-select"
                @change="onPageCountChange()"
                v-model="pageCount"
        >

          <option value="все">
            все
          </option>
          <option value="5">
            5
          </option>
          <option v-if="Number(totalItems) >5" value="10">
            10
          </option>
          <option v-if="Number(totalItems) >10" value="15">
            15
          </option>
          <option v-if="Number(totalItems) >15" value="20">
            20
          </option>

        </select>
      </div>


      <div v-if="Number(totalItems) !==0 " class="em-table-config-icon-wr"
           :class="{'em-disabled-style': tableLoadingActive}"
      >
      <span v-tippy="{ content: 'Параметры отображения',placement : 'top-start'}" @click="handleConfigClick()"
            id="em-table-config-icon"
      >
        <app-icon name="setting"
                  :size="38"
                  color="#1e8686"
        />
      </span>

        <div class="em-table-config-dropdown" id="em-table-config-dropdown"
             style="display: none;"
        >
          <div class="em-table-config-item">
            <div class="table-config-item-checkbox">
              <input @change="changeVisibilityFilters($event, 'mofullname')" v-if="Number(visibilityFilters.showMoFullname) === 1"
                     checked type="checkbox"
              >
              <input @change="changeVisibilityFilters($event, 'mofullname')" v-else
                     type="checkbox"
              >
            </div>
            <div class="table-config-item-text">
              Отображать полное название МО
            </div>
          </div>
        </div>

      </div>

      <div v-tippy="{ content: 'Добавить МО в проект',placement : 'top-start'}" @click="addMoRoute()"
           class="em-table-addmo-wr"
      >
        <app-icon name="plus-circle"
                  :size="38"
                  color="#1e8686"
        />

      </div>

      <div @click="routeToEnrol()" v-if="Number(totalItems) !== 0"
           v-tippy="{ content: 'К плагину набора сотрудников на проект',placement : 'top-start'}" class="em-table-downloadlist-wr"
      >
        <app-icon name="user-plus"
                  :size="38"
                  color="#1e8686"
        />
      </div>

<!--      <div-->
<!--          @click="routeToFilterMachine()" -->
<!--          v-tippy="{ content: 'Отфильтровать пользователей для участия в проекте',placement : 'top-start'}"-->
<!--          class="em-table-downloadlist-wr"-->
<!--      >-->
      <div
            v-tippy="{ content: 'Отфильтровать пользователей для участия в проекте (в разработке)',placement : 'top-start'}"
            class="em-table-downloadlist-wr"
      >
<!--        <app-icon name="filter"-->
<!--                  :size="37"-->
<!--                  color="#1e8686"-->
<!--        />-->
        <app-icon name="filter"
                  :size="37"
                  color="#C9C9C9FF"
        />
      </div>

      <div @click="exportInfo('exportprojstats')" v-if="Number(noMembersCount) !== Number(totalItems)"
           v-tippy="{ content: 'Выгрузить списки',placement : 'top-start'}" class="em-table-downloadlist-wr"
           :class="{'em-disabled-style': exportActive || tableLoadingActive}"
      >
        <app-icon name="file-download-alt"
                  :size="38"
                  color="#1e8686"
        />
      </div>

      <div v-tippy="{ content: 'Сбросить фильтры и сортировки',placement : 'top-start'}" @click="fullReset()"
           v-if="resetIconVisibility" class="em-table-reseticon-wr"
      >
        <app-icon name="times-circle"
                  :size="38"
                  color="#dc3545"
        />
      </div>
    </div>

    <div class="em-table-container">
      <div class="em-table-wr" ref="tablecontainer"
           id="table-container" @scroll="handleScroll"
           :class="pageCount === 'все' ? 'em-table-wr-scroll' : 'em-table-wr-scrollauto'"
      >

        <div class="em-body-item-row" :class="{'em-disabled-style':tableLoadingActive}">

          <div v-tippy="{ content: 'Отфильтровать по категории МО',placement : 'top-start'}" ref="tablecategory"
               class="em-table-item em-header-item category-header-tem" style="flex: 0 0 200px;"
          >
            <div @click.prevent.stop="(Number(totalItems) >3 && categoryList.length>0) ? processOpenCategory() : null" class="header-item-text"
                 id="table-cat-text"
            >
              <template v-if="Number(totalItems) >3">
                <template v-if="openCategoryList">
                  <app-icon name="chevron-up"
                            :size="13"
                            color="#1e8686"
                  />
                </template>
                <template v-else>
                  <app-icon name="chevron-down"
                            :size="13"
                            color="#1e8686"
                  />
                </template>
              </template>
              &nbsp;&nbsp;Категория МО
            </div>
            <div v-if="Number(totalItems) >3" @click="sortingProcess('mocat')"
                 class="header-item-icon"
            >
              <template v-if="sorting.moCat === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.moCat === 'desc'">
                  <app-icon name="sort-amount-down"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
                <template v-else>
                  <app-icon name="sort-amount-up"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
              </template>
            </div>

            <template v-if="categoryList.length > 0">
              <div style="display: none;" class="table-category-dropdown"
                   id="table-category-dropdown"
              >
                <div v-for="category in categoryList" class="category-dropdown-item"
                     :key="category.id"
                >
                  <div @change="processCategoryClick()" class="dropdown-item-checkbox">
                    <input type="checkbox" :value="category.name"
                           v-model="filtersList.category"
                    />
                  </div>
                  <div class="dropdown-item-text">
                    {{ category.name }}
                  </div>
                </div>

              </div>
            </template>
          </div>

          <div ref="tablemoname" v-if="Number(visibilityFilters.showMoFullname) === 1"
               class="em-table-item em-header-item" style="flex: 0 0 400px;"
          >
            <div v-if="Number(totalItems) >3" @click="emulateClick('em-sorting-moname-ident')"
                 class="header-item-text"
            >
              Название МО в базе
            </div>
            <div v-else class="header-item-text">
              Название МО в базе
            </div>

            <div v-if="Number(totalItems) >3" v-tippy="{ content: 'Сортировка по полному названию МО',placement : 'top-start'}"
                 @click="sortingProcess('modbname')" id="em-sorting-moname-ident"
                 class="header-item-icon"
            >
              <template v-if="sorting.moDbName === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.moDbName === 'desc'">
                  <app-icon name="sort-amount-down"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
                <template v-else>
                  <app-icon name="sort-amount-up"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
              </template>
            </div>
          </div>

          <div ref="tableshortname" class="em-table-item em-header-item"
               style="flex: 0 0 250px;"
          >
            <div v-if="Number(totalItems) >3" @click="emulateClick('em-sorting-shortname-ident')"
                 class="header-item-text"
            >
              Краткое название
            </div>
            <div v-else class="header-item-text">
              Краткое название
            </div>

            <div v-if="Number(totalItems) >3" v-tippy="{ content: 'Сортировка по краткому названию МО',placement : 'top-start'}"
                 @click="sortingProcess('moshortname')" id="em-sorting-shortname-ident"
                 class="header-item-icon"
            >
              <template v-if="sorting.moShortName === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.moShortName === 'desc'">
                  <app-icon name="sort-amount-down"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
                <template v-else>
                  <app-icon name="sort-amount-up"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
              </template>
            </div>
          </div>

          <div ref="tablemembers" class="em-table-item em-header-item"
               style="flex: 0 0 180px;"
          >
            <div v-if="Number(totalItems) >3" @click="emulateClick('em-sorting-projmembers-ident')"
                 class="header-item-text"
            >
              Зачислены на проект
            </div>
            <div v-else class="header-item-text">
              Зачислены на проект
            </div>

            <div v-if="Number(totalItems) >3" v-tippy="{ content: 'Сортировка по количеству добавленных в проект',placement : 'top-start'}"
                 @click="sortingProcess('projmembers')" id="em-sorting-projmembers-ident"
                 class="header-item-icon"
            >
              <template v-if="sorting.projMembers === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.projMembers === 'desc'">
                  <app-icon name="sort-amount-down"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
                <template v-else>
                  <app-icon name="sort-amount-up"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
              </template>
            </div>
          </div>

          <div ref="tablemoturn" class="em-table-item em-header-item"
               style="flex: 0 0 200px;"
          >
            <div v-if="Number(totalItems) >3" @click="emulateClick('em-sorting-moturn-ident')"
                 class="header-item-text"
            >
              Очередь внедрения
            </div>
            <div v-else class="header-item-text">
              Очередь внедрения
            </div>

            <div v-if="Number(totalItems) >3" v-tippy="{ content: 'Сортировка по очереди внедрения',placement : 'top-start'}"
                 @click="sortingProcess('moturn')" id="em-sorting-moturn-ident"
                 class="header-item-icon"
            >
              <template v-if="sorting.moTurn === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.moTurn === 'desc'">
                  <app-icon name="sort-amount-down"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
                <template v-else>
                  <app-icon name="sort-amount-up"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
              </template>
            </div>
          </div>

          <div ref="tablemoturndate" class="em-table-item em-header-item"
               style="flex: 0 0 200px;"
          >
            <div v-if="Number(totalItems) >3" @click="emulateClick('em-sorting-moturndate-ident')"
                 class="header-item-text"
            >
              Дата внедрения
            </div>
            <div v-else class="header-item-text">
              Дата внедрения
            </div>

            <div v-if="Number(totalItems) >3" v-tippy="{ content: 'Сортировка по дате внедрения',placement : 'top-start'}"
                 @click="sortingProcess('moturndate')" id="em-sorting-moturndate-ident"
                 class="header-item-icon"
            >
              <template v-if="sorting.turnDate === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.turnDate === 'desc'">
                  <app-icon name="sort-amount-down"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
                <template v-else>
                  <app-icon name="sort-amount-up"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
              </template>
            </div>
          </div>

          <div ref="tablemail" class="em-table-item em-header-item"
               style="flex: 0 0 300px;"
          >
            <div class="header-item-text">
              Эл. почта
            </div>
          </div>

          <div ref="tablecomment" class="em-table-item em-header-item"
               style="flex: 0 0 300px;"
          >
            <div class="header-item-text">
              Комментарий
            </div>
          </div>

        </div>

        <template v-if="tableLoadingActive">
          <div class="em-table-loading-wr" :style="'width: '+tableHeaderWidth+'px;'">
            <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка" />
          </div>
        </template>
        <template v-else>

          <div v-if="Number(totalItems) === 0" class="em-table-noresults-wr"
               :style="'width: '+tableHeaderWidth+'px;'"
          >
            Нет информации для отображения. Добавьте организации в список
          </div>

          <template v-else v-for="(mo, moIndex) in statsList"
                    :key="mo.moid"
          >
            <div class="em-body-item-row" :class="{'em-disabled-style': tableBodyDisableStyle}">
              <div class="em-table-item table-category-wr em-td-border" style="flex: 0 0 200px; text-align: center;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                {{ mo.category.name }}
              </div>
              <div v-if="Number(visibilityFilters.showMoFullname) === 1" class="em-table-item table-name-wr em-td-border"
                   style="flex: 0 0 400px;" :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                {{ mo.name }}
              </div>

              <div class="em-table-item table-shortname-wr em-td-border" style="flex: 0 0 250px;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                {{ mo.shortname }}
              </div>

              <div @click="openRespTable(mo.moid)" class="em-table-item table-projmembers-wr em-td-border-left"
                   style="flex: 0 0 180px;" :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border-left': Number(moIndex) % 2 === 0}"
              >

                <div class="table-projmembers-text">
                  {{ mo.total_members }}
                </div>

                <div v-tippy="{ content: 'Подробнее', placement : 'top-start'}" class="table-projmembers-icon">
                  <app-icon name="eyes-on"
                            :size="30"
                            color="#1e8686"
                  />
                </div>
              </div>

              <div class="em-table-item table-moturn-wr em-td-border" style="flex: 0 0 200px; text-align: center;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                <input :id="'moturn-input-ident-'+mo.moid.toString()" @focusout="saveMoTurn($event, mo.moid, 'moturn-input-ident-'+mo.moid.toString())"
                       type="number" min="0"
                       class="vue-form-control" v-model="mo.turn_info.turnvalue"
                />
              </div>

              <div class="em-table-item table-moturndate-wr em-td-border" style="flex: 0 0 200px; text-align: center;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                <input :id="'moturndate-input-ident-'+mo.moid.toString()" @focusout="saveMoTurnDate($event, mo.moid, 'moturndate-input-ident-'+mo.moid.toString())"
                       type="tel" v-mask="'##.##.####'"
                       class="vue-form-control" v-model="mo.turn_info.turndate"
                />
              </div>

              <div class="em-table-item table-email-wr em-td-border" style="flex: 0 0 300px;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                <input :id="'momail-input-ident-'+mo.moid.toString()" @focusout="saveMail($event, mo.moid, 'momail-input-ident-'+mo.moid.toString())"
                       type="text" class="vue-form-control"
                       v-model="mo.mail"
                />
              </div>

              <div class="em-table-item table-comment-wr em-td-border-left" style="flex: 0 0 300px;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border-left': Number(moIndex) % 2 === 0}"
              >
                <textarea :id="'mocomment-input-ident-'+mo.moid.toString()" @focusout="saveMoComment($event, mo.moid, 'mocomment-input-ident-'+mo.moid.toString())"
                          rows="2" class="vue-form-control"
                          v-model="mo.comment"
                >
                </textarea>
              </div>

            </div>
            <ModalWindow v-if="Number(activeRespTableId) === Number(mo.moid)"
                         :header-text="mo.name"
                         modal-size="large"
                         @closemodal="activeRespTableId = 0; getStatsList();"
                         :key="mo.moid"
            >
              <RespTable
                  :project-id="projectId"
                  :mo-params="mo"
              />
            </ModalWindow>
          </template>
        </template>
      </div>
    </div>

    <div class="em-table-pagination-wr" v-if="servicePageCount !==0 && totalItems > servicePageCount && !tableLoadingActive">
      <vue-awesome-paginate
          :total-items="totalItems"
          :items-per-page="servicePageCount"
          v-model="activePage"
          :on-click="getStatsList"
      />
    </div>

  </template>

</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {getStatsListInfo} from "@/projects/MainStatsTable/services/getstatslist";
import ModalWindow from "@/projects/global/components/ModalWindow/ModalWindow.vue";
import {saveMoCommentInfo} from "@/projects/MainStatsTable/services/savemocomment";
import {saveMoTurnDateInfo} from "@/projects/MainStatsTable/services/savemoturndate";
import {saveMoTurnInfo} from "@/projects/MainStatsTable/services/savemoturn";
import {saveMoMail} from "@/projects/MoTable/services/savemomail";
import {processMoPart} from "@/projects/MoTable/services/processmopart";
import {processMoActivity} from "@/projects/MoTable/services/processmoactivity";
import RespTable from "@/projects/MainStatsTable/components/RespTable/RespTable.vue";
import * as dayjs from 'dayjs';
import {useUserStore} from "@/projects/global/store/user";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {app_config} from "@/projects/config/setconfig";

// PROPS
const props = defineProps({
  projectIdProps: {
    type: Number,
    default: 0
  },

  getParamActive: {
    type: Boolean,
    default: false
  }
});

// STORE
const userStore = useUserStore();

// DATA
const projectId = ref(0);

const exportActive = ref(false);

const projectName = ref('');

const noMoRespCount = ref(0);

const activeRespTableId = ref(0);

const enableInfoNormStyle = ref(false);

const enableInfoWarnStyle = ref(false);

const infoText = ref('');

const globalTableInfoText = ref('');

const globalTableWarnStyle = ref(false);

const openCategoryList = ref(false);

const noPaginOffset = ref(0);

const activePage = ref(1);

const totalItems = ref(0);

const projectMembersCount = ref(0);

const noMembersCount = ref(0);

const searchInput = ref('');

const pageCount = ref('5');

const statsList = ref([]);

const statsListFreeze = ref([]);

const categoryList = ref([]);

const tableLoadingActive = ref(false);

const tableBodyDisableStyle = ref(false);

const tableHeaderWidth = ref(0);

const visibilityFilters = ref({
  showMoFullname: '1'
});

const filtersList = ref({
  category: []
});

const sorting = ref({
  moCat:'0',
  moDbName: '0',
  moShortName: '0',
  projMembers: '0',
  moTurn: '0',
  turnDate: '0',
});

const tablecontainer = ref(null);
const tablecategory = ref(null);
const tablemoname = ref(null);
const tableshortname = ref(null);
const tablemembers = ref(null);
const tablemoturn = ref(null);
const tablemoturndate = ref(null);
const tablemail = ref(null);
const tablecomment = ref(null);

// METHODS
const checkAccess = ()=>{

  if([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.userrole.name)){

    if (props.getParamActive){

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      if (urlParams.get('projectid')) {
        projectId.value = Number(urlParams.get('projectid'));
      }
    }
    else {
      projectId.value = props.projectIdProps;
    }

    // if(!app_config.prod) {
    //   if (projectId.value === 0){
    //     projectId.value = 19;
    //   }
    // }

    // projectId.value = 0;

    if (projectId.value !== 0){
      getStatsList();
    }

    else {
      globalTableInfoText.value = 'Нет информации для отображения!';
    }
  }
  else {
    globalTableInfoText.value = 'Нет информации для отображения!';
  }

};

const exportInfo = async(target)=>{

  exportActive.value = true;

  try{

    const expResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({"action": "exportinfo", "exportarget": target, "projectid": projectId.value
      })
    });

    if(expResp.status.toString() !== '200'){

      infoText.value = 'При попытке экспорта данных возникла ошибка. Попробуйте повторить процедуру позже!';
    }
    else{

      let repAnswer = await expResp.blob();

      let fileUrl = await URL.createObjectURL(repAnswer);

      let link = await document.createElement("a");
      link.href = fileUrl;

      if(target === "exportmowomembers"){
        link.download =  "МО_не_подавшие_заявки_"+dayjs().format('DD_MM_YYYY')+".xlsx";
      }
      else if(target === "exportmoworesp"){
        link.download =  "МО_не_назначившие_ответственных_"+dayjs().format('DD_MM_YYYY')+".xlsx";
      }
      else if(target === "exportprojstats"){
        link.download =  projectName.value+"_"+dayjs().format('DD_MM_YYYY')+".xlsx";
      }

      await document.body.appendChild(link);
      await link.click();
      await document.body.removeChild(link);

    }
  }
  catch(e) {

    infoText.value = 'При попытке экспорта данных возникла ошибка. Попробуйте повторить процедуру позже!';

  }
  exportActive.value = false;
};

const addMoRoute =()=>{
  window.location.href = app_config.moListurl+'?projectid='+projectId.value.toString();
};

const routeToEnrol = ()=>{
  window.location.href = app_config.portalEnrolPluginUrl+'?projectid='+projectId.value.toString();
};

const routeToFilterMachine = ()=>{
  window.location.href = app_config.portalFilterMachineUrl+'?projectid='+projectId.value.toString();
};

const openRespTable = (moid)=>{

  if (Number(activeRespTableId.value) === 0){
    activeRespTableId.value = Number(moid);
  }
  else {
    if (Number(activeRespTableId.value) === Number(moid)){
      activeRespTableId.value = 0;
    }
    else {
      activeRespTableId.value = Number(moid);
    }
  }
};

const changeVisibilityFilters = (event, target)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  if (target === 'mofullname'){

    sorting.value.moDbName = 'notset';

    if(event.target.checked){
      visibilityFilters.value.showMoFullname = '1'
    }
    else {
      visibilityFilters.value.showMoFullname = '0'
    }

  }
  if (pageCount.value === 'все'){

    noPaginOffset.value = 0;
    statsList.value = [];
    statsListFreeze.value = [];

  }

  getStatsList();
};

const saveMoComment = async(event, moid, inputid)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  // await console.log("saveMoComment event.target.value: ", event.target.value);

  let matchList = await statsListFreeze.value.filter(item => Number(item.moid) === Number(moid));

  if (matchList.length > 0){

    if(event.target.value.trim() !== matchList[0].comment.trim()){

      let saveAnsw = await saveMoCommentInfo(projectId.value, moid, event.target.value.trim());

      await console.log("saveMoComment answer: ", saveAnsw);

      if(saveAnsw['status'] === 'ok'){
        if(document.getElementById(inputid)){

          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(75 155 55 / 48%)";
        }

      }
      else {
        infoText.value = "При попытке сохранить комментарий произошла ошибка!";
        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(249 0 0 / 32%)";

        }
      }

      if(document.getElementById(inputid)){
        setTimeout(function() {
          if(document.getElementById(inputid)){
            document.getElementById(inputid).style.boxShadow = "unset";
          }
        }, 3000);
      }
    }
  }

};

const saveMoTurnDate = async(event, moid, inputid)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  // await console.log("saveMoTurnDate event.target.value: ", event.target.value);

  let matchList = await statsListFreeze.value.filter(item => Number(item.moid) === Number(moid));

  if (matchList.length > 0){

    if(event.target.value !== matchList[0].turn_info.turndate){

      let checkDateFlag = true;

      let splitDate = await event.target.value.split('.');

      if(Number(splitDate[0]) > 31){
        checkDateFlag = false;
      }
      if (Number(splitDate[1]) > 12) {
        checkDateFlag = false;
      }
      if (Number(splitDate[2]) < 2023) {
        checkDateFlag = false;
      }

      if (checkDateFlag) {
        let saveAnsw = await saveMoTurnDateInfo(projectId.value, moid, event.target.value);
        await console.log("saveMoTurnDate answer: ", saveAnsw);
        if(saveAnsw['status'] === 'ok'){

          if(document.getElementById(inputid)){
            document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(75 155 55 / 48%)";

          }
        }
        else {
          infoText.value = "При попытке сохранить изменения даты внедрения произошла ошибка!";
          if(document.getElementById(inputid)){
            document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(249 0 0 / 32%)";

          }
        }
      }
      else {
        let upd_obj = statsList.value.findIndex((obj => Number(obj.moid) === Number(moid)));
        statsList.value[upd_obj]['turn_info']['turndate'] = '';
        if(document.getElementById(inputid)){

          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(249 0 0 / 32%)";

        }
      }

      if(document.getElementById(inputid)){
        setTimeout(function() {
          if(document.getElementById(inputid)){
            document.getElementById(inputid).style.boxShadow = "unset";
          }
        }, 3000);
      }


    }
  }

};

const saveMoTurn = async(event, moid, inputid)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  // await console.log("saveMoTurn event.target.value: ", event.target.value);

  let matchList = await statsListFreeze.value.filter(item => Number(item.moid) === Number(moid));

  if (matchList.length > 0){

    if(Number(event.target.value) !== matchList[0].turn_info.turnvalue){

      let saveAnsw = await saveMoTurnInfo(projectId.value, moid, event.target.value);

      // await console.log("saveMoTurnInfo answer: ", saveAnsw);

      if(saveAnsw['status'] === 'ok'){

        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(75 155 55 / 48%)";

        }
      }
      else {
        infoText.value = "При попытке сохранить изменения очереди внедрения произошла ошибка!";

        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(249 0 0 / 32%)";

        }
      }

      if(document.getElementById(inputid)){
        setTimeout(function() {
          if(document.getElementById(inputid)){
            document.getElementById(inputid).style.boxShadow = "unset";
          }
        }, 3000);
      }

    }
  }

};

const saveMail = async(event, moid, inputid)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  let matchList = await statsListFreeze.value.filter(item => Number(item.moid) === Number(moid));

  if (matchList.length > 0){
    if(event.target.value.trim() !== matchList[0].mail.trim()){
      let saveAnsw = await saveMoMail(moid, event.target.value.trim());
      await console.log("saveMoMail answer: ", saveAnsw);
      if(saveAnsw['status'] === 'ok'){
        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(75 155 55 / 48%)";

        }
      }
      else {
        infoText.value = "При попытке изменить почту МО произошла ошибка!";

        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(249 0 0 / 32%)";

        }
      }

      if(document.getElementById(inputid)){
        setTimeout(function() {
          if(document.getElementById(inputid)){
            document.getElementById(inputid).style.boxShadow = "unset";
          }
        }, 3000);
      }

    }
  }
};

const emulateClick = (target)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  document.getElementById(target).click();
};

const partsCheckboxClick = async(event, moid)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  let partFlag;
  if (event.target.checked){
    partFlag = 1;
  }
  else {
    partFlag = 0;
  }
  let answer = await processMoPart(projectId.value, moid, partFlag);

  console.log("processMoPart answer: ", answer);

  if (answer['status'] !=='ok') {
    infoText.value = "При попытке изменить параметр участия МО в проекте произошла ошибка!";
  }
};

const activityCheckboxClick = async(event, moid)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  let activityflag;
  if (event.target.checked){
    activityflag = 1;
  }
  else {
    activityflag = 0;
  }
  let answer = await processMoActivity(projectId.value, moid, activityflag);
  console.log("processMoActivity answer: ", answer);

  if(answer['status'] !== 'ok'){

    infoText.value = "При попытке изменить параметр активности МО произошла ошибка!";
  }

};

const processCategoryClick = ()=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  if(pageCount.value === 'все'){

    noPaginOffset.value = 0;
    statsList.value = [];
    statsListFreeze.value = [];
  }
  getStatsList();
};

const searchProcess = async()=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  if(searchInput.value !== ''){
    await getStatsList();
  }
};

const processOpenCategory = ()=>{

  let catDropdown = document.getElementById('table-category-dropdown');

  if(catDropdown){

    if (catDropdown.style.display === 'none'){
      catDropdown.style.display = 'flex';
      openCategoryList.value = true;
    }
    else {
      catDropdown.style.display = 'none';
      openCategoryList.value = false;
    }

  }
};

const getStatsList = async()=>{

  if(pageCount.value !== 'все'){
    tableLoadingActive.value = true;
  }
  else {
    tableBodyDisableStyle.value = true;
  }

  let answer = await getStatsListInfo(projectPostParams.value);
  await console.log("getStatsList answer: ", answer);

  if(answer['status'] === 'ok'){
    globalTableInfoText.value = "";
    globalTableWarnStyle.value = false;
    totalItems.value = await answer['info']['total_count'];
    noPaginOffset.value = await Number(answer['info']['nopagin_offset']);
    categoryList.value = await answer['info']['category_list'];
    projectMembersCount.value = await answer['info']['project_members'];
    noMembersCount.value = await answer['info']['no_members_count'];
    noMoRespCount.value = await answer['info']['no_mo_resp_count'];
    projectName.value = await answer['info']['project_name'];

    if (pageCount.value === 'все'){

      if(answer['info']['mo_list'].length > 0) {

        statsList.value = await statsList.value.concat(answer['info']['mo_list']);
        statsListFreeze.value = await statsListFreeze.value.concat(answer['info']['mo_list']);

      }

    }
    else {
      statsList.value = await answer['info']['mo_list'];
      statsListFreeze.value = await JSON.parse(JSON.stringify(statsList.value));
    }
  }
  else {
    globalTableInfoText.value="При попытке получить список МО возникла ошибка! Попробуйте перегрузить страницу или повторите попытку позже!";
    globalTableWarnStyle.value = true;
  }

  tableLoadingActive.value = false;
  tableBodyDisableStyle.value = false;

};

const fullReset = ()=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  activePage.value = 1;

  pageCount.value = '5';

  sorting.value.moCat = 'notset';

  sorting.value.moDbName = 'notset';

  sorting.value.moShortName = 'notset';

  sorting.value.moTurn = 'notset';

  sorting.value.turnDate = 'notset';

  filtersList.value.category = [];

  getStatsList();
};

const resetFiltersAndSorting = (exclude)=>{
  if(!['mocat'].includes(exclude)){
    sorting.value.moCat = 'notset';
  }
  if(!['modbname'].includes(exclude)){
    sorting.value.moDbName = 'notset';
  }
  if(!['moshortname'].includes(exclude)){
    sorting.value.moShortName = 'notset';
  }
  if(!['moturn'].includes(exclude)){
    sorting.value.moTurn = 'notset';
  }
  if(!['moturndate'].includes(exclude)){
    sorting.value.turnDate = 'notset';
  }

};

const filterProcess = (target)=>{

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  activePage.value = 1;

  resetFiltersAndSorting(target);

  if(pageCount.value === 'все'){
    statsList.value = [];
    statsListFreeze.value = [];
  }
  getStatsList();
};

const sortingProcess = (target)=>{

  activePage.value = 1;

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  resetFiltersAndSorting(target);

  if(target === 'mocat'){
    if(sorting.value.moCat === 'notset' || sorting.value.moCat === 'desc'){
      sorting.value.moCat = 'asc';
    }
    else {
      sorting.value.moCat = 'desc';
    }
  }
  else if(target === 'modbname'){
    if(sorting.value.moDbName === 'notset' || sorting.value.moDbName === 'desc'){
      sorting.value.moDbName = 'asc';
    }
    else {
      sorting.value.moDbName = 'desc';
    }
  }
  else if(target === 'moturn'){
    if(sorting.value.moTurn === 'notset' || sorting.value.moTurn === 'desc'){
      sorting.value.moTurn = 'asc';
    }
    else {
      sorting.value.moTurn = 'desc';
    }
  }
  else if(target === 'moshortname'){
    if(sorting.value.moShortName === 'notset' || sorting.value.moShortName === 'desc'){
      sorting.value.moShortName = 'asc';
    }
    else {
      sorting.value.moShortName = 'desc';
    }
  }
  else if(target === 'projmembers'){
    if(sorting.value.projMembers === 'notset' || sorting.value.projMembers === 'desc'){
      sorting.value.projMembers = 'asc';
    }
    else {
      sorting.value.projMembers = 'desc';
    }
  }
  else if(target === 'moturndate'){
    if(sorting.value.turnDate === 'notset' || sorting.value.turnDate === 'desc'){
      sorting.value.turnDate = 'asc';
    }
    else {
      sorting.value.turnDate = 'desc';
    }
  }

  if(pageCount.value === 'все'){
    noPaginOffset.value = 0;
    statsList.value = [];
    statsListFreeze.value = [];
  }

  getStatsList();
};

const resetSearch = ()=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;

  noPaginOffset.value = 0;
  searchInput.value = '';
  activePage.value = 1;
  getStatsList();
};

const onPageCountChange = ()=>{

  noPaginOffset.value = 0;

  infoText.value = "";
  enableInfoWarnStyle.value = false;

  if (pageCount.value === 'все'){
    statsList.value =[];
    statsListFreeze.value = [];
  }
  else {
    activePage.value = 1;
  }
  getStatsList();
};

const handleScroll = (event)=>{

  if(pageCount.value === 'все'){
    if(Number(totalItems.value> Number(globalNoPaginOffset.value))){
      let elScrollTop = event.currentTarget.scrollTop;
      let elClientHeight = event.currentTarget.clientHeight;
      let elScrollHeight = event.currentTarget.scrollHeight;

      if(elScrollTop + elClientHeight >= elScrollHeight){
        // console.log("endOfElem");
        if (Number(noPaginOffset.value) <= Number(totalItems.value)){
          getStatsList();
        }
      }
    }
  }
};

const handleConfigClick = ()=>{
  let drop = document.getElementById('em-table-config-dropdown');

  if(drop.style.display === 'none'){
    drop.style.display = 'flex';
  }
  else {
    drop.style.display = 'none';
  }
};

const handleOnClick = ()=>{
  let configDropDown = document.getElementById('em-table-config-dropdown');
  let configIcon = document.getElementById('em-table-config-icon');

  let catDropdown = document.getElementById('table-category-dropdown');
  let catText = document.getElementById('table-cat-text');

  if(configDropDown && configIcon){

    if (!configDropDown.contains(event.target) && !configIcon.contains(event.target)) {
      configDropDown.style.display = 'none';
    }

  }

  if(catDropdown && catText){

    if (!catDropdown.contains(event.target) && !catText.contains(event.target)) {
      catDropdown.style.display = 'none';
      openCategoryList.value = false;
    }
  }
};

// COMPUTED
const resetIconVisibility = computed(()=>{
  let reset = false;

  if (filtersList.value.category.length >0){
    reset = true;
  }

  if (sorting.value.moCat === 'asc' || sorting.value.moCat === 'desc'){
    reset = true;
  }

  if (sorting.value.moDbName === 'asc' || sorting.value.moDbName === 'desc'){
    reset = true;
  }

  if (sorting.value.moShortName === 'asc' || sorting.value.moShortName === 'desc'){
    reset = true;
  }

  if (sorting.value.projMembers === 'asc' || sorting.value.projMembers === 'desc'){
    reset = true;
  }

  if (sorting.value.moTurn === 'asc' || sorting.value.moTurn === 'desc'){
    reset = true;
  }

  if (sorting.value.turnDate === 'asc' || sorting.value.turnDate === 'desc'){
    reset = true;
  }

  return reset;
});

const servicePageCount = computed(()=>{
  if(pageCount.value === 'все'){
    return 0
  }
  else {
    return Number(pageCount.value)
  }
});

const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg"
});

const projectPostParams = computed(()=>{

  return {
    apiurl: app_config.apiUrl,
    projectid: projectId.value,
    filters_list: filtersList.value,
    visibility_filters: visibilityFilters.value,
    sorting: sorting.value,
    pagecount: pageCount.value,
    searchinput: searchInput.value,
    nopaginoffset: noPaginOffset.value,
    activepage: activePage.value

  }
});

const tableContainerWidth = computed(()=>{
  return tablecontainer.value.offsetWidth.toString();
});

// LIFECYCLE
onMounted(()=>{
  checkAccess();

  if (globalTableInfoText.value === ""){
    window.addEventListener('click', handleOnClick);

    sorting.value.moCat = 'notset';
    sorting.value.moDbName = 'notset';
    sorting.value.moShortName = 'notset';
    sorting.value.projMembers = 'notset';
    sorting.value.moTurn = 'notset';
    sorting.value.turnDate = 'notset';

    let catWidth = tablecategory.value.offsetWidth;
    let monameWidth = tablemoname.value.offsetWidth;
    let shortnameWidth = tableshortname.value.offsetWidth;
    let membersWidth = tablemembers.value.offsetWidth;
    let turnWidth = tablemoturn.value.offsetWidth;
    let turndateWidth = tablemoturndate.value.offsetWidth;
    let mailWidth = tablemail.value.offsetWidth;
    let commentWidth = tablecomment.value.offsetWidth;

    let sumWidth = Number(catWidth) + Number(shortnameWidth) + Number(membersWidth) + Number(turnWidth) + Number(turndateWidth) + Number(mailWidth)+ Number(commentWidth);

    if(visibilityFilters.value.showMoFullname === '1') {
      sumWidth = sumWidth +monameWidth;
    }

    tableHeaderWidth.value = sumWidth.toString();
  }
});

onUnmounted(()=>{
  window.removeEventListener('click', handleOnClick);
});

// WATCH
watch(
    searchInput,
    async (newVal, oldVal) => {
      if(newVal === '' && oldVal !==''){
        await getStatsList();
      }
    }
);

</script>

<style scoped>
.table-comment-wr textarea {
  resize: none;
}

.em-statsinfo-navigation-item {
  display: inline-block;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px white solid;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  color: white;
  font-weight: bold;
  background-color: #1e8686;
}
.em-statsinfo-navigation-item:hover {
  background-color: #145b5b;
}

.em-statsinfo-navigation-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
}

.select-background-position {
  background-position: right 0.75rem center;
}

.em-table-warnstyle {
  color: #dc3545 !important;
}

.em-globaltable-info-wr {
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.43em;
  color: #1e8686;
}

.em-statsinfo-maintitle {
  margin-bottom: 50px;
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}

.em-table-downloadlist-wr {
  margin-right: 20px;
  cursor: pointer;
}

.em-table-addmo-wr {
  margin-right: 20px;
  cursor: pointer;
}

.em-statsinfo-item-button {
  margin-left: 20px;
}

.em-statsinfo-item-text {
  display: flex;
  align-items: center;
}

.statsinfo-item-span {
  margin-left: 20px;
  color: #1768ab;
}

.em-statsinfo-item {
  display: flex;
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}

.em-statsinfo-container {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}

.table-projmembers-icon {
  padding-left: 20px;
}

.em-table-pagecount-select {
  padding-right: 30px;
}

.table-comment-wr {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-comment-wr textarea {
  margin: unset !important;
}

.table-moturndate-wr {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-moturndate-wr input {
  max-width: 150px;
  margin: unset !important;
}

.table-moturn-wr input {
  max-width: 150px;
  margin: unset !important;
}

.table-moturn-wr {
  display: flex;
  align-items: center;
  justify-content: center;
}

.em-table-reseticon-wr {
  cursor: pointer;
  margin-right: 20px;
}

.table-config-item-text {
  padding-left: 20px;
}

.em-table-config-item {
  margin-bottom: 20px;
  font-weight: bold;
  font-family: Helvetica;
  display: flex;
  align-items: center;
}

.em-table-config-dropdown {
  border: 1px solid #ced4da;
  padding: 15px;
  flex-direction: column;
  background-color: white;
  min-width: 300px;
  max-width: 400px;
  max-height: 600px;
  overflow: auto;
  position: absolute;
  z-index: 100;
}

.em-table-config-icon-wr {
  margin-right: 20px;
  cursor: pointer;
  position: relative;
}

.em-table-norm-style {
  color: #1e8686 !important;
}

.em-table-info-container {
  color: #dc3545;
  font-weight: bold;
  font-size: 1.3em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.dropdown-item-text {
  padding-left: 20px;
}

.category-dropdown-item {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-category-dropdown {
  box-sizing: border-box;
  background-color: white;
  padding: 10px;
  position: absolute;
  top: 47px;
  flex-direction: column;
  overflow: auto;
  max-height: 300px;
  width: 202px;
  border-left: 2px solid #ced4da;
  border-right: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
}

.category-header-tem {
  position: relative;
}

.em-disabled-style {
  pointer-events: none;
  opacity: 0.4;
}
.em-table-noresults-wr {
  font-weight: bold;
  font-size: 1.5em;
  color: #1e8686;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-table-loading-wr {
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-td-border-right {
  border-right: 1px solid #ced4da;
  border-left: none;
}
.em-td-border-left {
  border-right: none;
  border-left: 1px solid #ced4da;
}

.em-even-td-border-left {
  border-right: none !important;
  border-left: 1px solid white !important;
}
.em-even-td-border-right {
  border-right: 1px solid white !important;
  border-left: none !important;
}

.em-td-border {
  border-right: 1px solid #ced4da;
  border-left: 1px solid #ced4da;
}
.em-even-td-border {
  border-right: 1px solid white !important;
  border-left: 1px solid white !important;
}

.em-table-pagination-wr {
  display: flex;
  justify-content: center;
}

.table-email-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-email-wr input{
  margin: unset !important;
}

.table-projmembers-wr {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-name-wr {
  display: flex;
  align-items: center;
}

.table-shortname-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-category-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-category-wr input {
  max-width: 150px;
}

.header-item-text {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}

.em-even-color {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-table-item {
  word-break: break-word;
  box-sizing: border-box;
  padding: 5px;
}

.em-body-item-row {
  display: flex;
  justify-content: flex-start;
}

.em-table-pagecount-container select {
  width: inherit !important;
  margin: unset !important;
}
.em-table-pagecount-container {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-table-search-container {
  margin-top: 40px;
  margin-bottom: 40px;
}
.em-table-search-container .em-search-wr {
  width: 40% !important;
}

.header-item-icon {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.em-header-item {
  color: #686868;
  cursor: pointer;
  border: 1px solid #ced4da;
  display: flex;
  align-items: center;
  justify-content: center;
}
.em-header-item:hover {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-table-wr {
  display: flex;
  flex-direction: column;
  width: inherit;
}

.em-table-wr-scroll {
  height: 900px;
  overflow: scroll;
}

.em-table-wr-scrollauto {
  overflow: auto;
}

.em-table-container {
  min-height: 400px;
  font-family: Helvetica;
  font-weight: bold;
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
}

</style>