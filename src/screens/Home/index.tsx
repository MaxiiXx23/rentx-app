import React, { useState, useEffect } from 'react';
import { Alert, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import { Car as ModelCar } from '../../database/Model/Car';
import { api } from '../../services/api';


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

  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo();

  const navigation = useNavigation<any>();

  async function fecthCars() {
    // aqui set true para indicar que a interface já foi montada e que posso atualizar o estado.
    let isMounted = true;

    try {
      //const response = await api.get('/cars');
      // aqui verifico se isMounted realmente foi montada para REALMENTE 
      // haja atualização do estado após a promise ter sido concluída.

      const carCollection = database.get<ModelCar>('cars')
      const cars = await carCollection.query().fetch();


      if (isMounted) {
        setCars(cars);
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

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', {
      car
    });
  }

  // função responsável por fazer a sincronização entre os dados offline e da Api
  async function offlineSyncronize() {
    await synchronize({
      database,
      // função que vai no backend e busca atualizações
      pullChanges: async ({ lastPulledAt }) => {

        try {
          const response = await api
            .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

          const { changes, latestVersion } = response.data;

          return { changes, timestamp: latestVersion };
        } catch (error) {
          console.log(error)
        }

      },
      // função que via os dados para o servidor
      // caso tenha ocorrido alguma atualização nos dados quando o usuário estava offline 
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        try {
          await api.post('users/sync', user);
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  // useEffect(() => {
  //   if(netInfo.isConnected){
  //     Alert.alert('Conectado')
  //   }else{ 
  //     Alert.alert('Você está offline')
  //   }
  // })

  useEffect(() => {
    fecthCars();
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSyncronize();
    }
  }, [netInfo.isConnected])

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