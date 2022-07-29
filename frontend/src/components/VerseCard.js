import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'gatsby'
import { useDispatch } from 'react-redux'
import { clearWordState } from '../redux/actions/word'

const VerseCard = (props) => {  
  const {verse, expandable} = props    
  const dispatch = useDispatch()
  const [cardExpanded, setCardExpanded] = useState(props.open)
  
  const showGreek = useSelector(state => state.verseCard.showGreek)
  const showEnglish = useSelector(state => state.verseCard.showEnglish)
  const showParsId = useSelector(state => state.verseCard.showParsId)
  const showLexnId = useSelector(state => state.verseCard.showLexnId)
  const showGreekColor = useSelector(state => state.verseCard.showGreekColor)
  const lexnIdLastVisited = useSelector(state => state.word.lexnIdLastVisited)  
  
  useEffect(() => {
    setCardExpanded(props.open)
  },[props])

    return (
      <div className={`mb-8 shadow-md border`}>   

        <div className={`p-2 bg-gray-100 text-gray-800 border-b
        ${expandable && "cursor-pointer"}`}
        onClick={() => setCardExpanded(!cardExpanded)}>
          {verse.versRefAbbrev}
        </div>          

        {cardExpanded && expandable &&
        <div className={`flex flex-wrap p-1`}>
          {verse.word.edges.map((w,i) => (

            <Link to={`/word-${w.node.wordLexn.lexnId}`} key={i}             
            className={`flex flex-col mr-1 mb-1 p-1
            ${w.node.wordLexn.lexnId === lexnIdLastVisited && "border-2 border-black"}`}>

              {showGreek &&
                <div className={`p-1 text-sm
                ${(showGreekColor && w.node.wordPars.parsFunction === "V") && "bg-yellow-100"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "NOUN") && "bg-red-100"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "ADJ") && "bg-blue-100"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "CONJ") && "bg-purple-100"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "ART") && "bg-gray-100"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "PRON") && "bg-red-100"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "PREP") && "bg-green-100"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "PRT") && "bg-gray-100"}
                ${(showGreekColor && w.node.wordPars.parsFunction === "ADV") && "bg-gray-100"}
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