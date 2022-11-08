import React from 'react';
import {
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

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
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function SignUpFirstStep() {

  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }

  function handleNextStep(){
    navigation.navigate('SignUpSecondStep')
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
              01. Dados
            </FormTitle>

            <Input
              iconName='user'
              placeholder='Nome'
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
            />

          </Form>

          <Button
            title='Próximo'
            onPress={handleNextStep}
          />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}