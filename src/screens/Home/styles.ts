import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { FlatListProps } from 'react-native';
// a tipagem também deve ser passada ao component flatlist
import { Car as ModelCar } from '../../database/Model/Car';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;
export const Header = styled.View`
  width: 100%;
  height: 113px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarLit =  styled(FlatList as new (props: FlatListProps<ModelCar>) => FlatList<ModelCar>).attrs({
  contentContainerStyle:{
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})`
  
`;
