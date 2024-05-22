import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from './AxiosComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ListServicesProps {
    handleSelect: (serviceType:ServiceType) => void;
    selectedServices: ServiceType[];
    flag: boolean;
    // selectedService: string | undefined;
}

interface ServiceType {
    id: string;
    name: string;
    price: number;
}


const ListServices: React.FC<ListServicesProps & { setFlag: (flag: boolean) => void }> = ({ handleSelect, selectedServices, flag, setFlag }) => {
    const [services, setServices] = useState<ServiceType[]>([]);
    const [managerId, setManagerId] = useState<number>(0);
    const [token, setToken] = useState<string | null>(null);

    React.useEffect(() => {
        const fetchStorageData = async () => {
            const storedManagerId = await AsyncStorage.getItem('manager_id');
            const storedToken = await AsyncStorage.getItem('token');
    
            setManagerId(Number(storedManagerId));
            setToken(storedToken);
            setFlag(!flag); // Use setFlag instead of flag=false
        };
        fetchStorageData();
    }, []);
    
    useEffect(() => {
        if (managerId && token) {
            fetchServices();
        }
    }, [managerId, token, flag]);
    

    
    const fetchServices = async () => {
        try {
            const response = await axios.get(`servicetype/?manager_id=${managerId}`,{
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setServices(response.data);
        } catch (error) {
            console.error(error, managerId +" "+ token);
        }
    };
  

    return (
        <View>
            <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={[styles.item, {backgroundColor: selectedServices.includes(item) ? 'lightgray' : 'transparent'}]}
                        onPress={() => handleSelect(item)}
                    >
                        <Text>{item.name}: {item.price}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
    },
});

export default ListServices;