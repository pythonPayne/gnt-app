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

const initialState = {
  book: "",
  sectionShowing: "lexicon",
  parsIds: null,
  parsTense: "*",
  parsVoice: "*",
  parsMood: "*",
  parsPerson: "*",
  parsCase: "*",
  parsGender: "*",
  parsNumber: "*",
  scrollPosition: 0,
  lexnIdLastVisited: null,
  lexnGreekLastVisited: null,
}

const wordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK:
      return { ...state, book: action.payload }
    case SET_SECTION_SHOWING:
      return { ...state, sectionShowing: action.payload }
    case SET_PARS_IDS:
      return { ...state, parsIds: action.payload }
    case SET_PARS_TENSE:
      return { ...state, parsTense: action.payload }
    case SET_PARS_VOICE:
      return { ...state, parsVoice: action.payload }
    case SET_PARS_MOOD:
      return { ...state, parsMood: action.payload }
    case SET_PARS_PERSON:
      return { ...state, parsPerson: action.payload }
    case SET_PARS_CASE:
      return { ...state, parsCase: action.payload }
    case SET_PARS_GENDER:
      return { ...state, parsGender: action.payload }
    case SET_PARS_NUMBER:
      return { ...state, parsNumber: action.payload }
    case SET_LEXN_ID_LAST_VISITED:
      return { ...state, lexnIdLastVisited: action.payload }
    case SET_LEXN_GREEK_LAST_VISITED:
      return { ...state, lexnGreekLastVisited: action.payload }
    case SET_SCROLL_POSITION:
      return { ...state, scrollPosition: action.payload }
    case CLEAR_WORD_STATE:
      return initialState

    default:
      return state
  }
}

export default wordReducer
