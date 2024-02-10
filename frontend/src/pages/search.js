import React, { useState, useEffect } from "react"
import { graphql, navigate } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../components/Layout"
import VocabCard from "../components/VocabCard"
import { toggleShowMenu, toggleShowSettings } from "../redux/actions/layout"
import { SEO } from "../components/seo"

export const query = graphql`
  query {
    gnt {
      allLexns {
        edges {
          node {
            lexnId
            lexnGreek
            lexnGreekLong
            lexnDefinition
            lexnGloss
            lexnUsage
            lexnFreqNt
            lexnFunction
            lexnTransliteration
          }
        }
      }
    }
  }
`

const Search = (props) => {
  const dispatch = useDispatch()
  const dark = useSelector((state) => state.layout.dark)
  const lexns = props.data.gnt.allLexns.edges
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    dispatch(toggleShowSettings(true))
  }, [])

  const handleLexnIdClick = (lexnId) => {
    navigate(`/word-${lexnId}`)
  }

  return (
    <Layout>
      <div
        className={`flex flex-col items-center min-h-screen px-4 py-4
      ${dark ? "bg-gray-800" : "bg-gray-50"}
      `}
      >
        <div className={`max-w-[1100px]`}>
          <input
            value={search}
            placeholder="search..."
            onChange={(e) => setSearch(e.target.value)}
            className="focus:ring-2 ring-1 mb-12 px-2 py-1 text-xl"
          />
        </div>

        <div>
          {lexns
            .filter(
              (edge) =>
                edge.node.lexnDefinition
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                edge.node.lexnGloss
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
            )
            .slice(0, 100)
            .map((edge) => (
              <div className="mb-8">
                <VocabCard card={edge.node} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Search

export const Head = () => <SEO title="GNT" />
