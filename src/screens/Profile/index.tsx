import React, { useState } from 'react';

import {
  KeyboardAvoidingView,
  Keyboard,
  StatusBar,
  Alert
} from 'react-native';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNetInfo } from '@react-native-community/netinfo';
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import * as Yup from "yup";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
  ButtonWrapper
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/auth';

type options = 'dataEdit' | 'passwordEdit';

export function Profile() {
  const { user, signOut, updateUser } = useAuth();
  const netInfo = useNetInfo();

  const [option, setOption] = useState<options>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);


  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, precisará de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'Sair',
          onPress: () => signOut(),
          style: 'default'
        }
      ]
    )
  }

  function handleOptionChange(optionSelected: options) {
    if(netInfo.isConnected === false && optionSelected === 'passwordEdit'){
      Alert.alert('Você está offline!', 'Para mudar a senha, conecte-se a Internet.');
    }else {
      setOption(optionSelected);
    }
  }

  async function handleAvatarSelect() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (result.cancelled) {
      return;
    }

    const { uri } = result as ImageInfo;
    if (uri) {
      setAvatar(uri)
    }

  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória.'),
        name: Yup.string().required('Nome é obrigatório.')
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      })

      Alert.alert('Dados atualizados')

    } catch (error) {

      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message)
      } else {
        Alert.alert('Não foi possível atualizar o perfil!')
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='light-content'
            backgroundColor={theme.colors.header}
            translucent
          />
          <Header>
            <HeaderTop>

              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />

              <HeaderTitle>Editar Perfil</HeaderTitle>

              <LogoutButton onPress={handleSignOut} >
                <Feather
                  name='power'
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>

            </HeaderTop>
            <PhotoContainer>

              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelect} >
                <Feather
                  name='camera'
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>

            </PhotoContainer>
          </Header>

          <Content style={{ paddingBottom: useBottomTabBarHeight() }} >
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle
                  active={option === 'passwordEdit'}
                >
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ?

              <Section>
                <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />

                <Input
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />

                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />

              </Section>
              :
              <Section>

                <PasswordInput
                  iconName='lock'
                  placeholder='Senha atual'
                />

                <PasswordInput
                  iconName='lock'
                  placeholder='Nova senha'
                />

                <PasswordInput
                  iconName='lock'
                  placeholder='Repetir senha'
                />

              </Section>
            }
            <ButtonWrapper >
              <Button
                title='Salvar alterações'
                onPress={handleProfileUpdate}
              />
            </ButtonWrapper>
          </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}