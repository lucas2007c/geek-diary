import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GamesScreen from '../screens/GamesScreen';
import SeriesScreen from '../screens/SeriesScreen'



const Tab = createMaterialTopTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="jogos" component={GamesScreen} options={{
                tabBarLabel: 'Jogos',
                tabBarStyle: {
                    backgroundColor: '#242A32',
                    paddingTop: 15
                },
                tabBarLabelStyle: {
                    color: '#fff'
                }
            }} />
            <Tab.Screen name="series" component={SeriesScreen} options={{
                tabBarLabel: 'Séries',
                tabBarLabelStyle: {
                    color: '#fff'
                }
            }} />
        </Tab.Navigator>
    );
}

export default MainNavigator