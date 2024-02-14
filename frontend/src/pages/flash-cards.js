import React, { useState, useEffect } from "react"
import { graphql, navigate } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../components/Layout"
import VocabCard from "../components/VocabCard"
import {
  toggleShowChapterLinks,
  toggleShowMenu,
  toggleShowOtherLinks,
  toggleShowSettings,
} from "../redux/actions/layout"
import {
  setMinFreq,
  setMaxFreq,
  setBook,
  setChapter,
  setShowArt,
  setShowConj,
  setShowPron,
  setShowPrep,
  setShowVerbs,
  setShowPart,
  setShowNouns,
  setShowAdj,
  setShowAdv,
  setSortVariable,
} from "../redux/actions/flashCards"
import { SEO } from "../components/seo"

export const query = graphql`
  query {
    gnt {
      allLexns {
        edges {
          node {
            lexnId
            lexnGreek
            lexnGreekLong
            lexnDefinition
            lexnGloss
            lexnUsage
            lexnFreqNt
            lexnFunction
            lexnTransliteration
            lexnChs
          }
        }
      }
    }
  }
`

const FlashCards = (props) => {
  const lexns = props.data.gnt.allLexns.edges
  const [showSettings, setShowSettings] = useState(false)

  const dispatch = useDispatch()
  const dark = useSelector((state) => state.layout.dark)
  const showMenu = useSelector((state) => state.layout.showMenu)
  const minFreq = useSelector((state) => state.flashCards.minFreq)
  const maxFreq = useSelector((state) => state.flashCards.maxFreq)
  const book = useSelector((state) => state.flashCards.book)
  const chapter = useSelector((state) => state.flashCards.chapter)
  const showArt = useSelector((state) => state.flashCards.showArt)
  const showConj = useSelector((state) => state.flashCards.showConj)
  const showPron = useSelector((state) => state.flashCards.showPron)
  const showPrep = useSelector((state) => state.flashCards.showPrep)
  const showVerbs = useSelector((state) => state.flashCards.showVerbs)
  const showPart = useSelector((state) => state.flashCards.showPart)
  const showNouns = useSelector((state) => state.flashCards.showNouns)
  const showAdj = useSelector((state) => state.flashCards.showAdj)
  const showAdv = useSelector((state) => state.flashCards.showAdv)
  const sortVariable = useSelector((state) => state.flashCards.sortVariable)
  const [toggledAllFunctions, setToggledAllFunctions] = useState(true)

  const books = [
    { id: 0, bookNameAbbrev: "All Books", numChapters: 0 },
    { id: 1, bookNameAbbrev: "Mat", numChapters: 28 },
    { id: 2, bookNameAbbrev: "Mrk", numChapters: 16 },
    { id: 3, bookNameAbbrev: "Luk", numChapters: 24 },
    { id: 4, bookNameAbbrev: "Jhn", numChapters: 21 },
    { id: 5, bookNameAbbrev: "Act", numChapters: 28 },
    { id: 6, bookNameAbbrev: "Rom", numChapters: 16 },
    { id: 7, bookNameAbbrev: "1Co", numChapters: 16 },
    { id: 8, bookNameAbbrev: "2Co", numChapters: 13 },
    { id: 9, bookNameAbbrev: "Gal", numChapters: 6 },
    { id: 10, bookNameAbbrev: "Eph", numChapters: 6 },
    { id: 11, bookNameAbbrev: "Php", numChapters: 4 },
    { id: 12, bookNameAbbrev: "Col", numChapters: 4 },
    { id: 13, bookNameAbbrev: "1Th", numChapters: 5 },
    { id: 14, bookNameAbbrev: "2Th", numChapters: 3 },
    { id: 15, bookNameAbbrev: "1Ti", numChapters: 6 },
    { id: 16, bookNameAbbrev: "2Ti", numChapters: 4 },
    { id: 17, bookNameAbbrev: "Tit", numChapters: 3 },
    { id: 18, bookNameAbbrev: "Phm", numChapters: 1 },
    { id: 19, bookNameAbbrev: "Heb", numChapters: 13 },
    { id: 20, bookNameAbbrev: "Jas", numChapters: 5 },
    { id: 21, bookNameAbbrev: "1Pe", numChapters: 5 },
    { id: 22, bookNameAbbrev: "2Pe", numChapters: 3 },
    { id: 23, bookNameAbbrev: "1Jn", numChapters: 5 },
    { id: 24, bookNameAbbrev: "2Jn", numChapters: 1 },
    { id: 25, bookNameAbbrev: "3Jn", numChapters: 1 },
    { id: 26, bookNameAbbrev: "Jud", numChapters: 1 },
    { id: 27, bookNameAbbrev: "Rev", numChapters: 22 },
  ]

  let functionsF = []
  if (showArt) functionsF.push("ART")
  if (showConj) functionsF.push("CONJ")
  if (showPron) functionsF.push("PRON")
  if (showPrep) functionsF.push("PREP")
  if (showVerbs) functionsF.push("V")
  if (showPart) functionsF.push("PRT")
  if (showNouns) functionsF.push("NOUN")
  if (showAdj) functionsF.push("ADJ")
  if (showAdv) functionsF.push("ADV")

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    dispatch(toggleShowSettings(true))
    dispatch(toggleShowChapterLinks(false))
    dispatch(toggleShowOtherLinks(false))
  }, [])

  const lexnsF = lexns
    .filter(
      (edge) =>
        (edge.node.lexnChs
          .toLocaleLowerCase()
          .includes((book + "_" + chapter).toLocaleLowerCase()) ||
          (chapter === "All Chs" &&
            edge.node.lexnChs
              .toLocaleLowerCase()
              .includes((book + "_").toLocaleLowerCase())) ||
          book === "All Books") &&
        parseInt(edge.node.lexnFreqNt) >= minFreq &&
        parseInt(edge.node.lexnFreqNt) <= maxFreq &&
        functionsF.includes(edge.node.lexnFunction)
    )
    .sort((a, b) => (a.node[sortVariable] > b.node[sortVariable] ? -1 : 1))

  const freqOptions = [1, 3, 5, 10, 25, 50, 75, 100, 200, 500, 1000, 20000]

  const functionToggle = (label, setter, value) => (
    <>
      <div className="flex items-center justify-end font-sans pr-12 text-sm md:text-md">
        {label}
      </div>
      <div className="flex w-full justify-center ">
        <div
          onClick={() => dispatch(setter(!value))}
          className={`w-[24%] cursor-pointer transition-all duration-700  ${
            value ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          onClick={() => dispatch(setter(!value))}
          className={`w-[24%] cursor-pointer transition-all duration-700  ${
            !value ? "bg-gray-500" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </>
  )

  const setAllFunctions = (bool) => {
    dispatch(setShowArt(bool))
    dispatch(setShowConj(bool))
    dispatch(setShowPron(bool))
    dispatch(setShowPrep(bool))
    dispatch(setShowVerbs(bool))
    dispatch(setShowPart(bool))
    dispatch(setShowNouns(bool))
    dispatch(setShowAdj(bool))
    dispatch(setShowAdv(bool))
    setToggledAllFunctions(bool)
  }

  return (
    <Layout>
      <div
        className={`w-full min-h-screen flex flex-col items-center justify-center text-sm md:text-md pb-64
        ${dark ? "bg-gray-800" : "bg-gray-50"}`}
      >
        {/* side menu button (left) */}
        <div
          className={`flex fixed bottom-5 left-5 z-40 ${
            showMenu && "invisible"
          }`}
        >
          {!showSettings && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`h-[4.30rem] w-[4.30rem] cursor-pointer rounded-full pt-3 px-2 pb-2 
              ${
                dark
                  ? "fill-gray-800 bg-gray-800 bg-opacity-50 stroke-white border-[3px]  border-gray-900 md:hover:fill-gray-700"
                  : "fill-gray-100 bg-gray-50 stroke-gray-700 border-[3px] border-gray-300 md:hover:stroke-gray-900"
              }`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
          )}
        </div>

        {/* side menu content (left) */}
        <div
          className={`fixed top-0 left-0 min-h-screen z-30 overflow-auto max-w-[400px] no-scrollbar
              ${dark ? "bg-gray-900" : "bg-gray-900"}
              ${showSettings ? "w-full" : "w-0"}
              `}
        >
          {showSettings && (
            <>
              <div className={`relative`}>
                <div className={`absolute pb-[50vh] w-full`}>
                  <div className="sticky top-0 flex w-full justify-between items-center px-4 border-b-2 border-gray-600 py-4 mb-4 bg-black ">
                    <div
                      className={`text-lg md:text-xl text-blue-500 font-sans`}
                    >
                      Flash Card Filters
                    </div>
                    <svg
                      onClick={() => setShowSettings(!showSettings)}
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

                  <div
                    className={`grid grid-cols-2 pl-4 pt-4 gap-y-3 gap-x-2 pr-16 text-md md:text-lg ${
                      dark ? "text-gray-200" : "text-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-end pr-12 font-sans">
                      Book
                    </div>
                    <select
                      className={`cursor-pointer bg-gray-900 appearance-none border-b border-gray-600 py-1 mx-5 ${
                        dark ? "bg-gray-900" : "bg-gray-900 "
                      }`}
                      style={{ textAlignLast: "center" }}
                      value={book}
                      onChange={(e) => {
                        dispatch(setBook(e.target.value))
                        dispatch(setChapter(1))
                      }}
                    >
                      {books.map((book, i) => (
                        <option key={i}>{book.bookNameAbbrev}</option>
                      ))}
                    </select>
                    <div className="flex items-center justify-end pr-12 font-sans">
                      Chap
                    </div>
                    <select
                      className={`cursor-pointer bg-gray-900 appearance-none border-b border-gray-600 py-1 mx-5 text-center
                      ${book === "All Books" && "invisible"}
                      `}
                      style={{ textAlignLast: "center" }}
                      value={chapter}
                      onChange={(e) => dispatch(setChapter(e.target.value))}
                    >
                      <option key={"all-chs"}>All Chs</option>
                      {[
                        ...Array(
                          books.filter((bk) => bk.bookNameAbbrev === book)[0][
                            "numChapters"
                          ]
                        ).keys(),
                      ].map((n) => (
                        <option key={n}>{n + 1}</option>
                      ))}
                    </select>
                    <div className="flex items-center justify-end pr-12 font-sans">
                      Freq
                    </div>
                    <div className="grid grid-cols-12">
                      <select
                        className="cursor-pointer col-span-5 bg-gray-900 appearance-none  py-1 px-1 text-center"
                        style={{ textAlignLast: "center" }}
                        value={minFreq}
                        onChange={(e) => dispatch(setMinFreq(e.target.value))}
                      >
                        {freqOptions.map((n) => (
                          <option value={n} key={n}>
                            {n >= 1000 ? n / 1000 + "k" : n}
                          </option>
                        ))}
                      </select>
                      <div className="col-span-2 flex items-center justify-center text-gray-300 text-md">
                        to
                      </div>
                      <select
                        className="cursor-pointer col-span-5 bg-gray-900 appearance-none  py-1 px-1 text-center"
                        style={{ textAlignLast: "center" }}
                        value={maxFreq}
                        onChange={(e) => dispatch(setMaxFreq(e.target.value))}
                        dir="center"
                      >
                        {freqOptions
                          .filter((n) => n >= minFreq)
                          .map((n) => (
                            <option value={n} key={n}>
                              {n >= 1000 ? n / 1000 + "k" : n}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="h-[1px] my-8 bg-gray-500 w-full"></div>
                  <div
                    className={`grid grid-cols-2 pl-4 gap-y-3 gap-x-2 pr-16 text-lg text-gray-200`}
                  >
                    {functionToggle("nouns", setShowNouns, showNouns)}
                    {functionToggle("verbs", setShowVerbs, showVerbs)}
                    {functionToggle("adj", setShowAdj, showAdj)}
                    {functionToggle("adv", setShowAdv, showAdv)}
                    {functionToggle("prep", setShowPrep, showPrep)}
                    {functionToggle("pron", setShowPron, showPron)}
                    {functionToggle("art", setShowArt, showArt)}
                    {functionToggle("conj", setShowConj, showConj)}
                    {functionToggle("part", setShowPart, showPart)}
                    <div></div>
                    <div
                      className="font-sans text-center cursor-pointer text-sm italic text-gray-200 mt-2 md:hover:text-white"
                      onClick={() => setAllFunctions(!toggledAllFunctions)}
                    >
                      toggle all
                    </div>
                  </div>

                  <div className="h-[1px] my-8 bg-gray-500 w-full"></div>
                  <div className="flex justify-center text-red-400 text-xs ">
                    more to come...
                  </div>
                </div>
              </div>
              <div
                className={`fixed bottom-0 h-24 z-10 max-w-[400px]
              ${dark ? "bg-gray-900" : "bg-gray-900"}
              `}
              ></div>
            </>
          )}
        </div>

        <div
          className={`py-6 font-sans ${
            dark ? "text-gray-300" : "text-gray-800"
          }`}
        >
          {lexnsF.length} words match filter
        </div>
        <div>
          {lexnsF.slice(0, 1000).map((edge, n) => (
            <div key={n} className="mb-12">
              <VocabCard card={edge.node} n={n + 1} N={lexnsF.length} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default FlashCards

export const Head = () => <SEO title="GNT" />
