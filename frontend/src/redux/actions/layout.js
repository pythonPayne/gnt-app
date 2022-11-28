import {
    SHOW_MENU,
    SHOW_SETTINGS,
    SET_TEMPLATE,
} from "../types"

export const toggleShowMenu = (bool) => ({type: SHOW_MENU, payload: bool})
export const toggleShowSettings = (bool) => ({type: SHOW_SETTINGS, payload: bool})
export const setTemplate = (payload) => ({type: SET_TEMPLATE, payload: payload})
    
