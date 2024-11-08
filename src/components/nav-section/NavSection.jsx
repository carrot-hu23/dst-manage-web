import PropTypes from 'prop-types';
import {NavLink as RouterLink, useParams} from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';

import {useTranslation} from "react-i18next";

import { StyledNavItem, StyledNavItemIcon } from './styles';

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
    const {cluster,name} = useParams()
    return (
    <Box {...other}>
      {/* <span style={{
        color: '#637381',
        font: '12px',
        padding: '24px 16px 8px'
      }}>Dashboard</span> */}
        <List disablePadding sx={{ p: 1 }}>
            {data.map((item) => (
                <NavItem key={item.title} item={item} cluster={cluster} name={name}/>
            ))}
        </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, cluster, name }) {
  const { title, path, icon, info } = item;
    const { t } = useTranslation()
  let to = ""
  if (cluster === undefined || cluster === "") {
      to = path
  } else {
      to = `/${cluster}/${name}${path}`
  }
  return (
    <StyledNavItem
      component={RouterLink}
      to={to}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={t(title)} />

      {info && info}
    </StyledNavItem>
  );
}
