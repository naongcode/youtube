import React, { useState, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import SideBar from './components/SideBar.js';
import Main from './Page/Main.js';
import Finder from './components/Finder.js';  
import VideoDetail from './Page/VideoDetail.js';
import { CustomThemeProvider, useTheme } from './context/themeProvider.js';
import { GlobalStyle } from './theme/GlobalStyle.js';
// import TestComponent from './components/TestComponent.js';

function App() {
  return (
    <div className="App">
      <CustomThemeProvider>
        <GlobalStyle/>
        <Routes>
          <Route path="/*" element={<AppLayout />} >
            <Route path='*' element={<Main/>}/>
            <Route path='search/:searchTerm' element={<Finder />} /> {/* 검색 */}
            <Route path='watch/:videoId' element={<VideoDetail/>} /> {/* 개별 동영상 상세 */}
          </Route>
        </Routes>
      </CustomThemeProvider>
    </div>
  );
}

function AppLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(window.innerWidth >= 1200);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 650);
  const [isTabletView, setIsTabletView] = useState(window.innerWidth > 650 && window.innerWidth < 1200);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width <= 650);
      setIsTabletView(width > 650 && width < 1200);

      if (width >= 1200) {
        setIsSidebarExpanded(true);
        setIsOverlayVisible(false);
      } else {
        setIsSidebarExpanded(false);
        setIsOverlayVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 실행

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarExpanded((prev) => !prev);
    if (isMobileView || isTabletView) {
      setIsOverlayVisible((prev) => !prev);
    }
  };

  const closeSidebar = () => {
    setIsSidebarExpanded(false);
    setIsOverlayVisible(false);
  };

  // 다크모드 설정
  const { themeMode, toggleTheme } = useTheme();

  return (
    <div className={`app-layout ${isSidebarExpanded ? 'expanded' : 'collapsed'} ${isMobileView ? 'mobile' : ''}`}>
      <Header 
        setIsSidebarExpanded={handleSidebarToggle} 
        isSidebarExpanded={isSidebarExpanded} 
        themeMode={themeMode} 
        toggleTheme={toggleTheme} 
      />
      {isOverlayVisible && (isMobileView || isTabletView) && <div className="overlay" onClick={closeSidebar}></div>}
      <SideBar isSidebarExpanded={isSidebarExpanded} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
