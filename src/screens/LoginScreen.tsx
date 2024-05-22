import React from 'react';
import {Text, View, Button} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import LoginComponent from '../components/LoginComponent'
import Style from '../Styles';
import {Props} from '../Types';

const LoginScreen = ({navigation}: Props) => {
    return (
        <View style={Style.container}>
            <Text style={Style.headerText}>Ingresar</Text>
            <LoginComponent navigation={navigation} />
            <Button title="Volver al Inicio" onPress={() => navigation.navigate('Home')} />
        </View>
        
    );
};

export default LoginScreen;