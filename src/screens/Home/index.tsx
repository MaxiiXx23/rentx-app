import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car"
import { Loading } from '../../components/Loading';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarLit
} from './styles';

export function Home() {

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  async function fecthCars() {
    try {
      const response = await api.get('/cars');
      setCars(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fecthCars();
  }, [])

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

  function handleCarDetails() {
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
      {
        loading ? <Loading />
          : <CarLit
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <Car
                data={item}
                onPress={handleCarDetails}
              />
            }
          />
      }
    </Container>
  );
}