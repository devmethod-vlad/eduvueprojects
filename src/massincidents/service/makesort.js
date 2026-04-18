import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function makeSort(appStore, freezeArrStore, useInitial=false){

    let dataCopy = [];

    if(useInitial){
        dataCopy = JSON.parse(JSON.stringify(freezeArrStore.$state.dataArr));
    }
    else {
        dataCopy = JSON.parse(JSON.stringify(appStore.$state.dataArr));
    }

    if (appStore.$state.activeTab === 'table'){
        if(appStore.$state.openTimeSort === 0){
            appStore.dataArr = dataCopy.sort((a, b) => (dayjs(b.open_time, "DD-MM-YYYY")> dayjs(a.open_time, "DD-MM-YYYY")) ? 1 : -1);
        }
        if(appStore.$state.openTimeSort === 1){
            appStore.dataArr = dataCopy.sort((a, b) => (dayjs(a.open_time, "DD-MM-YYYY")> dayjs(b.open_time, "DD-MM-YYYY")) ? 1 : -1);
        }
        if(appStore.$state.cntCountSort === 0){
            appStore.dataArr = dataCopy.sort((a, b) => (b.cnt_sd > a.cnt_sd) ? 1 : -1);
        }
        if(appStore.$state.cntCountSort === 1){
            appStore.dataArr = dataCopy.sort((a, b) => (a.cnt_sd > b.cnt_sd) ? 1 : -1);
        }
    }

    if (appStore.$state.activeTab === 'statistic'){
        if(appStore.$state.statisticAllSdSort === 0){
            appStore.dataArr = dataCopy.sort((a, b) => (b.cnt_sd > a.cnt_sd) ? 1 : -1);
        }

        if(appStore.$state.statisticAllSdSort === 1){
            appStore.dataArr = dataCopy.sort((a, b) => (a.cnt_sd > b.cnt_sd) ? 1 : -1);
        }

        if(appStore.$state.statisticMonthSdSort === 0){
            appStore.dataArr = dataCopy.sort((a, b) => (b.month_count > a.month_count) ? 1 : -1);
        }
        if(appStore.$state.statisticMonthSdSort === 1){
            appStore.dataArr = dataCopy.sort((a, b) => (a.month_count > b.month_count) ? 1 : -1);
        }

        if(appStore.$state.statisticWeekSdSort === 0){
            appStore.dataArr = dataCopy.sort((a, b) => (b.week_count > a.week_count) ? 1 : -1)
        }

        if(appStore.$state.statisticWeekSdSort === 1){
            appStore.dataArr = dataCopy.sort((a, b) => (a.week_count > b.week_count) ? 1 : -1)
        }

        if (appStore.$state.statisticAllVotesSort === 0){
            appStore.dataArr = dataCopy.sort((a, b) => (b.db_count > a.db_count) ? 1 : -1)
        }

        if (appStore.$state.statisticAllVotesSort === 1){
            appStore.dataArr = dataCopy.sort((a, b) => (a.db_count > b.db_count) ? 1 : -1)
        }
        if (appStore.$state.statisticMonthVotesSort === 0){
            appStore.dataArr = dataCopy.sort((a, b) => (b.db_month_count > a.db_month_count) ? 1 : -1)
        }

        if (appStore.$state.statisticMonthVotesSort === 1){
            appStore.dataArr = dataCopy.sort((a, b) => (a.db_month_count > b.db_month_count) ? 1 : -1)
        }
        if (appStore.$state.statisticWeekVotesSort === 0){
            appStore.dataArr = dataCopy.sort((a, b) => (b.db_db_week_count > a.db_week_count) ? 1 : -1)
        }

        if (appStore.$state.statisticWeekVotesSort === 1){
            appStore.dataArr = dataCopy.sort((a, b) => (a.db_week_count > b.db_week_count) ? 1 : -1)
        }

    }
}

export {makeSort};