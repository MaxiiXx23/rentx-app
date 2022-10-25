import React from 'react';
import { StatusBar } from 'react-native';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DataInfo,
    DateTitle,
    DateValue,
    Content,
    Footer
} from './styles';

import ArrowSvg from "../../assets/arrow.svg";

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';


export function Scheduling() {
    const theme = useTheme();
    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor={theme.colors.header}
                translucent
            />
            <Header>
                <BackButton onPress={() => { }} color={theme.colors.shape} />
                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DataInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue
                            selected={false}>

                        </DateValue>
                    </DataInfo>

                    <ArrowSvg />

                    <DataInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue
                            selected={false}>
                            24/10/2022
                        </DateValue>
                    </DataInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button title='Confimar'/>
            </Footer>
        </Container>
    );
}