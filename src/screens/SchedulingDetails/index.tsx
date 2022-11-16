import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';

import { Feather } from "@expo/vector-icons";
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';

import { Button } from '../../components/Button';





interface RentalPeriodProps {
  start: string;
  end: string;
}
interface Params {
  car: CarDTO;
  dates: string[];
}


export function SchedulingDetails() {
  const [rentalPeriods, setRentalPeriods] = useState<RentalPeriodProps>({} as RentalPeriodProps);
  const [isLoading, setIsLoading] = useState(false);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);


  const theme = useTheme();
  const { user } = useAuth();
  const route = useRoute();
  const netInfo = useNetInfo();
  const { car, dates } = route.params as Params;
  const navigation = useNavigation<any>();

  const rentalTotal = Number(dates.length * car.price)

  async function handleConfirmeRental() {
    setIsLoading(true);

    await api.post('/rentals', {
      user_id: user.id,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentalTotal
    })
      .then(() => navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\n até a concessionária da RENTX`,
        nextScreenRoute: 'Home'
      }))
      .catch(() => {
        setIsLoading(false);
        Alert.alert("Não foi possível confirmar o agendamento.");
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

  useEffect(() => {

    setRentalPeriods({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })

  }, [])


  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={theme.colors.background_secondary}
        translucent
      />
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
      <Content>
        <Details>
          <Description>

            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriods.start}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriods.end}</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>


      <Footer>
        <Button
          title='Confirmar Agora'
          color={theme.colors.success}
          onPress={handleConfirmeRental}
          enabled={!isLoading}
          loading={isLoading}
        />
      </Footer>

    </Container>
  );
}