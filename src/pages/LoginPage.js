import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

// @mui
import {styled} from '@mui/material/styles';
import {Container, Typography, Divider} from '@mui/material';
// hooks
import {useTranslation} from "react-i18next";
import useResponsive from '../hooks/useResponsive';
// sections
import {LoginForm} from '../sections/auth/login';
import {getNews, isFirstApi} from '../api/InitApi';
import {headerFlag1} from "../config";



// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({theme}) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
    const mdUp = useResponsive('up', 'md');
    const [isFirstTime, setIsFirstTime] = useState(false);

    const [news, setNews] = useState([{
        title: "",
        url: ""
    }])
    const { t } = useTranslation()

    useEffect(() => {
        isFirstApi().then(data => {
            console.log('data', data);
            if (data.code === 200) {
                setIsFirstTime(true)
            } else {
                setIsFirstTime(false)
            }
        })
        setIsFirstTime(false)
        getNews().then((resp)=>{
            if (resp.code === 200) {
                setNews(resp.data)
            }
        })
    }, [])

    return (
        <>
            {!isFirstTime ?
                <StyledRoot>
                    {mdUp && (
                        <StyledSection>
                            <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
                                Hi, Welcome Back
                            </Typography>
                            <img src="/assets/login.gif" alt="login"/>

                            <Typography variant="h5" sx={{px: 5, mt: 1, mb: 1}}>
                                news: <a
                                    target={'_blank'}
                                    href={news[0].url}
                                    rel="noreferrer">
                                    {news[0].title}
                                </a>
                            </Typography>

                        </StyledSection>
                    )}

                    <Container maxWidth="sm">
                        <StyledContent>
                            <Typography variant="h4" gutterBottom>
                                {t('loginTitle')}-{headerFlag1}
                            </Typography>
                            <Divider sx={{my: 3}}>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    《饥荒联机版》万圣夜回归！
                                </Typography>
                            </Divider>

                            <LoginForm/>
                        </StyledContent>
                    </Container>
                </StyledRoot> : <Navigate to="/init"/>}
        </>
    );
}
