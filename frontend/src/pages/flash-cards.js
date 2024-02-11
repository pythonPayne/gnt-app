import React, { useState, useEffect } from "react"
import { graphql, navigate } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../components/Layout"
import VocabCard from "../components/VocabCard"
import { toggleShowMenu, toggleShowSettings } from "../redux/actions/layout"
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
  const dispatch = useDispatch()
  const dark = useSelector((state) => state.layout.dark)
  const showMenu = useSelector((state) => state.layout.showMenu)
  const lexns = props.data.gnt.allLexns.edges
  const [showSettings, setShowSettings] = useState(false)
  const [minFreq, setMinFreq] = useState(100)
  const [maxFreq, setMaxFreq] = useState(1000)
  const [book, setBook] = useState("All Books")
  const [chapter, setChapter] = useState(1)
  const [showArt, setShowArt] = useState(true)
  const [showConj, setShowConj] = useState(true)
  const [showPron, setShowPron] = useState(true)
  const [showPrep, setShowPrep] = useState(true)
  const [showVerbs, setShowVerbs] = useState(true)
  const [showPart, setShowPart] = useState(true)
  const [showNouns, setShowNouns] = useState(true)
  const [showAdj, setShowAdj] = useState(true)
  const [showAdv, setShowAdv] = useState(true)
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
  }, [])

  const lexnsF = lexns.filter(
    (edge) =>
      (edge.node.lexnChs
        .toLocaleLowerCase()
        .includes((book + "_" + chapter).toLocaleLowerCase()) ||
        book === "All Books") &&
      parseInt(edge.node.lexnFreqNt) > minFreq &&
      parseInt(edge.node.lexnFreqNt) < maxFreq &&
      functionsF.includes(edge.node.lexnFunction)
  )

  const freqOptions = [1, 3, 5, 10, 25, 50, 75, 100, 200, 500, 1000, 20000]

  const functionToggle = (label, setter, value) => (
    <>
      <div className="flex items-center justify-center font-mono">{label}</div>
      <div className="flex w-full justify-center ">
        <div
          onClick={() => setter(!value)}
          className={`w-[24%] cursor-pointer transition-all duration-700  ${
            value ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          onClick={() => setter(!value)}
          className={`w-[24%] cursor-pointer transition-all duration-700  ${
            !value ? "bg-gray-500" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </>
  )

  const setAllFunctions = (bool) => {
    setShowArt(bool)
    setShowConj(bool)
    setShowPron(bool)
    setShowPrep(bool)
    setShowVerbs(bool)
    setShowPart(bool)
    setShowNouns(bool)
    setShowAdj(bool)
    setShowAdv(bool)
    setToggledAllFunctions(bool)
  }

  return (
    <Layout>
      <div
        className={`w-screen min-h-screen flex flex-col items-center justify-center text-xs md:text-sm pb-64
        ${dark ? "bg-gray-800" : "bg-gray-50"}`}
      >
        {/* side menu button (left) */}
        <div className={`flex fixed bottom-7 left-7 z-40`}>
          {!showSettings ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`h-16 w-12 animate-spin-slow cursor-pointer flex justify-center items-center pb-[5px]
              ${
                dark
                  ? "fill-gray-900 stroke-gray-500 hover:stroke-blue-500"
                  : "fill-gray-100 stroke-gray-500 hover:stroke-gray-900"
              }`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`h-16 w-12 stroke-gray-500 fill-gray-500 hover:fill-gray-200 stroke-0 pl-2 pt-2 cursor-pointer text-center pb-[5px]`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <path
                fillRule="evenodd"
                d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* side menu content (left) */}
        <div
          className={`fixed top-0 left-0 min-h-screen z-30 overflow-auto max-w-[400px] no-scrollbar
              ${dark ? "bg-gray-900" : "bg-gray-900"}
              ${showSettings ? "w-[100vw]" : "w-0"}
              `}
        >
          {showSettings && (
            <>
              <div className={`relative`}>
                <div className={`absolute pb-[50vh] w-full`}>
                  <div
                    className={`pl-4 text-md md:text-lg bg-black text-blue-500 border-b-2 border-gray-600 py-4 font-mono`}
                  >
                    Flash Card Filters
                  </div>
                  <div
                    className={`grid grid-cols-2 px-4 pt-4 gap-y-3 gap-x-2 ${
                      dark ? "text-gray-200" : "text-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-center font-mono">
                      Book
                    </div>
                    <select
                      className={`cursor-pointer bg-gray-900 appearance-none border-b border-gray-600 py-1 px-1 text-center ${
                        dark ? "bg-gray-900" : "bg-gray-900 "
                      }`}
                      value={book}
                      onChange={(e) => {
                        setBook(e.target.value)
                        setChapter(1)
                      }}
                    >
                      {books.map((book, i) => (
                        <option key={i}>{book.bookNameAbbrev}</option>
                      ))}
                    </select>
                    <div className="flex items-center justify-center font-mono">
                      Chap
                    </div>

                    <select
                      className={`cursor-pointer bg-gray-900 appearance-none border-b border-gray-600 py-1 px-1 text-center
                      ${book === "All Books" && "invisible"}
                      `}
                      value={chapter}
                      onChange={(e) => setChapter(e.target.value)}
                    >
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

                    <div className="flex items-center justify-center font-mono">
                      Freq
                    </div>
                    <div className="grid grid-cols-12 text-xs">
                      <select
                        className="cursor-pointer col-span-5 bg-gray-900 appearance-none border-b border-gray-600 py-1 px-1 text-center"
                        value={minFreq}
                        onChange={(e) => setMinFreq(e.target.value)}
                      >
                        {freqOptions.map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                      </select>
                      <div className="col-span-2 flex items-center justify-center">
                        -
                      </div>
                      <select
                        className="cursor-pointer col-span-5 bg-gray-900 appearance-none border-b border-gray-600 py-1 px-1 text-center"
                        value={maxFreq}
                        onChange={(e) => setMaxFreq(e.target.value)}
                        dir="center"
                      >
                        {freqOptions
                          .filter((n) => n > minFreq)
                          .map((n) => (
                            <option key={n}>{n}</option>
                          ))}
                      </select>
                    </div>
                    <div></div>
                    <div
                      className="pt-4 font-mono text-center cursor-pointer"
                      onClick={() => setAllFunctions(!toggledAllFunctions)}
                    >
                      toggle all
                    </div>
                    {functionToggle("nouns", setShowNouns, showNouns)}
                    {functionToggle("verbs", setShowVerbs, showVerbs)}
                    {functionToggle("adj", setShowAdj, showAdj)}
                    {functionToggle("adv", setShowAdv, showAdv)}
                    {functionToggle("prep", setShowAdv, showAdv)}
                    {functionToggle("pron", setShowPron, showPron)}
                    {functionToggle("art", setShowArt, showArt)}
                    {functionToggle("conj", setShowConj, showConj)}
                    {functionToggle("part", setShowPart, showPart)}
                  </div>
                </div>
              </div>
              <div
                className={`fixed bottom-0 h-24 z-10 w-[100vw] max-w-[400px]
              ${dark ? "bg-gray-900" : "bg-gray-900"}
              `}
              ></div>
            </>
          )}
        </div>

        <div
          className={`py-4 font-mono ${
            dark ? "text-gray-300" : "text-gray-800"
          }`}
        >
          {lexnsF.length} words match filter
        </div>
        <div>
          {lexnsF.slice(0, 1000).map((edge, n) => (
            <div key={n} className="mb-8">
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
