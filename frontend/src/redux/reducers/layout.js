import {
  SHOW_MENU,
  SHOW_SETTINGS,
  SHOW_CHAPTER_LINKS,
  SHOW_OTHER_LINKS,
  SET_TEMPLATE,
  SET_DARK,
} from "../types"

const initialState = {
  showMenu: false,
  showSettings: false,
  showChapterLinks: true,
  showOtherLinks: false,
  template: "chapter",
  dark: true,
}

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MENU:
      return { ...state, showMenu: action.payload }
    case SHOW_SETTINGS:
      return { ...state, showSettings: action.payload }
    case SHOW_CHAPTER_LINKS:
      return { ...state, showChapterLinks: action.payload }
    case SHOW_OTHER_LINKS:
      return { ...state, showOtherLinks: action.payload }
    case SET_TEMPLATE:
      return { ...state, template: action.payload }
    case SET_DARK:
      return { ...state, dark: action.payload }

    default:
      return state
  }
}

export default layoutReducer
