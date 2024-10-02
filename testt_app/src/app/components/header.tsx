'use client'; 

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import style from '../page.module.css'; 
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
// AppBar is a Material-UI component that creates a toolbar at the top of the page.
    // The sx prop is used for inline styling (here to set the text color to black).
  return (
    <AppBar sx={{ color: 'black' }} position="static" className={style.header}>
      <Toolbar>
        <Image 
          src="/assets/logo.png" 
          alt="Logo" 
          width={60} 
          height={30}
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          The Store
        </Typography>
        <Button sx={{ color: 'black' }} onClick={() => router.push('/')}>
          Home
        </Button>
        <Button sx={{ color: 'black' }} onClick={() => router.push('/login')}>
          Login
        </Button>
        <Button sx={{ color: 'black' }} onClick={() => router.push('/products')}>
          Products
        </Button>
      </Toolbar>
    </AppBar>
  );
}
