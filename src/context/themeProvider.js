import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from "../theme/darkTheme.js";

// Custom 이름 사용
const CustomThemeContext = createContext(null);

export const CustomThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("themeMode") || "light";
  const [themeMode, setThemeMode] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode(prevMode => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  }, []);

  const theme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <CustomThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a CustomThemeProvider");
  }
  return context;
}