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
  // console.log(data)
  const edges = data && data.DJANGO.allStrongs.edges
  const lexicon = edges.length>0 && edges[0].node.lexicon
  const frequency = edges.length>0 && edges[0].node.frequency
  const verses = edges.length>0 && edges[0].node.word.edges
  const paradigm = edges.length>0 && edges[0].node.paradigm.edges
  const paradigm_function = paradigm && paradigm[0].node.function
  const genders = paradigm && [...new Set(paradigm.map(p => p.node.gender))]
  const cases = ['Nominative','Genitive','Dative','Accusative',]
  const numbers = ['Singular','Plural']
  const chapters = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
  const bookAbbrevs = ['Mat', 'Mrk', 'Luk', 'Jhn', 'Act', 'Rom',
  '1Cor', '2Cor', 'Gal', 'Eph', 'Php', 'Col', '1Th', '2Th', '1Ti',
  '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn',
  'Jud', 'Rev']
  const getCountForBook = (bookShort) => verses && verses.filter(v => v.node.bcvIndex.book === bookShort).length
  const getCountPerChapter = (chapterNum) => bookSelectedVerses && bookSelectedVerses.filter(b => b.node.bcvIndex.chapter === chapterNum).length
  
  const getParadigmElement = (function_, tense, voice, mood, person, case_, gender, number) => {
    const temp = paradigm.filter(p => (
      p.node.function === function_ &&
      p.node.tense === tense &&
      p.node.voice === voice &&
      p.node.mood === mood &&
      p.node.person === person &&
      p.node.case === case_ &&
      p.node.gender === gender &&
      p.node.number === number))
    const paradigmElement = temp[0] && temp[0].node.greek  
    return paradigmElement
  }

  const getParadigmElements = (genders, numbers, cases) => {
    const paradigmElements = []
    genders.forEach(g => numbers.forEach(n => cases.forEach(c => paradigmElements.push(
      <div>{getParadigmElement(paradigm_function,'','','','',c,g,n)}</div>
    )))
    )
    return paradigmElements
  }

  const bookSelectedVerses = verses && verses.filter(v => v.node.bcvIndex.book === bookSelected)
  const chapterSelectedVerses = bookSelectedVerses && bookSelectedVerses.filter(b => b.node.bcvIndex.chapter === chapterSelected).map(v => v.node.bcvIndex.verse)
  
  const countsPerBook = bookAbbrevs.map(b => ( {book: b, count: getCountForBook(b)} ))
  const countPerBookMax = Math.max(...countsPerBook.map(b => b.count))  
  const countsPerChapter = chapters.map(c => getCountPerChapter(c))
  const countPerChapterMax = Math.max(...countsPerChapter)
    
  // console.log("bookSelectedVerses:", bookSelectedVerses)
  // console.log("countsPerChapter:", countsPerChapter)
  // console.log("chapterSelected:", chapterSelected)
  // console.log("chapterSelectedVerses:", chapterSelectedVerses)
  // console.log("paradigm:", paradigm)
  // console.log("paradigm_function", paradigm_function)
  // console.log("paradigm_genders:", genders)
  
  const bookIcon = "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  const listIcon = "M4 6h16M4 10h16M4 14h16M4 18h16"

  return (
    <Layout>      

      <div className={`${dark ? "bg-gray-500 bg-opacity-80" : "bg-gray-100"} min-h-screen pb-24`}>

        <div className={`flex justify-center px-8 py-2 text-2xl sticky top-0 z-10 shadow-md
        ${dark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
          {verseMode ? `${lexicon} - ${frequency}x in NT` : `Forms of ${lexicon} in NT`}
        </div>

        {verseMode &&
        <div className={`flex flex-col`}>
        {countsPerBook.map((b,i) => 
          <>
          {b.count > 0 &&          
          <div key={i} className={`flex shadow-lg my-2 
          ${dark ? "bg-gray-500 bg-opacity-70" : "bg-gray-500 bg-opacity-20"}`}>
            <div className={`md:text-xl w-24 text-center p-2 
            ${dark ? "bg-blue-900 bg-opacity-50 text-gray-100" : "bg-blue-900 bg-opacity-50 text-gray-100"}`}>{b.book}</div>
            <div className={`flex w-full`}>
            <div className={`${dark ? "bg-gray-300 bg-opacity-80" : "bg-white"} hover:bg-yellow-500 cursor-pointer 
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
        {!verseMode && ['Noun','Adjective','Definite article', 'Personal pronoun'].includes(paradigm_function) &&
        <>
        <div>{paradigm_function}</div>
        <div className={`grid grid-cols-4 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
          <div>Case</div>
          <div>Masc</div>
          <div>Fem</div>
          <div>Neut</div>
          
          <div>Nom</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Nominative','Masculine','Singular')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Nominative','Feminine','Singular')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Nominative','Neuter','Singular')}</div>

          <div>Gen</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Genitive','Masculine','Singular')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Genitive','Feminine','Singular')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Genitive','Neuter','Singular')}</div>

          <div>Dat</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Dative','Masculine','Singular')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Dative','Feminine','Singular')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Dative','Neuter','Singular')}</div>

          <div>Acc</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Accusative','Masculine','Singular')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Accusative','Feminine','Singular')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Accusative','Neuter','Singular')}</div>
        
          <div>Nom</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Nominative','Masculine','Plural')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Nominative','Feminine','Plural')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Nominative','Neuter','Plural')}</div>

          <div>Gen</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Genitive','Masculine','Plural')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Genitive','Feminine','Plural')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Genitive','Neuter','Plural')}</div>

          <div>Dat</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Dative','Masculine','Plural')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Dative','Feminine','Plural')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Dative','Neuter','Plural')}</div>

          <div>Acc</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Accusative','Masculine','Plural')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Accusative','Feminine','Plural')}</div>
          <div>{getParadigmElement(paradigm_function,'','','','','Accusative','Neuter','Plural')}</div>
        </div>
        </>
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


