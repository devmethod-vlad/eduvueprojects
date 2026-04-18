import {app_config} from "@/aisearch/config/setconfig";

const cleanString = (input)=>{
    // Удаляем HTML-теги
    let result = input.replace(/<[^>]*>/g, '');

    // Заменяем переводы строк на пробелы
    result = result.replace(/\s*\n+\s*/g, ' ');

    // Заменяем множественные пробелы на один пробел
    result = result.replace(/\s+/g, ' ');

    // Убираем пробелы в начале и конце строки
    result = result.trim();

    return result;
}

async function getSearchResults(app){

    try {

        app.loadingResults = true;
        app.resultPanelVisible = true;
        app.results = [];
        app.renderList = [];

        let cleanQuery = cleanString(app.$state.query);

        let searchResp = await fetch(app_config.searchUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                query: cleanQuery
            })
        });

        let respStatus = Number(searchResp.status);

        let searchAnswer = await searchResp.json();

        console.log("РЕЗУЛЬТАТЫ ПОИСКА: ", searchAnswer);

        if (respStatus === 200){
            app.loadingResults = false;
            if(searchAnswer.results.length > 0){
                app.noResults = false;
                app.results = searchAnswer.results;
                app.resultPanelVisible = true;
                await setRenderParams(app);

            }
            else {
                let appCopy = JSON.parse(JSON.stringify(app.$state));
                app.$reset();
                app.query = appCopy.query;
                app.noResults = true;
                app.resultPanelVisible = true;
                app.searchElemHeight = appCopy.searchElemHeight;
            }
        }
        else {
            app.loadingResults = false;
        }

    }
    catch (error) {
        app.loadingResults = false;
        console.log(error);

    }
}

function chunkArray(array, chunkSize) {
    if (chunkSize <= 0) {
        throw new Error("Chunk size must be greater than 0.");
    }

    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunks.push(chunk);
    }
    return chunks;
}

function setRenderParams(app){

    let copyResults = JSON.parse(JSON.stringify(app.$state.results));

    let pages = chunkArray(copyResults, app.$state.countPerPage);

    if (pages.length > 0){
        app.$state.pageCount = pages.length;
    }

    let pageIndex = app.$state.activePage - 1;

    if (pages[pageIndex]) {
        app.renderList = pages[pageIndex];
    }
    else {
        app.activePage = 1;
        app.renderList = pages[0];
    }
}

export {getSearchResults, setRenderParams}