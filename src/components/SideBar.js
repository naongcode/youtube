import React from 'react';
import './SideBar.css';

export default function SideBar({ isSidebarCollapsed, isSidebarExpanded }) {
  return (
    <aside className={`sidebar ${isSidebarCollapsed ? 'logo-only' : ''} ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <ul>
        <li>
          <span className="icon">🏠</span>
          {isSidebarExpanded && <span className="text">홈</span>}
        </li>
        <li>
          <span className="icon">🎬</span>
          {isSidebarExpanded && <span className="text">Shorts</span>}
        </li>
        <li>
          <span className="icon">📺</span>
          {isSidebarExpanded && <span className="text">구독</span>}
        </li>
        <li>
          <span className="icon">🎵</span>
          {isSidebarExpanded && <span className="text">YouTube Music</span>}
        </li>
        <hr />
        <li>
          <span className="icon">⏱️</span>
          {isSidebarExpanded && <span className="text">시청 기록</span>}
        </li>
        <li>
          <span className="icon">🎥</span>
          {isSidebarExpanded && <span className="text">내 동영상</span>}
        </li>
      </ul>
    </aside>
  );
}
