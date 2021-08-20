import React from 'react'
import {Link} from 'gatsby'
import Layout from '../components/Layout'

const Index = () => {
  const chapters = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
  const books = [
      {book: 'Matthew', numChapters: 28}, 
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
  let links = []

  books.forEach((book,i) => (
      links = [...links,
          ...chapters.slice(0,book.numChapters).map(j => (
              {
                  'link':book.book+'-'+j             
              }
          ))
      ]
  ))
  return (
    <Layout>      
      <>
        {links.map(link => <div><Link to={link.link}>{link.link}</Link></div>)}
      </>
    </Layout>
  )
}

export default Index


