async function prepareCheckBoxes(store, id_list, prefill){
    await checkCheckBoxesInitial(store, id_list, prefill);
    await checkCheckBoxState(store, prefill);
}

async function checkCheckBoxesInitial(store, id_list, prefill){
    let storeCopy = await JSON.parse(JSON.stringify(store.$state));

    if (prefill === 1){

        storeCopy.checkList = []
        storeCopy.checkListFull = [];

        id_list.forEach((listItem)=>{

            if(!storeCopy.checkListReverse.includes(listItem.moid)){
                storeCopy.checkList.push(listItem.moid)
            }

            let includeFlag = false;

            storeCopy.checkListReverseFull.forEach((item)=>{
                if(Number(listItem.moid)===Number(item.moid)){
                    includeFlag = true;
                }
            });

            if(!includeFlag){
                storeCopy.checkListFull.push(listItem);
            }

        });
    }
    await store.$patch(storeCopy);

}

async function checkCheckBoxState(store, prefill){
    let storeCopy = await JSON.parse(JSON.stringify(store.$state));

    if(prefill === 1){
        storeCopy.checkAllCheckBoxList = [store.$state.selectAllCheckBoxId];
    }
    else{
        storeCopy.checkAllCheckBoxList = [];
    }
    await store.$patch(storeCopy);
}

function checkAllPage(store, id_list, prefill){
    let storeCopy = {...store.$state};
    id_list.forEach((listItem)=>{
        if(!storeCopy.checkList.includes(listItem.moid)){
            storeCopy.checkList.push(listItem.moid)
        }

        let includeFlag = false;

        storeCopy.checkListFull.forEach((item)=>{
            if(Number(listItem.moid)===Number(item.moid)){
                includeFlag = true;
            }
        });

        if(!includeFlag){
            storeCopy.checkListFull.push(listItem)
        }

        if (prefill === 1){
            storeCopy.checkListReverse = storeCopy.checkListReverse.filter(id => Number(id) !== Number(listItem.moid));
            storeCopy.checkListReverseFull = storeCopy.checkListReverseFull.filter(item => Number(item.moid) !== Number(listItem.moid));
        }
    });
    store.$patch(storeCopy);
}

function unCheckAllPage(store, id_list, prefill){

    let storeCopy = {...store.$state};

    id_list.forEach((listItem)=>{

        storeCopy.checkList = storeCopy.checkList.filter(id=>Number(id) !== Number(listItem.moid));
        storeCopy.checkListFull = storeCopy.checkListFull.filter(item=>Number(item.moid) !== Number(listItem.moid));

        if (prefill === 1){
            if(!storeCopy.checkListReverse.includes(listItem.moid)){
                storeCopy.checkListReverse.push(listItem.moid)
            }

            let includeFlag = false;

            storeCopy.checkListReverseFull.forEach((item)=>{
                if(Number(listItem.moid)===Number(item.moid)){
                    includeFlag = true;
                }
            });

            if(!includeFlag){
                storeCopy.checkListReverseFull.push(listItem)
            }
        }
    })
    store.$patch(storeCopy);
}

function addToCheckList(store, moid, mainmo_id, prefill){
    let storeCopy = {...store.$state};
    if(!storeCopy.checkList.includes(moid)){
        storeCopy.checkList.push(moid)
    }

    let includeFlag = false;

    storeCopy.checkListFull.forEach((item)=>{
        if(Number(moid)===Number(item.moid)){
            includeFlag = true;
        }
    });

    if(!includeFlag){
        storeCopy.checkListFull.push({'moid': moid, 'mainmo_id':mainmo_id})
    }

    if (prefill === 1){
        storeCopy.checkListReverse = storeCopy.checkListReverse.filter(id => Number(id) !== Number(moid));
        storeCopy.checkListReverseFull = storeCopy.checkListReverseFull.filter(item => Number(item.moid) !== Number(moid));
    }

    store.$patch(storeCopy);
}

function removeFromCheckList(store, moid, mainmo_id, prefill){
    let storeCopy = {...store.$state};

    storeCopy.checkList = storeCopy.checkList.filter(id => Number(id) !== Number(moid));
    storeCopy.checkListFull = storeCopy.checkListFull.filter(item => Number(item.moid) !== Number(moid));

    if (prefill === 1){
        if(!storeCopy.checkListReverse.includes(moid)){
            storeCopy.checkListReverse.push(moid)
        }

        let includeFlag = false;

        storeCopy.checkListReverseFull.forEach((item)=>{
            if(Number(moid)===Number(item.moid)){
                includeFlag = true;
            }
        });

        if(!includeFlag){
            storeCopy.checkListReverseFull.push({'moid': moid, 'mainmo_id':mainmo_id})
        }

    }
    store.$patch(storeCopy);
}

