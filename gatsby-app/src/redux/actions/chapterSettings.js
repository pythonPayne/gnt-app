import {
    SHOW_GREEK,
    SHOW_ENGLISH,
    SHOW_MORPHOLOGY,
    SHOW_STRONGS,
    SHOW_LEXICON,
    SHOW_NESTLEALANDONLY,
    SHOW_GREEKCOLOR
} from "../types"

export const toggleGreek = (bool) => ({type: SHOW_GREEK, payload: bool})
export const toggleEnglish = (bool) => ({type: SHOW_ENGLISH, payload: bool})
export const toggleMorphology = (bool) => ({type: SHOW_MORPHOLOGY, payload: bool})
export const toggleStrongs = (bool) => ({type: SHOW_STRONGS, payload: bool})
export const toggleLexicon = (bool) => ({type: SHOW_LEXICON, payload: bool})
export const toggleNestleAlandOnly = (bool) => ({type: SHOW_NESTLEALANDONLY, payload: bool})
export const toggleGreekColor = (bool) => ({type: SHOW_GREEKCOLOR, payload: bool})
    
