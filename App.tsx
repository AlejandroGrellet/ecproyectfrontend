import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Props, Stack} from './src/Types';


import Home from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ListEmployeeScreen from './src/screens/ListEmployeeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ListDayServices from './src/screens/ListDayServiceScreen';
import AddDayServiceScreen from './src/screens/AddDayServiceScreen';
import ManageServices from './src/screens/ManageServicesScreen';
import LogoutComponent from './src/components/LogoutComponent';

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddService" component={AddDayServiceScreen} />
        <Stack.Screen name="ListEmployees" component={ListEmployeeScreen} /> 
        <Stack.Screen name="ListDayServices" component={ListDayServices} />
        <Stack.Screen name="ManageServices" component={ManageServices} />
        <Stack.Screen name="Logout" component={LogoutComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
