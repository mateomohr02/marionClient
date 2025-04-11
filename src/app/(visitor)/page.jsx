import React from 'react'
import HeroHeader from '../components/HeroHeader'
import HomeContent from '../components/HomeContent'
import HomeAbout from '../components/HomeAbout'
import HomeBanner from '../components/HomeBanner'

const page = () => {
  return (
    <div className='flex flex-col'>

    <HeroHeader/>
    <HomeContent/>
    <HomeAbout/>
    <HomeBanner/>

    </div>
  )
}

export default page