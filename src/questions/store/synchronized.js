import { defineStore } from 'pinia';

export const useSynchroStore = defineStore('synchrostore', {
    state: () => {
        return {

            update: false,

            updateParams:{
                userid: 0,
                roleid: 0,
                statusId: 0,
                spaceId: 0,
                activePage: 1,
                countPerPage: 5,
                sorting: 'desc',
                searchInput: '',
                enableSearch: 0
            },

            renderList: [],
            availableStatuses: [],
            availableSpaces: [],

            paramsInconsistent: false,

            activeQuestionError: false,

            activeQuestionNeedUpdate: false,

            userTokenOutOfSync: false,

            wikiAuthOutOfSync: false,

            availableSpacesOutOfSync: {
                flag: false,
                info: {}
            },

            availableStatusesOutOfSync: {
                flag: false,
                info: {

                }
            },

            renderListOutOfSync: {
                flag: false,
                info:{
                    orderListComposition: {
                        flag: false,
                        info: {}
                    },

                    statusId: {
                        flag: false,
                        info:[]
                    },

                    answerId: {
                        flag: false,
                        info: []
                    },

                    questionText: {
                        flag: false,
                        info: []
                    },

                    answerText: {
                        flag: false,
                        info: []
                    },

                    questionAttachments: {
                        flag: false,
                        info: []
                    },

                    answerAttachments: {
                        flag: false,
                        info: []
                    }

                }
            },

            errorOnSync: false,

            criticalQuestionsId: [],

            questionIdNeedUpdate: []
        }

    }
})