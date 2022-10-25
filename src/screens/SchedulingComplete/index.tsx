import React from 'react';
import { StatusBar } from 'react-native';
import { useWindowDimensions } from 'react-native';

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
import { useNavigation } from '@react-navigation/native';


export function SchedulingComplete() {

    const { width } = useWindowDimensions();
    const navigation = useNavigation<any>();

    function handleConfirmeOk(){
        navigation.navigate('Home')
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
                <Title>Carro alugado!</Title>
                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu automóvel.
                </Message>
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