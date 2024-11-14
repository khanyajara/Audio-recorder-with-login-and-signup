import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecordingsScreen from './components/Recording';
import LoginScreen from './components/Login';
import SignUpScreen from './components/Signup';
import UserProfileScreen from './components/profile';
import PrivacyPolicyScreen from './components/Privacy';
import FeedbackScreen from './components/feedback';

const Stack = createStackNavigator()



export default function App() {




  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Recordings" component={RecordingsScreen} />
        <Stack.Screen name='Profile' component={UserProfileScreen} />
        <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicyScreen}/>
        <Stack.Screen name='Feedback' component={FeedbackScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

