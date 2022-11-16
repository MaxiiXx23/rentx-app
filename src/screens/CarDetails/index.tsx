import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
  OfflineInfo
} from './styles';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/Model/Car';
import { api } from '../../services/api';




// interface criada para tirar os params recebidos pela rota
interface Params {
  car: ModelCar;
}

export function CarDetails() {

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const scrollY = useSharedValue(0);

  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const netInfo = useNetInfo()

  const { car } = route.params as Params;


  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleScheduling() {
    navigation.navigate('Scheduling', {
      car
    });
  }

  async function fechCarUpdated() {
    const response = await api.get(`/cars/${car.id}`);
    setCarUpdated(response.data);
  }

  useEffect(() => {
    if (netInfo.isConnected === true) {
      fechCarUpdated();
    }
  }, [netInfo.isConnected])

  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={theme.colors.background_secondary}
        translucent
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >

        <Animated.View style={[sliderCarsStyleAnimation]}>
          <Header>
            <BackButton
              onPress={() => navigation.goBack()}

            />
          </Header>
          <CarImages>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos ?
                  carUpdated.photos :
                  [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        style={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>

            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>
             R$ {
                netInfo.isConnected === true ? car.price : '...'
              }
            </Price>
          </Rent>
        </Details>

        {
          carUpdated.accessories &&
          <Accessories>
            {
              carUpdated.accessories.map((acessory) => (
                <Accessory
                  key={acessory.type}
                  name={acessory.name}
                  icon={getAccessoryIcon(acessory.type)} />
              ))
            }
          </Accessories>
        }

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        
        <Button
          title='Escolher período do aluguel'
          onPress={handleScheduling}
          enabled={netInfo.isConnected === true}
        />

        {
          netInfo.isConnected === false && 
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        }

      </Footer>

    </Container>
  );
}


const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})