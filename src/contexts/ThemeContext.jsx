import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  summer: {
    name: 'summer',
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
      background: '#F7F7F7',
      surface: '#FFFFFF',
      text: '#2C3E50',
      textSecondary: '#7F8C8D',
      border: '#E0E0E0',
      error: '#E74C3C',
      success: '#2ECC71',
      warning: '#F1C40F',
      info: '#3498DB'
    }
  },
  winter: {
    name: 'winter',
    colors: {
      primary: '#5D9CEC',
      secondary: '#48CFAD',
      accent: '#AC92EC',
      background: '#F5F7FA',
      surface: '#FFFFFF',
      text: '#2C3E50',
      textSecondary: '#7F8C8D',
      border: '#E0E0E0',
      error: '#E74C3C',
      success: '#2ECC71',
      warning: '#F1C40F',
      info: '#3498DB'
    }
  },
  day: {
    name: 'day',
    colors: {
      primary: '#3498DB',
      secondary: '#2ECC71',
      accent: '#F1C40F',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#2C3E50',
      textSecondary: '#7F8C8D',
      border: '#E0E0E0',
      error: '#E74C3C',
      success: '#2ECC71',
      warning: '#F1C40F',
      info: '#3498DB'
    }
  },
  night: {
    name: 'night',
    colors: {
      primary: '#9B59B6',
      secondary: '#34495E',
      accent: '#E74C3C',
      background: '#1A1A1A',
      surface: '#2C2C2C',
      text: '#ECF0F1',
      textSecondary: '#BDC3C7',
      border: '#404040',
      error: '#E74C3C',
      success: '#2ECC71',
      warning: '#F1C40F',
      info: '#3498DB'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? themes[savedTheme] : themes.day;
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', currentTheme.colors.primary);
    document.documentElement.style.setProperty('--secondary', currentTheme.colors.secondary);
    document.documentElement.style.setProperty('--accent', currentTheme.colors.accent);
    document.documentElement.style.setProperty('--background', currentTheme.colors.background);
    document.documentElement.style.setProperty('--surface', currentTheme.colors.surface);
    document.documentElement.style.setProperty('--text-primary', currentTheme.colors.text);
    document.documentElement.style.setProperty('--text-secondary', currentTheme.colors.textSecondary);
    document.documentElement.style.setProperty('--border', currentTheme.colors.border);
    document.documentElement.style.setProperty('--error', currentTheme.colors.error);
    document.documentElement.style.setProperty('--success', currentTheme.colors.success);
    document.documentElement.style.setProperty('--warning', currentTheme.colors.warning);
    document.documentElement.style.setProperty('--info', currentTheme.colors.info);
    
    localStorage.setItem('theme', currentTheme.name);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themes[themeName]);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 