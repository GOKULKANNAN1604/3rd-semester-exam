import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const FacultyDetails = () => {
  const [facultyDetails, setFacultyDetails] = useState([]);
  const fetchData = () => {
    // Fetch faculty details from your API
    axios
      .get('http://192.168.156.122:5000/faculty')
      .then((response) => {
        // Modify the response data to update the "Status" field
        const updatedFacultyDetails = response.data.map((item) => {
          const existingFaculty = facultyDetails.find((faculty) => faculty._id === item._id);
          if (existingFaculty) {
            return {
              ...existingFaculty,
              status: item.status, // Update the status field
            };
          }
          return item;
        });
  
        setFacultyDetails(updatedFacultyDetails);
      })
      .catch((error) => {
        console.error('Error fetching faculty details:', error);
      });
  };
  


  useEffect(() => {
    fetchData(); // Fetch data when the component mounts

    // Refresh data every, for example, 30 seconds (adjust as needed)
    const refreshInterval = setInterval(fetchData, 30000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Faculty Details</Text>
      <FlatList
        data={facultyDetails}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.facultyNotificationCard}>
            <Text style={styles.facultyName}>{item.name}</Text>
            <Text>Department: {item.department}</Text>
            <Text>Issue Type: {item.issueType}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Status:{item.status} </Text>
          </View>
        )}
      />
    </View>
  );
};

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
  facultyNotificationCard: {
    backgroundColor: '#EFEFEF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  facultyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default FacultyDetails;
