
function resizeMaket(appStore){
    // console.log("resizeMaket");
    if(appStore.questionShowMode !== "modal"){
        if(appStore.bannerElem){
            let bannerHeight = appStore.bannerElem.getBoundingClientRect().height;

            let addQuestHeight = 0;
            if(appStore.addQuestionElem){
                addQuestHeight = appStore.addQuestionElem.getBoundingClientRect().height;
            }

            if(appStore.listServiceElem){
                appStore.listServiceElem.style.minHeight = (bannerHeight-addQuestHeight).toString()+'px';
            }

        }
        if(appStore.questionListElem){
            // console.log("resizeMaket if(appStore.questionListElem)");
            // console.log("resizeMaket appStore.questionListElem: ", appStore.questionListElem);
            let rect = appStore.questionListElem.getBoundingClientRect();

            let listOffset = rect.y + window.pageYOffset;
            // console.log("resizeMaket listOffset: ", listOffset);

            if(appStore.bannerContentElem){
                // console.log("resizeMaket if(appStore.bannerContentElem): ");

                // console.log("resizeMaket appStore.bannerContentElem: ", appStore.bannerContentElem);

                let bannerElRect = appStore.bannerContentElem.getBoundingClientRect();

                // console.log("resizeMaket bannerElRect: ", bannerElRect);

                let bannerElemBottomOffset = bannerElRect.y + bannerElRect.height+window.pageYOffset;

                // console.log("resizeMaket bannerElemBottomOffset: ", bannerElemBottomOffset);

                if(Number(listOffset) > Number(bannerElemBottomOffset)){
                    let diff = Number(listOffset) - Number(bannerElemBottomOffset);
                    // console.log("resizeMaket diff: ", diff);
                    appStore.bannerContentElem.style.minHeight = (bannerElRect.height+diff).toString()+'px';
                }
            }
        }
    }
}

function resetMaketSizes(appStore) {
    if(appStore.bannerContentElem){
        appStore.bannerContentElem.style.removeProperty('min-height');
    }
    if(appStore.listServiceElem){
        appStore.listServiceElem.style.removeProperty('min-height');
    }
}

export {resizeMaket, resetMaketSizes}