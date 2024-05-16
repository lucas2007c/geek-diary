import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

//Screens
import MainNavigator from './navigators/MainNavigator';
import SearchScreen from './screens/SearchScreen';


const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          backgroundColor: '#242A32',
          borderColor: '#0296E5',
          height: 60,
          padding: 5
        },
        tabBarActiveTintColor: '#0296E5',
        tabBarInactiveTintColor: '#67686D',
        tabBarLabelStyle: {
          fontSize: 15
        }
      }}>

        <Tab.Screen name='home' component={MainNavigator} options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={27} color={color} />
          ),
          title: 'Home'
        }} />

        <Tab.Screen name='search' component={SearchScreen} options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={27} color={color} />
          ),
          title: 'Search'
        }} />
      </Tab.Navigator>
      <StatusBar style='light' />
    </NavigationContainer>
  );
}
