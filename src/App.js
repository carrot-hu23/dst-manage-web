import { HashRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import './locales/i18n'
import {ThemeProvider2} from "./hooks/useTheme";
// ----------------------------------------------------------------------

import './index.css';
import './style/scrollbar.css'

export default function App() {
    return (
        <HelmetProvider>
            <HashRouter>
                <ThemeProvider2>
                    <ThemeProvider>
                        <ScrollToTop/>
                        <StyledChart/>
                        <Router/>
                    </ThemeProvider>
                </ThemeProvider2>
            </HashRouter>
        </HelmetProvider>
    );
}
