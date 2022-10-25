import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car"

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarLit
} from './styles';

export function Home() {

  const navigation = useNavigation<any>();

  const carDataOne = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao Dia',
      price: 120,
    },
    thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
  }

  function handleCarDetails(){
    navigation.navigate('CarDetails');
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
      <CarLit
        data={[1, 2, 3,4 ,5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) =>
          <Car
            data={carDataOne}
            onPress={handleCarDetails}
          />
        }

      />
    </Container>
  );
}