/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CircularText = ({ text, radius, speed, color }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const characters = textElement.innerText.split('');
    textElement.innerHTML = '';

    characters.forEach((char, index) => {
      const charElement = document.createElement('span');
      charElement.textContent = char;
      charElement.style.position = 'absolute';
      charElement.style.color = color;
      const angle = (index / characters.length) * 2 * Math.PI;
      charElement.style.left = `${Math.cos(angle) * radius}px`;
      charElement.style.top = `${Math.sin(angle) * radius}px`;
      textElement.appendChild(charElement);
    });

    gsap.to(textElement.children, {
      duration: speed,
      rotation: '360deg',
      transformOrigin: '50% 50%',
      ease: 'linear',
      repeat: -1
    });
  }, [text, radius, speed, color]);

  return (
    <div
      ref={textRef}
      className="relative mx-auto w-fit h-fit overflow-hidden"
    >
      {text}
    </div>
  );
};

export default CircularText;