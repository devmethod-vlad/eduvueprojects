export let fmState = {

    updateActive: false,
    problemLastUpdate: false,
    lastUpdateTime: '',

    isFirstRequest: true,

    rewriteSwitch: 1,

    saveState: false,

    roleState:{
        activeList: [],
        inactiveList: [],
        activeAll: false
    },

    specState:{
        activeList: [],
        inactiveList: [],
        activeAll: false,
    },

    moState:{
        activeList: [],
        inactiveList: [],
        disableAll: false
    },

    userState: {
        activeList: [],
        inactiveList: [],
        disableAll: false,
    }
}