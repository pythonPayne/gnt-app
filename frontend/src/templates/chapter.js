import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import VerseCard from "../components/VerseCard"
import Layout from "../components/Layout"

import {
  toggleShowMenu,
  toggleShowSettings,
  setTemplate,
} from "../redux/actions/layout"
import { toggleExpandAllVerses } from "../redux/actions/verseCard"

export const query = graphql`
  query ($chapId: String!) {
    gnt {
      allChaps(chapId: $chapId) {
        edges {
          node {
            chapBook {
              bookName
            }
            chapId
            vers {
              edges {
                node {
                  versId
                  versRefAbbrev
                  versChapUrl
                  word {
                    edges {
                      node {
                        wordGreek
                        wordEnglish
                        wordLexn {
                          lexnId
                        }
                        wordPars {
                          parsId
                          parsFunction
                          parsTense
                          parsVoice
                          parsMood
                          parsPerson
                          parsCase
                          parsGender
                          parsNumber
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

const Chapter = (props) => {
  const dispatch = useDispatch()
  const expandAllVerses = useSelector(
    (state) => state.verseCard.expandAllVerses
  )
  const data = props.data

  useEffect(() => {
    if (!props.location.hash) return

    window.requestAnimationFrame(() => {
      const anchor = document.querySelector(props.location.hash)
      const offset = anchor.getBoundingClientRect().top + window.scrollY
      window.scroll({ top: offset, left: 0 })
    })
  }, [])

  useEffect(() => {
    dispatch(setTemplate("chapter"))
    dispatch(toggleShowMenu(false))
    dispatch(toggleShowSettings(true))
    dispatch(toggleExpandAllVerses(true))
  }, [])

  const chap = data.gnt.allChaps.edges[0].node
  const verses = chap.vers.edges

  return (
    <Layout>
      <div className={`flex justify-center bg-gray-50`}>
        <div className={`max-w-[1100px]`}>
          <div
            className={`flex items-center justify-center h-[12vh] text-3xl text-gray-500 tracking-wide mb-2`}
          >
            {chap.chapBook.bookName} {parseInt(chap.chapId.slice(2, 4))}
          </div>

          {/* VERSES */}
          <div className={`mx-2`}>
            {verses.map((verse, key) => (
              <div
                key={key}
                className={`mb-6`}
                id={`${verse.node.versChapUrl.split("#")[1]}`}
              >
                <VerseCard
                  verse={verse.node}
                  lexnId={"0"}
                  open={expandAllVerses}
                />
              </div>
            ))}
          </div>

          <div className={`min-h-[30vh]`}></div>
        </div>
      </div>
    </Layout>
  )
}

export default Chapter
