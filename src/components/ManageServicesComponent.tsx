import React, { useState } from 'react';
import { Button, Text, View, TextInput} from 'react-native';
import axios from './AxiosComponent';
import ListServices from './ListServiceTypeComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ServiceType {
    id: string;
    name: string;
    price: number;
}


const AddModifyService: React.FC = () => {
    const [manager_id, setManagerId] = useState<number>(0);
    const [token, setToken] = useState<string | null>(null);
    const [selectedService, setSelectedServices] = useState<ServiceType[]>([]);
    const [selectedServiceName, setSelectedServiceName] = useState<string | null>(null);
    const [selectedServicePrice, setSelectedServicePrice] = useState<string | null>(null);
    const [newServiceName, setNewServiceName] = useState<string | null>(null);
    const [newServicePrice, setNewServicePrice] = useState<string | null>(null);
    const [flag, setFlag] = useState<boolean>(false);   

    const resetState = () => {
        setSelectedServices([]);
        setSelectedServiceName(null);
        setSelectedServicePrice(null);
        setNewServiceName(null);
        setNewServicePrice(null);
        setFlag(!flag);
    };

    React.useEffect(() => {
        const fetchStorageData = async () => {
            const storedManagerId = await AsyncStorage.getItem('manager_id');
            const storedToken = await AsyncStorage.getItem('token');

            setManagerId(Number(storedManagerId));
            setToken(storedToken);
        };
        fetchStorageData();
    }, []);

    const handleSelect = (serviceType: ServiceType) => {
        setSelectedServices([serviceType]);
        setSelectedServiceName(serviceType.name);
        setSelectedServicePrice(serviceType.price.toString());
    };

    const handleModifyService = async () => {
        const service_id = selectedService[0].id;
        let serviceObject = {
            manager: manager_id,
            name: selectedServiceName,
            price: selectedServicePrice
        }
        try {
            const response = await axios.put(`servicetype/?manager_id=${manager_id}&service_id=${service_id}`, serviceObject, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            
            });
            console.log(response.data);
            resetState();
        } catch (error) {
            console.log(serviceObject);
            console.error(error);
        }
    }

    const handleAddService = async () => {
        let serviceObject = {
            manager: manager_id,
            name: newServiceName,
            price: newServicePrice
        }
        try {
            const response = await axios.post(`servicetype/?manager_id=${manager_id}`, serviceObject, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            
            });
            console.log(response.data);
            resetState();
        } catch (error) {
            console.log(serviceObject);
            console.error(error);
        }    
    }

        const handleDeleteService = async () => {
            const service_id = selectedService[0].id;
            try {
                const response = await axios.delete(`servicetype/?manager_id=${manager_id}&service_id=${service_id}`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                
                });
                console.log(response.data);
                resetState();
            } catch (error) {
                console.log(service_id);
                console.error(error);
            }
        }


    return (
        <View>
            <ListServices 
            handleSelect={handleSelect} 
            selectedServices={selectedService} 
            flag={flag} 
            setFlag={setFlag}
            />
            {selectedService.map((service, id) => (
                <View key={id}>
                    <TextInput
                        placeholder="Servicio"
                        value={selectedServiceName || ""}
                        onChangeText={setSelectedServiceName}
                    />
                    <TextInput
                        placeholder="Precio"
                        value={selectedServicePrice || ""}
                        onChangeText={setSelectedServicePrice} 
                    />
                    <Button title="Modify Service" onPress={handleModifyService} />
                    <Button title="Delete Service" onPress={handleDeleteService} />
                </View>
            ))}
            <TextInput
                placeholder="Nuevo Servicio"
                value={newServiceName || ""}
                onChangeText={setNewServiceName} 
            />
            <TextInput
                placeholder="Precio"
                value={newServicePrice || ""}
                onChangeText={setNewServicePrice} 
            />
            <Button title="Add Service" onPress={handleAddService} />
        </View>
    );
};
export default AddModifyService;