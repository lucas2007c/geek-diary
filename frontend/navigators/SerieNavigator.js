import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { COLORS } from "../constants/constants"

import SerieRegister from '../screens/serie/SerieRegister';
import SeriesScreen from '../screens/serie/SeriesScreen';
import SerieEdit from '../screens/serie/SerieEdit';

const GameNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="serieslist" component={SeriesScreen} options={{
                headerShown: false
            }} />

            <Stack.Screen name="seriecadastro" component={SerieRegister} options={{
                headerTitle: 'Cadastrar',
                headerStyle: styles.mainTab,
                headerTitleStyle: styles.tabLabel,
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerShadowVisible: false
            }} />

            <Stack.Screen name="serieeditar" component={SerieEdit} options={{
                headerTitle: 'Editar',
                headerStyle: styles.mainTab,
                headerTitleStyle: styles.tabLabel,
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerShadowVisible: false
            }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    mainTab: {
        backgroundColor: COLORS.background,
    },
    tabLabel: {
        color: '#fff',
        fontSize: 17
    },
    back: {
        color: '#fff'
    }
})
export default GameNavigator