import React, { useEffect, useState, useRef, useCallback } from "react"
import { graphql, Link, navigate } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../components/Layout"
import WordBarChart from "../components/WordBarChart"
import { toggleShowMenu, setTemplate } from "../redux/actions/layout"
import {
  setLastVerseExpanded,
  toggleExpandAllVerses,
} from "../redux/actions/verseCard"
import {
  setSectionShowing,
  setLexnIdLastVisited,
  clearWordState,
  setParsIds,
  setScrollPosition,
  setLexnGreekLastVisited,
} from "../redux/actions/word"
import Carousel from "../components/Carousel"
import { SEO } from "../components/seo"

export const query = graphql`
  query ($lexnId: String!) {
    gnt {
      allLexns(lexnId: $lexnId) {
        edges {
          node {
            lexnId
            lexnGreek
            lexnGreekLong
            lexnTransliteration
            lexnGloss
            lexnDefinition
            lexnUsage
            lexnStrongs
            lexnFreqNt
            lexnFunction
            pdgm {
              edges {
                node {
                  pdgmGreek
                  pdgmFreqNt
                  pdgmPars {
                    parsId
                    parsRank
                    parsFunction
                    parsTense
                    parsVoice
                    parsMood
                    parsPerson
                    parsCase
                    parsGender
                    parsNumber
                    word(wordLexnIdCopy: $lexnId) {
                      edges {
                        node {
                          wordParsIdCopy
                          wordEnglish
                          wordVers {
                            versBookNameAbbrev
                            versRefAbbrev
                            versChapUrl
                            versId
                            word {
                              edges {
                                node {
                                  wordId
                                  wordGreek
                                  wordEnglish
                                  wordLexnIdCopy
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const Word = (props) => {
  const dispatch = useDispatch()
  const expandAllVerses = useSelector(
    (state) => state.verseCard.expandAllVerses
  )
  const dark = useSelector((state) => state.layout.dark)

  const book = useSelector((state) => state.word.book)
  const sectionShowing = useSelector((state) => state.word.sectionShowing)
  const parsIds = useSelector((state) => state.word.parsIds)
  const parsTense = useSelector((state) => state.word.parsTense)
  const parsVoice = useSelector((state) => state.word.parsVoice)
  const parsMood = useSelector((state) => state.word.parsMood)
  const parsPerson = useSelector((state) => state.word.parsPerson)
  const parsCase = useSelector((state) => state.word.parsCase)
  const parsGender = useSelector((state) => state.word.parsGender)
  const parsNumber = useSelector((state) => state.word.parsNumber)
  const lexnIdLastVisited = useSelector((state) => state.word.lexnIdLastVisited)
  const scrollPosition = useSelector((state) => state.word.scrollPosition)

  const [lexn, setLexn] = useState(null)
  const [pdgm, setPdgm] = useState(null)
  const [pdgmF, setPdgmF] = useState(null)
  const [verses, setVerses] = useState(null)

  const [verseClicked, setVerseClicked] = useState(false)
  const [verseClickedRef, setVerseClickedRef] = useState(null)

  useEffect(() => {
    if (props.data.gnt.allLexns.edges[0].node.lexnId !== lexnIdLastVisited) {
      dispatch(clearWordState())
      dispatch(
        setLexnIdLastVisited(props.data.gnt.allLexns.edges[0].node.lexnId)
      )
      dispatch(
        setLexnGreekLastVisited(props.data.gnt.allLexns.edges[0].node.lexnGreek)
      )
    } else {
      setTimeout(function () {
        window.scrollTo(0, scrollPosition)
      }, 200)
    }
  }, [])

  useEffect(() => {
    setLexn(props.data.gnt.allLexns.edges[0].node)
    setPdgm(
      props.data.gnt.allLexns.edges[0].node.pdgm.edges.sort(
        (a, b) => a.node.pdgmPars.parsRank - b.node.pdgmPars.parsRank
      )
    )
    setVerses(
      props.data.gnt.allLexns.edges[0].node.pdgm.edges
        .map((edge) => edge.node.pdgmPars.word.edges)
        .flat()
        .map((edge) => {
          return {
            parsId: edge.node.wordParsIdCopy,
            versBookNameAbbrev: edge.node.wordVers.versBookNameAbbrev,
            versRefAbbrev: edge.node.wordVers.versRefAbbrev,
            versId: edge.node.wordVers.versId,
            versChapUrl: edge.node.wordVers.versChapUrl,
            verseWord: edge.node.wordVers.word.edges,
          }
        })
        .sort((a, b) => (a.versId > b.versId ? 1 : -1))
    )
  }, [])

  useEffect(() => {
    dispatch(setTemplate("word"))
    dispatch(toggleShowMenu(false))
  }, [])

  useEffect(() => {
    setPdgmF(
      pdgm &&
        pdgm.filter(
          (item) =>
            ((parsTense === "*") |
              (item.node.pdgmPars.parsTense === parsTense)) &
            ((parsVoice === "*") |
              (item.node.pdgmPars.parsVoice === parsVoice)) &
            ((parsMood === "*") | (item.node.pdgmPars.parsMood === parsMood)) &
            ((parsPerson === "*") |
              (item.node.pdgmPars.parsPerson === parsPerson)) &
            ((parsCase === "*") | (item.node.pdgmPars.parsCase === parsCase)) &
            ((parsGender === "*") |
              (item.node.pdgmPars.parsGender === parsGender)) &
            ((parsNumber === "*") |
              (item.node.pdgmPars.parsNumber === parsNumber))
        )
    )
  }, [
    pdgm,
    parsTense,
    parsVoice,
    parsMood,
    parsPerson,
    parsCase,
    parsGender,
    parsNumber,
  ])

  useEffect(() => {
    dispatch(
      setParsIds(pdgmF && pdgmF.map((item) => item.node.pdgmPars.parsId))
    )
  }, [pdgmF])

  const handleClickVerse = (e, verse) => {
    setVerseClicked(true)
    setVerseClickedRef(versesF.filter((v) => v.versId === verse.versId)[0])
  }

  const handleVerseRefClick = (e, verse) => {
    // dispatch(setScrollPosition(e.pageY - e.screenY * 0.4))
    dispatch(toggleExpandAllVerses(false))
    dispatch(setLastVerseExpanded(verse.versId))
    navigate(`/${verse.versChapUrl}`)
  }

  /*************************************************************************/
  // LOGIC
  /*************************************************************************/

  // filter verses by pars selection and book selection
  // const parsIds = pdgmF && pdgmF.map(item => item.node.pdgmPars.parsId)
  let versesF
  let counts
  let frlb = []

  if (lexn && pdgm && verses && parsIds) {
    versesF = verses.filter((verse) => parsIds.includes(verse.parsId))

    counts = versesF.reduce((p, c) => {
      let key = c.versBookNameAbbrev
      if (!p.hasOwnProperty(key)) {
        p[key] = 0
      }
      p[key]++
      return p
    }, {})

    for (var key in counts) {
      frlb = [
        ...frlb,
        {
          node: {
            frlbBookNameAbbrev: key,
            frlbCount: counts[key],
          },
        },
      ]
    }

    //removing duplicates with long [...new ] when a word appears > 1 time in a verse
    if (book !== "") {
      versesF = [
        ...new Map(
          versesF
            .filter((verse) => verse.versBookNameAbbrev === book)
            .map((item) => [item["versRefAbbrev"], item])
        ).values(),
      ]
    } else {
      versesF = [
        ...new Map(
          versesF.map((item) => [item["versRefAbbrev"], item])
        ).values(),
      ]
    }
  }

  /*************************************************************************/
  // JSX
  /*************************************************************************/
  if (versesF) {
    return (
      <Layout>
        <div
          className={`flex justify-center pb-96
          ${
            dark
              ? "bg-gray-800 bg-opacity-100 text-gray-300"
              : "bg-gray-50 bg-opacity-100 text-gray-700"
          }
          `}
        >
          <div className={`w-screen max-w-[1100px]`}>
            {/* word banner */}
            <div
              className={`flex w-full justify-between items-center h-[12vh] px-4 ${
                dark ? "text-gray-300" : "text-gray-500"
              }`}
            >
              <div className={`cursor-pointer`} onClick={() => navigate(-1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </div>
              <div className={`text-3xl`}>{lexn.lexnGreek}</div>
              <div>{""}</div>
            </div>

            {/* horizontal menu */}
            <div
              className={`sticky top-0 bg-gray-50
            ${dark ? "bg-gray-800" : "bg-gray-50"}
            `}
            >
              <div className={`grid grid-cols-3 gap-x-3 py-4 mx-3`}>
                <div
                  className={`flex justify-center py-2 cursor-pointer uppercase tracking-wide font-bold rounded
                  ${dark ? "border border-gray-600" : "border"}
            ${
              sectionShowing === "lexicon"
                ? "bg-blue-500 text-gray-100 shadow-lg"
                : "text-gray-300"
            }`}
                  onClick={() => dispatch(setSectionShowing("lexicon"))}
                >
                  Lexicon
                </div>

                <div
                  className={`flex justify-center py-2 cursor-pointer uppercase tracking-wide font-bold rounded
                  ${dark ? "border border-gray-600" : "border"}
            ${
              sectionShowing === "usage"
                ? "bg-blue-500 text-gray-100 shadow-lg"
                : "text-gray-300"
            }`}
                  onClick={() => dispatch(setSectionShowing("usage"))}
                >
                  Usage
                </div>

                <div
                  className={`flex justify-center py-2 cursor-pointer uppercase tracking-wide font-bold rounded
                  ${dark ? "border border-gray-600" : "border"}
            ${
              sectionShowing === "parsing"
                ? "bg-blue-500 text-gray-100 shadow-lg"
                : "text-gray-300"
            }`}
                  onClick={() => dispatch(setSectionShowing("parsing"))}
                >
                  {(parsTense === "*") &
                  (parsVoice === "*") &
                  (parsMood === "*") &
                  (parsPerson === "*") &
                  (parsCase === "*") &
                  (parsGender === "*") &
                  (parsNumber === "*") ? (
                    <div className={``}>Parsing</div>
                  ) : (
                    <>
                      <div
                        className={`${parsTense === "*" && "text-gray-500"}`}
                      >
                        {parsTense}
                      </div>
                      <div
                        className={`${parsVoice === "*" && "text-gray-500"}`}
                      >
                        {parsVoice}
                      </div>
                      <div className={`${parsMood === "*" && "text-gray-500"}`}>
                        {parsMood}
                      </div>
                      <div className={`text-gray-500`}>{"-"}</div>
                      <div
                        className={`${parsPerson === "*" && "text-gray-500"}`}
                      >
                        {parsPerson}
                      </div>
                      <div className={`${parsCase === "*" && "text-gray-500"}`}>
                        {parsCase}
                      </div>
                      <div
                        className={`${parsGender === "*" && "text-gray-500"}`}
                      >
                        {parsGender}
                      </div>
                      <div
                        className={`${parsNumber === "*" && "text-gray-500"}`}
                      >
                        {parsNumber}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* lexicon section */}
            {sectionShowing === "lexicon" && (
              <div className="">
                <div
                  className={`min-h-screen flex justify-center items-start mx-4 mt-6 pb-24`}
                >
                  <div
                    className={`grid grid-cols-2 gap-y-4 gap-x-4 text-sm md:text-lg`}
                  >
                    <div className={`flex justify-end items-start`}>
                      <div
                        className={`text-right font-mono border-b-[1px] border-gray-500`}
                      >
                        Greek:
                      </div>
                    </div>
                    <div
                      className={`${dark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {lexn.lexnGreekLong}
                    </div>
                    <div className={`flex justify-end items-start`}>
                      <div
                        className={`text-right font-mono border-b-[1px] border-gray-500`}
                      >
                        Transliteration:
                      </div>
                    </div>
                    <div
                      className={`${dark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {lexn.lexnTransliteration}
                    </div>
                    <div className={`flex justify-end items-start`}>
                      <div
                        className={`text-right font-mono border-b-[1px] border-gray-500`}
                      >
                        Function:
                      </div>
                    </div>
                    <div
                      className={`${dark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {lexn.lexnFunction}
                    </div>
                    <div className={`flex justify-end items-start`}>
                      <div
                        className={`text-right font-mono border-b-[1px] border-gray-500`}
                      >
                        Gloss:
                      </div>
                    </div>
                    <div
                      className={`${dark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {lexn.lexnGloss}
                    </div>
                    <div className={`flex justify-end items-start`}>
                      <div
                        className={`text-right font-mono border-b-[1px] border-gray-500`}
                      >
                        Translation:
                      </div>
                    </div>
                    <div
                      className={`${dark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {lexn.lexnDefinition}
                    </div>
                    <div className={`flex justify-end items-start`}>
                      <div
                        className={`text-right font-mono border-b-[1px] border-gray-500`}
                      >
                        # in NT:
                      </div>
                    </div>
                    <div
                      className={`${dark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {lexn.lexnFreqNt}
                    </div>
                    <div className={`flex justify-end items-start`}>
                      <div
                        className={`text-right font-mono border-b-[1px] border-gray-500`}
                      >
                        ID:
                      </div>
                    </div>
                    <div
                      className={`${dark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {lexn.lexnId}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* usage section */}
            {sectionShowing === "usage" && (
              <div className="relative">
                <div
                  className={`min-h-screen
              ${dark ? "bg-gray-800" : "bg-gray-50 "}
              `}
                >
                  {/* bar chart */}
                  <div
                    className={`relative
                  px-3 py-6
                ${dark ? "bg-gray-800" : "bg-gray-50 "}
                ${verseClicked && "hidden"}
                `}
                  >
                    <WordBarChart
                      frlb={frlb}
                      book={book}
                      setVerseClicked={setVerseClicked}
                    />
                  </div>

                  {/* verses on bar click */}
                  <div className="max-h-[70vh] overflow-y-scroll no-scrollbar">
                    {verseClicked ? (
                      <div className={`mx-2 mt-4`}>
                        <div
                          className={`flex justify-between pb-2
                        p-2 font-semibold
                        border-r-2 border-l-2 border-t-2
                        ${
                          dark
                            ? "text-gray-300 bg-gray-700 bg-opacity-10 border-gray-600"
                            : "text-gray-500 border-gray-300"
                        }
                        `}
                        >
                          <div
                            className="font-semibold pl-1 text-sm flex items-center cursor-pointer hover:text-blue-500"
                            onClick={(e) =>
                              handleVerseRefClick(e, verseClickedRef)
                            }
                          >
                            {verseClickedRef.versRefAbbrev}
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.0}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setVerseClicked(false)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <div
                          className={`flex flex-wrap p-1 ring-2 ring-inset
                                ${
                                  dark
                                    ? "bg-gray-700 bg-opacity-80 text-gray-200 ring-gray-600"
                                    : "bg-white text-gray-700 ring-gray-300"
                                }
                                `}
                        >
                          {verseClickedRef.verseWord.map((edge, i) => (
                            <div
                              key={i}
                              className={`flex flex-col mr-1 mb-1 p-1`}
                            >
                              <div
                                className={`p-1 text-sm lg:text-lg ${
                                  lexnIdLastVisited ===
                                    edge.node.wordLexnIdCopy &&
                                  "ring-2 ring-inset ring-gray-400"
                                }`}
                              >
                                {edge.node.wordGreek}
                              </div>
                              <div
                                className={`p-1 text-xs ${
                                  dark ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {edge.node.wordEnglish}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`mx-2 mt-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-y-2 gap-x-2`}
                      >
                        {versesF.map((verse, key) => (
                          <div
                            key={key}
                            className={`p-2 cursor-pointer text-xs shadow-sm
                       ${
                         dark
                           ? "text-gray-400 border border-gray-600"
                           : "hover:bg-blue-100 text-gray-600 border"
                       }`}
                            onClick={(e) => handleClickVerse(e, verse)}
                          >
                            {verse.versRefAbbrev}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* parsing section */}
            {sectionShowing === "parsing" && (
              <div className="">
                <div
                  className={`min-h-screen text-gray-600
              ${dark ? "bg-gray-800" : "bg-gray-50 "}
              `}
                >
                  <div
                    className={`flex justify-center py-10 space-x-1
                ${dark ? "bg-gray-800" : "bg-gray-50 "}
                `}
                  >
                    <Carousel
                      parsVar={"parsTense"}
                      visibleItem={parsTense}
                      parsLabel={"T"}
                      pdgm={pdgm}
                      pdgmF={pdgmF}
                    />
                    <Carousel
                      parsVar={"parsVoice"}
                      visibleItem={parsVoice}
                      parsLabel={"V"}
                      pdgm={pdgm}
                      pdgmF={pdgmF}
                    />
                    <Carousel
                      parsVar={"parsMood"}
                      visibleItem={parsMood}
                      parsLabel={"M"}
                      pdgm={pdgm}
                      pdgmF={pdgmF}
                    />
                    <Carousel
                      parsVar={"parsPerson"}
                      visibleItem={parsPerson}
                      parsLabel={"P"}
                      pdgm={pdgm}
                      pdgmF={pdgmF}
                    />
                    <Carousel
                      parsVar={"parsCase"}
                      visibleItem={parsCase}
                      parsLabel={"C"}
                      pdgm={pdgm}
                      pdgmF={pdgmF}
                    />
                    <Carousel
                      parsVar={"parsGender"}
                      visibleItem={parsGender}
                      parsLabel={"G"}
                      pdgm={pdgm}
                      pdgmF={pdgmF}
                    />
                    <Carousel
                      parsVar={"parsNumber"}
                      visibleItem={parsNumber}
                      parsLabel={"N"}
                      pdgm={pdgm}
                      pdgmF={pdgmF}
                    />
                  </div>

                  <div className={`flex justify-center`}>
                    <div
                      className={`flex flex-col max-w-[768px] justify-center`}
                    >
                      <div className={`flex justify-between px-4 py-4`}>
                        <div className={`flex flex-col pr-8`}>
                          {pdgmF.map((item, i) => (
                            <div key={i} className={`p-1`}>
                              {item.node.pdgmPars.parsId}
                            </div>
                          ))}
                        </div>
                        <div className={`flex flex-col pr-8`}>
                          {pdgmF.map((item, i) => (
                            <div key={i} className={`p-1`}>
                              {item.node.pdgmGreek}
                            </div>
                          ))}
                        </div>
                        <div className={`flex flex-col`}>
                          {pdgmF.map((item, i) => (
                            <div key={i} className={`p-1`}>
                              {item.node.pdgmFreqNt}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    )
  } else
    return (
      <Layout>
        <></>
      </Layout>
    )
}

export default Word

export const Head = () => <SEO title="GNT" />
