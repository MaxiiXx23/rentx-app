import React from 'react';

import LottieView from 'lottie-react-native'; 

import CarAnimated from "../../assets/loadingCarAnimated.json";

import { Container } from './styles';





export function LoadAnimated() {
  return (
    <Container>
        <LottieView 
            source={CarAnimated}
            style={{ height: 200 }}
            resizeMode='contain'
            autoPlay
            loop
        />
    </Container>
  );
}