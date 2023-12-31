
// RegisterScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState } from 'react';
import { View, TextInput, Text,StyleSheet,ImageBackground ,Image, Alert,TouchableOpacity} from 'react-native';
import axios from "axios";
const AdminRegister = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email,setEmail]=useState('');
  const  [mobile, setMobile]=useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleRegister = async () => {
    if (!username || !email || !password || !mobile || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    const mobileRegex = /^[0-9]+$/;
  if (!mobileRegex.test(mobile)) {
    Alert.alert('Error', 'Mobile number must contain only numbers');
    return;
  }
    try {
      // Check if the email is already registered
      
  
      
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Invalid email format');
        return;
      }

     

      //validate conform password
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      
      // Validate mobile number length
      if (mobile.length !== 10) {
        Alert.alert('Error', 'Mobile number must be 10 digits long');
        return;
      }
  
      // Proceed with registration if all validations pass
      const response = await axios.post('http://192.168.156.122:5000/adminregister', {
        email,
        password,
        mobile,
        username,
        
      });
  
      if (response.data.success) {
        
        Alert.alert('Success', 'Registration successful');
        const userToken = response.data.token;

        await AsyncStorage.setItem('userData', JSON.stringify({ username, mobile, email, token: userToken }));

        navigation.navigate('Admin');
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Registration failed');
    }
  };
  

  return (
    <View style={styles.container}>
          <Text style={styles.head}>Create Your Account</Text>
          <View style={styles.inputContainer}>
          
      <TextInput
      style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
      style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
      style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
  style={styles.input}
  placeholder="Confirm Password"
  secureTextEntry
  value={confirmPassword}
  onChangeText={text => setConfirmPassword(text)}
/>

      <TextInput
      style={styles.input}
        placeholder="mobile number"
        value={mobile}
        keyboardType="numeric"
        onChangeText={text => setMobile(text)}
      />
      
<TouchableOpacity style={styles.regButton} onPress={handleRegister}>
          <Text style={styles.regButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
     </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
     paddingTop:100,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    head: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#007BFF',
      fontFamily: 'Roboto', // Replace with your custom font
    },
    inputContainer: {
      width: '90%',
      marginBottom: 20,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
      width: '100%',
      fontSize: 18,
      color: '#333',
    },
    regButton: {
      backgroundColor: '#007BFF',
      padding: 15,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
      marginTop:20
    },
    regButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  export default AdminRegister;