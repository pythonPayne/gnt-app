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
        strongs
        lexicon
        gloss
        transliteration
        frequency        
        word(bcv_Gte:"000000", bcv_Lte:"999999"){
          edges{
            node{              
              bcvIndex{
              book
              bookLong
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
  const [bookSelected, setBookSelected] = useState('Jhn')
  const dark = theme === "dark"
  const data = props.data
  const node = data && data.DJANGO.allStrongs.edges[0].node  
  const lexicon = data && node.lexicon
  const frequency = data && node.frequency
  const verses = data && node.word.edges
  const bookAbbrevs = ['Mat', 'Mrk', 'Luk', 'Jhn', 'Act', 'Rom',
  '1Cor', '2Cor', 'Gal', 'Eph', 'Php', 'Col', '1Th', '2Th', '1Ti',
  '2Ti', 'Tit', 'Phm', 'Heb', 'Jms', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn',
  'Jud', 'Rev']
  const getCountForBook = (bookShort) => verses.filter(v => v.node.bcvIndex.book === bookShort).length
  const countsPerBook = bookAbbrevs.map(b => ( {book: b, count: getCountForBook(b)} ))
  const countMax = Math.max(...countsPerBook.map(b => b.count))  

  const bookSelectedVerses = verses.filter(v => v.node.bcvIndex.book === bookSelected)
  console.log(bookSelectedVerses)
  return (
    <Layout>      
      <div className={`${dark ? "bg-gray-500 bg-opacity-80" : "bg-white"} min-h-screen`}>
        <div className={`flex justify-center px-8 py-2 text-2xl sticky top-0 z-10 shadow-md
        ${dark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
          {lexicon} - {frequency}x in NT
        </div>
        <div className={`flex flex-col space-y-4`}>
        {countsPerBook.map(b => 
          <>
          {b.count > 0 &&
          <div key={b.book} className={`flex bg-gray-500 bg-opacity-70 shadow-md`}>
            <div className={`md:text-xl w-24 p-4 ${dark ? "text-gray-100" : "text-gray-900"}`}>{b.book}</div>
            <div className={`flex w-full`}>
            <div className={`bg-gray-300 bg-opacity-80 hover:bg-yellow-500 cursor-pointer flex justify-center items-center`} style={{width:Math.round(100*b.count/countMax)+'%'}}
            onClick={() => setBookSelected(b.book)}>
              {b.count}
            </div>
            </div>
          </div>         
          } 
          </>
        )}  
        </div>              
      </div>
    </Layout>
  )
}

export default Word


