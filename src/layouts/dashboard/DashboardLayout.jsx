import {useEffect, useMemo, useState} from 'react';
import {Outlet} from 'react-router-dom';
// antd
import {ConfigProvider, theme} from "antd";
// @mui
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';

//
import Header from './header';
import Nav from './nav';
import RequirAuthRoute from '../../filter/RequirAuthRoute';
import {useTheme} from "../../hooks/useTheme";
import typography from "../../theme/typography";
import shadows from "../../theme/shadows";
import customShadows from "../../theme/customShadows";
import ComponentsOverrides from "../../theme/overrides";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
});

const Main = styled('div')(({theme}) => {
    return {
        flexGrow: 1,
        overflow: 'auto',
        minHeight: '100%',
        paddingTop: APP_BAR_MOBILE + 24,
        paddingBottom: theme.spacing(10),
        backgroundColor: theme.palette.mode === 'dark' ? 'black' : "",
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
    //     palette: {
    //         mode: 'dark',
    //     },
    //     components: {
    //         MuiCard: {
    //             styleOverrides: {
    //                 root: {
    //                     borderRadius: '8px',
    //                 },
    //             },
    //         },
    //     },
    // });

    // const themeOptions = useMemo(
    //     () => ({
    //         palette: {
    //             mode: 'dark',
    //         },
    //         shape: { borderRadius: 6 },
    //         typography,
    //         shadows: shadows(),
    //         customShadows: customShadows(),
    //     }),
    //     []
    // );
    // const darkTheme = createTheme(themeOptions);
    // darkTheme.components = ComponentsOverrides(darkTheme);
    //
    // const t = useTheme()
    //
    // const themeConfig = {}
    //
    // useEffect(()=>{
    //     document.body.style.backgroundColor = t.theme === 'dark' ? 'black' : '#F9FAFB'
    // }, [t.theme])

    return (<div>

            {/*
        <StyledRoot>
            <RequirAuthRoute>
                {t.theme === 'dark' && (
                    <>
                        <ThemeProvider theme={darkTheme}>
                            <ConfigProvider
                                theme={{
                                    algorithm: theme.darkAlgorithm,
                                    token: {
                                        // Seed Token，影响范围大
                                        // colorPrimary: '#00b96b',
                                        borderRadius: 4,
                                    },
                                }}
                            >
                                <Header onOpenNav={() => setOpen(true)} />
                                <Nav openNav={open} onCloseNav={() => setOpen(false)} />
                                <Main>
                                    <Outlet />
                                </Main>
                            </ConfigProvider>
                        </ThemeProvider>
                    </>
                )}
                {t.theme !== 'dark' && (<>
                    <Header onOpenNav={() => setOpen(true)} />
                    <Nav openNav={open} onCloseNav={() => setOpen(false)} />
                    <Main>
                        <Outlet />
                    </Main>
                </>)}
            </RequirAuthRoute>
        </StyledRoot>
        */}
            <StyledRoot>
                <RequirAuthRoute>
                    <>
                        <Header onOpenNav={() => setOpen(true)}/>
                        <Nav openNav={open} onCloseNav={() => setOpen(false)}/>
                        <Main>
                            <Outlet/>
                        </Main>
                    </>
                </RequirAuthRoute>
            </StyledRoot>
        </div>
    );
}