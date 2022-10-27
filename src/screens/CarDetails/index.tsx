import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

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
  About,
  Footer
} from './styles';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';

// interface criada para tirar os params recebidos pela rota
interface Params {
  car: CarDTO;
}

export function CarDetails() {

  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleScheduling(){
    navigation.navigate('Scheduling');
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
          imagesUrl={car.photos}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>

            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ ${car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map((acessory) => (
              <Accessory
                key={acessory.type} 
                name={acessory.name} 
                icon={getAccessoryIcon(acessory.type)}/>
            ))
          }
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button 
          title='Escolher período do aluguel'
          onPress={handleScheduling}
        />
      </Footer>
    
    </Container>
  );
}