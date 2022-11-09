import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { api } from '../../../services/api';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';



interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {

  const navigation = useNavigation<any>();
  const route = useRoute();
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .min(8, 'A senha deve conter no mínimo 8 caracteres.')
          .max(16, 'A senha deve conter no máximo 16 caracteres.'),
      })

      await schema.validate({ password });

      if (password !== passwordConfirm) {
        return Alert.alert('As senha não são iguais.')
      }

      await api.post('/users', {
        name: user.name,
        email: user.email,
        password,
        driver_license: user.driverLicense
      }).then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada!' ,
          message: `Agora é só fazer login\n e aproveitar!` ,
          nextScreenRoute: 'SignIn' ,
        });
      })
      .catch((error) => {
        return Alert.alert(
          'Opa! Não foi possível cadastrar.',
          'Por favor, verifique sua conexão com a internet e tente novamente.'
        )
      })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa!', error.message);
      } else {
        return Alert.alert(
          'Opa! Ocorreu um erro inesperado.',
          'Por favor, verifique sua conexão com a internet e tente novamente.'
        );
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>

          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>

          <SubTitle>
            Faça seu cadastro de{'\n'}forma rápida e fácil.
          </SubTitle>

          <Form>

            <FormTitle>
              02. Senha
            </FormTitle>

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir senhas'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />

          </Form>

          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}