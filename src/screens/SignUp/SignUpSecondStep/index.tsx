import React from 'react';
import {
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
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

export function SignUpSecondStep() {

  const navigation = useNavigation<any>();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
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
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir senhas'
            />

          </Form>

          <Button
            title='Cadastrar'
            color={theme.colors.success}
          />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}