
import store from "../store";
import types from "../types";

const { dispatch } = store;

export function apiUrl (data) {
    dispatch(
        {
            type: types.API_URL,
            payload: data,
        }
    );
}