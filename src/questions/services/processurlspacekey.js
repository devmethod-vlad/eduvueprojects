import {app_config} from "@/questions/config/setconfig";

function setUrlSpaceKey(spacekey) {
    let localSpaceInfo = {}
    localSpaceInfo[app_config.localStorage.eduQuestionSpaceKey.props.spacekey] = spacekey;
    localStorage.setItem(app_config.localStorage.eduQuestionSpaceKey.key, JSON.stringify(localSpaceInfo));
}

function processUrlSpaceKey(appStore){
    let storageSpaceKey = app_config.localStorage.eduQuestionSpaceKey.key;
    if (appStore.$state.urlParams.urlspacekey !==''){
        if (localStorage.getItem(storageSpaceKey)){
            let spaceLocalStore = JSON.parse(localStorage.getItem(storageSpaceKey))
            if (spaceLocalStore.spaceKey !== appStore.$state.urlParams.urlspacekey){
                setUrlSpaceKey(appStore.$state.urlParams.urlspacekey);
            }
        }
        else {
            setUrlSpaceKey(appStore.$state.urlParams.urlspacekey);
        }
    }
    // else {
    //     if (localStorage.getItem(storageSpaceKey)){
    //         localStorage.removeItem(storageSpaceKey);
    //     }
    // }
}

export {processUrlSpaceKey}