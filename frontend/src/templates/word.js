import React, { useEffect, useState, useRef, useCallback } from "react"
import { graphql, Link, navigate } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../components/Layout"
import WordBarChart from "../components/WordBarChart"
import { toggleShowMenu } from "../redux/actions/layout"
import { toggleExpandAllVerses } from "../redux/actions/verseCard"
import { setSectionShowing, setLexnIdLastVisited, clearWordState, setParsIds, setScrollPosition, setLexnGreekLastVisited } from "../redux/actions/word"
import Carousel from "../components/Carousel"

export const query = graphql`
query($lexnId: String!){
  gnt {
    allLexns(lexnId:$lexnId) {
      edges {
        node {
          lexnId
          lexnGreek
          lexnGreekLong          
          lexnTransliteration
          lexnGloss
          lexnDefinition
          lexnUsage
          lexnStrongs
          lexnFreqNt
          lexnFunction                                                
          pdgm {
            edges {
              node {
                pdgmGreek
                pdgmFreqNt
                pdgmPars {
                  parsId
                  parsRank
                  parsFunction
                  parsTense
                  parsVoice
                  parsMood
                  parsPerson
                  parsCase
                  parsGender
                  parsNumber 
                  word(wordLexnIdCopy:$lexnId){
                    edges{
                      node{
                        wordParsIdCopy
                        wordEnglish
                        wordVers{
                          versBookNameAbbrev
                          versRefAbbrev       
                          versChapUrl                   
                          versId
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
  const dispatch = useDispatch()
  const expandAllVerses = useSelector(state => state.verseCard.expandAllVerses)  
  
  const book = useSelector(state => state.word.book)  
  const sectionShowing = useSelector(state => state.word.sectionShowing)
  const parsIds = useSelector(state => state.word.parsIds)
  const parsTense = useSelector(state => state.word.parsTense)
  const parsVoice = useSelector(state => state.word.parsVoice)
  const parsMood = useSelector(state => state.word.parsMood)
  const parsPerson = useSelector(state => state.word.parsPerson)
  const parsCase = useSelector(state => state.word.parsCase)
  const parsGender = useSelector(state => state.word.parsGender)
  const parsNumber = useSelector(state => state.word.parsNumber)
  const lexnIdLastVisited = useSelector(state => state.word.lexnIdLastVisited)
  const scrollPosition = useSelector(state => state.word.scrollPosition)
       
  const [lexn, setLexn] = useState(null)
  const [pdgm, setPdgm] = useState(null)
  const [pdgmF, setPdgmF] = useState(null)
  const [verses, setVerses] = useState(null)

  useEffect(() => {
    if (props.data.gnt.allLexns.edges[0].node.lexnId !== lexnIdLastVisited){
      dispatch(clearWordState())
      dispatch(setLexnIdLastVisited(props.data.gnt.allLexns.edges[0].node.lexnId))
      dispatch(setLexnGreekLastVisited(props.data.gnt.allLexns.edges[0].node.lexnGreek))
    } else {      
      setTimeout(function () {
        window.scrollTo(0, scrollPosition);
      },200);      
    }
  },[])

  useEffect(() => {
    setLexn(props.data.gnt.allLexns.edges[0].node)
    setPdgm(props.data.gnt.allLexns.edges[0].node.pdgm.edges.sort((a,b) => a.node.pdgmPars.parsRank - b.node.pdgmPars.parsRank))
    setVerses(
      props.data.gnt.allLexns.edges[0].node.pdgm.edges.map(edge => edge.node.pdgmPars.word.edges).flat().map(edge => { return (
        {
          parsId: edge.node.wordParsIdCopy,
          versBookNameAbbrev: edge.node.wordVers.versBookNameAbbrev,
          versRefAbbrev: edge.node.wordVers.versRefAbbrev,
          versId: edge.node.wordVers.versId,
          versChapUrl: edge.node.wordVers.versChapUrl,
        }
      )}).sort((a,b) => a.versId > b.versId ? 1 : -1)
    )
  },[])

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    dispatch(toggleExpandAllVerses(false))
  },[])

  useEffect(() => {
   setPdgmF(pdgm && pdgm.filter(item => 
    (parsTense === '*' | item.node.pdgmPars.parsTense === parsTense) &
    (parsVoice === '*' | item.node.pdgmPars.parsVoice === parsVoice) &
    (parsMood === '*' | item.node.pdgmPars.parsMood === parsMood) &
    (parsPerson === '*' | item.node.pdgmPars.parsPerson === parsPerson) &
    (parsCase === '*' | item.node.pdgmPars.parsCase === parsCase) &
    (parsGender === '*' | item.node.pdgmPars.parsGender === parsGender) &
    (parsNumber === '*' | item.node.pdgmPars.parsNumber === parsNumber) 
  )  )
  },[pdgm, parsTense, parsVoice, parsMood, parsPerson, parsCase, parsGender, parsNumber])

  useEffect(() => {
    dispatch(setParsIds(pdgmF && pdgmF.map(item => item.node.pdgmPars.parsId)))
  },[pdgmF])

  const handleClickVerse = (e, verse) => {    
    dispatch(setScrollPosition(e.pageY-e.screenY*0.40))
    navigate(`/${verse.versChapUrl}`)
  }
  


  /*************************************************************************/
  // LOGIC
  /*************************************************************************/

  // filter verses by pars selection and book selection
  // const parsIds = pdgmF && pdgmF.map(item => item.node.pdgmPars.parsId)    
  let versesF;
  let counts;  
  let frlb = []

  if (lexn && pdgm && verses && parsIds) {
    versesF = verses.filter(verse => parsIds.includes(verse.parsId))
    
    counts = versesF.reduce((p, c) => {      
      let key = c.versBookNameAbbrev      
      if(!p.hasOwnProperty(key)) { p[key] = 0 }
      p[key]++
      return p
    }, {})

    for (var key in counts) {
      frlb = [
        ...frlb,
        {node: {
          frlbBookNameAbbrev: key,
          frlbCount: counts[key]
        }}
      ]    
    }
      
    //removing duplicates with long [...new ] when a word appears > 1 time in a verse
    if (book !== '') {
      versesF = [...new Map((versesF.filter(verse => verse.versBookNameAbbrev === book)).map((item) => [item["versRefAbbrev"], item])).values()]
    } else {
      versesF = [...new Map((versesF.map((item) => [item["versRefAbbrev"], item]))).values()]
    }
  }  
  
  /*************************************************************************/
  // JSX
  /*************************************************************************/
  if(versesF) {return (
    <Layout>
      <div className={`max-w-[800px] bg-gray-50 bg-opacity-100 text-gray-700`}>
      
      {/* word banner */}
      <div>
          <div className={`flex justify-center items-center h-[12vh] text-3xl text-gray-500`}>      
            {lexn.lexnGreek}
          </div>
      </div>  
  
      {/* horizontal menu */}
      <div className="sticky top-0 bg-gray-50">
         <div className={`grid grid-cols-3 gap-x-3 py-4 mx-3`}>
          
            <div className={`flex justify-center py-2 cursor-pointer
            ${sectionShowing === 'lexicon' ? "bg-blue-100 text-gray-700 shadow" : "text-gray-500"}`}
            onClick={() => dispatch(setSectionShowing('lexicon'))}>
              Lexicon
            </div>

            <div className={`flex justify-center py-2 cursor-pointer
            ${sectionShowing === 'usage' ? "bg-blue-100 text-gray-700 shadow" : "text-gray-500"}`}
            onClick={() => dispatch(setSectionShowing('usage'))}>
              Usage
            </div>            
  
            <div className={`flex justify-center py-2 cursor-pointer
            ${sectionShowing === 'parsing' ? "bg-blue-100 text-gray-700 shadow" : "text-gray-500"}`}
            onClick={() => dispatch(setSectionShowing('parsing'))}>                          
              {(parsTense === "*" & parsVoice === "*" & parsMood === "*" & parsPerson === "*" &
              parsCase === "*" & parsGender === "*" & parsNumber === "*")
              ?                                        
              <div className={``}>Parsing</div>              
              :
              <>
              <div className={`${parsTense==="*" && "text-gray-500"}`}>{parsTense}</div>
              <div className={`${parsVoice==="*" && "text-gray-500"}`}>{parsVoice}</div>
              <div className={`${parsMood==="*" && "text-gray-500"}`}>{parsMood}</div>
              <div className={`text-gray-500`}>{"-"}</div>
              <div className={`${parsPerson==="*" && "text-gray-500"}`}>{parsPerson}</div>
              <div className={`${parsCase==="*" && "text-gray-500"}`}>{parsCase}</div>
              <div className={`${parsGender==="*" && "text-gray-500"}`}>{parsGender}</div>
              <div className={`${parsNumber==="*" && "text-gray-500"}`}>{parsNumber}</div>
              </>
              }
            </div>          
  
         </div>
      </div>  
  
      {/* lexicon section */}
      {sectionShowing === 'lexicon' &&
      <div className={`mx-2 mt-6 min-h-screen pb-24`}>      
          <div className={`flex flex-col space-y-10 p-3`}>  
          <div className={`grid grid-cols-2 gap-y-4 gap-x-8`}>
            <div className={`text-right pr-4`}>ID</div>
            <div>{lexn.lexnId}</div>
            <div className={`text-right pr-4`}># in NT</div>
            <div>{lexn.lexnFreqNt}</div>
            <div className={`text-right pr-4`}>Greek</div>          
            <div>{lexn.lexnGreekLong}</div>          
            <div className={`text-right pr-4`}>Function</div>
            <div>{lexn.lexnFunction}</div>
            <div className={`text-right pr-4`}>Transliteration</div>
            <div>{lexn.lexnTransliteration}</div>            
            <div className={`text-right pr-4`}>Gloss</div>
            <div>{lexn.lexnGloss}</div>
            <div className={`text-right pr-4`}>Translation</div>          
            <div>{lexn.lexnDefinition}</div>                        
          </div>                   
        </div>
      </div>
      }
  
      {sectionShowing === 'usage' &&
      <div className={`min-h-screen text-gray-600 bg-gray-50`}>
  
        {/* bar chart */}
        <div className={`sticky top-0 px-3 py-6 bg-gray-50`}>    
          <WordBarChart frlb={frlb} book={book} />
        </div>
  
        {/* verses on bar click */}
        <div className={`mx-2 mt-4 grid grid-cols-3 gap-y-2 gap-x-2`}>
          {versesF.map((verse,key) => (
            <div key={key} className={`p-2 border cursor-pointer bg-gray-100 text-gray-600 text-sm shadow hover:bg-blue-100`} onClick={(e) => handleClickVerse(e,verse)}>              
              {verse.versRefAbbrev}
            </div>
          ))}      
        </div>        
  
      </div>
      }

      {/* parsing section */}
      {sectionShowing === 'parsing' &&
      <div className={`min-h-screen text-gray-600 bg-gray-50`}>
         <div className="flex justify-center py-10 space-x-1 sticky top-0 bg-gray-50">        
            <Carousel parsVar={"parsTense"}  visibleItem={parsTense}  parsLabel={'T'} pdgm={pdgm} pdgmF={pdgmF} />
            <Carousel parsVar={"parsVoice"}  visibleItem={parsVoice}  parsLabel={'V'} pdgm={pdgm} pdgmF={pdgmF} />
            <Carousel parsVar={"parsMood"}   visibleItem={parsMood}   parsLabel={'M'} pdgm={pdgm} pdgmF={pdgmF} />
            <Carousel parsVar={"parsPerson"} visibleItem={parsPerson} parsLabel={'P'} pdgm={pdgm} pdgmF={pdgmF} />
            <Carousel parsVar={"parsCase"}   visibleItem={parsCase}   parsLabel={'C'} pdgm={pdgm} pdgmF={pdgmF} />
            <Carousel parsVar={"parsGender"} visibleItem={parsGender} parsLabel={'G'} pdgm={pdgm} pdgmF={pdgmF} />
            <Carousel parsVar={"parsNumber"} visibleItem={parsNumber} parsLabel={'N'} pdgm={pdgm} pdgmF={pdgmF} />          
          </div>        
  
          <div className={`flex justify-between px-4 py-4`}>
            <div className={`flex flex-col`}>
              {pdgmF.map((item, i) => <div key={i} className={`p-1`}>
                {item.node.pdgmPars.parsId}
                </div>)}
            </div>          
            <div className={`flex flex-col`}>
              {pdgmF.map((item, i) => <div key={i} className={`p-1`}>
                {item.node.pdgmGreek}
                </div>)}
            </div>
            <div className={`flex flex-col`}>
              {pdgmF.map((item, i) => <div key={i} className={`p-1`}>
                {item.node.pdgmFreqNt}
                </div>)}
            </div>
          </div>
      </div>
      }    
  
      </div>
    </Layout>
    )
      } else return (
    <Layout>
  
        <></>
      
    </Layout>
    )
  }
  
  export default Word
  
  