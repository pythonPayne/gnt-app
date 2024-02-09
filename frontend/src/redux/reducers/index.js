import { combineReducers } from "redux"
import layout from "./layout"
import verseCard from "./verseCard"
import word from "./word"

export default combineReducers({
  layout,
  verseCard,
  word,
})
