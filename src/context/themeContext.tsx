'use client'
import { createContext, useState,  useContext } from 'react';

export type Theme = {
   isDarkMode: boolean;
   toggleDarkMode: () => void;
};

export const ThemeContext = createContext<Theme | undefined>(undefined);


export const ThemeContextProvider = ({ children }: { children: any }) => {
   const [isDarkMode, setDarkMode] = useState(true);

   const toggleDarkMode = () => {

      setDarkMode((prev) => !prev)
      if (isDarkMode) {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }
   }



   const value = {
      isDarkMode,
      toggleDarkMode,

   }
   return (
      <ThemeContext.Provider value={value}>
         {children}
      </ThemeContext.Provider>
   );
};

export const useThemeContext = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
   }
   return context;
};
