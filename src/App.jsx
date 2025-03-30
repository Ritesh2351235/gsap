// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectImages } from './assets/images';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const headingRef = useRef(null);
  const textRefs = useRef([]);
  const [activeSection, setActiveSection] = useState('home');

  // Function to scroll to a section
  const scrollToSection = (elementRef, section) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    });
    setActiveSection(section);
  };

  // Initialize LocomotiveScroll and set up scroll observers
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const locomotiveScroll = new LocomotiveScroll();

    // Create scroll observer to update active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    const sections = [homeRef.current, aboutRef.current, projectsRef.current, contactRef.current];
    sections.forEach((section, i) => {
      if (section) {
        section.setAttribute('data-section', ['home', 'about', 'projects', 'contact'][i]);
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // GSAP animations
  useGSAP(() => {
    // Animate main heading
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power3.out",
    });

    // Animate text sections on scroll
    textRefs.current.forEach((ref) => {
      gsap.from(ref, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Animate project images
    gsap.utils.toArray('.project-image-container').forEach((container, i) => {
      const direction = i % 2 === 0 ? 50 : -50;

      gsap.from(container, {
        x: direction,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      });
    });
  });

  return (
    <div className="w-full relative font-['Helvetica_Now_Display', san-serif]">
      {/* Navigation */}
      <nav className="w-full p-8 flex justify-between z-50 fixed top-0 left-0">
        <div className="brand text-2xl font-md">pepperstudios</div>
        <div className="links flex gap-10">
          {[
            { name: "Home", ref: homeRef, id: 'home' },
            { name: "About", ref: aboutRef, id: 'about' },
            { name: "Projects", ref: projectsRef, id: 'projects' },
            { name: "Contact", ref: contactRef, id: 'contact' }
          ].map((link, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(link.ref, link.id)}
              className={`text-md hover:text-gray-300 bg-transparent border-none cursor-pointer ${activeSection === link.id ? 'font-medium' : 'font-light'
                }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Home Section */}
      <section ref={homeRef} className="w-full relative min-h-screen pt-24">
        <div>
          {data[0].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        </div>
        <div className='w-full px-[20%] relative'>
          <div
            className='text w-[38%]'
            ref={el => textRefs.current[0] = el}
          >
            <h3 className='text-3xl font-light'>
              At Pepperstudio, we build immersive digital experiences for
              brands with a purpose.
            </h3>

            <p className='text-sm font-thin mt-5'>
              We&apos;re a boutique production studio focused on design,
              motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
            </p>
            <p className='text-md font-regular mt-5'>
              click on pepperstudios
            </p>
          </div>
        </div>
        <div className='w-full absolute bottom-0 left-0'>
          <h1 ref={headingRef} className='text-[14rem] font-normal tracking-tight pr-10'>pepperstudios</h1>
        </div>
      </section>

      <div className="w-full relative min-h-screen pt-28">
        <div>
          {data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        </div>
        <div className='w-screen px-[20%] mx-[0%] flex'>
          <div className='mr-[30%]'>
            <h2 className='text-4xl font-regular'>
              WHAT WE DO
            </h2>
          </div>
          <div
            className='text w-[38%]'
            ref={el => textRefs.current[1] = el}
          >
            <h3 className='text-3xl font-light'>
              We aim to revolutionize digital production in the advertising space, bringing your ideas to life.
            </h3>
            <p className='text-sm font-thin mt-[15%]'>
              As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver seamless digital work.
            </p>
            <p className='text-sm font-thin mt-5'>
              Our commitment to creativity, innovation, and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section ref={aboutRef} className="w-full relative min-h-screen pt-28">
        <div>
          {data[2].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        </div>
        <div className='w-screen px-[20%] mx-[0%] flex'>
          <div className='mr-[30%]'>
            <h2 className='text-4xl font-regular'>
              ABOUT US
            </h2>
          </div>
          <div
            className='text w-[38%]'
            ref={el => textRefs.current[2] = el}
          >
            <h3 className='text-3xl font-light'>
              The studio where creativity meets technology in perfect harmony.
            </h3>
            <p className='text-sm font-thin mt-[15%]'>
              Founded in 2018, Pepperstudio has been redefining digital experiences through a unique blend of design innovation and technological excellence. Our team of creatives, developers, and strategists work together to push the boundaries of what&apos;s possible.
            </p>
            <p className='text-sm font-thin mt-5'>
              We believe in the power of immersive storytelling and interactive experiences to create meaningful connections between brands and their audiences. Every project we undertake becomes a canvas for our passion and expertise.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full relative min-h-screen pt-28">
        <div>
          {data[3].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        </div>
        <div
          className='w-screen px-[20%] mx-[0%]'
          ref={el => textRefs.current[3] = el}
        >
          <h2 className='text-4xl font-regular mb-16'>
            OUR TEAM
          </h2>
          <div className='grid grid-cols-2 gap-16'>
            <div>
              <h3 className='text-2xl font-light mb-4'>
                Alex Thompson
              </h3>
              <p className='text-sm font-thin'>
                Creative Director & Founder
              </p>
              <p className='text-sm font-thin mt-4'>
                With over 15 years in digital design, Alex leads our creative vision with a blend of artistic intuition and strategic thinking.
              </p>
            </div>
            <div>
              <h3 className='text-2xl font-light mb-4'>
                Sarah Chen
              </h3>
              <p className='text-sm font-thin'>
                Technical Director
              </p>
              <p className='text-sm font-thin mt-4'>
                Sarah bridges the gap between creativity and technology, ensuring our most ambitious ideas become technical realities.
              </p>
            </div>
            <div>
              <h3 className='text-2xl font-light mb-4'>
                Marcus Williams
              </h3>
              <p className='text-sm font-thin'>
                Motion Design Lead
              </p>
              <p className='text-sm font-thin mt-4'>
                Marcus brings our static designs to life with fluid animations and captivating motion graphics that tell compelling stories.
              </p>
            </div>
            <div>
              <h3 className='text-2xl font-light mb-4'>
                Priya Sharma
              </h3>
              <p className='text-sm font-thin'>
                Client Strategy Director
              </p>
              <p className='text-sm font-thin mt-4'>
                Priya ensures every project aligns with our clients&apos; business objectives while pushing creative boundaries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section ref={projectsRef} className="w-full relative min-h-screen pt-28">
        <div>
          {data[4].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        </div>
        <div
          className='w-screen px-[20%] mx-[0%]'
          ref={el => textRefs.current[4] = el}
        >
          <h2 className='text-4xl font-regular mb-16'>
            OUR PROJECTS
          </h2>
          <div className='space-y-24'>
            <div className='flex items-center'>
              <div className='w-[40%]'>
                <h3 className='text-2xl font-light mb-4'>
                  Immersive Brand Experience
                </h3>
                <p className='text-sm font-thin'>
                  For Nike
                </p>
                <p className='text-sm font-thin mt-4'>
                  An interactive installation combining physical and digital elements to create a unique brand journey that captivated visitors at their flagship store.
                </p>
              </div>
              <div className='w-[60%] flex justify-end'>
                <div className='w-96 h-64 overflow-hidden rounded-sm project-image-container'>
                  <img
                    src={projectImages.nike}
                    alt="Nike Immersive Brand Experience"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='w-[60%]'>
                <div className='w-96 h-64 overflow-hidden rounded-sm project-image-container'>
                  <img
                    src={projectImages.spotify}
                    alt="Spotify Digital Campaign Platform"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className='w-[40%] pl-12'>
                <h3 className='text-2xl font-light mb-4'>
                  Digital Campaign Platform
                </h3>
                <p className='text-sm font-thin'>
                  For Spotify
                </p>
                <p className='text-sm font-thin mt-4'>
                  A responsive web experience that brought Spotify&apos;s annual wrapped campaign to life with custom animations and interactive data visualizations.
                </p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='w-[40%]'>
                <h3 className='text-2xl font-light mb-4'>
                  AR Product Showcase
                </h3>
                <p className='text-sm font-thin'>
                  For IKEA
                </p>
                <p className='text-sm font-thin mt-4'>
                  An augmented reality application that allows users to visualize furniture in their homes before purchase, enhancing the shopping experience.
                </p>
              </div>
              <div className='w-[60%] flex justify-end'>
                <div className='w-96 h-64 overflow-hidden rounded-sm project-image-container'>
                  <img
                    src={projectImages.ikea}
                    alt="IKEA AR Product Showcase"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="w-full relative min-h-screen pt-28">
        <div>
          {data[5] && data[5].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        </div>
        <div className='w-screen px-[20%] mx-[0%] flex'>
          <div className='mr-[30%]'>
            <h2 className='text-4xl font-regular'>
              CONTACT
            </h2>
          </div>
          <div
            className='text w-[38%]'
            ref={el => textRefs.current[5] = el}
          >
            <h3 className='text-3xl font-light'>
              Let&apos;s create something extraordinary together.
            </h3>

            <div className='mt-[15%]'>
              <p className='text-sm font-bold mb-2'>Email</p>
              <p className='text-sm font-thin'>hello@pepperstudios.com</p>
            </div>

            <div className='mt-8'>
              <p className='text-sm font-bold mb-2'>Phone</p>
              <p className='text-sm font-thin'>+1 (415) 555-0123</p>
            </div>

            <div className='mt-8'>
              <p className='text-sm font-bold mb-2'>Location</p>
              <p className='text-sm font-thin'>123 Design Avenue<br />San Francisco, CA 94103</p>
            </div>

            <div className='mt-12'>
              <form className='space-y-8'>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className='w-full bg-transparent border-b border-black pb-1 text-sm font-thin outline-none placeholder:text-black'
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className='w-full bg-transparent border-b border-black pb-1 text-sm font-thin outline-none placeholder:text-black'
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your message"
                    rows="4"
                    className='w-full bg-transparent border-b border-black pb-1 text-sm font-thin outline-none resize-none placeholder:text-black'
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className='border border-black px-6 py-2 text-sm'
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
