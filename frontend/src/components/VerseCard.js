import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'gatsby'
import { useDispatch } from 'react-redux'

const VerseCard = (props) => {  
  const { verse } = props    
  const dispatch = useDispatch()
  const [cardExpanded, setCardExpanded] = useState(props.open)
  
  const showGreek = useSelector(state => state.verseCard.showGreek)
  const showEnglish = useSelector(state => state.verseCard.showEnglish)
  const showParsId = useSelector(state => state.verseCard.showParsId)
  const showLexnId = useSelector(state => state.verseCard.showLexnId)
  const showGreekColor = useSelector(state => state.verseCard.showGreekColor)
  const lexnIdLastVisited = useSelector(state => state.word.lexnIdLastVisited)  
  const parsIds = useSelector(state => state.word.parsIds)  
  
  useEffect(() => {
    setCardExpanded(props.open)
  },[props])

    return (
      <div className={`mb-8 shadow-md`}>   

        <div className={`p-2 bg-gray-300 bg-opacity-10 text-gray-500 font-semibold border-gray-300 cursor-pointer
        border-l-2 border-r-2 border-t-2
        ${!cardExpanded && "border-b-2"}`}
        onClick={() => setCardExpanded(!cardExpanded)}>
          {verse.versRefAbbrev}
        </div>          

        {cardExpanded &&
        <div className={`flex flex-wrap p-1 bg-white text-gray-700 ring-2 ring-inset ring-gray-300`}>
          {verse.word.edges.map((w,i) => (

            <Link to={`/word-${w.node.wordLexn.lexnId}`} key={i}             
            className={`flex flex-col mr-1 mb-1 p-1
            ${w.node.wordLexn.lexnId === lexnIdLastVisited && parsIds.includes(w.node.wordPars.parsId) && "ring-2 ring-inset ring-gray-400"}`}>

              {showGreek &&
                <div className={`p-1 text-md
                ${(showGreekColor && w.node.wordPars.parsFunction === "V") && "bg-yellow-200 bg-opacity-60"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "NOUN") && "bg-red-200 bg-opacity-60"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "ADJ") && "bg-blue-200 bg-opacity-60"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "CONJ") && "bg-purple-200 bg-opacity-60"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "ART") && "bg-gray-200 bg-opacity-60"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "PRON") && "bg-red-200 bg-opacity-60"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "PREP") && "bg-green-200 bg-opacity-60"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "PRT") && "bg-gray-200 bg-opacity-60"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "ADV") && "bg-gray-200 bg-opacity-60"}
                `}                
                >
                  {w.node.wordGreek}              
                </div>
              }

              {showEnglish &&
              <div className={`p-1 text-xs`}>
                {w.node.wordEnglish}              
              </div>
              }

              {showParsId &&
              <div className={`p-1 text-xs`}>
                {w.node.wordPars.parsId}              
              </div>
              }

              {showLexnId &&
              <div className={`p-1 text-xs`}>
                {w.node.wordLexn.lexnId}              
              </div>
              }

            </Link>
          ))}
        </div>
        }
      </div>
    )
  }

export default VerseCard