"use client";

import React, { createContext, useContext, useState } from "react";
import { Theme } from "@radix-ui/themes";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <body>
        <Theme
          grayColor="mauve"
          accentColor="iris"
          panelBackground="solid"
          scaling="100%"
          radius="small"
          className=""
          appearance={darkMode ? "dark" : "light"}
        >
          {children}
        </Theme>
      </body>
    </ThemeContext.Provider>
  );
};
