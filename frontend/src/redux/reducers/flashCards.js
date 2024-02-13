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

const initialState = {
  minFreq: 100,
  maxFreq: 1000,
  book: "All Books",
  chapter: 1,
  showArt: true,
  showConj: true,
  showPron: true,
  showPrep: true,
  showVerbs: true,
  showPart: true,
  showNouns: true,
  showAdj: true,
  showAdv: true,
  sortVariable: "lexnFreqNt",
}

const flashCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MIN_FREQ:
      return { ...state, minFreq: action.payload }
    case MAX_FREQ:
      return { ...state, maxFreq: action.payload }
    case BOOK:
      return { ...state, book: action.payload }
    case CHAPTER:
      return { ...state, chapter: action.payload }
    case SHOW_ART:
      return { ...state, showArt: action.payload }
    case SHOW_CONJ:
      return { ...state, showConj: action.payload }
    case SHOW_PRON:
      return { ...state, showPron: action.payload }
    case SHOW_PREP:
      return { ...state, showPrep: action.payload }
    case SHOW_VERBS:
      return { ...state, showVerbs: action.payload }
    case SHOW_PART:
      return { ...state, showPart: action.payload }
    case SHOW_NOUNS:
      return { ...state, showNouns: action.payload }
    case SHOW_ADJ:
      return { ...state, showAdj: action.payload }
    case SHOW_ADV:
      return { ...state, showAdv: action.payload }
    case SORT_VARIABLE:
      return { ...state, sortVariable: action.payload }

    default:
      return state
  }
}

export default flashCardsReducer
