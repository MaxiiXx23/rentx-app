import React, { useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from "@expo/vector-icons";
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

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

  const onGestureHandler = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event, context: any) {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(startingPosition);
      positionY.value = withSpring(startingPosition);
    }
  })


  const navigation = useNavigation<any>();
  const theme = useTheme();

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

  function onBackPress (){
    navigation.goBack();
  }

  useFocusEffect(() => {
    fecthCars();
    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true
    );
    return () => backHandler.remove();
});

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

      <PanGestureHandler
        onGestureEvent={onGestureHandler}
      >
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: 'absolute', bottom: 13, right: 22 }
          ]}
        >

          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name='car-sport'
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>

        </Animated.View>
      </PanGestureHandler>

    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});