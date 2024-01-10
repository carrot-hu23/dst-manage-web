import {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
// antd
import {ConfigProvider,theme} from "antd";
// @mui
import { styled,ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//
import Header from './header';
import Nav from './nav';
import RequirAuthRoute from '../../filter/RequirAuthRoute';
import {useTheme} from "../../hooks/useTheme";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

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
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '8px',
                    },
                },
            },
        },
    });

    const t = useTheme()

    return (
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
    );
}
