import React, { useState, useEffect, useRef  } from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlinePlus, AiFillBell, AiOutlineArrowLeft } from 'react-icons/ai';
import { MdMic , MdKeyboard } from 'react-icons/md';
import './Header.css';

export default function Header({ setIsSidebarExpanded, isSidebarExpanded }) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

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
    const handleResize = () => {
      if (window.innerWidth >= 692) {
        setIsSearchMode(false);  // 692px 이상이면 검색 모드 해제
      }
    };

    window.addEventListener('resize', handleResize);  // 창 크기 변경 시 이벤트 등록
    handleResize();  // 초기 상태 설정

    return () => window.removeEventListener('resize', handleResize);  // 클린업
  }, []);

  return (
    <header className="header">
      {!isSearchMode ? (
      <div className="left-section">
      <AiOutlineMenu
          size={24}
          className="menu-icon"
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube Logo"
          className="logo"
        />
        <span className="premium-text">Premium</span>
      </div>
      ): (<></>)}

      <div className={`center-section ${isSearchMode ? 'search-mode' : ''}`}>
          <div className="center-wrap">
            <input
              type="text"
              placeholder="검색"
              className="search-input"
            />
            <MdKeyboard className="keyboard-icon" size={20} />  {/* 키보드 아이콘 삽입 */}
            <button className="search-button">
              <AiOutlineSearch size={20} />
            </button>
            <button className="mic-button">
              <MdMic size={20} />
            </button>
          </div>
          <div className="center-right">
          {isSearchMode ? (<>
            <AiOutlineArrowLeft size={24} className="back-icon" onClick={() => setIsSearchMode(false)} />
            <input
              type="text"
              placeholder="검색"
              className="search-input search-input-mobile"
            />
            <MdKeyboard className="keyboard-icon" size={20} />
            <AiOutlineSearch
                size={24}
                className="search-icon-mobile"
                onClick={() => setIsSearchMode(true)}
              />
              <button className="mic-button">
                <MdMic size={20} />
              </button>
            </>
          ) : (
            <>
              <div className="center-right-wrap">
                <AiOutlineSearch
                  size={24}
                  className="search-icon-mobile-2"
                  onClick={() => setIsSearchMode(true)}
                />
                <button className="mic-button mic-button-2">
                  <MdMic size={20} />
                </button>
              </div>
            </>
          )}
            
            
          </div>
      </div>
      
      {!isSearchMode ? (
      <div className={`right-section ${isSearchMode ? 'hidden' : ''}`}>
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
            src="https://via.placeholder.com/32"
            alt="User Profile"
            className="profile-img"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          />

          {isProfileMenuOpen && (
            <div className="dropdown-menu">
              <div className="profile-section">
                <img
                  src="https://via.placeholder.com/32"
                  alt="User Profile"
                  className="dropdown-profile-img"
                />
                <div>
                  <p className="profile-name">공백</p>
                  <p className="profile-email">@공백-b9e5q</p>
                  <a href="/" className="view-channel">내 채널 보기</a>
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
                <li>설정</li>
                <li>고객센터</li>
                <li>의견 보내기</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      ): (<></>)}
    </header>
  );
}
