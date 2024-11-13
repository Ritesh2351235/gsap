/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import canvasImages from './canvasimages'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const Canvas = ({ details }) => {
  const { startIndex, duration, size, top, left, zIndex } = details;
  const canvasRef = useRef(null);
  const [index, setIndex] = useState({ value: startIndex });
  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + 149,
      duration: duration,
      ease: 'linear',
      repeat: -1,
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      }
    });

    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
    })
  });
  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = canvasImages[index.value];
    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, [index]);
  return <canvas ref={canvasRef} id='canvas' className='absolute'
    data-scroll
    data-scroll-speed={Math.random().toFixed(1)}
    style={{
      width: `${size * 1.4}px`,
      height: `${size * 1.4}px`,
      top: `${top}%`,
      left: `${left}%`,
      zIndex: `${zIndex}`,
    }}></canvas>
}

export default Canvas