function selectAllPageMuSynchro(mo, mu, id_list){
    let muCopy = {...mu.$state};

    if(muCopy.prefill === 1){
        muCopy.checkListReverseFull = muCopy.checkListReverseFull.filter(item=>!id_list.includes(item.mainmo_id.toString()));
        let muCheckListReverse = [];
        muCopy.checkListReverseFull.forEach((item)=>{
            muCheckListReverse.push(item.moid.toString())
        });
        muCopy.checkListReverse = muCheckListReverse;
    }
    else {

        mo.$state.info_list.forEach((moListItem)=>{
            moListItem.mu_list.forEach((muid)=>{
                if(!muCopy.checkList.includes(muid.toString())){
                    muCopy.checkList.push(muid.toString());
                }

                let includeFlag = false;

                muCopy.checkListFull.forEach((fullItem)=>{
                    if(Number(fullItem.moid) === Number(muid)){
                        includeFlag = true;
                    }
                })

                if(!includeFlag){
                    muCopy.checkListFull.push({'moid': muid, 'mainmo_id':moListItem.moid});
                }

            });

            muCopy.checkListReverse = [];
            muCopy.checkListReverseFull = [];
        });
    }

    mu.$patch(muCopy);
}

function unSelectAllPageMuSynchro(mo, mu){
    let muCopy = {...mu.$state};

    if(muCopy.prefill === 1){

        mo.$state.info_list.forEach((moListItem)=>{
            moListItem.mu_list.forEach((muid)=>{
                if(!muCopy.checkListReverse.includes(muid.toString())){
                    muCopy.checkListReverse.push(muid.toString());
                }

                let includeFlag = false;

                muCopy.checkListReverseFull.forEach((fullItem)=>{
                    if(Number(fullItem.moid) === Number(muid)){
                        includeFlag = true;
                    }
                })

                if(!includeFlag){
                    muCopy.checkListReverseFull.push({'moid': muid, 'mainmo_id':moListItem.moid});
                }

            });

        });

    }
    else {
        muCopy.checkList = muCopy.checkList.filter(id =>!moListItem.mu_list.includes(id.toString()));
        muCopy.checkListFull = muCopy.checkListFull.filter(item =>!moListItem.mu_list.includes(item.moid.toString()));
    }

    mu.$patch(muCopy);
}

function addToMoCheckListMuSynchro(mo_item, mu){
    let muCopy = {...mu.$state};

    if(muCopy.prefill === 1){
        muCopy.checkListReverseFull = muCopy.checkListReverseFull.filter(item=>Number(item.mainmo_id) !== Number(mo_item.moid));
        let muCheckListReverse = [];
        muCopy.checkListReverseFull.forEach((item)=>{
            muCheckListReverse.push(item.moid.toString())
        });
        muCopy.checkListReverse = muCheckListReverse;
    }
    else {

        mo_item.mu_list.forEach((muid)=>{
            if(!muCopy.checkList.includes(muid.toString())){
                muCopy.checkList.push(muid.toString());
            }

            let includeFlag = false;

            muCopy.checkListFull.forEach((fullItem)=>{
                if(Number(fullItem.moid) === Number(muid)){
                    includeFlag = true;
                }
            })

            if(!includeFlag){
                muCopy.checkListFull.push({'moid': muid, 'mainmo_id':mo_item.moid});
            }

        });
    }

    mu.$patch(muCopy);
}

function removeFromMoCheckListMuSynchro(mo_item, mu){
    let muCopy = {...mu.$state};

    if(muCopy.prefill === 1){

        mo_item.mu_list.forEach((muid)=>{
            if(!muCopy.checkListReverse.includes(muid.toString())){
                muCopy.checkListReverse.push(muid.toString());
            }

            let includeFlag = false;

            muCopy.checkListReverseFull.forEach((fullItem)=>{
                if(Number(fullItem.moid) === Number(muid)){
                    includeFlag = true;
                }
            })

            if(!includeFlag){
                muCopy.checkListReverseFull.push({'moid': muid, 'mainmo_id':mo_item.moid});
            }

        });
    }
    else {
        muCopy.checkList = muCopy.checkList.filter(id =>!mo_item.mu_list.includes(id.toString()));
        muCopy.checkListFull = muCopy.checkListFull.filter(item =>!mo_item.mu_list.includes(item.moid.toString()));
    }

    mu.$patch(muCopy);
}


export {
    prepareCheckBoxes,
    checkCheckBoxesInitial,
    checkCheckBoxState,
    checkAllPage,
    unCheckAllPage,
    addToCheckList,
    removeFromCheckList,
    selectAllPageMuSynchro,
    unSelectAllPageMuSynchro,
    addToMoCheckListMuSynchro,
    removeFromMoCheckListMuSynchro
}