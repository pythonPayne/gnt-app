import {
  SHOW_MENU,
  SHOW_SETTINGS,
  SET_TEMPLATE,
  SET_DARK,
  SHOW_OTHER_LINKS,
  SHOW_CHAPTER_LINKS,
} from "../types"

export const toggleShowMenu = (bool) => ({ type: SHOW_MENU, payload: bool })
export const toggleShowSettings = (bool) => ({
  type: SHOW_SETTINGS,
  payload: bool,
})
export const toggleShowChapterLinks = (bool) => ({
  type: SHOW_CHAPTER_LINKS,
  payload: bool,
})
export const toggleShowOtherLinks = (bool) => ({
  type: SHOW_OTHER_LINKS,
  payload: bool,
})
export const setTemplate = (payload) => ({
  type: SET_TEMPLATE,
  payload: payload,
})
export const setDark = (payload) => ({ type: SET_DARK, payload: payload })
