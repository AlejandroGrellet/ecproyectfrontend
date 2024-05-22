import React from 'react';
import {Text, View, Button} from 'react-native';
import ManageServicesComponent from '../components/ManageServicesComponent';
import ListServiceTypeComponent from '../components/ListServiceTypeComponent';
import Styles from '../Styles';

function ManageServicesScreen() {
  return (
    <View style={Styles.container}>
      <Text>
        Manage Services 
      </Text>
      <ManageServicesComponent/>
    </View>
  );
}
export default ManageServicesScreen;