import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from "@expo/vector-icons";

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
  CarLit, 
  MyCarsButton
} from './styles';

export function Home() {

  const navigation = useNavigation<any>();
  const theme = useTheme();

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

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', {
      car
    });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    fecthCars();
  }, [])

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
                onPress={() => handleCarDetails(item)}
              />
            }
          />
      }
      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons 
          name='car-sport'
          size={RFValue(32)}
          color={theme.colors.shape}
          />
      </MyCarsButton>
    </Container>
  );
}