import { navigate } from "gatsby"
import React, { useState } from "react"

const VocabCard = ({ card }) => {
  const [showingBack, setShowingBack] = useState(false)

  const cardStyle = {
    perspective: "1000px",
    transform: showingBack && "-rotateY( 180deg )",
  }

  const contentStyle = {
    transformStyle: "preserve-3d",
    transform: showingBack && "rotateY( 180deg )",
    transition: "transform 1.5s",
  }

  const frontStyle = {
    backfaceVisibility: "hidden",
  }

  const backStyle = {
    backfaceVisibility: "hidden",
    transform: "rotateY( 180deg )",
  }

  return (
    <div>
      <div className="h-64 w-96" style={cardStyle}>
        <div
          className="ring-2 ring-blue-300 ring-opacity-50 w-full h-full absolute cursor-pointer"
          onClick={() => setShowingBack(!showingBack)}
          style={contentStyle}
        >
          <div
            className="absolute h-full w-full bg-white flex justify-center items-center text-center"
            style={frontStyle}
          >
            {card.lexnGreek}
            <br />
            {card.lexnGreek.length !== card.lexnGreekLong.length &&
              card.lexnGreekLong}
          </div>
          <div className="absolute h-full w-full bg-gray-200" style={backStyle}>
            <div className="absolute top-5 left-5">
              {card.lexnGreek}
              <br />
              {card.lexnGreek.length !== card.lexnGreekLong.length &&
                card.lexnGreekLong}
            </div>
            <div
              className="absolute top-5 right-5 z-50"
              onClick={() => navigate(`/word-${card.lexnId}`)}
            >
              {card.lexnId}
            </div>
            <div className="absolute bottom-5 left-5">{card.lexnFunction}</div>
            <div className="absolute bottom-5 right-5">{card.lexnFreqNt}x</div>
            <div className="grid place-content-center h-full w-full">
              {card.lexnDefinition}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VocabCard
