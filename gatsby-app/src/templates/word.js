import React, { useState } from 'react'
import { graphql, Link } from "gatsby"
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
        paradigm{
          edges{
            node{
              greek
            }
          }
        }        
        word(bcv_Gte:"000000", bcv_Lte:"999999"){
          edges{
            node{              
              bcvIndex{
              book
              bookLong
              chapter
              verse              
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
  const [bookSelected, setBookSelected] = useState('')
  const [chapterSelected, setChapterSelected] = useState(null)
  const [verseMode, setVerseMode] = useState(true)
  const dark = theme === "dark"
  const data = props.data
  const node = data && data.DJANGO.allStrongs.edges[0].node  
  const lexicon = data && node.lexicon
  const frequency = data && node.frequency
  const verses = data && node.word.edges
  const paradigm = data && node.paradigm.edges
  const chapters = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
  const bookAbbrevs = ['Mat', 'Mrk', 'Luk', 'Jhn', 'Act', 'Rom',
  '1Cor', '2Cor', 'Gal', 'Eph', 'Php', 'Col', '1Th', '2Th', '1Ti',
  '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn',
  'Jud', 'Rev']
  const getCountForBook = (bookShort) => verses.filter(v => v.node.bcvIndex.book === bookShort).length
  const countsPerBook = bookAbbrevs.map(b => ( {book: b, count: getCountForBook(b)} ))
  const countPerBookMax = Math.max(...countsPerBook.map(b => b.count))  

  const bookSelectedVerses = verses.filter(v => v.node.bcvIndex.book === bookSelected)
  const getCountPerChapter = (chapterNum) => bookSelectedVerses.filter(b => b.node.bcvIndex.chapter === chapterNum).length
  const countsPerChapter = chapters.map(c => getCountPerChapter(c))
  const countPerChapterMax = Math.max(...countsPerChapter)

  console.log(bookSelectedVerses)
  console.log("counts per ch:", countsPerChapter)
  console.log("chapter selected:", chapterSelected)
  const chapterSelectedVerses = bookSelectedVerses.filter(b => b.node.bcvIndex.chapter === chapterSelected).map(v => v.node.bcvIndex.verse)
  console.log(chapterSelectedVerses)
  
  const bookIcon = "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  const listIcon = "M4 6h16M4 10h16M4 14h16M4 18h16"
  return (
    <Layout>      

      <div className={`${dark ? "bg-gray-500 bg-opacity-80" : "bg-white"} min-h-screen`}>
        <div className={`flex justify-center px-8 py-2 text-2xl sticky top-0 z-10 shadow-md
        ${dark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
          {lexicon} - {frequency}x in NT
        </div>

        {verseMode &&
        <div className={`flex flex-col`}>
        {countsPerBook.map((b,i) => 
          <>
          {b.count > 0 &&          
          <div key={i} className={`flex bg-gray-500 bg-opacity-70 shadow-lg my-2`}>
            <div className={`md:text-xl w-24 text-center p-2 ${dark ? "bg-blue-900 bg-opacity-50 text-gray-100" : "text-gray-900"}`}>{b.book}</div>
            <div className={`flex w-full`}>
            <div className={`bg-gray-300 bg-opacity-80 hover:bg-yellow-500 cursor-pointer 
            flex justify-center items-center`} style={{width:Math.round(100*b.count/countPerBookMax)+'%'}}
            onClick={() => {
              if(bookSelected === b.book) {setBookSelected(''); setChapterSelected(null)}
              else{setBookSelected(b.book); setChapterSelected(null)}}}>
              {b.count}
            </div>
            </div>
          </div>
          }
          {b.book === bookSelected &&
          <>
          {countsPerChapter.map((c,i) =>
          <>
          {c > 0 &&
          <div key={i} className={`flex mb-1 shadow`}>
            <div className={`md:text-xl w-24 text-center px-2 ${dark ? "bg-blue-900 bg-opacity-30 text-gray-100" : "text-gray-900"}`}>{i+1}</div>
            <div className={`flex w-full`}>
              {i+1 === chapterSelected 
              ? <div className={`bg-gray-300 bg-opacity-80 flex px-2 space-x-3 overflow-x-auto`} 
                  style={{width:Math.round(100*c/countPerChapterMax)+'%'}}>
                  {chapterSelectedVerses.map((vs,v) => (                    
                    <div className={``} key={v}>
                      <Link to={`/${bookSelected}-${chapterSelected}#${vs}`}>{vs}</Link>
                    </div>                    
                  ))}
                </div>          
              : <div className={`bg-gray-300 bg-opacity-80 hover:bg-yellow-500 cursor-pointer 
                  flex justify-center items-center`} style={{width:Math.round(100*c/countPerChapterMax)+'%'}}
                  onClick={() => {chapterSelected === i+1 ? setChapterSelected(null) : setChapterSelected(i+1)}}>
                  {c}
                </div>
              }
            </div>
          </div>
          }          
          </>          
          )}
          </>
          }
         </> 
        )}  
        
        </div>      
        }
        {!verseMode &&
        paradigm.map((p,i) => <div key={i}>{p.node.greek}</div>)
        }
        <div className={`px-2 flex justify-between items-center w-full fixed bottom-0 h-12
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900 border-t border-gray-300"}`}>
      
      <svg className={`w-6 h-6 stroke-current stroke-2 text-opacity-50 ${dark ? "text-yellow-500 text-opacity-100" : "text-gray-900"}`}
          fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          onClick={() => setVerseMode(!verseMode)}>
          <path strokeLinecap="round" strokeLinejoin="round" d={verseMode ? bookIcon : listIcon} />                 
        </svg>  

      </div>       
 
      </div>
    </Layout>
  )
}

export default Word


