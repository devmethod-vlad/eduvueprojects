import {onBeforeUnmount, onMounted} from 'vue'

export function useDetectOutsideClick(component, action_component_id, callback) {
    const action_component = document.getElementById(action_component_id);
    if (!component || (action_component_id !=='' && !action_component)) return
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