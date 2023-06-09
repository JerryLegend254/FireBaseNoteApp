import React from 'react'
import { View, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../components/screens/HomeScreen';
import CategoryNotes from '../components/screens/CategoryNotes';
import SingleNoteView from '../components/screens/SingleNoteView';
import CreateNote from '../components/screens/CreateNote';
import ChooseCategory from '../components/screens/ChooseCategory';
import SplashScreen from '../components/screens/SplashScreen';
import RegisterScreen from '../components/screens/RegisterScreen';
import LogIn from '../components/screens/LogIn';


const Stack = createStackNavigator();
const Home = () => <View><Text>Home</Text></View>
const StackNavigator = () => {
 return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="SplashScreen" component={SplashScreen} />
     <Stack.Screen name="LogIn" component={LogIn} />
     <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
     <Stack.Screen name="HomeScreen" component={HomeScreen} />
     <Stack.Screen name="CategoryNotes" component={CategoryNotes} />
     <Stack.Screen name="SingleNote" component={SingleNoteView} />
     <Stack.Screen name="ChooseCategory" component={ChooseCategory} />
     <Stack.Screen name="CreateNote" component={CreateNote} />
   </Stack.Navigator>
 );
}

export default StackNavigator