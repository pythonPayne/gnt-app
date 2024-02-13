import {
  MIN_FREQ,
  MAX_FREQ,
  BOOK,
  CHAPTER,
  SHOW_ART,
  SHOW_CONJ,
  SHOW_PRON,
  SHOW_PREP,
  SHOW_VERBS,
  SHOW_PART,
  SHOW_NOUNS,
  SHOW_ADJ,
  SHOW_ADV,
  SORT_VARIABLE,
} from "../types"

export const setMinFreq = (n) => ({
  type: MIN_FREQ,
  payload: n,
})
export const setMaxFreq = (n) => ({
  type: MAX_FREQ,
  payload: n,
})
export const setBook = (bool) => ({
  type: BOOK,
  payload: bool,
})
export const setChapter = (bool) => ({
  type: CHAPTER,
  payload: bool,
})
export const setShowArt = (bool) => ({
  type: SHOW_ART,
  payload: bool,
})
export const setShowConj = (bool) => ({
  type: SHOW_CONJ,
  payload: bool,
})
export const setShowPron = (bool) => ({
  type: SHOW_PRON,
  payload: bool,
})
export const setShowPrep = (bool) => ({
  type: SHOW_PREP,
  payload: bool,
})
export const setShowVerbs = (bool) => ({
  type: SHOW_VERBS,
  payload: bool,
})
export const setShowPart = (bool) => ({
  type: SHOW_PART,
  payload: bool,
})
export const setShowNouns = (bool) => ({
  type: SHOW_NOUNS,
  payload: bool,
})
export const setShowAdj = (bool) => ({
  type: SHOW_ADJ,
  payload: bool,
})
export const setShowAdv = (bool) => ({
  type: SHOW_ADV,
  payload: bool,
})
export const setSortVariable = (sortVariable) => ({
  type: SORT_VARIABLE,
  payload: sortVariable,
})
