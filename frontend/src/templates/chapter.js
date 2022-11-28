import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import VerseCard from "../components/VerseCard"
import Layout from "../components/Layout"
import { toggleShowMenu, toggleShowSettings, setTemplate } from "../redux/actions/layout"
import { toggleExpandAllVerses } from "../redux/actions/verseCard"

export const query = graphql`
query($chapId: String!){
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
  const expandAllVerses = useSelector(state => state.verseCard.expandAllVerses)     
  const [versesVisible, setVersesVisible] = useState([])
  const [latest, setLatest] = useState({id: 'verse1', visible: false})
  const data = props.data

  useEffect(() => {
    
    if (!props.location.hash) return;
    
    window.requestAnimationFrame(() => {
      const anchor = document.querySelector(props.location.hash);      
      const offset = anchor.getBoundingClientRect().top + window.scrollY;
      window.scroll({ top: offset, left: 0 });
    });
  
  },[])

  useEffect(() => {
    dispatch(setTemplate('chapter'))
    dispatch(toggleShowMenu(false))
    dispatch(toggleShowSettings(true))
    dispatch(toggleExpandAllVerses(true))
  },[])

  useEffect(() => {
    let temp = []
    document.querySelectorAll('div.mb-6').forEach(el => temp.push(el))
    setVersesVisible(temp.map(t => { return {id: t.id, visible: false} }))
  },[])

  useEffect(() => {        
    document.querySelectorAll('div.mb-6').forEach((i) => {      
      const observer = new IntersectionObserver((entries) => {            
        entries.forEach(entry => {
          if (entry.isIntersecting) { setLatest({id:entry.target.id, visible:true}); }
          else { setLatest({id:entry.target.id, visible:false}); }
          })},
        {threshold: [0]})
        observer.observe(i)
       })        
  },[])

  useEffect(() => {                
    let filteredVerses = []
    if (versesVisible.length > 0) {
      filteredVerses = versesVisible.filter(v => v.id !== latest.id) 
    } 
    setVersesVisible(filteredVerses && [...filteredVerses, latest])
  },[latest])

  useEffect(() => {
    let temp = versesVisible.filter(v => v.visible).sort((a,b) => {
      return parseInt(a.id.replace('verse','')) > parseInt(b.id.replace('verse','')) ? 1 : -1
    })

    temp[0] && window.history.replaceState(null, null, window.location.toString().split('#')[0] + '#' + temp[0].id)    

  },[versesVisible])


  const chap = data.gnt.allChaps.edges[0].node
  const verses = chap.vers.edges  
 
  return (  
    <Layout>

      <div className={`bg-gray-50`}>

        <div className={`flex items-center justify-center h-[12vh] text-3xl text-gray-500 tracking-wide mb-2`}>
          {chap.chapBook.bookName} {parseInt(chap.chapId.slice(2,4))}
        </div>
        
        {/* VERSES */}
        <div className={`mx-2`}>
          {verses.map((verse,key) => (
            <div key={key} className={`mb-6`} id={`${verse.node.versChapUrl.split('#')[1]}`}>          
              <VerseCard verse={verse.node} lexnId={'0'} open={expandAllVerses} />
            </div>
          ))}      
        </div>

        <div className={`min-h-[30vh]`}></div>

      </div>

    </Layout>
  )
}

export default Chapter
