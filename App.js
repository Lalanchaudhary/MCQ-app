import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './Screens/Auth/Login/Login';
import Signup from './Screens/Auth/Signup/Signup';
import AccountSetup from './Screens/Auth/Signup/AccountSetup';
import ProfileImage from './Screens/Auth/Signup/ProfileImage';
import Dashboard from './Screens/Users/Dashboard';
import Profile from './Screens/Users/Profile';
import EditProfile from './Screens/Users/EditProfile';
import EmailScreen from './Screens/Auth/Forgot/EmailScreen';
import OtpVerification from './Screens/Auth/Forgot/OtpVerification';
import NewPassword from './Screens/Auth/Forgot/NewPassword';
import Toast from 'react-native-toast-message';
import Result from './Screens/QuestionScreens/Result';
import FirstScreen from './Screens/QuestionScreens/FirstScreen';
import QuestionScreen from './Screens/QuestionScreens/QuestionScreen';
import LoaderKit from 'react-native-loader-kit';

// Admin Screens
import AdminDashboard from './Screens/Admin/AdminDashboard';
import UserList from './Screens/Admin/UserList';
import TestList from './Screens/Admin/TestList';
import AddTest from './Screens/Admin/AddTest';
import EditTest from './Screens/Admin/EditTest';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
      setIsLoading(false);
    };

    fetchUserId();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoaderKit
          style={{ width: 50, height: 50 }}
          name={'BallPulse'}
          color={'black'}
        />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={!userId ? 'Login' : 'Dashboard'}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="AccountSetup" component={AccountSetup} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileImage" component={ProfileImage} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotScreen" component={EmailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OtpScreen" component={OtpVerification} options={{ headerShown: false }} />
          <Stack.Screen name="NewPasswordScreen" component={NewPassword} options={{ headerShown: false }} />
          <Stack.Screen name="QuestionScreen" component={QuestionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResultScreen" component={Result} options={{ headerShown: false }} />
          
          {/* Admin Screens */}
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="UserList" component={UserList} options={{ headerShown: false }} />
          <Stack.Screen name="TestList" component={TestList} options={{ headerShown: false }} />
          <Stack.Screen name="AddTest" component={AddTest} options={{ headerShown: false }} />
          <Stack.Screen name="EditTest" component={EditTest} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
