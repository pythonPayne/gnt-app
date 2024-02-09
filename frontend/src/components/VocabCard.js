import { navigate } from "gatsby"
import { useSelector } from "react-redux"
import React, { useState } from "react"

const VocabCard = ({ card }) => {
  const [showingBack, setShowingBack] = useState(false)
  const dark = useSelector((state) => state.layout.dark)

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
      <div
        className="h-32 w-64 md:h-48 md:w-72 text-[0.60rem] leading-[0.75rem] md:text-sm "
        style={cardStyle}
      >
        <div
          className="ring-2 ring-blue-500 ring-opacity-50 w-full h-full absolute cursor-pointer"
          onClick={() => setShowingBack(!showingBack)}
          style={contentStyle}
        >
          <div
            className={`absolute h-full w-full flex justify-center items-center text-center
            ${dark ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`}
            style={frontStyle}
          >
            {card.lexnGreek}
            <br />
            {card.lexnGreek.length !== card.lexnGreekLong.length &&
              card.lexnGreekLong}
          </div>
          <div
            className={`absolute h-full w-full bg-gray-200
          ${dark ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700"}`}
            style={backStyle}
          >
            <div className="absolute top-2 left-2">
              {card.lexnGreek}
              <br />
              {card.lexnGreek.length !== card.lexnGreekLong.length &&
                card.lexnGreekLong}
            </div>
            <div
              className="absolute top-2 right-2 z-50"
              onClick={() => navigate(`/word-${card.lexnId}`)}
            >
              {card.lexnId}
            </div>
            <div className="absolute bottom-2 left-2">{card.lexnFunction}</div>
            <div className="absolute bottom-2 right-2">{card.lexnFreqNt}x</div>
            <div className="grid place-content-center h-full w-full text-center">
              {card.lexnGloss}
              <br />
              {card.lexnDefinition}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VocabCard
