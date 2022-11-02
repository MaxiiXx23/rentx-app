import React, { useEffect } from 'react';

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    withTiming,
    interpolate, 
    Extrapolate,
    runOnJS
} from 'react-native-reanimated';

import {
    Container
} from './styles';
import { useNavigation } from '@react-navigation/native';


export function Splash() {

    const splashAnimation = useSharedValue(0);

    const navigation = useNavigation<any>();

    const brandStyle = useAnimatedStyle(() => {
        return{
            // interpolata é uma funçao para definir o intervalo de tempo da duração da animaçao e setar um valor(nessa caso opacidade);
            opacity: interpolate(splashAnimation.value, [0, 50],[1, 0]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [0, -50],
                        Extrapolate.CLAMP    
                    )
                }
            ]
            }

    });

    const logoStyle = useAnimatedStyle(() => {
        return{
            opacity: interpolate(splashAnimation.value,[0, 25, 50],[0, 0.3, 1]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [-50, 0]    
                    )
                }
            ]
        }
    });

    function startApp(){
        navigation.navigate('Home');
    }

    useEffect(() => {
        splashAnimation.value = withTiming(
            50, 
            { duration: 3000},
            () => {
                'worklet'
                runOnJS(startApp)();
            }
        )
    },[])

    return (
        <Container>

            <Animated.View style={[brandStyle, {position: 'absolute'}]} >
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyle, {position:'absolute'}]} >
                <LogoSvg width={120} height={20} />
            </Animated.View>

        </Container>
    );
}
