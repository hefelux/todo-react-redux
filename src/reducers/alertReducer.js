import { SHOW_ALERT, HIDE_ALERT } from "../types";

// CADA reducer tiene su propio state
const initialState = {
    alert: null,
};

export default function alertState(state = initialState, action) {
    let stateReduced = {};
    switch (action.type) {
        // Mostrar alerta
        case SHOW_ALERT:
            stateReduced = {
                ...state,
                alert: action.payload,
            };
            break;
        case HIDE_ALERT:
            stateReduced = {
                ...state,
                alert: null,
            };
            break;
        default:
            stateReduced = state;
            break;
    }
    return stateReduced;
}