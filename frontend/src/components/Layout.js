import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import { 
    toggleShowMenu, 
    toggleShowSettings, 
} from '../redux/actions/layout'
import { 
    toggleShowGreek, 
    toggleShowEnglish, 
    toggleShowParsId, 
    toggleShowLexnId, 
    toggleShowGreekColor,
    toggleExpandAllVerses,

} from '../redux/actions/verseCard'
import ChapterMenu from './ChapterMenu'


const Layout = (props) => {

  const dispatch = useDispatch()

  const showMenu = useSelector(state => state.layout.showMenu)
  const showSettings = useSelector(state => state.layout.showSettings)  

  const showGreek = useSelector(state => state.verseCard.showGreek)
  const showEnglish = useSelector(state => state.verseCard.showEnglish)
  const showParsId = useSelector(state => state.verseCard.showParsId)
  const showLexnId = useSelector(state => state.verseCard.showLexnId)
  const showGreekColor = useSelector(state => state.verseCard.showGreekColor)
  const expandAllVerses = useSelector(state => state.verseCard.expandAllVerses)

  const settingsItem = (showVar, toggleShowVar, displayText) => {
      return (
        <div className={`pl-6 text-lg cursor-pointer ${showVar ? "text-red-300" : "text-gray-600"}`}
        onClick={() => dispatch(toggleShowVar(!showVar))}>
            {displayText}
        </div>
      )
  }

  return (
    <div className={`max-w-[500px] container mx-auto no-scrollbar`}>
    
        {/* menu button  */}
        <div className={`bg-gray-500 text-white rounded-full fixed bottom-7 right-7 z-20`}>
                
            <div className={`flex flex-col space-y-3 h-16 w-16 justify-center items-center cursor-pointer`}
            onClick={() => dispatch(toggleShowMenu(!showMenu))}
            >
                <div className={`transition-all duration-200 bg-white
                    ${showMenu 
                        ? "w-1 h-16 rotate-45 translate-y-[1.175rem] rounded-lg" 
                        : "h-1 w-8"                
                    }`}>                
                </div>
                <div className={`transition-all duration-200 bg-white
                    ${showMenu 
                        ? "w-1 h-16 -rotate-45 -translate-y-[1.175rem] rounded-lg" 
                        : "h-1 w-8"
                    }`}>                    
                </div>
            </div>

        </div>


        {/* side menu */}
        <div className={`fixed bottom-0 right-0 bg-black min-h-screen z-10 shadow-2xl overflow-y-scroll no-scrollbar
        ${showMenu ? "w-[50vw]" : "w-0"}
        `}
        >
            
            {showSettings
            ?
            <>
                <div className={`text-center text-lg text-white border-b uppercase mb-6 py-3`}>Verse Settings</div>
                <div className={`flex flex-col space-y-4 text-white`}>
                    
                    {settingsItem(showGreek, toggleShowGreek, "Show Greek")}
                    {settingsItem(showEnglish, toggleShowEnglish, "Show English")}
                    {settingsItem(showParsId, toggleShowParsId, "Show Parsing")}
                    {settingsItem(showLexnId, toggleShowLexnId, "Show Lexicon")}
                    {settingsItem(showGreekColor, toggleShowGreekColor, "Show Colors")}
                    {settingsItem(expandAllVerses, toggleExpandAllVerses, "Expand All Verses")}

                </div>
            </>
            :
            <div className={`relative`}>
                <div className={`absolute p-4 pb-[50vh]`}>
                    <ChapterMenu /> 
                </div>
            </div>
            }
            
            {showMenu && 
            <>
            <div className={`flex fixed bottom-7 right-28 z-20`}>

                {!showSettings &&
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                className={`h-16 w-16 stroke-white animate-spin-slow hover:animate-none`} 
                onClick={() => dispatch(toggleShowSettings(!showSettings))}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                }

                {showSettings &&
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                className={`h-16 w-16 stroke-white stroke-[1.75]`} 
                onClick={() => dispatch(toggleShowSettings(!showSettings))}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                }                
            </div>
            <div className={`fixed bottom-0 h-[15vh] w-full bg-black z-10`}>

            </div>
            </>
            }
        </div>

        <div>        
            {props.children}
        </div>        

    </div>
  )
}

export default Layout