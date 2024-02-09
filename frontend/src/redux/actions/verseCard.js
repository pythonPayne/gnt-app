import {
  SHOW_GREEK,
  SHOW_ENGLISH,
  SHOW_PARS_ID,
  SHOW_LEXN_ID,
  SHOW_GREEK_COLOR,
  EXPAND_ALL_VERSES,
  LAST_VERSE_EXPANDED,
} from "../types"

export const toggleShowGreek = (bool) => ({ type: SHOW_GREEK, payload: bool })
export const toggleShowEnglish = (bool) => ({
  type: SHOW_ENGLISH,
  payload: bool,
})
export const toggleShowParsId = (bool) => ({
  type: SHOW_PARS_ID,
  payload: bool,
})
export const toggleShowLexnId = (bool) => ({
  type: SHOW_LEXN_ID,
  payload: bool,
})
export const toggleShowGreekColor = (bool) => ({
  type: SHOW_GREEK_COLOR,
  payload: bool,
})
export const toggleExpandAllVerses = (bool) => ({
  type: EXPAND_ALL_VERSES,
  payload: bool,
})
export const setLastVerseExpanded = (versId) => ({
  type: LAST_VERSE_EXPANDED,
  payload: versId,
})
