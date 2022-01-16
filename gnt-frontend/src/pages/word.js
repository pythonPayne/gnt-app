import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Word = () => {
  const data = useStaticQuery(graphql`
    {
      gnt {
        allLexns(lexnId: "0012") {
          edges {
            node {
              lexnId
              lexnGreek
              lexnEnglish
              lexnTransliteration
              lexnFreqNt
              lexnFunction
              pdgm {
                edges {
                  node {
                    pdgmGreek
                    pdgmFreqNt
                    pdgmPars {
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
              word (first:1500) {
                edges {
                  node {
                    wordGreek
                    wordPars {
                      parsId
                    }
                    wordVers {
                      versRefAbbrev
                      versChapUrl
                      word {
                        edges {
                          node {
                            wordGreek
                            wordEnglish
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
  `)
  const lexn = data.gnt.allLexns.edges[0].node
  const pdgm = lexn.pdgm.edges
  const verses = lexn.word.edges
  console.log(lexn)
  console.log(pdgm)
  console.log(verses)

  return <pre>{JSON.stringify(data, null, 4)}</pre>
}

export default Word

