import {ConfigProvider, theme} from "antd";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useEffect, useMemo} from "react";
import typography from "./theme/typography";
import shadows from "./theme/shadows";
import customShadows from "./theme/customShadows";
import ComponentsOverrides from "./theme/overrides";
import {useTheme} from "./hooks/useTheme";
import Router from "./routes";
import ScrollToTop from "./components/scroll-to-top";
import {StyledChart} from "./components/chart";
import {useThemeStore} from "./store/useThemeStore";

export default () => {

    const themeOptions = useMemo(
        () => ({
            palette: {
                mode: 'dark',
            },
            shape: {borderRadius: 6},
            typography,
            shadows: shadows(),
            customShadows: customShadows(),
        }),
        []
    );
    const darkTheme = createTheme(themeOptions);
    darkTheme.components = ComponentsOverrides(darkTheme);

    const t = useTheme()

    const { themeConfig, fetchThemeConfig} = useThemeStore()

    useEffect(() => {
        document.body.style.backgroundColor = t?.theme === 'dark' ? 'black' : '#F9FAFB'
    }, [t?.theme])

    useEffect(()=>{
        fetchThemeConfig()
    }, [])

    console.log(t?.theme)

    return (<>

        <ThemeProvider theme={t?.theme === 'dark' ? darkTheme : null}>
            {t?.theme === 'dark' && (
                <ConfigProvider
                    theme={{...themeConfig, ...{algorithm: theme.darkAlgorithm}}}
                >
                    <ScrollToTop/>
                    <StyledChart/>
                    <Router/>
                </ConfigProvider>
            )}
            {t?.theme !== 'dark' && (
                <ConfigProvider
                    theme={{...themeConfig, ...{algorithm: null}}}
                >
                    <ScrollToTop/>
                    <StyledChart/>
                    <Router/>
                </ConfigProvider>
            )}
        </ThemeProvider>
    </>)
}