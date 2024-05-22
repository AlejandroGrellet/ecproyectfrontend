import React from 'react';
import {Text, View, Button} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import RegisterComponent from '../components/RegisterComponent'
import Style from '../Styles';
import {Props} from '../Types';
function RegisterScreen({navigation}: Props) {
  return (
    <View style={Style.container}>
      <Text style={Style.headerText}>
        REGISTRO
      </Text>
      <RegisterComponent/>
      <Button
      title='HOME'
      onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
export default RegisterScreen;