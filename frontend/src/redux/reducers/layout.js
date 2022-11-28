import {
    SHOW_MENU,
    SHOW_SETTINGS,
    SET_TEMPLATE,
} from "../types"

const initialState = {
    showMenu: false,
    showSettings: false,
    template: 'chapter',
}

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MENU: return {...state, showMenu: action.payload}
        case SHOW_SETTINGS: return {...state, showSettings: action.payload}
        case SET_TEMPLATE: return {...state, template: action.payload}

        default:
            return state
    }
}

export default layoutReducer
