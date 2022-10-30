import React from 'react';
import { Feather } from "@expo/vector-icons";
import { useTheme } from 'styled-components';

import { Container } from './styles';

import {
    Calendar as CustomCalendar,
    LocaleConfig,
    CalendarProps
} from 'react-native-calendars';
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR

LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps{
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;

    }
}
interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

function Calendar({ markedDates, onDayPress } : CalendarProps) {
    const theme = useTheme();

    return (
        <Container>
            <CustomCalendar
                renderArrow={(direction) =>
                    <Feather
                        size={24}
                        color={theme.colors.text}
                        name={direction === 'left' ? "chevron-left" : "chevron-right"}
                    />
                }

                headerStyle={{
                    backgroundColor: theme.colors.background_secondary,
                    borderBottomWidth: 0.5,
                    borderBottomColor: theme.colors.text_detail,
                    marginBottom: 10,
                    paddingBottom: 10
                }}

                theme={{
                    textDayFontFamily: theme.fonts.primary_400,
                    textDayHeaderFontFamily: theme.fonts.primary_500,
                    textDayFontSize: 10,
                    textMonthFontSize: 20,
                    textMonthFontFamily: theme.fonts.secondary_600,
                    monthTextColor: theme.colors.title,
                    arrowStyle: {
                        marginHorizontal: -15,
                    }
                }}
                firstDay={1}
                minDate= { new Date().toString()}
                markingType="period"
                markedDates={markedDates}
                onDayPress={onDayPress}

            />
        </Container>
    );
}

export { Calendar, DayProps, MarkedDateProps}