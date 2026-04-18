<template>
    <modal-content
            modalsize="middle"
            @close-modal="emits('closebotstat')"
    >
        <div class="qst-telbot-stat-container">
            <div class="qst-telbot-stat-title">
                Всего пользователей:  {{ telUsersCount }}
            </div>
            <div class="qst-telbot-stat-select-period">
                <div class="qst-telbot-select-period-title">
                    Выбор временного периода:
                </div>

                <select
                  v-model="timePeriod"
                  @change="changeTimePeriod()"
                  class="vue-form-select " aria-label="Выбор временного периода">
                    <option value="7">
                        За неделю
                    </option>
                    <option value="30">
                        За месяц
                    </option>
                </select>
            </div>

            <div class="qst-telbot-stat-title">
                Прирост пользователей бота по дням:
            </div>

            <div ref="newuserschart" id="qst-telbot-stat-newusers-chart">

            </div>

            <div
              @click.stop.prevent="downlodStats('newusers')"
              class="qst-telbot-stat-download"
            >
                <div class="qst-stat-download-icon">
                    <app-icon
                      name="download"
                      :size="15"
                    />
                </div>
                <div class="qst-stat-download-text">
                    Скачать статистику за все время
                </div>
            </div>

            <div class="qst-telbot-stat-title">
                Кол-во поисковых запросов в боте по дням:
            </div>
            <div ref="perdaychart" id="qst-telbot-stat-phrazesperday-chart">

            </div>
            <div @click="downlodStats('phrazesperday')"
                 class="qst-telbot-stat-download"
            >
                <div class="qst-stat-download-icon">
                    <app-icon
                      name="download"
                      :size="15"
                    />
                </div>
                <div class="qst-stat-download-text">
                    Скачать статистику за все время
                </div>
            </div>
            <div class="qst-telbot-stat-title">
                Статистика поисковых запросов в боте:
            </div>

            <template v-if="perDayPhrazeTableVisible">
                <div ref="phrazetablestat" id="qst-telbot-stat-phrazestable">

                </div>
            </template>

            <div
              @click="downlodStats('phrazesstats')"
              class="qst-telbot-stat-download"
            >
                <div class="qst-stat-download-icon">
                    <app-icon
                      name="download"
                      :size="15"
                    />
                </div>
                <div class="qst-stat-download-text">
                    Скачать статистику за все время
                </div>
            </div>

        </div>

    </modal-content>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import {getPhrazeTableStat} from "@/questions/components/PrivateOffice/components/DropDownMenu/components/TelBotStat/services/getphrazetablestat";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import {getPerDayPhrazeStat} from "@/questions/components/PrivateOffice/components/DropDownMenu/components/TelBotStat/services/getperdayphrazestat";
import {getNewUserStats} from "@/questions/components/PrivateOffice/components/DropDownMenu/components/TelBotStat/services/getnewuserstat";
import ModalContent from "@/common/ui/ModalContent/ModalContent.vue";
import {onMounted, ref} from "vue";
import ApexCharts from "apexcharts";

const locales = [{
    "name": "ru",
    "options": {
        "toolbar": {
            "exportToSVG": "Скачать в SVG формате",
            "exportToPNG": "Скачать в PNG формате",
            "exportToCSV": "Скачать в CSV формате",
            "menu":"Меню",
            "selection": "Выделение",
            "selectionZoom": "Увеличение выделения",
            "zoomIn": "Увеличить",
            "zoomOut": "Уменьшить",
            "pan": "Масштабировать",
            "reset": "Сбросить увеличение/уменьшение"
        }
    }
}]

