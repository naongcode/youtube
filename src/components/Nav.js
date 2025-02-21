import React, { useState, useRef, useEffect } from 'react';
import './Nav.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function Navbar({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef(null);

  //useEffect밖에 함수를 정의
  const handleResizeOrScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return; //container가 존재하는지 확인

    handleResizeOrScroll(); //초기실행
    window.addEventListener('resize', handleResizeOrScroll);
    container.addEventListener('scroll', handleResizeOrScroll);

    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      if (container) {
        container.removeEventListener('scroll', handleResizeOrScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <nav className='navbar'>
      {showLeftArrow && (
        <button className='arrow-button left-arrow' onClick={scrollLeft}>
          <AiOutlineLeft size={24} />
        </button>
      )}
      <div className='category-container' ref={containerRef}>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${
              activeCategory === category ? 'active' : ''
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {showRightArrow && (
        <button className='arrow-button right-arrow' onClick={scrollRight}>
          <AiOutlineRight size={24} />
        </button>
      )}
    </nav>
  );
}
