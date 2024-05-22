import React from 'react';
import {Text, View, Button} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import ListDayServicesComponent from '../components/ListDayServicesComponent'
import Style from '../Styles';
import {Props} from '../Types';
import Home from './HomeScreen';

function ListDayServicesScreen({navigation}: Props) {
  const [flag, setFlag] = React.useState<boolean>(false);
  return (
    <View style={Style.container}>
      <Text style={Style.headerText}>
        REGISTRO DE HOY
      </Text>
      <ListDayServicesComponent 
      flag={flag}
      setFlag={setFlag}/>
      <Button
      title='HOME'
      onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
export default ListDayServicesScreen;