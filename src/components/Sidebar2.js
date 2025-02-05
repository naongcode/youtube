import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../asset/home.svg';
import ShortsIcon from '../asset/shorts.svg';
import SubscribeIcon from '../asset/subscribe.svg';
import HistoryIcon from '../asset/history.svg';
import PlaylistIcon from '../asset/playlist.svg';
import VideoIcon from '../asset/myvedio.svg';
import LaterIcon from '../asset/later.svg';
import ThumbsUpIcon from '../asset/good.svg';
import './Sidebar.css';

const Sidebar = ({ active }) => {
  return (
    <div className="container">
      <Link to="/" className="link">
        <div className={`main-menu ${active === "main" ? "active" : ""}`}>
          <img src={HomeIcon} className="icon" alt="Home" />
          <span className="menu-span">홈</span>
        </div>
      </Link>
      <Link to="/Finder" className="link">
        <div className={`main-menu ${active === "finder" ? "active" : ""}`}>
          <img src={ShortsIcon} className="icon" alt="Finder" />
          <span className="menu-span">탐색</span>
        </div>
      </Link>
      <Link to="/Subscribe" className="link">
        <div className={`main-menu ${active === "subscribe" ? "active" : ""}`}>
          <img src={SubscribeIcon} className="icon" alt="Subscribe" />
          <span className="menu-span">구독</span>
        </div>
      </Link>
      <div className="line"></div>

      <div className="menu">
        <img src={PlaylistIcon} className="icon" alt="Playlist" />
        <span className="menu-span">보관함</span>
      </div>
      <div className="menu">
        <img src={HistoryIcon} className="icon" alt="History" />
        <span className="menu-span">시청기록</span>
      </div>
      <div className="menu">
        <img src={VideoIcon} className="icon" alt="My Videos" />
        <span className="menu-span">내 동영상</span>
      </div>
      <div className="menu">
        <img src={LaterIcon} className="icon" alt="Watch Later" />
        <span className="menu-span">나중에 볼 동영상</span>
      </div>
      <div className="menu">
        <img src={ThumbsUpIcon} className="icon" alt="Liked Videos" />
        <span className="menu-span">좋아요 표시한 동영상</span>
      </div>
      <div className="line"></div>

      <div className="title" style={{ padding: "0 20px 10px" }}>구독</div>
      <div className="menu"></div>
      <div className="line"></div>
    </div>
  );
};

export default Sidebar;
