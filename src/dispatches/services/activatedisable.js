function activateDisableMain(dispatches) {
    return dispatches.$state.loadingDispatches ||
        (dispatches.$state.dispatchesError && dispatches.$state.infoText !== '');
}

export {activateDisableMain}
