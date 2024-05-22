import React, { useState } from 'react';
import { Button, View, Text} from 'react-native';
import axios from './AxiosComponent';
import ListServices from './ListServiceTypeComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListDayServices from './ListDayServicesComponent';
import { FlatList } from 'react-native-gesture-handler';

interface Service {
    employee: number;
    service: string[];
    date: string;
}

interface ServiceType {
    id: string;
    name: string;
    price: number;
}


const AddService: React.FC = () => {
    const [manager_id, setManagerId] = useState<number>(0);
    const [employee_id, setEmployeeId] = useState<number>(0);
    const [token, setToken] = useState<string | null>(null);
    const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
    const services_id = selectedServices.map(service => service.id);
    const [flag, setFlag] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    const resetState = () => {
        setSelectedServices([]);
        setFlag(true);
    };

    React.useEffect(() => {
        const fetchStorageData = async () => {
            const storedManagerId = await AsyncStorage.getItem('manager_id');
            const storedEmployeeId = await AsyncStorage.getItem('employee_id');
            const storedToken = await AsyncStorage.getItem('token');

            setManagerId(Number(storedManagerId));
            setEmployeeId(Number(storedEmployeeId));
            setToken(storedToken);
        };

        fetchStorageData();
    }, []);

    const handleSelect = (serviceType:ServiceType) => {
        setSelectedServices(prevSelectedServices => {
            const newSelectedServices = prevSelectedServices.includes(serviceType)
                ? prevSelectedServices.filter(serviceId => serviceId !== serviceType)
                : [...prevSelectedServices, serviceType];
            console.log(newSelectedServices);
            const total = newSelectedServices.reduce((acc, service) => acc + service.price, 0);
            setTotal(total);
            return newSelectedServices;
        });
    };

    const handleAddService = async () => {
        const date = new Date();
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,16);
        let serviceObject: Service = {
            employee: employee_id,
            service: services_id,
            date: localDate
        };
        try {
            const response = await axios.post("service/", serviceObject, {
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
   
    

    return (
        <View>
            <ListServices 
            handleSelect={handleSelect} 
            selectedServices={selectedServices} 
            flag={flag}
            setFlag={setFlag}
            />
            
            
            <FlatList
                data={selectedServices}
                keyExtractor={service => service.id}
                renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                </View>
            )}
            />
            <Text>TOTAL: {total}</Text>
            <Button title="CARGAR SERVICIO" onPress={handleAddService} />
            <ListDayServices 
            flag={flag}
            setFlag={setFlag}/>
        </View>
    );
}

export default AddService;