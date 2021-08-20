import React, { useState } from 'react'
import { graphql } from "gatsby"
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'

export const query = graphql`
query($strongs: String!){
  DJANGO {
    allStrongs(strongs:$strongs){
    edges{
      node{        
        word(bcv_Gte:"000000", bcv_Lte:"999999"){
          edges{
            node{              
              bcvIndex{
              book
              chapter
              verse
              word{
                edges{
                  node{                      
                    greek
                    english
                    strongs{
                      strongs
                    }                      
                    morphology{
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
  }
}
}
}
`
const Word = (props) => {
  const theme = useSelector((state) => state.layout.theme)    
  const dark = theme === "dark"
  
  const [showGreek, setShowGreek] = useState(true)
  const [showEnglish, setShowEnglish] = useState(false)
  const [showMorphology, setShowMorphology] = useState(false)
  const [showStrongs, setShowStrongs] = useState(false)
  
  const data = props.data
  const verses = data && data.DJANGO.allStrongs.edges[0].node.word.edges
  
  console.log(props)
  console.log(verses)

  const showVerse = (words) => {    
    return (
      <div className={`flex flex-wrap`}>
        {words.map((word,i) => {
          const morphology = word.node.morphology
          const strongs = word.node.strongs
          if (morphology !== null && morphology.function !== "Punctuation") {
          return (
            <div className={`flex flex-col border mr-4 mb-4 p-1 ${dark ? "border-gray-400" : "border-gray-400"} 
            ${strongs !== null && strongs.strongs ===  props.path.slice(6,) && "bg-yellow-200"}`}>              
              <div key={i} className={`text-2xl tracking-wider p-1 rounded ${!showGreek && "hidden"}`}>
                {word.node.greek}            
              </div>
              <div className={`p-1 text-medium ${!showEnglish && "hidden"}`}>
              {word.node.english}            
              </div>
              <div className={`p-1 text-sm ${!showMorphology && "hidden"}`}>
              {morphology !== null && morphology.morphology}            
              </div>
              <div className={`p-1 text-xs ${!showStrongs && "hidden"}`}>
              {strongs !== null && strongs.strongs}            
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
        <div className={`flex justify-center px-8 py-8 text-5xl`}>
          {props.path.slice(6,)}
        </div>                
        <div className={`flex justify-center px-8 py-4`}>
            <button className={`w-32 mr-2 rounded-full focus:outline-none border-none ${showGreek ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowGreek(!showGreek)}>greek</button>
            <button className={`w-32 mr-2 rounded-full focus:outline-none border-none ${showEnglish ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowEnglish(!showEnglish)}>english</button>
            <button className={`w-32 mr-2 rounded-full focus:outline-none border-none ${showMorphology ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowMorphology(!showMorphology)}>morphology</button>
            <button className={`w-32 mr-2 rounded-full focus:outline-none border-none ${showStrongs ? "bg-red-200" : "bg-gray-100"}`} onClick={() => setShowStrongs(!showStrongs)}>strongs</button>
        </div>            
        <div className={`flex flex-col justify-center pl-16 pr-8 py-8`}>
            {verses.map(verse => (
                <div>
                    <div className={`text-xl mb-4 font-bold`}>{verse.node.bcvIndex.book}. {verse.node.bcvIndex.chapter}:{verse.node.bcvIndex.verse}</div>
                    {showVerse(verse.node.bcvIndex.word.edges)}
                </div>
                ))
            }
        </div>
      </>
      </div>
    </Layout>
  )
}

export default Word


