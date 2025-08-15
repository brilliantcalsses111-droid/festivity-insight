import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'default' | 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'pink' | 'yellow' | 'discord-dark' | 'discord-violet' | 'discord-pastel' | 'discord-neon';
export type Mode = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'default';
  });
  
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem('mode');
    return (saved as Mode) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('mode', mode);
    
    // Apply theme and mode to document
    document.documentElement.className = '';
    document.documentElement.classList.add(mode);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};