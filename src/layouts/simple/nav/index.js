import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, Stack } from '@mui/material';

import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import navConfig2 from '../../../menu/config2';

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
  const { pathname } = useLocation();
  const {cluster} = useParams()
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
      <br/>
      <br/>
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig2} />

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
