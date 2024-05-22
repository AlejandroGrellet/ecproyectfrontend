import React, { useState } from 'react';
import AxiosInstance from './AxiosComponent';
import { Button, TextInput, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {Props} from '../Types';

const Login: React.FC<Props> = ({navigation}) => {
    const [first_name, setFirstName] = useState('');    
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');

    
    const handleLogin = async () => {
        const username= first_name +"_"+ last_name;
        console.log(username);
        try {
            const response = await AxiosInstance.post('login/', {
                username,
                password,
            });
            const token = response.data.token;
            const employee_id = response.data.employee_id;
            const manager_id = response.data.manager_id;
            const employee_first_name = response.data.employee_first_name;
            const employee_last_name = response.data.employee_last_name;
            const manager_first_name = response.data.manager_first_name;
            const manager_last_name = response.data.manager_last_name;
            
            if (token && manager_id && employee_id) {
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('manager_id', manager_id.toString());
                await AsyncStorage.setItem('employee_id', employee_id.toString());
                if (employee_first_name && employee_last_name)
                    {
                        await AsyncStorage.setItem('employee_first_name', employee_first_name);
                        await AsyncStorage.setItem('employee_last_name', employee_last_name);
                    }
                
                console.log('Login successful', "empleado" + employee_id, "manager" + manager_id, token);
                navigation.navigate('AddService');
            }
            else if (token && manager_id) {
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('manager_id', manager_id.toString());
                if (manager_first_name && manager_last_name)
                    {
                        await AsyncStorage.setItem('manager_first_name', manager_first_name);
                        await AsyncStorage.setItem('manager_last_name', manager_last_name);
                    }
                console.log('Login successful as manager//', "manager " + manager_id, token);
                navigation.navigate('Home');
            }
            else {
                Alert.alert('Error', 'Usuario o Contraseña incorrectos');
            }
        } catch (error) {
            Alert.alert('Error', 'Login failed');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Nombre"
                value={first_name}
                onChangeText={setFirstName}
            />
            <TextInput
                placeholder="Apellido"
                value={last_name}
                onChangeText={setLastName}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default Login;