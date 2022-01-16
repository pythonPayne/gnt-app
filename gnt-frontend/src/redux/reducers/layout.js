import {
    TOGGLE_THEME
} from "../types"

const initialState = {
    theme: "light"
}

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                theme: action.payload === "dark" ? "light" : "dark"
            }        
        default:
            return state
    }
}

export default layoutReducer
