// export function toggleDarkMode() {
//     const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark-mode');
//       alert('dark-mode 클래스 추가됨');

//     } else {
//       document.documentElement.classList.remove('dark-mode');
//       alert('dark-mode 클래스 제거됨');
//     }
//   }
  
//   export function setupDarkModeButton() {

//     const button = document.getElementById('darkModeToggle');

//     if (button) {
//         button.addEventListener('click', () => {
//           const isDarkMode = document.documentElement.classList.contains('dark-mode');
//           localStorage.setItem('darkMode', !isDarkMode); // 로컬스토리지에 다크모드 상태 저장
//           toggleDarkMode(); // 다크모드 상태 변경
//         });
//     }
  
//     // 페이지 로드 시 다크모드 상태 확인
//     toggleDarkMode();
//   }
  