import { SHOW_ALERT, HIDE_ALERT } from "../types";


export function showAlertAction(alert) {
    return (dispatch) => {
        dispatch(showAlert(alert));
    };
}

const showAlert = (alert) => ({
    type: SHOW_ALERT,
    payload: alert
})

export function hideAlertAction() {
    return (dispatch) => {
        dispatch(hideAlert());
    };
}

const hideAlert = (alert) => ({
    type: HIDE_ALERT
});
