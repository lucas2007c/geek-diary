import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { COLORS } from "./constants/constants"

//Screens
import MainNavigator from './navigators/MainNavigator';
import SearchScreen from './screens/SearchScreen';
import Splash from './screens/Splash';
import LoginScreen from './screens/LoginScreen'
import LogoutScreen from './screens/LogoutScreen';
import SavesScreen from './screens/SavesScreen';


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  return (
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

      <Tab.Screen name='saves' component={SavesScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Feather name="bookmark" size={27} color={color} />
        ),
        title: 'Saves'
      }} />

      <Tab.Screen name='logout' component={LogoutScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Feather name="user-x" size={27} color={color} />
        ),
        title: 'Logout'
      }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: COLORS.background } }}>
        <Stack.Screen name='splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='app' component={AppNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style='light' />
    </NavigationContainer >
  );
}
