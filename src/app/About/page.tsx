import React from 'react'
import About from '../components/About/About'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export default function page() {
  return (
    <>
    <Header/>
    <div className='py-10'>
        <About/>
    </div>
    <Footer/>
    </>
  )
}