let newUsersChartdata={chart: {
        type: 'bar',
        height: 350,
        locales: locales,
        defaultLocale: "ru"
    },
    xaxis: {
        type: 'category'
    }
};
let phrazeTableData = {
    columns: [{
        id: 'created_at',
        name: 'Дата',
        sort: {
            compare: (a, b) => {

                a = dayjs(a, "DD-MM-YYYY");
                b = dayjs(b, "DD-MM-YYYY")

                if (a > b) {
                    return 1;
                } else if (b > a) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }, {
        id: 'searchphraze',
        name: 'Поисковый запрос'
    }, {
        id: 'count',
        name: 'Кол-во'
    }],
    data:[],
    sort: true,
    style: {
        table: {
            'font-weight': 'bold',
            'color':'#6a6a6a'
        },
        th: {
            'font-size': '1.3em',
            'text-align': 'center'
        },
    },
    language: {
        'search': {
            'placeholder': '🔍 Введите ключевое слово...'
        },
        'noRecordsFound': 'Не найдены результаты для отображения',
    }
}

let perDayChartData={chart: {
        type: 'bar',
        height: 350,
        locales: locales,
        defaultLocale: "ru",
        colors:['#F44336', '#E91E63', '#9C27B0']
    },
    xaxis: {
        type: 'category'
    }
};

let newUsersChart;
let perDayChart;
let phrazeStatTable;

// EMITS
const emits = defineEmits(['closebotstat']);


// DATA
const telUsersCount = ref(0);
const timePeriod = ref('7');

const newuserschart = ref(null);
const perdaychart = ref(null);
const phrazetablestat = ref(null);

const perDayPhrazeTableVisible = ref(true);

// METHODS
const changeTimePeriod = async ()=>{
    if (newUsersChart){
        await newUsersChart.destroy();
    }
    if (perDayChart){
        await perDayChart.destroy();
    }

    await setNewUsersStats();
    await setPhrazeCountStats();
    await setPhrazeTableStats();
}

const setNewUsersStats = async (download=false)=>{
    let statAnswer = await getNewUserStats(download, timePeriod.value);
    if(!download){
        if (statAnswer.status === 'ok'){
            let infodata = await statAnswer['info']['new_user_data'];
            let copyChartData = await {...newUsersChartdata};
            copyChartData.series=[{data:infodata}];
            newUsersChartdata = await {...copyChartData};
            telUsersCount.value = await statAnswer['info']['users_count'];
            // await console.log("newuserschart.value: ", newuserschart.value);
            newUsersChart = await new ApexCharts(newuserschart.value, newUsersChartdata);
            await newUsersChart.render();
        }
    }
}

const setPhrazeCountStats = async (download=false)=>{

    let statAnswer = await getPerDayPhrazeStat(download, timePeriod.value);
    if(!download){
        if (statAnswer.status === 'ok'){
            let perDayData = await statAnswer['info']['phrazes_data'];

            let copyPerDayChartData = {...perDayChartData};
            copyPerDayChartData.series=[{data:perDayData}];
            perDayChartData = {...copyPerDayChartData};
            perDayChart = await new ApexCharts(perdaychart.value, perDayChartData);
            await perDayChart.render();
        }
    }
}

const setPhrazeTableStats = async (download=false)=>{
    if(!download){
        perDayPhrazeTableVisible.value=false;
    }
    let statAnswer = await getPhrazeTableStat(download, timePeriod.value);
    if(!download){
        if (statAnswer['status']==='ok'){
            perDayPhrazeTableVisible.value=true;
            let tableData = await statAnswer['info']['infodata'];
            let copyPhrazeTable = {...phrazeTableData};
            copyPhrazeTable.data=tableData;
            phrazeTableData = {...copyPhrazeTable};
            phrazeStatTable = await new Grid(phrazeTableData).render(phrazetablestat.value);
        }
    }
}

const downlodStats = async (target)=>{
    if (target==='newusers'){
        await setNewUsersStats(true);
    }
    else if (target==='phrazesperday'){
        await setPhrazeCountStats(true);
    }
    else if (target==='phrazesstats'){
        await setPhrazeTableStats(true);
    }
}

// LIFECYCLE

onMounted(async ()=>{
    await setNewUsersStats();
    await setPhrazeCountStats();
    await setPhrazeTableStats()
})

</script>



<style scoped>
#qst-telbot-stat-newusers-chart{
    margin-bottom: 20px;
}

#qst-telbot-stat-phrazestable {
    margin-bottom: 20px;
}

.qst-stat-download-icon {
    margin-right: 10px;
}

.qst-telbot-stat-download {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 30px;
}

.qst-telbot-stat-select-period {
    margin-bottom: 30px;
}

.qst-telbot-stat-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
}

.qst-telbot-select-period-title {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px;
}

</style>