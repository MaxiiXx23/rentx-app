import React from 'react';
import { Feather } from "@expo/vector-icons";
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchanceSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";


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
  Acessories,
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
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

export function SchedulingDetails() {

  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleConfirmeRental(){
    navigation.navigate('SchedulingComplete');
  }

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
          imagesUrl={['https://reactnative.dev/img/tiny_logo.png']}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>

            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Acessories>
          <Acessory name='380km/h' icon={SpeedSvg} />
          <Acessory name='3.2s' icon={AccelerationSvg} />
          <Acessory name='800 HP' icon={ForceSvg} />
          <Acessory name='Gasolina' icon={GasolineSvg} />
          <Acessory name='Auto' icon={ExchanceSvg} />
          <Acessory name='2 pessoas' icon={PeopleSvg} />
        </Acessories>

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
            <DateValue>25/10/2022</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>27/10/2022</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>


      <Footer>
        <Button 
          title='Confirmar Agora'
          color={theme.colors.success} 
          onPress={handleConfirmeRental}
        />
      </Footer>

    </Container>
  );
}