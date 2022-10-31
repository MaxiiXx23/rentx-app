import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';


import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles';

import { Car } from '../../components/Car';
import { Loading } from '../../components/Loading';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {

  const [cars, setCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation<any>()

  async function fecthCars() {
    try {

      const response = await api.get('/schedules_byuser?user_id=1');
      setCars(response.data);

    } catch (error) {

      console.log(error);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fecthCars()
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor={theme.colors.header}
        translucent
      />
      <Header>
        <BackButton
          onPress={() =>
            navigation.goBack()
          }
          color={theme.colors.shape} />
        <Title>
          Seus agendamentos,
          estão aqui.
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>

      </Header>

      {isLoading ? <Loading /> :
        <Content>

          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList

            data={cars}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>

                  <CarFooterTitle>Período</CarFooterTitle>

                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={14}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}

          />
        </Content>
      }
    </Container>
  );
}