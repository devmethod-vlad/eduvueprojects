function setRedactFromId(dispatch_id, dispatches, redactDispatch){
    // console.log("setRedactFromId");
    let copyRedactDispatch = JSON.parse(JSON.stringify(redactDispatch.$state));

    if (dispatches.$state.renderList.length > 0){
        for (let item of dispatches.$state.renderList){
            if (Number(dispatch_id) === Number(item.dispatch_id)){
                redactDispatch.$reset();
                redactDispatch.dispatch_id = item.dispatch_id;
                redactDispatch.upload_files = [];
                redactDispatch.deny_upload_files = [];
                redactDispatch.upload_infoarray = [];
                redactDispatch.simul_files = 0;
                redactDispatch.activeMethod = 'telegram';

                let methodList = [];

                for (let mItem of item.method){
                    methodList.push(mItem.db_name);
                }

                redactDispatch.methodList = methodList;
                redactDispatch.title = item.title;
                redactDispatch.telegram_text = item.telegram_text;

                if (item.start_time !== ''){
                    redactDispatch.scheduleType = 'scheduled';
                    redactDispatch.dispatchDate = item.start_time.split(',')[0];
                    redactDispatch.dispatchTime = item.start_time.split(',')[1];
                }

                redactDispatch.dispatch_files = item.dispatch_files;

                redactDispatch.dispatchStatus.id = item.status_id;
                redactDispatch.dispatchStatus.name = item.status_name;
                redactDispatch.dispatchStatus.db_name = item.status_db_name;

                redactDispatch.modalVisible = copyRedactDispatch.modalVisible;
                redactDispatch.modalText = copyRedactDispatch.modalText;
                redactDispatch.modalPurpose = copyRedactDispatch.modalPurpose;
                redactDispatch.modalTarget = copyRedactDispatch.modalTarget;
            }
        }
    }
}

export {setRedactFromId}