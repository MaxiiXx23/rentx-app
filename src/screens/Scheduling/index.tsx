import React, { useState } from 'react';
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
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
    start: number;
    startFormatted: string;
    end: number;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
}

export function Scheduling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as Params;
    const navigation = useNavigation<any>();

    function handleSchedulingDetails() {

        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDates)
        })

    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);

        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            start: start.timestamp,
            startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            end: end.timestamp,
            endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy')
        })
    }

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
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DataInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue
                            selected={!!rentalPeriod.start}
                        >
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DataInfo>

                    <ArrowSvg />

                    <DataInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue
                            selected={!!rentalPeriod.end}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DataInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button
                    title='Confimar'
                    onPress={handleSchedulingDetails}
                    enabled={!!rentalPeriod.start}
                />
            </Footer>
        </Container>
    );
}