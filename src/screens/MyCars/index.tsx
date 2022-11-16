import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from 'styled-components';
import { format, parseISO } from 'date-fns';

import { Car as ModelCar } from "../../database/Model/Car";
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
import { BackButton } from '../../components/BackButton';
import { LoadAnimated } from '../../components/LoadAnimated';
interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {

  const [cars, setCars] = useState<DataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const theme = useTheme();
  const screenIsFocus = useIsFocused();
  const navigation = useNavigation<any>();

  async function fecthCars() {
    try {

      const response = await api.get('/rentals');
      const dataFormtted = response.data.map((data: DataProps) => {
        return{
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
        }
      })

      setCars(dataFormtted);

    } catch (error) {

      console.log(error);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fecthCars()
  }, [screenIsFocus])

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

      {isLoading ? <LoadAnimated /> :
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
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.header}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
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