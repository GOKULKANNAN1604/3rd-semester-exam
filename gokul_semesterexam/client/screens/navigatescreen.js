import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';


import Profile from './profile';
import Faculty from './faculty';
import FacultyDetails from '../components/facultydetails';


const Navigatscreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Faculty', title: 'Faculty', focusedIcon: 'file-document' },
    { key: 'FacultyDetails', title: 'FacultyDetails', focusedIcon: 'car' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Faculty: Faculty,
    FacultyDetails:FacultyDetails
  });

  return (
    <BottomNavigation 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Navigatscreen;