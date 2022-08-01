import * as React from "react";
import { useDispatch } from "react-redux";
import { setParsTense, setParsVoice, 
  setParsMood, setParsPerson, setParsCase, setParsGender, setParsNumber  } from "../redux/actions/word"


const Carousel = (props) => {  
  const {parsVar, visibleItem, parsLabel, pdgm, pdgmF} = props  
  const dispatch = useDispatch()
  const refs = React.useRef([]);
  const observer = React.useRef(null);
  const addNode = React.useCallback((node) => refs.current.push(node),[]);
    
  React.useEffect(() => {
    if (observer.current) observer.current.disconnect();
    const newObserver = getObserver(observer);

    for (const node of refs.current) {
      newObserver.observe(node);
    }

    return () => newObserver.disconnect();
  }, []);

  React.useEffect(() => {
    const parsElement = document.getElementById("parsItem-"+parsLabel+"-"+visibleItem)    
    const containerElement = document.getElementById("parsContainer-"+parsLabel)    
    if (parsElement) { containerElement.scrollTop = parsElement.offsetTop }    
  },[])

  const handler = (entries) => {
    let targetText
    let targetId
    if(entries.filter(entry => entry.intersectionRatio >= 1).length > 0) {
      targetText = entries.filter(entry => entry.intersectionRatio >= 1)[0].target.textContent
      targetId = entries[0].target.id.slice(9,10) 
      switch (targetId) {
        case "T": dispatch(setParsTense(targetText)); break;
        case "V": dispatch(setParsVoice(targetText)); break;
        case "M": dispatch(setParsMood(targetText)); break;
        case "P": dispatch(setParsPerson(targetText)); break;
        case "C": dispatch(setParsCase(targetText)); break;
        case "G": dispatch(setParsGender(targetText)); break;
        case "N": dispatch(setParsNumber(targetText)); break;
      }
    }
  }
    
  const getObserver = (ref) => {
    let observer = ref.current;
    if (observer !== null) { return observer }
    let newObserver = new IntersectionObserver(handler, {root: null, rootMargin: "0px", threshold: 1.0 });
    ref.current = newObserver;
    return newObserver;
  };

  let items = pdgm && [...new Set(pdgm.map(item => item.node.pdgmPars[parsVar]))].filter(item => item !== '*' & item !== '')
  let itemsF = pdgmF && [...new Set(pdgmF.map(item => item.node.pdgmPars[parsVar]))].filter(item => item !== '*' & item !== '')
  
  return (
    <React.Fragment>
      <div className={`flex flex-col w-[45px] text-gray-600`}>
        <div className={`flex justify-center items-center`}>{parsLabel}</div>

        <div className={`relative flex flex-col border h-[45px] w-[45px] snap-y snap-mandatory no-scrollbar
        ${itemsF.length === 0 ? "bg-gray-300 text-gray-300 overflow-hidden" : "bg-white overflow-y-scroll"}`} id={"parsContainer-"+parsLabel}>
          {['*', ...items].map((item, i) => (
              <div key={i} className={`flex items-center justify-center snap-center min-w-full min-h-full`} ref={addNode} id={"parsItem-"+parsLabel+"-"+item} >
                {item}
              </div>
              )    
          )}        
        </div>      
      </div>
    </React.Fragment>
  )
};


export default Carousel;
