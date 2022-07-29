import {
    SHOW_MENU,
    SHOW_SETTINGS,
} from "../types"

const initialState = {
    showMenu: false,
    showSettings: false,
}

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MENU: return {...state, showMenu: action.payload}
        case SHOW_SETTINGS: return {...state, showSettings: action.payload}

        default:
            return state
    }
}

export default layoutReducer
