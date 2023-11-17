import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import Drawer from './drawer';
import { useNavigation } from '@react-navigation/native';

export default function AddDailyUpdate() {
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const navigation = useNavigation();

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.156.122:5000/dailyupdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, department }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert('Success', 'Daily update added successfully');
                navigation.navigate("updatedetails");
            } else {
                console.error('Error adding daily update:', data.error);
            }
        } catch (error) {
            console.error('Error adding daily update:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.head}>AddDailyUpdate</Text>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={text => setDescription(text)}
                placeholder="Enter description"
            />
            <Text style={styles.label}>Department</Text>
            <TextInput
                style={styles.input}
                value={department}
                onChangeText={text => setDepartment(text)}
                placeholder="Enter department"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Create Daily Updates</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        padding: 20,
        flex: 1,
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
        alignSelf: 'center',
        width: '60%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    head:{
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:50,
        marginBottom:30
    }
});