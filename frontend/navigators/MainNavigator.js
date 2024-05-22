import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import GameNavigator from './GameNavigator';
import SerieNavigator from './SerieNavigator'
import { COLORS } from "../constants/constants"



const Tab = createMaterialTopTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarIndicatorStyle: {
                backgroundColor: COLORS.primary
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.secondary,
            swipeEnabled: false
        }}>
            <Tab.Screen name="jogos" component={GameNavigator} options={{
                tabBarLabel: 'Jogos',
                tabBarStyle: styles.mainTab,
                tabBarLabelStyle: styles.tabLabel
            }} />

            <Tab.Screen name="series" component={SerieNavigator} options={{
                tabBarLabel: 'Séries',
                tabBarStyle: styles.mainTab,
                tabBarLabelStyle: styles.tabLabel
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    mainTab: {
        backgroundColor: COLORS.background,
    },
    tabLabel: {
        textTransform: 'none',
        fontSize: 17
    }
})

export default MainNavigator