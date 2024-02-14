import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  toggleShowMenu,
  toggleShowSettings,
  toggleShowChapterLinks,
  toggleShowOtherLinks,
  setDark,
} from "../redux/actions/layout"
import {
  toggleShowGreek,
  toggleShowEnglish,
  toggleShowParsId,
  toggleShowLexnId,
  toggleShowGreekColor,
  toggleExpandAllVerses,
} from "../redux/actions/verseCard"
import { clearWordState } from "../redux/actions/word"
import ChapterMenu from "./ChapterMenu"
import { navigate } from "gatsby"

const Layout = (props) => {
  const dispatch = useDispatch()

  const showMenu = useSelector((state) => state.layout.showMenu)
  const showSettings = useSelector((state) => state.layout.showSettings)
  const showChapterLinks = useSelector((state) => state.layout.showChapterLinks)
  const showOtherLinks = useSelector((state) => state.layout.showOtherLinks)
  const dark = useSelector((state) => state.layout.dark)

  const showGreek = useSelector((state) => state.verseCard.showGreek)
  const showEnglish = useSelector((state) => state.verseCard.showEnglish)
  const showParsId = useSelector((state) => state.verseCard.showParsId)
  const showLexnId = useSelector((state) => state.verseCard.showLexnId)
  const showGreekColor = useSelector((state) => state.verseCard.showGreekColor)
  const expandAllVerses = useSelector(
    (state) => state.verseCard.expandAllVerses
  )

  const lexnGreekLastVisited = useSelector(
    (state) => state.word.lexnGreekLastVisited
  )

  const settingsItem = (showVar, toggleShowVar, displayText) => {
    return (
      <div
        className={`pl-6 text-md md:text-lg cursor-pointer font-sans ${
          showVar ? "text-red-300" : "text-gray-600"
        }`}
        onClick={() => dispatch(toggleShowVar(!showVar))}
      >
        {displayText}
      </div>
    )
  }

  return (
    <div className={`no-scrollbar`}>
      {/* not showing menu */}
      {!showMenu && (
        <div
          className={`rounded-full fixed bottom-5 right-5 z-20 border-[3px]
      ${
        dark
          ? "bg-gray-800 bg-opacity-50 border-gray-900"
          : "bg-gray-50 border-gray-300"
      } `}
        >
          <div
            className={`flex flex-col space-y-3 h-16 w-16 justify-center items-center cursor-pointer`}
            onClick={() => dispatch(toggleShowMenu(true))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className={`w-8 h-8 ${dark ? "stroke-white" : "stroke-gray-700"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      )}

      {/* showing menu */}
      {showMenu && (
        <>
          <div
            className={`fixed top-0 right-0 min-h-screen z-10 overflow-auto max-w-[300px] no-scrollbar bg-gray-900
        ${showMenu ? "w-full" : "w-0"}`}
          >
            {showSettings && (
              <div className={`relative`}>
                <div className={`absolute pb-64 w-full`}>
                  <div className="sticky top-0 flex w-full justify-between items-center px-4 border-b-2 border-gray-600 py-4 mb-4 bg-black ">
                    <div
                      className={`text-lg md:text-xl text-blue-500 font-sans`}
                    >
                      Verse Settings
                    </div>
                  </div>
                  <div
                    className={`flex flex-col space-y-4 text-white pt-3 pb-9 font-serif tracking-wide`}
                  >
                    {settingsItem(showGreek, toggleShowGreek, "Greek")}
                    {settingsItem(showEnglish, toggleShowEnglish, "English")}
                    {settingsItem(showParsId, toggleShowParsId, "Parsing")}
                    {settingsItem(showLexnId, toggleShowLexnId, "Lexicon")}
                    {settingsItem(
                      showGreekColor,
                      toggleShowGreekColor,
                      "Highlighting"
                    )}
                    {settingsItem(
                      expandAllVerses,
                      toggleExpandAllVerses,
                      "Expand Verses"
                    )}
                  </div>

                  <div
                    className={`pl-4 text-lg md:text-xl text-blue-500 bg-black border-y-2 border-gray-600 py-4 font-sans sticky top-0`}
                  >
                    Display Settings
                  </div>
                  <div
                    className={`pl-6 pt-3 pb-9 text-md md:text-lg cursor-pointer font-sans focus:outline-none
                ${dark ? "text-red-300" : "text-gray-600"}
                `}
                    onClick={() => dispatch(setDark(!dark))}
                  >
                    Dark mode
                  </div>
                </div>
              </div>
            )}
            {showChapterLinks && (
              <div className={`relative`}>
                <div className={`absolute pb-[50vh] w-full`}>
                  <div className="sticky top-0 flex w-full justify-between items-center px-4 border-b-2 border-gray-600 py-4 mb-4 bg-black ">
                    <div
                      className={`text-lg md:text-lg text-blue-500 font-sans`}
                    >
                      Greek NT
                    </div>
                  </div>
                  <ChapterMenu />
                </div>
              </div>
            )}
            {showOtherLinks && (
              <div className={`relative`}>
                <div className={`absolute pb-[50vh] w-full`}>
                  <div className="sticky top-0 flex w-full justify-between items-center px-4 border-b-2 border-gray-600 py-4 mb-4 bg-black ">
                    <div
                      className={`text-lg md:text-lg text-blue-500 font-sans`}
                    >
                      Learning
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pl-4 pt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      className="w-5 h-5 fill-gray-100"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <div
                      className={`text-md md:text-lg cursor-pointer focus:outline-none text-gray-300 hover:text-white
                `}
                      onClick={() => navigate("/flash-cards")}
                    >
                      Flash cards
                    </div>
                  </div>
                  <div className="pl-11 pt-4 text-red-400 italic text-xs">
                    more to come...
                  </div>
                </div>
              </div>
            )}
            <div
              className={`fixed border-t bottom-0 h-24 max-w-[300px] w-full z-10 text-white 
              flex justify-between items-center px-8
              ${dark ? "bg-gray-900" : "bg-gray-900"}
              `}
            >
              <button
                className="text-white"
                onClick={() => {
                  dispatch(toggleShowChapterLinks(true))
                  dispatch(toggleShowOtherLinks(false))
                  dispatch(toggleShowSettings(false))
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${
                    showChapterLinks ? "text-blue-500" : "text-gray-200"
                  } w-8 h-8`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </button>
              <button
                className="text-white"
                onClick={() => {
                  dispatch(toggleShowChapterLinks(false))
                  dispatch(toggleShowOtherLinks(true))
                  dispatch(toggleShowSettings(false))
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${
                    showOtherLinks ? "text-blue-500" : "text-gray-200"
                  } w-8 h-8`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  dispatch(toggleShowChapterLinks(false))
                  dispatch(toggleShowOtherLinks(false))
                  dispatch(toggleShowSettings(true))
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${
                    showSettings ? "text-blue-500" : "text-gray-200"
                  } w-8 h-8`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="top-4 right-4 fixed z-50">
            <svg
              onClick={() => dispatch(toggleShowMenu(!showMenu))}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              className="w-6 h-6 stroke-white md:hover:stroke-blue-500 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </>
      )}

      <div>{props.children}</div>
    </div>
  )
}

export default Layout
