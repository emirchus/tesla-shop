import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import { SideMenu } from '../ui';

import { AdminNavbar } from '../admin';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface Props {
  title: string;
  description: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<PropsWithChildren<Props>> = ({
  title,
  description,
  icon,
  children
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0 30px'
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon}
            {title}
          </Typography>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {description}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
      <footer>{/* footer */}</footer>
    </>
  );
};
