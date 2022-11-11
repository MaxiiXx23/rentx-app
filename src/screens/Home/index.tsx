import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';


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

  const navigation = useNavigation<any>();

  async function fecthCars() {
    // aqui set true para indicar que a interface já foi montada e que posso atualizar o estado.
    let isMounted = true;

    try {
      const response = await api.get('/cars');
      // aqui verifico se isMounted realmente foi montada para REALMENTE 
      // haja atualização do estado após a promise ter sido concluída.

      if (isMounted) {
        setCars(response.data);
      }

    } catch (error) {
      console.log(error)
    } finally {
      // aqui verifico se isMounted realmente foi montada para REALMENTE 
      // haja atualização do estado após a promise ter sido concluída.

      if (isMounted) {
        setLoading(false);
      }
    }

    // função de 'limpeza' que é uma forma de garantir a atualização correta dos estados ao utilizar promises.
    return () => {
      isMounted = false;
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