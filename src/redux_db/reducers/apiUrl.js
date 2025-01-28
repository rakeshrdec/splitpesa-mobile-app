import types from "../types";

//  this is default state will change after dispatch 
let init_state = {data:{url:''}}

export default function apiUrl (state = init_state, action) {
    switch (action.type) {
        case types.API_URL:
            {
                let data = action.payload
                // //console.log('data from  reducers:', data);
                return {
                    data
                };
            }
        default:
            return { ...state };
    }
}