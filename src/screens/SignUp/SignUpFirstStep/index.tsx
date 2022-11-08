import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';


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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep(){
    try{
        const schema = Yup.object().shape({
          name: Yup.string()
            .required('Nome é obrigatório.'),
          email: Yup.string()
            .email('E-mail inválido.')
            .required('E-mail é obrigatório.'),
          driverLicense: Yup.string()
            .required('CNH é obrigatória.')
        });

        const data = {name, email, driverLicense};
        await schema.validate(data)

      navigation.navigate('SignUpSecondStep', {
        user: data
      });

    }catch(error){
      if(error instanceof Yup.ValidationError){
        return Alert.alert('Opa!', error.message);
      }else {
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
              01. Dados
            </FormTitle>

            <Input
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
              autoCapitalize='none'
              autoCorrect={false}
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              onChangeText={setDriverLicense}
              value={driverLicense}
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