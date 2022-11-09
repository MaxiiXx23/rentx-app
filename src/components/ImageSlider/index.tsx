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
    imagesUrl: {
        id: string;
        photo: string;
    }[]
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
                {imagesUrl.map((item, index) => (
                    <Bullet
                        key={String(item.id)}
                        active={imageIndex === index}
                    />
                ))}
            </ImageIndexes>

            <FlatList
                data={imagesUrl}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                onViewableItemsChanged={indexChanged.current}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item.photo }}
                            resizeMode="contain"
                        />
                    </CarImageWrapper>
                )}
            />
        </Container>
    );
}