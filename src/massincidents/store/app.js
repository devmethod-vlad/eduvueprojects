import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            windowWidth: 0,
            windowHeight: 0,
            searchInput: '',
            isUserFromArm: false,
            userfingerprintid: '',
            userip: '',
            localHostInfo: {
                login: '',
                armnetaddr: '',
                hostname: '',
                armipaddr: '',
                armdefgw: '',
                armnetmask: ''
            },

            emiasData: {

                login: '',
                fio: '',
                mo: ''

            },

            openTimeSort: 0,

            cntCountSort: null,

            activekpilist: [],

            activesort: 'opentime',

            dataArr: [],

            kpilist: [],

            searchkpilist: [],

            kpisearchstring: '',

            targetIncident: {},

            fioInput: '',
            roleInput: '',
            moInput: '',
            phoneInput: '',
            mailInput: '',

            // alltime monthly weekly
            statisticFilter: 'alltime',

            // problems proposals
            incidentFilter: '',

            statisticAllSdSort: null,
            statisticMonthSdSort: null,
            statisticWeekSdSort: null,

            statisticAllVotesSort: null,
            statisticMonthVotesSort: null,
            statisticWeekVotesSort: null,

            // table statistic
            activeTab: 'table'


        }
    }
});