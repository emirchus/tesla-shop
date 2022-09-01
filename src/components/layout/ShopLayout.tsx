import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import { Navbar, SideMenu } from '../ui';

interface Props {
  title: string;
  description: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({
  description,
  title,
  children,
  imageFullUrl
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageFullUrl} />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0 30px'
        }}
      >
        {children}
      </main>
      <footer>{/* footer */}</footer>
    </>
  );
};
