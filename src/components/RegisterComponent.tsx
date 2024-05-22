import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from './AxiosComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const RegisterScreen: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [manager_id,setManager_id] = useState<Number>(0)
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });



  React.useEffect(() => {
    const fetchStorageData = async () => {
      const storedManagerId = await AsyncStorage.getItem('manager_id');
      setManager_id(Number(storedManagerId));
      console.log(manager_id);
    }
    fetchStorageData();
  },[]);

  const handleRegister = async () => {
    if (manager_id ){
      console.log(manager_id);
      let userObject = {
        manager: manager_id,
        user: formData
      };  
      try {
      // Validación de datos antes de enviarlos al servidor
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
          Alert.alert('Error', 'Por favor, complete todos los campos.');
          return;
        }
        if (formData.password != confirmPassword){
          Alert.alert('Error', 'Las contraseñas no coinciden');
          return;
        }
        // Llamada a la API para registrar al usuario
        const response = await axios.post('employee/', userObject);
        // Manejo de la respuesta del servidor
        console.log(response.data);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        });
        setConfirmPassword("");
        // Reiniciar el formulario después del registro exitoso
        // Mostrar un mensaje de éxito
        Alert.alert('Éxito', 'Usuario registrado correctamente.');
      } catch (error) {
        // Manejo de errores de la llamada a la API
        console.error('Error al registrar usuario:', error);
        Alert.alert('Error', 'Ocurrió un error al registrar usuario. Por favor, inténtelo de nuevo.');
      }
    }
    else{
      try { 
        console.log("Registrando un Manger");
        let userObject = {
          user: formData
        };
        // Validación de datos antes de enviarlos al servidor
          if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
          }
          // Llamada a la API para registrar al usuario
          const response = await axios.post('manager/', userObject);
  
          // Manejo de la respuesta del servidor
          console.log(response.data);
          setFormData({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
          });
          setConfirmPassword("");
          // Reiniciar el formulario después del registro exitoso
          // Mostrar un mensaje de éxito
          Alert.alert('Éxito', 'Usuario registrado correctamente.');
        } catch (error) {
          // Manejo de errores de la llamada a la API
          console.error('Error al registrar usuario:', error);
          Alert.alert('Error', 'Ocurrió un error al registrar Gerente. Por favor, inténtelo de nuevo.');
        }
    }  
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={formData.first_name}
        onChangeText={(text) => setFormData({ ...formData, first_name: text })}
      />
      <TextInput
        placeholder="Apellido"
        value={formData.last_name}
        onChangeText={(text) => setFormData({ ...formData, last_name: text })}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry = {isPasswordVisible}
      />
      <TextInput 
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry = {isPasswordVisible}
      />
      <Button 
        title={isPasswordVisible ? 'Mostrar Contraseña' : 'Ocultar Contraseña'} 
        onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
