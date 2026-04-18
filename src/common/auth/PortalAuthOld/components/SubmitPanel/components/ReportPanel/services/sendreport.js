
async function sendReport(app_config, message){
    const url = 'https://api.telegram.org/bot'+app_config.botToken+'/sendMessage';

    for(let noteItem of app_config.tlgrmNotifyList){
        let data = {chat_id:noteItem,text:message, parse_mode:'HTML'};
        try {
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            await console.error('Ошибка:', error);
        }
    }
}

export {sendReport}