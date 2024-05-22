import * as React from 'react';
import { Button, View, Text } from 'react-native';
import {Props} from '../Types';
import Styles from '../Styles';
import LogoutComponent from '../components/LogoutComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({navigation}: Props) =>{
  const [token, setToken] = React.useState<string | null>(null);
  const [manager_id, setManager_id] = React.useState<string | null>(null);
  const [employee_id, setEmployee_id] = React.useState<string | null>(null);
  const [flag, setFlag] = React.useState<boolean>(false); 
  const [employee_first_name, setEmployee_first_name] = React.useState<string | null>(null);
  const [employee_last_name, setEmployee_last_name] = React.useState<string | null>(null);
  const [manager_first_name, setManager_first_name] = React.useState<string | null>(null);
  const [manager_last_name, setManager_last_name] = React.useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchStorageData = async () => {
        const token = await AsyncStorage.getItem('token');
        const manager_id = await AsyncStorage.getItem('manager_id');
        const employee_id = await AsyncStorage.getItem('employee_id');
        const employee_first_name = await AsyncStorage.getItem('employee_first_name');
        const employee_last_name = await AsyncStorage.getItem('employee_last_name');
        const manager_first_name = await AsyncStorage.getItem('manager_first_name');
        const manager_last_name = await AsyncStorage.getItem('manager_last_name');
        if (employee_first_name && employee_last_name) {
          setEmployee_first_name(employee_first_name);
          setEmployee_last_name(employee_last_name);
        }
        if (manager_first_name && manager_last_name) {
          setManager_first_name(manager_first_name);
          setManager_last_name(manager_last_name);
        }
        setToken(token);
        setManager_id(manager_id);
        setEmployee_id(employee_id);
      }
      fetchStorageData();
    }, [])
  );

  return (
    <View style={Styles.container}>
      {employee_id ? (
        <Text>BIENVENIDO {employee_first_name?.toLocaleUpperCase()} {employee_last_name?.toLocaleUpperCase()}!</Text>
      ) :  
      (
        <Text>BIENVENIDO {manager_first_name?.toLocaleUpperCase()} {manager_last_name?.toLocaleUpperCase()}!</Text>
      )}
      {manager_id && !employee_id && (
        <>
          <Button
            title="Registrar Empleado"
            onPress={() => navigation.navigate('Register')}
          />
          <Button
            title="Lista de Empleados"
            onPress={() => navigation.navigate('ListEmployees')}
          />
          <Button
            title="Lista de Servicios del Dia"
            onPress={() => navigation.navigate('ListDayServices')}
          />  
          <Button
            title="Gestionar Servicios"
            onPress={() => navigation.navigate('ManageServices')}
          />
          <Button 
            title="Cerrar Sesion"
            onPress={() => navigation.navigate('Logout')}
          />
        </>
      ) }
      
      {employee_id && (
        <>
          <Button
            title="Agregar Servicio"
            onPress={() => navigation.navigate('AddService')} 
          />
          <Button
            title="Lista de Servicios del Dia"
            onPress={() => navigation.navigate('ListDayServices')}
          />  
          <Button 
            title="Cerrar Sesion"
            onPress={() => navigation.navigate('Logout')}
          />
        </>
        )}
      {!manager_id && !employee_id && (
        <>
          <Button
            title="Registrarse"
            onPress={() => navigation.navigate('Register')}
          />
          <Button
            title="Ingresar"
            onPress={() => navigation.navigate('Login')}
          />
          {/* <Button 
            title="Cerrar Sesion"
            onPress={() => navigation.navigate('Logout')}
          /> */}
        </>)}
    </View>
  );
}
export default Home;