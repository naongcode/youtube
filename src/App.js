import React, { useState, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Main from './Page/Main';

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
        setIsSidebarExpanded(false);
      } else {
        setIsMobileView(false);
        setIsSidebarExpanded(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`app-layout ${isSidebarExpanded ? 'expanded' : 'collapsed'} ${isMobileView ? 'mobile' : ''}`}>
      <Header setIsSidebarExpanded={setIsSidebarExpanded} isSidebarExpanded={isSidebarExpanded} />
      {!isMobileView || isSidebarExpanded ? <SideBar isSidebarExpanded={isSidebarExpanded} /> : null}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
