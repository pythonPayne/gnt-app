import { SHOW_MENU, SHOW_SETTINGS, SET_TEMPLATE, SET_DARK } from "../types"

const initialState = {
  showMenu: false,
  showSettings: false,
  template: "chapter",
  dark: false,
}

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MENU:
      return { ...state, showMenu: action.payload }
    case SHOW_SETTINGS:
      return { ...state, showSettings: action.payload }
    case SET_TEMPLATE:
      return { ...state, template: action.payload }
    case SET_DARK:
      return { ...state, dark: action.payload }

    default:
      return state
  }
}

export default layoutReducer
