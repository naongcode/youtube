import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch, AiOutlineArrowLeft, AiOutlineMenu, AiOutlinePlus, AiFillBell } from 'react-icons/ai';
import { MdKeyboard, MdMic } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useTheme } from '../context/themeProvider.js';


export default function Header({ setIsSidebarExpanded, isSidebarExpanded}) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [search, setSearch] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);  
  const profileRef = useRef(null); 
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

 
    return () => {
      if (profileRef.current) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 692) {
        setIsSearchMode(false);  // 692px 이상이면 검색 모드 해제
      }
    };

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize); //클린업
    };
  }, []);

  // 검색 처리
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search/${search}`);  // 검색어로 새로운 URL로 이동
  };

  // 다크모드 토글
  const {themeMode, toggleTheme} = useTheme();
  // console.log(toggleTheme)

  return (
    <header className="header">
      {!isSearchMode ? (
        <div className="left-section">
          <AiOutlineMenu
            size={24}
            className="menu-icon"
            onClick={() => setIsSidebarExpanded((prev) => !prev)}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="logo"
            onClick={() => navigate('/')}
          />
          <span className="premium-text">Premium</span>
        </div>
      ) : null}

      <div className={`center-section ${isSearchMode ? 'search-mode' : ''}`}>
        <div className="center-wrap">
          <input
            type="text"
            placeholder="검색"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <MdKeyboard className="keyboard-icon" size={20} />
          <button className="search-button" onClick={handleSearch}>
            <AiOutlineSearch size={20} />
          </button>
          <button className="mic-button">
            <MdMic size={20} />
          </button>
        </div>
        {isSearchMode && (
          <AiOutlineArrowLeft
            size={24}
            className="back-icon"
            onClick={() => setIsSearchMode(false)}
          />
        )}
      </div>

      {!isSearchMode && (
        <div className="right-section">
          <button className="create-button">
            <AiOutlinePlus size={18} />
            <span>만들기</span>
          </button>
          <div className="notification-container">
            <AiFillBell size={24} className="notification-icon" />
            <span className="notification-badge">9+</span>
          </div>
          <div ref={profileRef} className="profile-container">
            <img
              src="/youtube/asset/profile.svg"
              alt="User Profile"
              className="profile-img"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}  // 메뉴 토글
            />
            {isProfileMenuOpen && (
              <div className="dropdown-menu">
                <div className="profile-section">
                  <img
                    src="/youtube/asset/profile.svg"
                    alt="User Profile"
                    className="dropdown-profile-img"
                  />
                  <div>
                    <p className="profile-name">공백</p>
                    <p className="profile-email">@공백-b9e5q</p>
                    <a href="/" className="view-channel">
                      내 채널 보기
                    </a>
                  </div>
                </div>
                <hr />
                <ul>
                  <li>Google 계정</li>
                  <li>계정 전환</li>
                  <li>로그아웃</li>
                  <hr />
                  <li>YouTube 스튜디오</li>
                  <li>내 Premium 혜택</li>
                  <li>구매 항목 및 멤버십</li>
                  <hr />
                  <li>
                    <button onClick={toggleTheme}>
                      {themeMode === "light" ? "다크" : "라이트"}
                    </button></li>
                  <hr />
                  <li>설정</li>
                  <li>고객센터</li>
                  <li>의견 보내기</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
