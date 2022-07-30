import {
    SHOW_GREEK,
    SHOW_ENGLISH,
    SHOW_PARS_ID,
    SHOW_LEXN_ID,
    SHOW_GREEK_COLOR,
    EXPAND_ALL_VERSES,

} from "../types"

const initialState = {
    showGreek: true,
    showEnglish: false,
    showParsId: false,    
    showLexnId: false,
    showGreekColor: false,  
    expandAllVerses: true,  
}

const verseCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_GREEK: return {...state, showGreek: action.payload}
        case SHOW_ENGLISH: return {...state, showEnglish: action.payload}
        case SHOW_PARS_ID: return {...state, showParsId: action.payload}        
        case SHOW_LEXN_ID: return {...state, showLexnId: action.payload}
        case SHOW_GREEK_COLOR: return {...state, showGreekColor: action.payload}
        case EXPAND_ALL_VERSES: return {...state, expandAllVerses: action.payload}
        
        default:
            return state
    }
}

export default verseCardReducer
