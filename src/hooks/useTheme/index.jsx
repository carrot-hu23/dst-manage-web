import React, {createContext, useContext, useEffect, useState} from 'react';

// 创建主题上下文
const ThemeContext = createContext();

// 自定义 Hook
export function useTheme() {
    return useContext(ThemeContext);
}

// ThemeProvider 组件
export function ThemeProvider2({ children }) {
    // const [theme, setTheme] = useState('light'); // 默认主题为 'light'
    //
    // // 切换主题
    // const toggleTheme = () => {
    //     setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    // };
    //
    // // 将主题和切换方法传递给子组件
    // const themeContextValue = {
    //     theme,
    //     toggleTheme,
    // };

    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme || 'dark';
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