import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Chapter = () => {
  const data = useStaticQuery(graphql`
    {
      gnt {
        allChaps(chapId: "0410") {
          edges {
            node {
              chapBook {
                id
                bookId
                bookName
                bookNameAbbrev
                bookNumChapters
                bookNumVerses
                bookNumWords
              }
              chapId
              chapNumVerses
              chapNumWords
              vers {
                edges {
                  node {
                    versId
                    versNumWords
                    word {
                      edges {
                        node {
                          wordGreek
                          wordEnglish
                          wordLexn {
                            lexnId
                            lexnGreek
                            lexnEnglish
                            lexnTransliteration
                            lexnFreqNt
                          }
                          wordPars {
                            parsId
                            parsFunction
                            parsTense
                            parsVoice
                            parsMood
                            parsPerson
                            parsCase
                            parsGender
                            parsNumber
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
  `)
  
  const chap = data.gnt.allChaps.edges[0].node
  const verses = chap.vers.edges  
  console.log(chap)
  const showVerse = (words) => {    
    
    return (
      <div className={`flex flex-wrap`}>
        {words.map((word,i) => {          
          const pars = word.node.wordPars
          const lexn = word.node.wordLexn
          if (pars !== null && pars.function !== "Punctuation") {
          return (
            
            <div key={i} className={`flex flex-col mr-2 mb-6 p-1 border`}>
              
              {pars !== null &&
                <div className={`text-sm md:text-xl tracking-wider p-1 rounded
              
                  ${(pars.parsFunction === "V") && "bg-yellow-200"}
                  ${(pars.parsFunction === "N") && "bg-red-300"}
                  ${(pars.parsFunction === "ADJ") && "bg-blue-300"}
                  ${(pars.parsFunction === "CONJ") && "bg-purple-200"}
                  ${(pars.parsFunction === "ART") && "bg-gray-300"}
                  ${(pars.parsFunction === "PRON") && "bg-red-200"}
                  ${(pars.parsFunction === "PREP") && "bg-green-200"}
                  ${(pars.parsFunction === "PRT") && "bg-gray-100"}
                  ${(pars.parsFunction === "ADV") && "bg-gray-300"}
                  `}>
                    {word.node.wordGreek}            
                </div>
              }
              <div className={`p-1 text-xs md:text-lg`}>
                {word.node.wordEnglish}            
              </div>
              <div className={`p-1 text-xs md:text-lg`}>
                {pars !== null && pars.parsId}            
              </div>
              <div className={`p-1 text-xs md:text-lg`}>
                {lexn !== null && lexn.lexnId}
              </div>
              <div className={`p-1 text-xs md:text-lg`}>
                {lexn !== null && lexn.lexnGreek}
              </div>              
            </div>
          )}
          })} 
      </div>  
    )
  }

  return (
    <>
    <div>{chap.chapBook.bookName} {parseInt(chap.chapId.slice(2,4))}</div>
    <div className={`pb-28`}>
      {verses.map((verse,i) => (
        <div id={`${i+1}`} key={i} className={`flex pt-14 px-2`}>
          <div className={'flex pl-2 pr-2 font-bold'}>{i+1}</div>
            <div className={`flex pl-2 pr-2`}>                
              {showVerse(verse.node.word.edges)}
            </div>
        </div>
      ))}
    </div>
  </>
  )
}

export default Chapter
