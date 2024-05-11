import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GamesScreen from '../screens/GamesScreen';
import SeriesScreen from '../screens/SeriesScreen'
import { StyleSheet } from 'react-native';



const Tab = createMaterialTopTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarIndicatorStyle: {
                backgroundColor: '#0296E5'
            },
            tabBarActiveTintColor: '#0296E5',
            tabBarInactiveTintColor: '#fff'
        }}>
            <Tab.Screen name="jogos" component={GamesScreen} options={{
                tabBarLabel: 'Jogos',
                tabBarStyle: styles.mainTab,
                tabBarLabelStyle: styles.tabLabel
            }} />
            <Tab.Screen name="series" component={SeriesScreen} options={{
                tabBarLabel: 'Séries',
                tabBarStyle: styles.mainTab,
                tabBarLabelStyle: styles.tabLabel
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    mainTab: {
        backgroundColor: '#242A32',
        paddingTop: 40,
    },
    tabLabel: {
        textTransform: 'none',
        fontSize: 17
    }
})

export default MainNavigator