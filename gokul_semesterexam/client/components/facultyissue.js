import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const AddFaculty = () => {
  const navigation = useNavigation();

  const [faculty, setFaculty] = useState({
    name: '',
    department: '',
    issueType: '',
    location: '',
    description: '',
    status: 'In Progress',
  });

  const departments = ['Mca', 'Bca', 'Ma', 'Bcom'];
  const issueTypes = ['no internet', 'slow internet', 'system maintenance', 'software installation'];
  const locations = ['mca classroom', 'bca lab', 'bca classroom', 'bcom lab', 'cloud lab'];
  const statuses = ['In Progress', 'Completed', 'Verify'];
  const handleInputChange = (field, text) => {
    setFaculty({
      ...faculty,
      [field]: text
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.156.122:5000/faculty', {
        faculty: faculty
      });

      console.log('Response from server:', response.data);
      if (response.status === 200) {
        Alert.alert('Success', 'Faculty data stored successfully');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Failed to store faculty data');
      }
    } catch (error) {
      console.error('Error submitting faculty data:', error);
      Alert.alert('Error', 'Failed to store faculty data');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Faculty Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={faculty.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <Text>Department:</Text>
      <Picker
        selectedValue={faculty.department}
        onValueChange={(itemValue) => handleInputChange('department', itemValue)}
      >
        {departments.map((dept, index) => (
          <Picker.Item key={index} label={dept} value={dept} />
        ))}
      </Picker>
      <Text>Issue Type:</Text>
      <Picker
        selectedValue={faculty.issueType}
        onValueChange={(itemValue) => handleInputChange('issueType', itemValue)}
      >
        {issueTypes.map((issue, index) => (
          <Picker.Item key={index} label={issue} value={issue} />
        ))}
      </Picker>
      <Text>Location:</Text>
      <Picker
        selectedValue={faculty.location}
        onValueChange={(itemValue) => handleInputChange('location', itemValue)}
      >
        {locations.map((loc, index) => (
          <Picker.Item key={index} label={loc} value={loc} />
        ))}
      </Picker>
      <Text>Status:</Text>
      <Picker
        selectedValue={faculty.status}
        onValueChange={(itemValue) => handleInputChange('status', itemValue)}
      >
        {statuses.map((status, index) => (
          <Picker.Item key={index} label={status} value={status} />
        ))}
      </Picker>
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={faculty.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#F8F9FA',
    color: '#000000',
  },
});

export default AddFaculty;
