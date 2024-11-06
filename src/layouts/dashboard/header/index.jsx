/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

// @antd
import {Tag, Dropdown, Typography} from "antd";
import {GithubFilled,} from '@ant-design/icons';
import {useParams} from "react-router-dom";
// @mui
import {styled} from '@mui/material/styles';
import {Box, Stack, AppBar, Toolbar, IconButton} from '@mui/material';

import {useTranslation} from "react-i18next";

// utils
import {bgBlur} from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
// import Searchbar from './Searchbar'
import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';
// import SwitchLanguage from "../../../locales/SwitchLanguage";
// import {StyledNavItemIcon} from "../../../components/nav-section/styles";
import {useTheme} from "../../../hooks/useTheme";
import useResponsive from "../../../hooks/useResponsive";
import {headerFlag1} from "../../../config";

const {Text} = Typography;

// ----------------------------------------------------------------------

const NAV_WIDTH = 240;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({theme}) => {

    if (theme.palette.mode === 'dark') {
        return {
            ...bgBlur({color: theme.palette.background.default}),
            boxShadow: 'none',
            zIndex: 1,
            position: 'absolute',
            [theme.breakpoints.up('lg')]: {
                width: `calc(100% - ${NAV_WIDTH + 1}px)`,
            },
            backgroundImage: 'unset',
            backgroundColor: 'unset',

        }
    }
    return {
        ...bgBlur({color: theme.palette.background.default}),
        boxShadow: 'none',
        zIndex: 1,
        position: 'absolute',
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${NAV_WIDTH + 1}px)`,
        },
    }
});

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
    onOpenNav: PropTypes.func,
};

export default function Header({onOpenNav}) {
    const isDesktop = useResponsive('up', 'lg');
    const {cluster, name} = useParams()
    return (
        <StyledRoot>
            <StyledToolbar>
                <IconButton
                    onClick={onOpenNav}
                    sx={{
                        mr: 1,
                        color: 'text.primary',
                        display: {lg: 'none'},
                    }}
                >
                    <Iconify icon="eva:menu-2-fill"/>
                </IconButton>

                {isDesktop && <Tag bordered={false} color="processing">{headerFlag1}</Tag>}

                {/* eslint-disable */}
                <Box sx={{flexGrow: 1}}/>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{
                        xs: 0.5,
                        sm: 1,
                    }}
                >

                    {name !== undefined &&
                        <Tag color="processing" bordered={false}>
                            {name}
                        </Tag>
                    }

                    <IconButton
                        onClick={() => {
                            window.open('https://github.com/hujinbo23/dst-admin-go', '_blank');
                        }}
                    >

                        <GithubFilled/>
                    </IconButton>
                    <ToggleLanguage/>
                    <ToggleTheme/>
                    <AccountPopover/>
                </Stack>
            </StyledToolbar>
        </StyledRoot>
    );
}

const ToggleTheme = () => {
    const {theme, toggleTheme} = useTheme();
    console.log("theme: ", theme)
    return (
        <>
            <div>
                {theme === 'dark' && (<>

                    <IconButton
                        onClick={toggleTheme}
                    >
                        <svg aria-hidden="true" focusable="false" height="22" role="presentation" viewBox="0 0 24 24"
                             width="22">
                            <g fill="currentColor">
                                <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z"></path>
                                <path
                                    d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z"></path>
                            </g>
                        </svg>
                    </IconButton>
                </>)}
                {theme !== 'dark' && (
                    <>
                        <IconButton
                            onClick={toggleTheme}
                        >
                            <svg aria-hidden="true" focusable="false" height="22" role="presentation"
                                 viewBox="0 0 24 24" width="22">
                                <path
                                    d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
                                    fill="black"></path>
                            </svg>

                        </IconButton>
                    </>
                )}
            </div>
        </>
    )
}

const ToggleLanguage = () => {
    const {theme, toggleTheme} = useTheme();
    const {i18n} = useTranslation();
    const onClick = ({key}) => {
        i18n.changeLanguage(key)
    };
    const items = [
        {
            label: 'Englist',
            key: 'en',
        },
        {
            label: '中文',
            key: 'zh',
        },
    ];
    return (
        <>

            <Dropdown
                menu={{
                    items,
                    onClick,
                }}
                placement="bottomRight"
            ><IconButton
            >
                <div style={{
                    width: '18px'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24"
                         className="vt-locales-btn-icon" data-v-bd3f9d28="">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                            className="css-c4d79v" fill={theme === 'dark' ? "white" : ""}></path>
                    </svg>
                </div>
            </IconButton>
            </Dropdown>
        </>
    )
}