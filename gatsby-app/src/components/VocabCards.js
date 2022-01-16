import React from 'react'
import VocabCard from './VocabCard'

const VocabCards = ({cards}) => {
    
    return (        
        <div className={`pb-28 flex items-center justify-center`}>
            <div className={`w-[75%]`}>
            {cards.map((card,i) => (              
                <VocabCard key={i} card={card} />
            ))}            
          </div>        
        </div>          
    )
}

export default VocabCards
