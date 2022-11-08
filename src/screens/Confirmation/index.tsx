import React from 'react';
import { StatusBar } from 'react-native';
import { useWindowDimensions } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
    Container,
    Content,
    Title,
    Message,
    Footer
} from './styles';

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmeButton } from '../../components/ConfirmeButton';


interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;
}

export function Confirmation() {

    const { width } = useWindowDimensions();
    const navigation = useNavigation<any>();
    const route = useRoute();

    const { title, message, nextScreenRoute} = route.params as Params;

    function handleConfirmeOk(){
        navigation.navigate(nextScreenRoute)
    }

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent
            />
            <LogoSvg width={width} />
            <Content>
                <DoneSvg width={80} height={80} />
                <Title>{title}</Title>
                <Message>{message}</Message>
            </Content>
            <Footer>
                <ConfirmeButton 
                    title='OK'
                    onPress={handleConfirmeOk}
                />
            </Footer>
        </Container>
    );
}