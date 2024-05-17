import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { COLORS } from "./constants/constants"

//Screens
import MainNavigator from './navigators/MainNavigator';
import SearchScreen from './screens/SearchScreen';


const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderColor: COLORS.primary,
          height: 60,
          padding: 5
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
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
