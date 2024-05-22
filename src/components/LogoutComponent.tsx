import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Props } from '../Types';
import { View, Text, Button } from 'react-native';
import Styles from '../Styles';

const Logout: React.FC<Props> = ({navigation}) => {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('manager_id');
        await AsyncStorage.removeItem('employee_id');
        await AsyncStorage.removeItem('employee_first_name');
        await AsyncStorage.removeItem('employee_last_name');
        await AsyncStorage.removeItem('manager_first_name');
        await AsyncStorage.removeItem('manager_last_name');
        navigation.navigate('Login');
    };
    return (
        <View style={Styles.container}>
            <Text style={Styles.headerText}>Are you sure you want to logout?</Text>
            <Button style = {Styles.button} title="Logout" onPress={handleLogout} />
        </View>
    );
};
export default Logout;