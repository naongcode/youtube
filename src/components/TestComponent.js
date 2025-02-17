import React, { useEffect } from 'react';
import { useTheme } from '../context/themeProvider.js';  // 경로는 실제 프로젝트 구조에 맞게 수정

function TestComponent() {
  const { themeMode } = useTheme();

  useEffect(() => {
    console.log("현재 테마:", themeMode);
  }, [themeMode]);

  return <div>테스트 컴포넌트 (현재 테마: {themeMode})</div>;
}

export default TestComponent;
