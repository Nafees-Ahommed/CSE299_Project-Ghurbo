import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-28 bg-[#7d3200] text-white">
            <Title  title="Plan Your Next Adventure" />
            <p className='text-sm md:text-base text-white text-center mt-2 max-w-174'> Subscribe to get curated travel deals, destination highlights, and insider tips — straight to your inbox.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                <input type="text" className="bg-[#fd6801]/30 px-4 py-2.5 border border-[#fd6801]/90 rounded outline-none max-w-66 w-full" placeholder="Enter your email" />
                <button className="flex items-center justify-center gap-2 group bg-[#fd6801] px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">Subscribe
                <img src={assets.arrowIcon} alt="arrow-icon" className='w-3.5 invert group-hover:translate-x-1 transition-all'/>
                </button>
            </div>
            <p className="text-white mt-6 text-xs text-center">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
        </div>
  )
}

export default NewsLetter