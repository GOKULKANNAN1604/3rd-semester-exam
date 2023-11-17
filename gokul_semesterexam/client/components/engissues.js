import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import axios from 'axios';

const Engdetails = () => {
  const [facultyDetails, setFacultyDetails] = useState([]);

  const fetchData = () => {
    // Fetch faculty details from your API
    axios
      .get('http://192.168.156.122:5000/faculty')
      .then((response) => {
        setFacultyDetails(response.data);
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

  const updateStatus = async (facultyId, newStatus) => {
    try {
      const response = await axios.put(`http://192.168.156.122:5000/faculty/${facultyId}/status`, {
        status: newStatus,
      });
  
      if (response.status === 200) {
        // Update the status in the facultyDetails state
        const updatedFacultyDetails = facultyDetails.map((faculty) => {
          if (faculty._id === facultyId) {
            return { ...faculty, status: newStatus };
          }
          return faculty;
        });
  
        setFacultyDetails(updatedFacultyDetails);
        console.log('Status updated successfully:', response.data);
      } else {
        console.log('Status update failed:', response.data);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>network engineers</Text>
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
            <Text>Status: {item.status}</Text>
            <Button
              title="Mark as Completed"
              onPress={() => updateStatus(item._id, 'Completed')}
            />
            <Button
              title="Mark as Verify"
              onPress={() => updateStatus(item._id, 'Verify')}
            />
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

export default  Engdetails;
