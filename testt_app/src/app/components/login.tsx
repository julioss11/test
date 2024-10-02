'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';
import styles from '../page.module.css';

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

type LoginFormInputs = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); 

      if (!response.ok) {
        if (result.message && result.message.includes("password")) {
          setErrorMessage("Palavra-passe incorreta!");
        } else {
          setErrorMessage(result.message || 'Login failed!');
        }
        return;
      }

      console.log('Login successful:', result);
      router.push('/products');

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container maxWidth="sm" className={styles.login}>
        <Typography variant="h4" component="h1" gutterBottom>
            Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ''}
            />
            <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
            </Button>
        </form>
        
        <Snackbar
            open={!!errorMessage}
            message={errorMessage}
            autoHideDuration={6000}
            onClose={() => setErrorMessage(null)}
        />
        </Container>
  );
}
