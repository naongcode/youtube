import React, { useState, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import SideBar from './components/SideBar.js';
import Main from './Page/Main.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<AppLayout />} >
          <Route path='*' element={<Main/>}/>
        </Route>
      </Routes>
    </div>
  );
}

function AppLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
        setIsSidebarExpanded(false);
      } else {
        setIsMobileView(false);
        setIsSidebarCollapsed(false);
        setIsSidebarExpanded(true);
      }
    };

    handleResize(); // 초기 체크
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => {
    // 작은 화면에서는 전체 확장/축소
    if (isMobileView) {
      setIsSidebarExpanded(!isSidebarExpanded);
    } else {
      // 큰 화면에서는 축소(로고만 보이기) / 확장
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <div className={`app-layout ${isSidebarExpanded ? 'expanded' : 'collapsed'} ${isMobileView ? 'mobile' : ''}`}>
      <Header 
        setIsSidebarExpanded={handleSidebarToggle} 
        isSidebarExpanded={isSidebarExpanded} 
      />
      <SideBar isSidebarCollapsed={isSidebarCollapsed} isSidebarExpanded={isSidebarExpanded} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
