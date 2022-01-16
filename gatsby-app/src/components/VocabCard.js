import React, { useState } from 'react'

const VocabCard = ({card}) => {
    const [showCardFront, setShowCardFront] = useState(true)
    return (                    
        <div className={`perspective-10 mt-5`}>
            <div className={`grid grid-cols-1 grid-rows-1 cursor-pointer shadow-xl rounded-xl
            transform duration-[1000ms] ease-in-out transform-style-3d ${!showCardFront && "-rotate-y-180"}`}
            onClick={()=>setShowCardFront(!showCardFront)} >
                <div className={`text-3xl col-[1/1] row-[1/1] backface-hidden flex items-center justify-center 
                h-[100px] bg-green-300 rounded-xl`}>                    
                    {card.lexicon}
                </div>
                <div className={`text-3xl col-[1/1] row-[1/1] backface-hidden flex items-center justify-center 
                h-[100px] bg-blue-300 rounded-xl rotate-y-180`}>                    
                    {card.gloss}
                </div>
            </div>
        </div>   
    )
}

export default VocabCard
