import {
  SET_BOOK,
  SET_SECTION_SHOWING,
  SET_PARS_IDS,
  SET_PARS_TENSE,
  SET_PARS_VOICE,
  SET_PARS_MOOD,
  SET_PARS_PERSON,
  SET_PARS_CASE,
  SET_PARS_GENDER,
  SET_PARS_NUMBER,
  SET_LEXN_ID_LAST_VISITED,
  SET_LEXN_GREEK_LAST_VISITED,
  SET_SCROLL_POSITION,
  CLEAR_WORD_STATE,
} from "../types"

export const setBook = (payload) => ({ type: SET_BOOK, payload: payload })
export const setSectionShowing = (payload) => ({
  type: SET_SECTION_SHOWING,
  payload: payload,
})
export const setParsIds = (payload) => ({
  type: SET_PARS_IDS,
  payload: payload,
})
export const setParsTense = (payload) => ({
  type: SET_PARS_TENSE,
  payload: payload,
})
export const setParsVoice = (payload) => ({
  type: SET_PARS_VOICE,
  payload: payload,
})
export const setParsMood = (payload) => ({
  type: SET_PARS_MOOD,
  payload: payload,
})
export const setParsPerson = (payload) => ({
  type: SET_PARS_PERSON,
  payload: payload,
})
export const setParsCase = (payload) => ({
  type: SET_PARS_CASE,
  payload: payload,
})
export const setParsGender = (payload) => ({
  type: SET_PARS_GENDER,
  payload: payload,
})
export const setParsNumber = (payload) => ({
  type: SET_PARS_NUMBER,
  payload: payload,
})
export const setLexnIdLastVisited = (payload) => ({
  type: SET_LEXN_ID_LAST_VISITED,
  payload: payload,
})
export const setLexnGreekLastVisited = (payload) => ({
  type: SET_LEXN_GREEK_LAST_VISITED,
  payload: payload,
})
export const setScrollPosition = (payload) => ({
  type: SET_SCROLL_POSITION,
  payload: payload,
})
export const clearWordState = (payload) => ({
  type: CLEAR_WORD_STATE,
  payload: payload,
})
