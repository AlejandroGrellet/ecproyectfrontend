import React from 'react';
import {Text, View, Button} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import AddDayServiceComponent from '../components/AddDayServiceComponent'
import Style from '../Styles';
import {Props} from '../Types';
import Home from './HomeScreen';

function AddDayServicesScreen({navigation}: Props) {
  return (
    <View style={Style.container}>
      <Text style={Style.headerText}>
        CARGAR SERVICIOS
      </Text>
      <AddDayServiceComponent/>
      <Button
      title='HOME'
      onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
export default AddDayServicesScreen;