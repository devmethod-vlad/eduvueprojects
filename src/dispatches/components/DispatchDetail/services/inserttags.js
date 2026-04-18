function insertTag(input, target, dispatchStore){
    if(input){
        if (input.selectionStart === input.selectionEnd) {
            if(target === 'link'){
                input.setRangeText('<a href=""></a>', input.selectionStart, input.selectionEnd, "end");
            }
            else if(target === 'cross'){
                input.setRangeText("<s></s>", input.selectionStart, input.selectionEnd, "end");
            }
            else if(target === 'underline'){
                input.setRangeText("<u></u>", input.selectionStart, input.selectionEnd, "end");
            }
            else if(target === 'italic'){
                input.setRangeText("<i></i>", input.selectionStart, input.selectionEnd, "end");
            }
            else if(target === 'bold'){
                input.setRangeText("<b></b>", input.selectionStart, input.selectionEnd, "end");
            }

            input.focus();
            dispatchStore.telegram_text = input.value;
        }
        else {
            let selected = input.value.slice(input.selectionStart, input.selectionEnd);

            if(target === 'link'){
                input.setRangeText(`<a href="">${selected}</a>`);
            }

            else if(target === 'cross'){
                input.setRangeText(`<s>${selected}</s>`);
            }

            else if(target === 'underline'){
                input.setRangeText(`<u>${selected}</u>`);
            }

            else if(target === 'italic'){
                input.setRangeText(`<i>${selected}</i>`);
            }

            else if(target === 'bold'){
                input.setRangeText(`<b>${selected}</b>`);
            }
            dispatchStore.telegram_text = input.value;
        }
    }
}

export {insertTag}