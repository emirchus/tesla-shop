import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useContext } from 'react';
import { UiContext } from '../../context';

export const AdminNavbar: FC = () => {
  const { toggleSideMenu: togleSideMenu } = useContext(UiContext);

  const handleToggleMenu = () => {
    togleSideMenu(true);
  };

  return (
    <AppBar>
      <Toolbar
        sx={{
          alignItems: 'center'
        }}
      >
        <svg
          width={104}
          viewBox="0 0 342 35"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M0 .1a9.7 9.7 0 007 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 007-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 006-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 00-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 13.8h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 14.1h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zM308.5 7h26a9.6 9.6 0 007-7h-40a9.6 9.6 0 007 7z"
            fill="#171a20"
          />
        </svg>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center" color="primary">
            <Button sx={{ ml: 1 }}>
              <Typography>Shop </Typography>
            </Button>
          </Link>
        </NextLink>

        <Box flex={1}></Box>

        <Button onClick={handleToggleMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
