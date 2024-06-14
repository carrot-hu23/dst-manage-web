import React, {createContext, useContext, useEffect, useState} from 'react';

// 创建主题上下文
const ThemeContext = createContext();

// 自定义 Hook
export function useTheme() {
    return useContext(ThemeContext);
}

// ThemeProvider 组件
export function ThemeProvider2({ children }) {

    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
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