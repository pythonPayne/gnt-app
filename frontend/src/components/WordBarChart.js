import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { setBook } from '../redux/actions/word'

const WordBarChart = ({frlb, book }) => {
    const dispatch = useDispatch()
    const [barCountMax, setBarCountMax] = useState(null)

    useEffect(() => {        
        setBarCountMax(Math.max(...frlb.map(x => x.node.frlbCount)))
      },[])

    const book_bar = (barBook,barCount) => {    
        let h = Math.round(100*barCount/barCountMax)
        return (
        <div className={`flex h-full`}>
            <div className={`w-20 h-full flex flex-col-reverse mr-3`}>
                <div className={`h-[15%] flex justify-center hover:font-semibold cursor-pointer`} 
                onClick={() => dispatch(setBook(barBook === book ? '' : barBook))}>
                    {barBook}
                </div>
                <div className={`flex justify-center cursor-pointer ${barBook === book ? "bg-gray-400" : "bg-gray-100"}`} 
                style={{height: `${h}%`}}
                onClick={() => dispatch(setBook(barBook === book ? '' : barBook))}>
                </div>
                <div className={`h-[15%] flex justify-center items-center pb-1`}>
                    {barCount}
                </div>
            </div>          
        </div>
        )
    }

  return (
    <div>      
      <div className={`flex h-[150px] overflow-x-scroll overflow-y-hidden no-scrollbar`}>
        {frlb.map(b => (
          <div key={b.node.frlbBookNameAbbrev}>
            {book_bar(b.node.frlbBookNameAbbrev, b.node.frlbCount)}
          </div>
        ))}           
      </div>  
    </div>
  )
}

export default WordBarChart