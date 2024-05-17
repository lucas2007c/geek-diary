import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SeriesScreen from '../screens/SeriesScreen'
import { StyleSheet } from 'react-native';
import GameNavigator from './GameNavigator';
import { COLORS } from "../constants/constants"



const Tab = createMaterialTopTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarIndicatorStyle: {
                backgroundColor: COLORS.primary
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: '#fff'
        }}>
            <Tab.Screen name="jogos" component={GameNavigator} options={{
                tabBarLabel: 'Jogos',
                tabBarStyle: styles.mainTab,
                tabBarLabelStyle: styles.tabLabel
            }} />
            {/* <Tab.Screen name="series" component={SeriesScreen} options={{
                tabBarLabel: 'Séries',
                tabBarStyle: styles.mainTab,
                tabBarLabelStyle: styles.tabLabel
            }} /> */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    mainTab: {
        backgroundColor: COLORS.background,
        paddingTop: 40,
    },
    tabLabel: {
        textTransform: 'none',
        fontSize: 17
    }
})

export default MainNavigator