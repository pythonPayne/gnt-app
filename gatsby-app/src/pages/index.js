import React, {useEffect, useState} from 'react'
import {Link} from 'gatsby'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'

const Index = () => {
  const theme = useSelector((state) => state.layout.theme)    
  const dark = theme === "dark"
  const [bookSelected, setBookSelected] = useState('Matthew')
  const [chapterSelected, setChapterSelected] = useState(1)
  const [numChapters, setNumChapters] = useState(28)  
  const chapters = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
  const books = [
      {book:'Matthew', numChapters: 28}, 
      {book:'Mark', numChapters: 16},
      {book:'Luke', numChapters: 24},
      {book:'John', numChapters: 21},
      {book:'Acts', numChapters: 28},
      {book:'Romans', numChapters: 16},
      {book:'1Corinthians', numChapters: 16},
      {book:'2Corinthians', numChapters: 13},
      {book:'Galatians', numChapters: 6},
      {book:'Ephesians', numChapters: 6},
      {book:'Philippians', numChapters: 4},
      {book:'Colossians', numChapters: 4},
      {book:'1Thessalonians', numChapters: 5},
      {book:'2Thessalonians', numChapters: 3},
      {book:'1Timothy', numChapters: 6},
      {book:'2Timothy', numChapters: 4},
      {book:'Titus', numChapters: 3},
      {book:'Philemon', numChapters: 1},
      {book:'Hebrews', numChapters: 13},
      {book:'James', numChapters: 5},
      {book:'1Peter', numChapters: 5},
      {book:'2Peter', numChapters: 3},
      {book:'1John', numChapters: 5},
      {book:'2John', numChapters: 1},
      {book:'3John', numChapters: 1},
      {book:'Jude', numChapters: 1},
      {book:'Revelation', numChapters: 22},
  ]

  useEffect(() => {
    setNumChapters(books.filter(book => book.book===bookSelected)[0].numChapters)
    return () => {
      console.log('cleanup')
    }
  }, [bookSelected])

  return (
    <Layout>      
      <div className={`${dark ? "bg-gray-400" : "bg-white"} min-h-screen`}>      
        {/* {links.map(link => <div><Link to={link.link}>{link.link}</Link></div>)} */}
        <div className={`flex py-8`}></div>

        <div className={`flex justify-center`}>
          <div className={`flex flex-col space-y-5 py-4 items-center h-48 w-48 overflow-y-auto ${dark ? "border border-gray-600" : "border"}`}>        
            {books.map((book,i) => 
              <div key={i} className={`px-8 cursor-pointer rounded-lg ${book.book===bookSelected && "bg-yellow-600 bg-opacity-50"}`}
              onClick={() => {setBookSelected(book.book); setChapterSelected(1);}}>
                {book.book}
              </div>)}
          </div>
        </div>

        <div className={`flex py-4`}></div>

        <div className={`flex justify-center`}>
          <div className={`flex w-48 px-4 py-4 overflow-x-auto ${dark ? "border border-gray-600" : "border"}`}>        
            {chapters.slice(0,numChapters).map(num => 
              <div key={num} className={`px-3 cursor-pointer rounded-lg ${num===chapterSelected && "bg-yellow-600 bg-opacity-50"}`}
              onClick={() => setChapterSelected(num)}>
                {num}
              </div>)}
          </div>
        </div>

        <div className={`flex py-4`}></div>

        <div className={`flex justify-center`}>
          <div className={`flex w-48 px-4 py-4 cursor-pointer overflow-x-auto shadow-lg rounded-lg justify-center ${dark ? "bg-blue-500" : "bg-blue-300"}`}>        
            <Link to={bookSelected+'-'+chapterSelected}>{bookSelected} {chapterSelected}</Link>
          </div>
        </div>
        


        <div className={`px-2 flex justify-between items-center w-full fixed bottom-0 h-12
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900 border-t border-gray-300"}`}>
      
        </div>

      </div>
    </Layout>
  )
}

export default Index


