import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
  About
} from './styles';

export function CarDetails() {

  return (
    <Container>
      <Header>
        <BackButton
          onPress={() => {
            console.log('TESTE');
          }}
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

        <About>
          Este é automóvel desportivo.
          Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla.
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

    </Container>
  );
}