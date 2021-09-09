import React, {useEffect, useState} from 'react'
import {Link} from 'gatsby'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'

const Index = () => {
  const theme = useSelector((state) => state.layout.theme)    
  const dark = theme === "dark"
  const [bookSelected, setBookSelected] = useState(
    {id: 1, book:'Matthew', bookShort:'Mat', numChapters: 28}
  )
  const [chapterSelected, setChapterSelected] = useState(1)    
  const chapters = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
  const books = [
    {id: 1, book:'Matthew', bookShort:'Mat', numChapters: 28}, 
    {id: 2, book:'Mark', bookShort:'Mrk', numChapters: 16},
    {id: 3, book:'Luke', bookShort:'Luk', numChapters: 24},
    {id: 4, book:'John', bookShort:'Jhn', numChapters: 21},
    {id: 5, book:'Acts', bookShort:'Act', numChapters: 28},
    {id: 6, book:'Romans', bookShort:'Rom', numChapters: 16},
    {id: 7, book:'1Corinthians', bookShort:'1Co', numChapters: 16},
    {id: 8, book:'2Corinthians', bookShort:'2Co', numChapters: 13},
    {id: 9, book:'Galatians', bookShort:'Gal', numChapters: 6},
    {id: 10, book:'Ephesians', bookShort:'Eph', numChapters: 6},
    {id: 11, book:'Philippians', bookShort:'Php', numChapters: 4},
    {id: 12, book:'Colossians', bookShort:'Col', numChapters: 4},
    {id: 13, book:'1Thessalonians', bookShort:'1Th', numChapters: 5},
    {id: 14, book:'2Thessalonians', bookShort:'2Th', numChapters: 3},
    {id: 15, book:'1Timothy', bookShort:'1Ti', numChapters: 6},
    {id: 16, book:'2Timothy', bookShort:'2Ti', numChapters: 4},
    {id: 17, book:'Titus', bookShort:'Tit', numChapters: 3},
    {id: 18, book:'Philemon', bookShort:'Phm', numChapters: 1},
    {id: 19, book:'Hebrews', bookShort:'Heb', numChapters: 13},
    {id: 20, book:'James', bookShort:'Jas', numChapters: 5},
    {id: 21, book:'1Peter', bookShort:'1Pe', numChapters: 5},
    {id: 22, book:'2Peter', bookShort:'2Pe', numChapters: 3},
    {id: 23, book:'1John', bookShort:'1Jn', numChapters: 5},
    {id: 24, book:'2John', bookShort:'2Jn', numChapters: 1},
    {id: 25, book:'3John', bookShort:'3Jn', numChapters: 1},
    {id: 26, book:'Jude', bookShort:'Jud', numChapters: 1},
    {id: 27, book:'Revelation', bookShort:'Rev', numChapters: 22},
]

  return (
    <Layout>      
      <div className={`${dark ? "bg-gray-400" : "bg-white"} min-h-screen md:text-lg`}>      
        {/* {links.map(link => <div><Link to={link.link}>{link.link}</Link></div>)} */}
        <div className={`flex py-8`}></div>

        <div className={`flex justify-center`}>
          <div className={`flex flex-col space-y-5 py-4 items-center h-48 md:h-72 w-48 overflow-y-auto ${dark ? "border border-gray-600" : "border"}`}>        
            {books.map((book,i) => 
              <div key={i} className={`px-8 cursor-pointer rounded-lg ${book.book===bookSelected.book && "bg-yellow-600 bg-opacity-50"}`}
              onClick={() => {setBookSelected(books[i]); setChapterSelected(1);}}>
                {book.book}
              </div>)}
          </div>
        </div>

        <div className={`flex py-4`}></div>

        <div className={`flex justify-center`}>
          <div className={`flex w-48 px-4 py-4 overflow-x-auto ${dark ? "border border-gray-600" : "border"}`}>        
            {chapters.slice(0,bookSelected.numChapters).map(num => 
              <div key={num} className={`px-3 cursor-pointer rounded-lg ${num===chapterSelected && "bg-yellow-600 bg-opacity-50"}`}
              onClick={() => setChapterSelected(num)}>
                {num}
              </div>)}
          </div>
        </div>

        <div className={`flex py-4`}></div>

        <div className={`flex justify-center`}>
          <div className={`flex w-48 px-4 py-4 cursor-pointer overflow-x-auto shadow-lg rounded-lg justify-center ${dark ? "bg-blue-500" : "bg-blue-300"}`}>        
            <Link to={bookSelected.bookShort+'-'+chapterSelected}>{bookSelected.book} {chapterSelected}</Link>
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


