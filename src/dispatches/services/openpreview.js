function openDispatchPreview(preview, item){
    preview.dispatch_id = item.dispatch_id;
    preview.methodList = item.method;
    preview.title = item.title;
    preview.telegram_text = item.telegram_text;
    preview.created_at = item.created_at;
    preview.modified_at = item.modified_at;
    preview.start_time = item.start_time;
    preview.end_time = item.end_time;
    preview.active_dispatch_start_time = item.active_dispatch_start_time;
    preview.dispatch_result_start_time = item.dispatch_result_start_time;
    preview.dispatch_result_end_time = item.dispatch_result_end_time;
    preview.dispatchStatus={
        id: item.status_id,
        name: item.status_name,
        db_name: item.status_db_name
    }
    preview.dispatch_files = item.dispatch_files;
}
export {openDispatchPreview}