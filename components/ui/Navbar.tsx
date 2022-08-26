import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useContext, useState } from 'react';
import { CartContext, UiContext } from '../../context';

export const Navbar: FC = () => {
  const { asPath, push } = useRouter();

  const { toggleSideMenu: togleSideMenu } = useContext(UiContext);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchVisible, setSearchVisible] = useState<boolean>(false);
  const { cart } = useContext(CartContext);

  const handleToggleMenu = () => {
    togleSideMenu(true);
  };

  const navigateTo = (url: string) => {
    console.log('url');
    togleSideMenu(false);
    push(url);
  };

  const handleSearch = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
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

        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'flex'
            },
            alignItems: 'center'
          }}
        >
          <NextLink href="/category/men" passHref>
            <Link>
              <Button
                color={asPath.startsWith('/category/men') ? 'primary' : 'info'}
              >
                Hombres
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                color={
                  asPath.startsWith('/category/women') ? 'primary' : 'info'
                }
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/category/kid" passHref>
            <Link>
              <Button
                color={asPath.startsWith('/category/kid') ? 'primary' : 'info'}
              >
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1}></Box>

        {isSearchVisible ? (
          <Box
            sx={{
              width: '20%',
              mx: 2,
              display: { sm: 'flex', xs: 'none' }
            }}
          >
            <TextField
              autoFocus
              type="text"
              variant="outlined"
              placeholder="Buscar..."
              value={searchTerm}
              className="fadeIn"
              size="small"
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              onBlur={() => setSearchVisible(false)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setSearchTerm('')}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        ) : (
          <IconButton
            name="Buscar"
            sx={{ display: { sm: 'flex', xs: 'none' } }}
            onClick={() => setSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        <IconButton
          name="Buscar"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={handleToggleMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton name="Carrito">
              <Badge
                badgeContent={
                  cart.length > 0
                    ? cart.reduce((prev, curr) => prev + curr.quantity, 0)
                    : null
                }
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={handleToggleMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
