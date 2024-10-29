import React, {createContext, useContext, useEffect, useState} from 'react';

// 创建主题上下文
const ThemeContext = createContext();

// 自定义 Hook
export function useTheme() {
    return useContext(ThemeContext);
}

// ThemeProvider 组件
export function ThemeProvider2({ children }) {

    const [theme, setTheme] = useState();

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        setTheme(storedTheme || 'dark')
    }, [theme]);

    const toggleTheme = () => {
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const themeContextValue = {
        theme,
        toggleTheme,
    };


    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    );
}