import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import MainNavigator from './navigators/MainNavigator';


const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='home' component={MainNavigator} options={{
          headerShown: false
        }} />
      </Tab.Navigator>
      <StatusBar style='light' />
    </NavigationContainer>
  );
}
