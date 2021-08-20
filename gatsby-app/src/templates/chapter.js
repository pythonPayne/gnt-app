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
  const [verseNum, setVerseNum] = useState(1)
  const [showGreek, setShowGreek] = useState(true)
  const [showEnglish, setShowEnglish] = useState(true)
  const [showMorphology, setShowMorphology] = useState(true)
  const [showStrongs, setShowStrongs] = useState(true)
  const [showLexicon, setShowLexicon] = useState(true)
  const [showTransliteration, setShowTransliteration] = useState(true)
  const [nestleAlandOnly, setNestleAlandOnly] = useState(true)
  
  useEffect(() => {
    setVerseNum(Math.max(1,hash))
    return () => {
      console.log('cleanup hash')
    }
  }, [hash])

  const verses = props.data && props.data.DJANGO.allBcvindices.edges  
  const verse = verses && verses[verseNum-1]
  const words = verse && verse.node.word.edges
  
  const showVerse = () => {    
    return (
      <div className={`flex flex-wrap`}>
        {words.map((word,i) => {
          const morphology = word.node.morphology
          const strongs = word.node.strongs
          if (morphology !== null && morphology.function !== "Punctuation" && (word.node.nestleAland || nestleAlandOnly===false)) {
          return (
            
            <div
              id={`${props.path}#${i+1}`} 
              className={`flex flex-col border mr-4 mb-4 p-1 ${dark ? "border-gray-400" : "border-gray-400"}`}>
              
              <div key={i} className={`text-xl tracking-wider p-1 rounded ${!showGreek && "hidden"} 
              
              ${morphology !== null && morphology.function === "Verb" && "bg-yellow-200"}
              ${morphology !== null && morphology.function === "Noun" && "bg-red-300"}
              ${morphology !== null && morphology.function === "Adjective" && "bg-blue-300"}
              ${morphology !== null && morphology.function === "Conjunction" && "bg-purple-200"}
              ${morphology !== null && morphology.function === "Definite article" && "bg-gray-300"}
              ${morphology !== null && morphology.function === "Personal pronoun" && "bg-red-200"}
              ${morphology !== null && morphology.function === "Preposition" && "bg-green-200"}
              ${morphology !== null && morphology.function === "Negative Particle" && "bg-gray-100"}
              ${morphology !== null && morphology.function === "Adverb" && "bg-gray-300"}
              `}>
                {word.node.greek}            
              </div>
              <div className={`p-1 text-medium ${!showEnglish && "hidden"}`}>
              {word.node.english}            
              </div>
              <div className={`p-1 text-sm ${!showMorphology && "hidden"}`}>
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
 
  return (
    <Layout>      
      <div>
      <>      
        <div className={`flex justify-center px-8 py-4 text-4xl`}>
          {props.path.slice(1,)}
        </div>        
        <div className={`flex flex-wrap justify-center space-x-2 px-8 py-4`}>
          {([...Array(verses.length).keys()].map(x => x+1)).map(num => (
            <button 
              className={`mb-1 focus:outline-none border-none ${verseNum == num ? "bg-blue-500 text-gray-200" : "bg-blue-100"}`} 
              key={num} onClick={() => setVerseNum({num})}>
              <Link className={`px-2 py-1`} to={`${props.path}#${num}`}>{num}</Link>
            </button>))}
        </div>
        <div className={`flex flex-wrap justify-center px-8 py-4`}>
            <button className={`w-32 mr-2 mb-1 rounded-full focus:outline-none border-none ${showGreek ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowGreek(!showGreek)}>greek</button>
            <button className={`w-32 mr-2 mb-1 rounded-full focus:outline-none border-none ${showEnglish ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowEnglish(!showEnglish)}>english</button>
            <button className={`w-32 mr-2 mb-1 rounded-full focus:outline-none border-none ${showMorphology ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowMorphology(!showMorphology)}>morphology</button>
            <button className={`w-32 mr-2 mb-1 rounded-full focus:outline-none border-none ${showStrongs ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowStrongs(!showStrongs)}>strongs</button>
            <button className={`w-32 mr-2 mb-1 rounded-full focus:outline-none border-none ${showLexicon ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowLexicon(!showLexicon)}>lexicon</button>
            <button className={`w-32 mr-2 mb-1 rounded-full focus:outline-none border-none ${showTransliteration ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowTransliteration(!showTransliteration)}>transliteration</button>
            <button className={`w-32 mr-2 mb-1 rounded-full focus:outline-none border-none ${nestleAlandOnly ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setNestleAlandOnly(!nestleAlandOnly)}>NA28 only</button>
        </div>
        <div className={`flex justify-center pl-2 pr-2 py-8`}>
          {words && showVerse()}        
        </div>
      </>
      </div>
    </Layout>
  )
}

export default Chapter


