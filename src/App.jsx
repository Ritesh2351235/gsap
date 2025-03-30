// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';


const App = () => {

  const headingref = useRef(null);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

  }, [])
  return (
    <>
      <div className="w-full relative min-h-screen  font-['Helvetica_Now_Display', san-serif]">

        <div>
          {data[0].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        </div>
        <nav className="w-full p-8 flex justify-between z-50">
          <div className="brand text-2xl font-md">pepperstudios</div>
          <div className="links flex gap-10">
            {["Home", "About", "Projects", "Contact"].map((link, index) => (
              <a
                key={index}
                href={`#${link.toLowerCase()}`}
                className="text-md hover:text-gray-300"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
        <div className='w-full px-[20%] relative'>
          <div className='text w-[38%]'>
            <h3 className='text-3xl font-light'>
              At Pepperstudio, we build immersive digital experiences for
              brands with a purpose.
            </h3>

            <p className='text-sm font-thin mt-5'>
              We’re a boutique production studio focused on design,
              motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
            </p>
            <p className='text-md font-regular mt-5'>
              click on pepperstudios
            </p>
          </div>
        </div>
        <div className='w-full absolute bottom-0 left-0'>
          <h1 ref={headingref} className='text-[14rem] font-normal tracking-tight pr-10'>pepperstudios</h1>
        </div>
      </div>
      <div className="w-full relative min-h-screen  font-['Helvetica_Now_Display', san-serif]">
        <div>
          {data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        </div>
        <div className='w-screen px-[20%] mx-[0%] mt-[10%] flex'>
          <div className=' mr-[30%]'>
            <h2 className='text-4xl font-regular'>
              WHAT WE DO
            </h2>
          </div>
          <div className='text w-[38%]'>
            <h3 className='text-3xl font-light'>
              We aim to revolutionize digital production in the advertising space, bringing your ideas to life.
            </h3>
            <p className='text-sm font-thin mt-[15%]'>
              As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver seamless digital work.
            </p>
            <p className='text-sm font-thin mt-5'>
              Our commitment to creativity, innovation, and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
