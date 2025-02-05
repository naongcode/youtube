import React, { useState, useRef, useEffect } from 'react';
import './Nav.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function Navbar() {
  const categories = [
    '전체', '게임', '음악', '믹스', '라이브', '드라마', '액션 어드벤처 게임',
    '요리', '최근에 업로드된 동영상', '감상한 동영상', '새로운 맞춤 동영상'
  ];

  const [activeCategory, setActiveCategory] = useState('전체');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResizeOrScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft + container.clientWidth < container.scrollWidth);
    };

    handleResizeOrScroll();
    window.addEventListener('resize', handleResizeOrScroll);
    containerRef.current.addEventListener('scroll', handleResizeOrScroll);

    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      containerRef.current.removeEventListener('scroll', handleResizeOrScroll);
    };  
  }, []);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      {showLeftArrow && (
        <button className="arrow-button left-arrow" onClick={scrollLeft}>
          <AiOutlineLeft size={24} />
        </button>
      )}
      <div className="category-container" ref={containerRef}>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {showRightArrow && (
        <button className="arrow-button right-arrow" onClick={scrollRight}>
          <AiOutlineRight size={24} />
        </button>
      )}
    </nav>
  );
}
