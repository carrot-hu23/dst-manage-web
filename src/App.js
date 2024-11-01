import {HashRouter} from 'react-router-dom';

import {HelmetProvider} from 'react-helmet-async';

import ThemeProvider from './theme';

import './locales/i18n'
import {ThemeProvider2} from "./hooks/useTheme";
// ----------------------------------------------------------------------

import './index.css';
import './style/scrollbar.css'
import AppTheme from "./AppTheme";


export default function App() {

    return (
        <HelmetProvider>
            <HashRouter>
                <ThemeProvider2>
                    <ThemeProvider>
                        <AppTheme />
                    </ThemeProvider>
                </ThemeProvider2>
            </HashRouter>
        </HelmetProvider>
    );
}
