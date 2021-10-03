import {
    SHOW_GREEK,
    SHOW_ENGLISH,
    SHOW_MORPHOLOGY,
    SHOW_STRONGS,
    SHOW_LEXICON,
    SHOW_NESTLEALANDONLY,
    SHOW_GREEKCOLOR
} from "../types"

const initialState = {
    showGreek: true,
    showEnglish: true,
    showMorphology: false,
    showStrongs: true,
    showLexicon: false,
    showNestleAlandOnly: true,
    showGreekColor: true,
}

const chapterSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_GREEK: return {...state, showGreek: action.payload}
        case SHOW_ENGLISH: return {...state, showEnglish: action.payload}
        case SHOW_MORPHOLOGY: return {...state, showMorphology: action.payload}
        case SHOW_STRONGS: return {...state, showStrongs: action.payload}
        case SHOW_LEXICON: return {...state, showLexicon: action.payload}
        case SHOW_NESTLEALANDONLY: return {...state, showNestleAlandOnly: action.payload}
        case SHOW_GREEKCOLOR: return {...state, showGreekColor: action.payload}        
        default:
            return state
    }
}

export default chapterSettingsReducer
