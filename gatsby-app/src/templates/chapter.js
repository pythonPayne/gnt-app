import React, { useState, useEffect } from 'react'
import { graphql, Link } from "gatsby"
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'

export const query = graphql`
query($bcv_Gte: String!, $bcv_Lte: String!) {
  DJANGO {
    allBcvindices(bcv_Gte: $bcv_Gte, bcv_Lte: $bcv_Lte) {
      edges {
        node {
          book
          bookLong
          chapter
          verse
          word {
            edges {
              node {
                nestleAland
                greek
                english
                strongs {
                  strongs
                  lexicon
                  transliteration
                  frequency
                }
                morphology {
                  morphology
                  function
                  tense
                  voice
                  mood
                  person
                  case
                  gender
                  number
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
const Chapter = (props) => {
  const theme = useSelector((state) => state.layout.theme)    
  const dark = theme === "dark"
  const hash = props.location.hash.slice(1,)
  const [showSettings, setShowSettings] = useState(false)
  const [verseMode, setVerseMode] = useState(true)
  const [verseNum, setVerseNum] = useState(1)
  const [showGreek, setShowGreek] = useState(true)
  const [showEnglish, setShowEnglish] = useState(true)
  const [showMorphology, setShowMorphology] = useState(false)
  const [showStrongs, setShowStrongs] = useState(false)
  const [showLexicon, setShowLexicon] = useState(false)
  const [showTransliteration, setShowTransliteration] = useState(false)
  const [showNestleAlandOnly, setShowNestleAlandOnly] = useState(true)
  const [showGreekColor, setShowGreekColor] = useState(true)
  
  useEffect(() => {
    setVerseNum(Math.max(1,hash))
    return () => {
      console.log('cleanup hash')
    }
  }, [hash])

  const verses = props.data && props.data.DJANGO.allBcvindices.edges
  const bookLong = props.data && props.data.DJANGO.allBcvindices.edges[0].node.bookLong
  const chapter = props.data && props.data.DJANGO.allBcvindices.edges[0].node.chapter
  const verse = verses && verses[verseNum-1]
  const words = verse && verse.node.word.edges
  
  const showVerse = () => {    
    return (
      <div className={`flex flex-wrap`}>
        {words.map((word,i) => {
          const morphology = word.node.morphology
          const strongs = word.node.strongs
          if (morphology !== null && morphology.function !== "Punctuation" && (word.node.nestleAland || showNestleAlandOnly===false)) {
          return (
            
            <div id={`${props.path}#${i+1}`} className={`flex flex-col mr-2 mb-6 p-1 border ${dark && "border-gray-600 border-opacity-30"}`}>
              
              {morphology !== null &&
                <div key={i} className={`text-sm tracking-wider p-1 rounded ${!showGreek && "hidden"}
              
              ${(morphology.function === "Verb" && showGreekColor) && "bg-yellow-200"}
              ${(morphology.function === "Noun" && showGreekColor) && "bg-red-300"}
              ${(morphology.function === "Adjective" && showGreekColor) && "bg-blue-300"}
              ${(morphology.function === "Conjunction" && showGreekColor) && "bg-purple-200"}
              ${(morphology.function === "Definite article" && showGreekColor) && "bg-gray-300"}
              ${(morphology.function === "Personal pronoun" && showGreekColor) && "bg-red-200"}
              ${(morphology.function === "Preposition" && showGreekColor) && "bg-green-200"}
              ${(morphology.function === "Negative Particle" && showGreekColor) && "bg-gray-100"}
              ${(morphology.function === "Adverb" && showGreekColor) && "bg-gray-300"}
              `}>
                {word.node.greek}            
              </div>
              }
              <div className={`p-1 text-xs ${!showEnglish && "hidden"}`}>
              {word.node.english}            
              </div>
              <div className={`p-1 text-xs ${!showMorphology && "hidden"}`}>
              {morphology !== null && morphology.morphology}            
              </div>
              <div className={`p-1 text-xs ${!showStrongs && "hidden"}`}>
                <Link to={`/word-${strongs.strongs}`}>{strongs !== null && strongs.strongs}</Link>
              </div>
              <div className={`p-1 text-xs ${!showLexicon && "hidden"}`}>
                {strongs !== null && strongs.lexicon}
              </div>
              <div className={`p-1 text-xs ${!showTransliteration && "hidden"}`}>
                {strongs !== null && strongs.transliteration}
              </div>
            </div>
          )}
          })}
      </div>  
    )
  }

  const hcell = `px-2 py-1`
  const tcell = `px-2 py-1`
  const showVerseTable = () => {    
    return (
      <table className={`whitespace-nowrap text-left`}>        
        <thead className={``}>
          <tr className={`shadow-lg bg-white`}>
            <th className={hcell}>Greek</th>
            <th className={hcell}>English</th>
            <th className={hcell}>Morphology</th>
            <th className={hcell}>Strongs</th>
            <th className={hcell}>Lexicon</th>
            <th className={hcell}>Transliteration</th>
          </tr>
        </thead>      
        <tbody>
        {words.map((word,i) => {
          const morphology = word.node.morphology
          const strongs = word.node.strongs
          if (morphology !== null && morphology.function !== "Punctuation" && (word.node.nestleAland || showNestleAlandOnly===false)) {
            return (
              <tr key={i} className={``}>
                <td className={tcell}>{word.node.greek}</td>
                <td className={tcell}>{word.node.english}</td>
                <td className={tcell}>{morphology !== null && morphology.morphology}</td>
                <td className={tcell}>{strongs !== null && strongs.strongs}</td>
                <td className={tcell}>{strongs !== null && strongs.lexicon}</td>
                <td className={tcell}>{strongs !== null && strongs.transliteration}</td>
              </tr>
          )}
        })}    
        </tbody>          
      </table>
    )
  }

  const settingsIcon = "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
  const bookIcon = "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  const listIcon = "M4 6h16M4 10h16M4 14h16M4 18h16"
  const settingsIconClose = "M6 18L18 6M6 6l12 12"
  
  const settingsC = (name, setting, setSetting) => (
    <div className={`flex items-center`}>
      <div className={`mr-4 w-32`}>{name}</div>
      <div className={`w-8 h-8 ${setting ? "bg-green-500" : "bg-gray-200"}`} 
      onClick={()=>setSetting(true)}></div>
      <div className={`w-8 h-8 ${setting ? "bg-gray-200" : "bg-red-500"}`} 
      onClick={()=>setSetting(false)}></div>
    </div>
  )

  return (
    <Layout>      
      
      <div className={`${dark ? "bg-gray-400" : "bg-white"} min-h-screen`}>      
        
          <div className={`flex justify-center px-8 py-2 text-2xl sticky top-0 z-10 shadow-md
          ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            {showSettings ? "Settings" : bookLong + " " + chapter + ":" + verseNum}
          </div>
        
        {showSettings &&  
          <>          
          <div className={`flex items-center flex-col space-y-5 pt-8`}>
              {settingsC("Greek", showGreek, setShowGreek)}
              {settingsC("English", showEnglish, setShowEnglish)}
              {settingsC("Morphology", showMorphology, setShowMorphology)}
              {settingsC("Strongs", showStrongs, setShowStrongs)}
              {settingsC("Lexicon", showLexicon, setShowLexicon)}
              {settingsC("Transliteration", showTransliteration, setShowTransliteration)}
              {settingsC("Nestle Only", showNestleAlandOnly, setShowNestleAlandOnly)}   
              {settingsC("Greek Color", showGreekColor, setShowGreekColor)}              
          </div>
          </>
        }

        {!showSettings && verseMode &&                        
          <div className={`flex justify-center pl-2 pr-2 pt-6 pb-10`}>
            {words && showVerse()}        
          </div>
        }

        {!showSettings && !verseMode &&   
        
          <div className={`overflow-x-auto pb-[300px]`}>
            {words && showVerseTable()}
          </div>
          
        }
            
      <div className={`px-2 flex justify-between items-center w-full fixed bottom-0 h-12
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900 border-t border-gray-300"}`}>
      
        <svg className={`${showSettings && "invisible"} w-6 h-6 stroke-current stroke-2 text-opacity-50 ${dark ? "text-yellow-500 text-opacity-100" : "text-gray-900"}`}
          fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          onClick={() => setVerseMode(!verseMode)}>
          <path strokeLinecap="round" strokeLinejoin="round" d={verseMode ? bookIcon : listIcon} />                 
        </svg>  

        <div className={`${showSettings && "invisible"} w-[200px] flex flex-nowrap space-x-2 overflow-x-auto px-2 py-2`}>
            {([...Array(verses.length).keys()].map(x => x+1)).map(num => (
              <button 
                className={`active:border-none focus:outline-none border-none ${verseNum == num && "bg-yellow-600 bg-opacity-70 text-gray-900 rounded-full"}`} 
                key={num} onClick={() => {verseNum !== num && setVerseNum({num})}}>
                <Link className={`px-2 py-1`} to={`${props.path}#${num}`}>{num}</Link>
              </button>))}
        </div>

        <svg className={`w-6 h-6 stroke-current stroke-2 text-opacity-50 ${dark ? "text-yellow-500 text-opacity-100" : "text-gray-900"}`}
          fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowSettings(!showSettings)}>
          <path strokeLinecap="round" strokeLinejoin="round" d={showSettings ? settingsIconClose : settingsIcon} />                 
        </svg>  

      </div>

      </div>

    </Layout>
  )
}

export default Chapter


