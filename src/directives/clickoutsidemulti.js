import {onBeforeUnmount, onMounted} from 'vue'

export function useDetectOutsideClickMulti(component, action_component_id, callback) {
    const action_component = document.getElementById(action_component_id);
    if (!component || (action_component_id !=='' && !action_component)) {
        return
    }
    const listener = (event) => {
        if (event.target !== action_component && event.composedPath().includes(action_component)) {
            return
        }
        if (event.target !== component.value && event.composedPath().includes(component.value)) {
            return
        }
        if (typeof callback === 'function') {
            callback()
        }
    }
    onMounted(() => { window.addEventListener('click', listener) })
    onBeforeUnmount(() => {window.removeEventListener('click', listener)})

    return {listener}
}

export function useDetectOutsideClickMultiNew(component, elArray, callback) {

    let existElArray = [];

    for (let elItem of elArray){
        let item = document.getElementById(elItem);
        if (item){
            existElArray.push(item);
        }
    }

    if (component === undefined || existElArray.length === 0) {
        return
    }

    const multilistener = (event) => {

        if (event.target !== component && event.composedPath().includes(component)) {
            return
        }

        for (let eventItem of existElArray){
            if(event.target !== eventItem && event.composedPath().includes(eventItem)){
                return;
            }
        }

        if (typeof callback === 'function') {
            callback()
        }
    }
    onMounted(() => {
        window.addEventListener('click', multilistener)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('click', multilistener)
    })

    return {multilistener}
}