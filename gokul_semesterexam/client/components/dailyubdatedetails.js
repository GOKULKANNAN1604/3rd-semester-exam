import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const DailyUpdatesComponent = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const url = 'http://192.168.156.122:5000/dailyupdate';

    axios.get(url)
      .then((response) => {
        setUpdates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching daily updates:', error);
      });
  }, []);

  return (
    <View>
      <Text>Daily Updates:</Text>
      {updates.map((update) => (
        <View key={update._id}>
          <Text>Description: {update.description}</Text>
          <Text>Department: {update.department}</Text>
        </View>
      ))}
    </View>
  );
};

export default DailyUpdatesComponent;