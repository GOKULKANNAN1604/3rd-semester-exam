import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import the Axios library

function NetworkEngineerRegistration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    // Validate the input fields
    if (!username || !email || !phone || !secretCode || !password) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    // Add more specific validation rules for phone and secretCode
    if (phone.length !== 10 || !/^[0-9]*$/.test(phone)) {
      Alert.alert('Validation Error', 'Phone number must be 10 digits');
      return;
    }

    if (secretCode.length !== 3 || !/^[0-9]*$/.test(secretCode)) {
      Alert.alert('Validation Error', 'Secret code must be a 3-digit number');
      return;
    }

    // Prepare the registration data to be sent to the server
    const registrationData = {
      username,
      email,
      phone,
      secretCode,
      password,
    };

    // Send a POST request to your server to store the data
    axios.post('http://192.168.156.122:5000/engineerregister', registrationData)
      .then((response) => {
        // Check if the registration was successful
        if (response.status === 200) {
          Alert.alert('Registration Successful', 'You have been registered.');
          navigation.navigate(''); // Navigate to the login screen after successful registration.
        } else {
          Alert.alert('Registration Failed', 'Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Registration Failed', 'Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Network Engineer Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Secret Code"
        onChangeText={(text) => setSecretCode(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default NetworkEngineerRegistration;
