import React, { useState, useEffect } from 'react'
import { graphql, Link } from "gatsby"
import { useSelector, useDispatch } from 'react-redux'
import { toggleGreek, toggleEnglish, toggleMorphology, toggleStrongs,
toggleLexicon, toggleNestleAlandOnly, toggleGreekColor } from '../redux/actions/chapterSettings'
import Layout from '../components/Layout'
import VocabCards from '../components/VocabCards'

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
                  frequency
                  gloss
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

  // state from redux
  const theme = useSelector((state) => state.layout.theme)
  const dark = theme === "dark"
  const showGreek = useSelector((state) => state.chapterSettings.showGreek)
  const showEnglish = useSelector((state) => state.chapterSettings.showEnglish)
  const showMorphology = useSelector((state) => state.chapterSettings.showMorphology)
  const showStrongs = useSelector((state) => state.chapterSettings.showStrongs)
  const showLexicon = useSelector((state) => state.chapterSettings.showLexicon)
  const showNestleAlandOnly = useSelector((state) => state.chapterSettings.showNestleAlandOnly)
  const showGreekColor = useSelector((state) => state.chapterSettings.showGreekColor)
  const dispatch = useDispatch() 

  // component state
  const [showSettings, setShowSettings] = useState(false)
  const [mode, setMode] = useState('chapter')
  const [verseNum, setVerseNum] = useState(1)
  const [showVocabSettings, setShowVocabSettings] = useState(false)
  const [vocabFreqMin, setVocabFreqMin] = useState(1)
  const [vocabFreqMax, setVocabFreqMax] = useState(999999)
  
  // run when hash changes
  const hash = props.location.hash.slice(1,)
  useEffect(() => {
    if(hash==='vocab'){
      setMode('vocab')
    } else {
      setVerseNum(Math.max(1,hash))    
    }
  }, [hash])

  // data from props
  const verses = props.data && props.data.DJANGO.allBcvindices.edges
  const bookLong = props.data && props.data.DJANGO.allBcvindices.edges[0].node.bookLong
  const chapter = props.data && props.data.DJANGO.allBcvindices.edges[0].node.chapter  

  // unique words in the chapter, for flash cards, etc.  
  const allStrongs = [].concat(...verses.map(verse => verse.node.word.edges.map(word => word.node.strongs)))
  let uniqueStrongs = [...new Set(allStrongs.map(o => JSON.stringify(o))),].map(str => JSON.parse(str))
  uniqueStrongs = uniqueStrongs.sort((a, b) => (a.frequency > b.frequency) ? -1 : 1)  
  uniqueStrongs = uniqueStrongs.filter(word => (word.frequency >= vocabFreqMin) & (word.frequency <= vocabFreqMax))

  // svg icon paths
  const settingsIcon = "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"  
  const settingsIconClose = "M6 18L18 6M6 6l12 12"

  // show a verse in the chapter, given an array of word objects
  const showVerse = (words) => {    
    return (
      <div className={`flex flex-wrap`}>
        {words.map((word,i) => {
          const morphology = word.node.morphology
          const strongs = word.node.strongs
          if (morphology !== null && morphology.function !== "Punctuation" && (word.node.nestleAland || showNestleAlandOnly===false)) {
          return (
            
            <div key={i} className={`flex flex-col mr-2 mb-6 p-1 border ${dark && "border-gray-600 border-opacity-30"}`}>
              
              {morphology !== null &&
                <div className={`text-sm md:text-xl tracking-wider p-1 rounded ${!showGreek && "hidden"}
              
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
              <div className={`p-1 text-xs md:text-lg ${!showEnglish && "hidden"}`}>
              {word.node.english}            
              </div>
              <div className={`p-1 text-xs md:text-lg ${!showMorphology && "hidden"}`}>
              {morphology !== null && morphology.morphology}            
              </div>
              <div className={`p-1 text-xs md:text-lg ${!showStrongs && "hidden"}`}>
                <Link to={`/word-${strongs.strongs}`}>{strongs !== null && strongs.strongs}</Link>
              </div>
              <div className={`p-1 text-xs md:text-lg ${!showLexicon && "hidden"}`}>
                {strongs !== null && strongs.lexicon}
              </div>              
            </div>
          )}
          })}
      </div>  
    )
  }

  // update settings in redux
  const settingsC = (name, setting, setSetting) => (
    <div className={`flex items-center`}>
      <div className={`mr-4 w-32`}>{name}</div>
      <div className={`w-8 h-8 md:w-10 md:h-10 ${setting ? "bg-green-500" : "bg-gray-200"}`} 
      onClick={()=>dispatch(setSetting(!setting))}></div>
      <div className={`w-8 h-8 md:w-10 md:h-10 ${setting ? "bg-gray-200" : "bg-red-500"}`} 
      onClick={()=>dispatch(setSetting(!setting))}></div>
    </div>
  )

  return (
    <Layout>      
      
      <div className={`${dark ? "bg-gray-400" : "bg-gray-50"} min-h-screen`}>      
        
        {/* title */}
        <div className={`flex justify-center px-8 py-2 text-2xl sticky top-0 z-10 shadow-md
        ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
          {showSettings && "Settings"} 
          {!showSettings && (mode==='chapter' | mode==='vocab') && bookLong + " " + chapter}            
        </div>
      
        {/* chapter settings */}
        {showSettings &&  
          <>          
          <div className={`flex items-center flex-col space-y-5 pt-8 md:text-xl`}>
              {settingsC("Greek", showGreek, toggleGreek)}
              {settingsC("English", showEnglish, toggleEnglish)}
              {settingsC("Morphology", showMorphology, toggleMorphology)}
              {settingsC("Strongs", showStrongs, toggleStrongs)}
              {settingsC("Lexicon", showLexicon, toggleLexicon)}              
              {settingsC("Nestle Only", showNestleAlandOnly, toggleNestleAlandOnly)}   
              {settingsC("Greek Color", showGreekColor, toggleGreekColor)}  
              <button className={`focus:outline-none rounded-lg px-10 py-2 ${dark ? "bg-gray-500 bg-opacity-50" : "bg-gray-300 bg-opacity-50"} `}
              onClick={() => setShowSettings(!showSettings)}>Go Back</button>            
          </div>
          </>
        }

        {/* vocab settings */}
        {showVocabSettings &&
          <>
          <div className={`flex items-center flex-col space-y-5 pt-8 md:text-xl`}>
            vocabFreqMin: <input type="number" value={vocabFreqMin} onChange={(e) => setVocabFreqMin(e.target.value)} />
            vocabFreqMax: <input type="number" value={vocabFreqMax} onChange={(e) => setVocabFreqMax(e.target.value)} />
          </div>
          </>
        }

        {/* chapter mode */}
        {!showSettings && !showVocabSettings && mode=='chapter' &&           
          <>
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
        }

        {/* vocab mode */}
        {!showSettings && !showVocabSettings && mode=='vocab' &&              
            <div id="vocab">                     
                <VocabCards cards={uniqueStrongs} />              
            </div>
        }
            
      {/* bottom menu */}
      <div className={`px-2 flex justify-between items-center w-full fixed bottom-0 h-12
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900 border-t border-gray-300"}`}>
      
        {/* LEFT */}
        {mode === 'chapter' && 
        <a href={`${props.path.slice(1,)}#vocab`}>
          <button className={`${(showSettings | showVocabSettings) && "invisible"} text-gray-900 ${dark && "text-yellow-500"}`} 
          onClick={()=> { setMode('vocab'); setVerseNum(1); }}>
            Vocab
          </button>
        </a>
        } 

        {mode === 'vocab' && 
          <a href={`${props.path.slice(1,)}#${1}`}>
            <button className={`${(showSettings | showVocabSettings) && "invisible"} text-gray-900 ${dark && "text-yellow-500"}`} 
            onClick={()=> { setMode('chapter'); setVerseNum(1); }}>
              Chapter
            </button>
          </a>
        } 
        
        {/* MIDDLE */}
        {/* <div className={`${(showSettings | mode !== 'chapter') && "invisible"} w-[200px] md:w-[500px] lg:w-[800px] xl:w-[1000px] flex flex-nowrap space-x-2 overflow-x-auto px-2 py-2`}>
            {([...Array(verses.length).keys()].map(x => x+1)).map(num => (                              
                <a key={num} href={`${props.path.slice(1,)}#${num}`}>
                  <button className={`px-2 active:border-none focus:outline-none border-none 
                          ${verseNum  == num && "bg-yellow-600 bg-opacity-70 text-gray-900 rounded-full"}`} 
                          onClick={() => {verseNum !== num && setVerseNum({num})}}>
                    {num}
                  </button>
                </a>
              ))}
        </div> */}

        {/* RIGHT */}
        {mode === 'chapter' &&      
        <svg className={`w-6 h-6 stroke-current cursor-pointer stroke-2 text-opacity-50 ${dark ? "text-yellow-500 text-opacity-100" : "text-gray-900"}`}
          fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowSettings(!showSettings)}>
          <path strokeLinecap="round" strokeLinejoin="round" d={showSettings ? settingsIconClose : settingsIcon} />                 
        </svg>  
        }

        {mode === 'vocab' &&      
        <svg className={`w-6 h-6 stroke-current cursor-pointer stroke-2 text-opacity-50 ${dark ? "text-yellow-500 text-opacity-100" : "text-gray-900"}`}
          fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowVocabSettings(!showVocabSettings)}>
          <path strokeLinecap="round" strokeLinejoin="round" d={showVocabSettings ? settingsIconClose : settingsIcon} />                 
        </svg>  
        }

      </div>

      </div>

    </Layout>
  )
}

export default Chapter


