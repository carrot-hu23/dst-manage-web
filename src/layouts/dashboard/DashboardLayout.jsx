import {useEffect, useMemo, useState} from 'react';
import { Outlet } from 'react-router-dom';

import {ConfigProvider,theme} from "antd";
import { styled,ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './header';
import Nav from './nav';
import RequirAuthRoute from '../../filter/RequirAuthRoute';
import {useTheme} from "../../hooks/useTheme";
import {useThemeStore} from "../../store/useThemeStore";
import typography from "../../theme/typography";
import shadows from "../../theme/shadows";
import customShadows from "../../theme/customShadows";
import componentsOverride from "../../theme/overrides";

const APP_BAR_MOBILE = 48;
const APP_BAR_DESKTOP = 80;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => {
    return {
        flexGrow: 1,
        overflow: 'auto',
        minHeight: '100%',
        paddingTop: APP_BAR_MOBILE + 24,
        paddingBottom: theme.spacing(10),
        backgroundColor: theme.palette.mode === 'dark'? 'black':"",
        [theme.breakpoints.up('lg')]: {
            paddingTop: APP_BAR_DESKTOP + 4,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    }
});

// ----------------------------------------------------------------------

export default function DashboardLayout() {

    const [open, setOpen] = useState(false);
    // const darkTheme = createTheme({
    //
    //     shape: { borderRadius: 6 },
    //     typography,
    //     shadows: shadows(),
    //     customShadows: customShadows(),
    //     components: {
    //         MuiCard: {
    //             styleOverrides: {
    //                 root: {
    //                     borderRadius: '12px',
    //                 },
    //             },
    //         },
    //     },
    // });
    const c = customShadows()
    const themeOptions = useMemo(
        () => ({
            palette: {
                mode: 'dark',
            },
            shape: { borderRadius: 6 },
            typography,
            shadows: shadows(),
            customShadows: c,
        }),
        []
    );
    const darkTheme = createTheme(themeOptions);
    console.log("darkTheme", darkTheme)
    darkTheme.components = componentsOverride(darkTheme);

    const t = useTheme()

    const { themeConfig, fetchThemeConfig} = useThemeStore()
    useEffect(()=>{
        fetchThemeConfig()
    }, [])
    const [backgroundUrl, setBackgroundUrl] = useState("")
    useEffect(() => {
        // document.body.style.backgroundColor = t.theme === 'dark' ? '#000' : ''
        // getKv("backgroundUrl")
        //     .then(resp => {
        //         if (resp.code === 200) {
        //             const backgroundUr = resp.data
        //             setBackgroundUrl(backgroundUr)
        //             if (backgroundUr !== null && backgroundUr !== "") {
        //                 document.body.style.backgroundImage = `url('${backgroundUr}')`
        //                 document.body.style.backgroundSize = 'cover'
        //                 document.body.style.backgroundPosition = 'center'
        //                 document.body.style.backgroundRepeat = 'no-repeat'
        //             }
        //         }
        //     })
        // // 清理函数，组件卸载时调用
        // return () => {
        //     document.body.style.backgroundColor = ''
        //     document.body.style.backgroundImage = ''
        //     document.body.style.backgroundSize = ''
        //     document.body.style.backgroundPosition = ''
        //     document.body.style.backgroundRepeat = ''
        // };
    }, [])

    return (
        <StyledRoot
            style={backgroundUrl !== "" ?{maxHeight: '100vh',}:{}}
        >
            <RequirAuthRoute>
                <>
                    <ThemeProvider theme={t.theme === 'dark' ? darkTheme : null}>
                        <ConfigProvider
                            theme={{...themeConfig, ...{algorithm: t.theme === 'dark' ? theme.darkAlgorithm : null}}}
                        >
                            <Header onOpenNav={() => setOpen(true)}/>
                            <Nav openNav={open} onCloseNav={() => setOpen(false)}/>
                            <Main>
                                <Outlet/>
                            </Main>
                        </ConfigProvider>
                    </ThemeProvider>
                </>
            </RequirAuthRoute>
        </StyledRoot>
    );
}
