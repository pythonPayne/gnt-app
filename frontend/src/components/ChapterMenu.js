import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const ChapterMenu = () => {
  const [bookOpen, setBookOpen] = useState("")
  const data = useStaticQuery(graphql`
    {
      gnt {
        allBooks {
          edges {
            node {
              bookId
              bookName
              bookNameAbbrev
              bookNumChapters
              bookNumVerses
              bookNumWords
            }
          }
        }
      }
    }
  `)

  const books = data.gnt.allBooks.edges

  const book_menu = (book) => {
    let chs = [...Array(book.node.bookNumChapters).keys()].map((x) => x + 1)
    const sameBook = bookOpen === book.node.bookName
    return (
      <div>
        <div
          className={`cursor-pointer ml-8 mr-10 py-2 font-sans text-md md:text-lg md:hover:text-blue-500 
            ${
              sameBook
                ? "border-b border-gray-500 text-blue-500"
                : "border-none text-gray-300"
            }`}
          onClick={() => {
            if (sameBook) {
              setBookOpen("")
            } else {
              setBookOpen(book.node.bookName)
            }
          }}
        >
          {book.node.bookName}
        </div>

        {sameBook && (
          <div className={`grid grid-cols-3 mt-2`}>
            {chs.map((ch) => (
              <Link
                key={ch}
                to={`/${book.node.bookNameAbbrev}-${ch}`}
                className={`text-center px-1 py-1 text-gray-500 hover:text-white`}
              >
                {ch}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }
  return (
    <div className={``}>
      {books.map((book, i) => (
        <div key={i}>{book_menu(book)}</div>
      ))}
    </div>
  )
}

export default ChapterMenu
