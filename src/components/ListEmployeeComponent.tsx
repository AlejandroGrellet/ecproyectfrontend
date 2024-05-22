import React, { useEffect, useState } from 'react';
import axios from './AxiosComponent';
import {Text, View, FlatList, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
interface Employee {
    user: {
        id: number;
        first_name: string;
        last_name: string;
    };
}


const ListEmployees: React.FC = () => {
    // const [manager_id, setManager_id] = useState<number>(0);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee>();
    const handleSelect = (employee: Employee) => {
        setSelectedEmployees(employee);
    };
    
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const manager_id = await AsyncStorage.getItem('manager_id');
                const response = await axios.get(`employee/?manager_id=${manager_id}`);
                setEmployees(response.data);
            } catch (error) {
                Alert.alert('Error', 'No se pudo cargar la lista de empleados:' + error);
            }
        };
        fetchEmployees();
    }, []);

    const handleDelete = async () => {
        try {
            const manager_id = await AsyncStorage.getItem('manager_id');
            const response = await axios.delete(`employee/?manager_id=${manager_id}/?employee_id=${selectedEmployees?.user.id}`);
            Alert.alert('Usuario eliminado', 'El usuario ha sido eliminado correctamente');
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el usuario:' + error);   
        }

    }

    return (
        <View>
            <FlatList
                data={employees}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                        <TouchableOpacity 
                        style={[styles.item, {backgroundColor: selectedEmployees == item ? 'lightgray' : 'transparent'}]}
                        onPress={() => handleSelect(item)}
                    >
                        <Text>{item.user.first_name} {item.user.last_name}</Text>
                    </TouchableOpacity>
                )}
            />
            {selectedEmployees && <Text>{selectedEmployees.user.first_name} {selectedEmployees.user.last_name}</Text>}
            {selectedEmployees && <Button title="Eliminar Usuario" onPress={() => handleDelete()} /> }   
        </View>
    );
};
const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
    },
});

export default ListEmployees;