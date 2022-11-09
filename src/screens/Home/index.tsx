import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car"
import { LoadAnimated } from '../../components/LoadAnimated';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarLit,
} from './styles';


export function Home() {

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const startingPosition = 0;
  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  });


  const navigation = useNavigation<any>();

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


  useEffect(() => {
    fecthCars();
  }, []);

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
            Total de {cars.length <= 9 ? `0${cars.length}` : cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>
      {
        loading ? <LoadAnimated />
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

    </Container>
  );
}