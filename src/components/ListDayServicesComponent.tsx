import React, { useEffect, useState } from 'react';
import axios from './AxiosComponent';
import { View, Text, FlatList } from 'react-native';
import { Table, Row, Cell } from 'react-native-table-component';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface DayService {
    
    id: number;
    employee:
    {
        user: {
            first_name: string;
            last_name: string;
        };
    }
    service: {
        name: string;
        price: number;
    }[];

    date: string;
}
interface ListDayServicesProps {    
    flag: boolean;
}

const ListDayServices: React.FC<ListDayServicesProps & { setFlag: (flag: boolean)=>void}> = ({flag, setFlag}) => {
    const [services, setServices] = useState<DayService[]>([]);
    
    const fetchDayServices = async () => {
        const token = await AsyncStorage.getItem('token');
        const employee_id = await AsyncStorage.getItem('employee_id');
        if (employee_id === null) {
            try {
                const response = await axios.get(`daylist/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setServices(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        else{
            try {
            const response = await axios.get(`daylist/?employee_id=${employee_id}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            console.log(employee_id);
            setServices(response.data);
            console.log(response.data);
        } catch (error) {
            console.log("Empleado" + employee_id);
            console.error(error);
        }
        }
    };

    useEffect(() => {
        fetchDayServices();
        setFlag(false);
    }, [flag]);

    return (
        <View>
            <Table >
                <Row data={['EMPLEADO', 'SERVICIOS', 'HORA', 'TOTAL']} style={{height: 40}} textStyle={{margin: 6}}/>
                <FlatList
                    data={services}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const total = item.service.reduce((acc, service) => acc + service.price, 0);
                        const employeeName = `${item.employee.user.first_name} ${item.employee.user.last_name}`;
                        const servicesNames = item.service.map((s: { name: string }) => s.name).join(', ');
                        const time = item.date.slice(11, 16);
                        return (
                            <Row data={[employeeName, servicesNames, time, total]} textStyle={{margin: 6}}/>
                        );
                    }}
                />
            </Table>
        </View>
    );
};

export default ListDayServices;