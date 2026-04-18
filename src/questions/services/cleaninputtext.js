
function cleanInputText(text){
    if(text === null){
        return '';
    }
    else {
        return text.replace(/\s+/g, "").replace(/\r+/g, "").replace( /(<([^>]+)>)/ig, "");
    }
}

export {cleanInputText}