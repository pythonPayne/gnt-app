import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "gatsby"
import { useDispatch } from "react-redux"
import { setLastVerseExpanded } from "../redux/actions/verseCard"

const VerseCard = (props) => {
  const { verse } = props
  const dispatch = useDispatch()
  const [cardExpanded, setCardExpanded] = useState(props.open)

  const dark = useSelector((state) => state.layout.dark)
  const showGreek = useSelector((state) => state.verseCard.showGreek)
  const showEnglish = useSelector((state) => state.verseCard.showEnglish)
  const showParsId = useSelector((state) => state.verseCard.showParsId)
  const showLexnId = useSelector((state) => state.verseCard.showLexnId)
  const showGreekColor = useSelector((state) => state.verseCard.showGreekColor)
  const lastVerseExpanded = useSelector(
    (state) => state.verseCard.lastVerseExpanded
  )

  const lexnIdLastVisited = useSelector((state) => state.word.lexnIdLastVisited)
  const parsIds = useSelector((state) => state.word.parsIds)

  useEffect(() => {
    if (verse.versId === lastVerseExpanded) {
      setCardExpanded(true)
    } else {
      setCardExpanded(props.open)
    }
  }, [props])

  return (
    <div className={`mb-8 shadow-md`}>
      <div
        className={`p-2 font-semibold cursor-pointer
        border-l-2 border-r-2 border-t-2
        ${!cardExpanded && "border-b-2"}
        ${
          dark
            ? "text-gray-300 bg-gray-700 bg-opacity-10 border-gray-600"
            : "text-gray-500 border-gray-300"
        }
      `}
        onClick={() => {
          dispatch(setLastVerseExpanded(verse.versId))
          setCardExpanded(!cardExpanded)
        }}
      >
        {verse.versRefAbbrev}
      </div>

      {cardExpanded && (
        <div
          className={`flex flex-wrap p-1 ring-2 ring-inset
          ${
            dark
              ? "bg-gray-700 bg-opacity-80 text-gray-200 ring-gray-600"
              : "bg-white text-gray-700 ring-gray-300"
          }
          `}
        >
          {verse.word.edges.map((w, i) => (
            <Link
              to={`/word-${w.node.wordLexn.lexnId}`}
              key={i}
              className={`flex flex-col mr-1 mb-1 p-1`}
            >
              {showGreek && (
                <div
                  className={`p-1 text-md
                  ${
                    dark && showGreekColor
                      ? "text-gray-700"
                      : dark && !showGreekColor
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                ${
                  showGreekColor &&
                  w.node.wordPars.parsFunction === "V" &&
                  "bg-yellow-200 bg-opacity-60"
                }
                ${
                  showGreekColor &&
                  w.node.wordPars.parsFunction === "NOUN" &&
                  "bg-red-200 bg-opacity-60"
                }
                ${
                  showGreekColor &&
                  w.node.wordPars.parsFunction === "ADJ" &&
                  "bg-blue-200 bg-opacity-60"
                }
                ${
                  showGreekColor &&
                  w.node.wordPars.parsFunction === "CONJ" &&
                  "bg-purple-200 bg-opacity-60"
                }
                ${
                  showGreekColor &&
                  w.node.wordPars.parsFunction === "ART" &&
                  "bg-gray-200 bg-opacity-60"
                }
                ${
                  showGreekColor &&
                  w.node.wordPars.parsFunction === "PRON" &&
                  "bg-red-200 bg-opacity-60"
                }
                ${
                  showGreekColor &&
                  w.node.wordPars.parsFunction === "PREP" &&
                  "bg-green-200 bg-opacity-60"
                }
                ${
                  showGreekColor &&
                  w.node.wordPars.parsFunction === "PRT" &&
                  "bg-gray-200 bg-opacity-60"
                }
                ${
                  showGreekColor &&
                  w.node.wordPars.parsFunction === "ADV" &&
                  "bg-gray-200 bg-opacity-60"
                }
                `}
                >
                  {w.node.wordGreek}
                </div>
              )}

              {showEnglish && (
                <div className={`p-1 text-xs`}>{w.node.wordEnglish}</div>
              )}

              {showParsId && (
                <div className={`p-1 text-xs`}>{w.node.wordPars.parsId}</div>
              )}

              {showLexnId && (
                <div className={`flex justify-between p-1 text-xs`}>
                  <div className={``}>{w.node.wordLexn.lexnGreek}</div>
                  <div className={`text-gray-400 pl-3`}>
                    {w.node.wordLexn.lexnFreqNt < 1000 &&
                      w.node.wordLexn.lexnFreqNt}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default VerseCard
