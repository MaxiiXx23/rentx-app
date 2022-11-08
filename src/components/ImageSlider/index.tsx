import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
    Container,
    ImageIndexes,
    CarImageWrapper,
    CarImage
} from './styles';

import { Bullet } from '../Bullet';

interface Props {
    imagesUrl: string[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
    const [imageIndex, setImageIndex] = useState(0)

    // uso o useRef para referenciar e  não renderizar novamente as images,
    // além de conseguir capturar o valor da image mudada. 
    const indexChanged = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!
        setImageIndex(index);
    })

    return (
        <Container>
            <ImageIndexes>
                {imagesUrl.map((_, index) => (
                    <Bullet
                        key={String(index)}
                        active={imageIndex === index}
                    />
                ))}
            </ImageIndexes>

            <FlatList
                data={imagesUrl}
                keyExtractor={key => key}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                onViewableItemsChanged={indexChanged.current}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item }}
                            resizeMode="contain"
                        />
                    </CarImageWrapper>
                )}
            />
        </Container>
    );
}