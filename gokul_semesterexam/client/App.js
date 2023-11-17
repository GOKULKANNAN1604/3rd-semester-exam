
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/loginsreen';
import Register from './screens/registerscreen';
import HomeScreen from './screens/homescreen';
import WelcomeScreen from './screens/welcomeSreen';
import EditProfileScreen from './screens/editprofilescreen';
import AdminLoginScreen from './screens/adminloginscreen';
import AdminRegister from './screens/adminregisterscreen';
import Admin from './screens/admin';
import AddEducation from './screens/educationscreen';
import Profile from './screens/profile';
import NetworkEngineerRegistration from './components/engregister';
import EngLogin from './components/englogin';
import Faculty from './screens/faculty';
import AddFaculty from './components/facultyissue';
import FacultyDetails from './components/facultydetails';
import Engdetails from './components/engissues';
import AddDailyUpdate from './components/dailyupdates';
import DailyUpdatesComponent from './components/dailyubdatedetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='AdminLogin' component={AdminLoginScreen} options={{ headerShown: true }} />
        <Stack.Screen name='AdminRegister' component={AdminRegister} options={{ headerShown: true }} />
        <Stack.Screen name='Admin' component={Admin} options={{ headerShown: true }} />
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='EditProfile' component={EditProfileScreen} options={{ headerShown: true }} />
        <Stack.Screen name='Profile' component={Profile} options={{ headerShown: true }} />
        <Stack.Screen name='Addeducation' component={AddEducation} options={{ headerShown: true }} />
        <Stack.Screen name='faculty' component={Faculty} options={{ headerShown: true }} />
        <Stack.Screen name='Networkengineeregistration' component={NetworkEngineerRegistration} options={{ headerShown: true }} />
        <Stack.Screen name='EngLogin' component={EngLogin} options={{ headerShown: true }} />
        <Stack.Screen name='addfaculty' component={AddFaculty} options={{ headerShown: true }} />
        
        <Stack.Screen name='Engdetails' component={Engdetails} options={{ headerShown: true }} />
        <Stack.Screen name='dailyupdate' component={AddDailyUpdate} options={{ headerShown: true }} />
        <Stack.Screen name='updatedetails' component={DailyUpdatesComponent} options={{ headerShown: true }} />
      </Stack.Navigator>
      </NavigationContainer>
  )
}
export default App;