import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'

const About = () => {
  const theme = useSelector((state) => state.layout.theme)    
  const dark = theme === "dark"
  
  return (
    <Layout>      
      <div className={`${dark ? "bg-gray-400" : "bg-gray-50"} min-h-screen md:text-lg`}> 
        <div className={`flex flex-col items-center `}>            
            <div className={`py-8`}></div>
            <div>I'm just getting started on the site...</div>
            <div className={`py-4`}></div>
            <div>Contact me for suggestions: <br/>stephen.thomas.payne@gmail.com</div>
            <div className={`py-4`}></div>
            <div>Or clone {" "}
            <a className={`text-blue-500 underline`} href="https://github.com/pythonPayne/gnt-app">the code</a> and get to work! 
            </div>
            <div className={`py-4`}></div>
            <div>Enjoy!</div>
        </div>             
      </div>
    </Layout>
  )
}

export default About


