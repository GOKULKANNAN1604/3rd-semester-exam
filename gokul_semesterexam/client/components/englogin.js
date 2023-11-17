import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StatusBar, StyleSheet ,ImageBackground,Alert} from 'react-native';
import axios from 'axios';
export default function EngLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.156.122:5000/englogin', {
        email,
        password,
      });
      if (response.status === 200) {
     
        Alert.alert('Login Successful', response.data.message);
        navigation.navigate('Engdetails'); // Navigate to a protected screen
      } else {
        Alert.alert('Login Failed', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login Error', 'An error occurred while trying to login');
    }
  };

 
  
 

  const handleRegister = () => {
    navigation.navigate('Networkengineeregistration');
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.logo}>Network Engineers</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
       
      </View>
      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%"
  },
  
  logo: {
    fontFamily: 'Roboto', 
    fontSize: 36, 
    fontWeight: 'bold', 
    marginBottom: 50,
    color: 'black', 
  },
  form: {
    width: '80%',
  },
  input: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: '#f0f8ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signup: {
    marginTop: 10,
    textAlign: 'center',
    
  },
  signupButton: {
    color: '#007BFF',
    fontWeight: 'bold',
    
  },
});
