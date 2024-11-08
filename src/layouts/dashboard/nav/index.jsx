import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";

import { styled, alpha } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
import {Button } from "antd";
import {LeftOutlined} from '@ant-design/icons';

import useResponsive from '../../../hooks/useResponsive';

import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from '../../../menu/config';


// ----------------------------------------------------------------------

const NAV_WIDTH = 240;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {

  const {t} = useTranslation()

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'lg');

  const [account, setAcount] = useState({
    displayName: '',
    email: '',
    photoURL: ''
  })
  useEffect(()=>{
    const userJson = localStorage.getItem('user');
    let user = JSON.parse(userJson);
    if(user === null) {
      user = {
        displayName: '',
        email: '',
        photoURL: ''
      }
    }
    setAcount(user)
  },[])
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{px: 2.5, py: 3, display: 'inline-flex'}}>
          <Button block color="primary" variant="filled"  icon={<LeftOutlined />} onClick={() => {navigate("/cluster")}}>
            {t('goBack')}
          </Button>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
