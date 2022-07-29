import {
    SHOW_MENU,
    SHOW_SETTINGS,
} from "../types"

export const toggleShowMenu = (bool) => ({type: SHOW_MENU, payload: bool})
export const toggleShowSettings = (bool) => ({type: SHOW_SETTINGS, payload: bool})
    
