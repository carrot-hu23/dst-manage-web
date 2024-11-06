import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

// @mui
import {styled} from '@mui/material/styles';
import {Container, Typography, Card, Box, Divider} from '@mui/material';
// hooks
import {useTranslation} from "react-i18next";
import useResponsive from '../hooks/useResponsive';
// sections
import {LoginForm} from '../sections/auth/login';
import {getNews, isFirstApi} from '../api/InitApi';
import {headerFlag1} from "../config";
import {useTheme} from "@/hooks/useTheme";


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
    const {t} = useTranslation()
    const {theme} = useTheme();


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
        getNews().then((resp) => {
            if (resp.code === 200) {
                setNews(resp.data)
            }
        })
    }, [])

    useEffect(() => {

        // document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/MauroMontan/dont-starve-together-assets/refs/heads/main/vignettes/bg_loading_loading_feast.png')";
        document.body.style.backgroundImage = theme === 'dark'? "url('./assets/bg1.png')":"url('./assets/bg5.png')";
        document.body.style.backgroundSize = 'cover'; // 背景图覆盖整个页面
        document.body.style.backgroundPosition = 'center'; // 背景图居中显示
        document.body.style.backgroundRepeat = 'no-repeat'; // 背景图不重复

        // 清理函数，组件卸载时调用
        return () => {
            // document.body.style.backgroundColor = ''; // 恢复默认背景颜色
            document.body.style.backgroundImage = ''; // 移除背景图
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
        };

    }, [])

    return (
        <>
            {!isFirstTime ?
                <StyledRoot>

                    <Container maxWidth="sm">
                        <StyledContent>
                            <Card>
                                <Box sx={{p: 3}} dir="ltr">
                                    <Typography variant="h4" gutterBottom>
                                        {t('loginTitle')}({headerFlag1})
                                    </Typography>
                                    <Typography sx={{color: 'text.secondary'}}>
                                        news: <a
                                        target={'_blank'}
                                        href={news[0].url}
                                        rel="noreferrer">
                                        {news[0].title}
                                    </a>
                                    </Typography>
                                    <br/>
                                    <LoginForm/>
                                </Box>
                            </Card>
                        </StyledContent>
                    </Container>
                </StyledRoot> : <Navigate to="/init"/>}
        </>
    );
}
