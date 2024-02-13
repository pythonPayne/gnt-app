import { combineReducers } from "redux"
import layout from "./layout"
import verseCard from "./verseCard"
import word from "./word"
import flashCards from "./flashCards"

export default combineReducers({
  layout,
  verseCard,
  word,
  flashCards,
})
