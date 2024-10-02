'use client';

import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import style from './page.module.css'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/pagination'; 
import 'swiper/css/navigation'; 
import Header from "../app/components/header";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header/>
      <Container>
        <Typography variant="h2" component="h1" className={style.title}>
          Welcome to Make Up & Beauty Store
        </Typography>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          loop={true}
        >
          <SwiperSlide>
            <Image 
              src="/assets/photo1.jpeg" 
              alt="Photo 1" 
              width={1050} 
              height={525}
              className={style.photo}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image 
              src="/assets/photo2.jpeg" 
              alt="Photo 2" 
              width={1050} 
              height={525} 
              className={style.photo}
            />
          </SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
}
