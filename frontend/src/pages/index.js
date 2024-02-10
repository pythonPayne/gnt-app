import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import Vivus from "vivus"
import { SEO } from "../components/seo"

const Index = () => {
  const [svgFill, setSvgFill] = useState("none")

  useEffect(() => {
    new Vivus(
      "my-svg-id",
      {
        type: "oneByOne",
        duration: 200,
        animTimingFunction: Vivus.EASE,
        onReady: function (vivusInstance) {
          vivusInstance.el.style.visibility = "visible"
        },
      },
      () => setSvgFill("white")
    )
  }, [])

  return (
    <Layout>
      <div className="bg-gray-800 flex justify-center items-center min-h-screen">
        <svg
          id="my-svg-id"
          viewBox="0 0 244 86"
          xmlns="http://www.w3.org/2000/svg"
          className={`
          h-[86px] w-[244px] 
          xl:h-[172px] xl:w-[488px]
          transition-all ease-in duration-[2000ms] stroke-[3]
          ${
            svgFill === "none"
              ? "fill-gray-900 stroke-gray-300"
              : "fill-gray-300 stroke-gray-300 animate-pulse"
          }`}
          style={{ strokeLinecap: "square", visibility: "hidden" }}
        >
          <path d="M59.5518 28C58.6924 25.3698 57.5596 23.013 56.1533 20.9297C54.7731 18.8203 53.1195 17.0234 51.1924 15.5391C49.2913 14.0547 47.1299 12.9219 44.708 12.1406C42.2861 11.3594 39.6299 10.9688 36.7393 10.9688C31.9997 10.9688 27.6898 12.1927 23.8096 14.6406C19.9294 17.0885 16.8434 20.6953 14.5518 25.4609C12.2601 30.2266 11.1143 36.0729 11.1143 43C11.1143 49.9271 12.2731 55.7734 14.5908 60.5391C16.9085 65.3047 20.0465 68.9115 24.0049 71.3594C27.9632 73.8073 32.4163 75.0312 37.3643 75.0312C41.9476 75.0312 45.9841 74.0547 49.4736 72.1016C52.9893 70.1224 55.7236 67.3359 57.6768 63.7422C59.6559 60.1224 60.6455 55.8646 60.6455 50.9688L63.6143 51.5938H39.5518V43H70.0205V51.5938C70.0205 58.1823 68.6143 63.9115 65.8018 68.7812C63.0153 73.651 59.1611 77.4271 54.2393 80.1094C49.3434 82.7656 43.7184 84.0938 37.3643 84.0938C30.2809 84.0938 24.057 82.4271 18.6924 79.0938C13.3538 75.7604 9.18718 71.0208 6.19238 64.875C3.22363 58.7292 1.73926 51.4375 1.73926 43C1.73926 36.6719 2.58561 30.9818 4.27832 25.9297C5.99707 20.8516 8.41895 16.5286 11.5439 12.9609C14.6689 9.39323 18.3669 6.65886 22.6377 4.75782C26.9085 2.85677 31.6091 1.90625 36.7393 1.90625C40.958 1.90625 44.8903 2.54428 48.5361 3.82032C52.208 5.07032 55.4762 6.85416 58.3408 9.17187C61.2314 11.4635 63.6403 14.2109 65.5674 17.4141C67.4945 20.5912 68.8226 24.1198 69.5518 28H59.5518Z" />
          <path d="M158.3 3V83H148.925L105.331 20.1875H104.55V83H94.8623V3H104.237L147.987 65.9688H148.769V3H158.3Z" />
          <path d="M181.56 11.5938V3H241.56V11.5938H216.403V83H206.716V11.5938H181.56Z" />
        </svg>
      </div>
    </Layout>
  )
}

export default Index

export const Head = () => <SEO title="GNT" />
