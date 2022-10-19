import React from 'react';
import { StatusBar } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car"

import {
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

export function Home() {

  const carDataOne = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
        period: 'Ao Dia',
        price: 120,
    },
    thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
  }
  const carDataTwo = {
    brand: 'Porsche',
    name: 'Panamera',
    rent: {
        period: 'Ao Dia',
        price: 340,
    },
    thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      <Car 
        data={carDataOne}
      />
      <Car 
        data={carDataTwo}
      />
    </Container>
  );
}