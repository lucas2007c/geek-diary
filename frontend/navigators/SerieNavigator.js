import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { COLORS } from "../constants/constants"

import SerieRegister from '../screens/serie/SerieRegister';
import SeriesScreen from '../screens/serie/SeriesScreen';
import SerieEdit from '../screens/serie/SerieEdit';

const SerieNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="serieslist" component={SeriesScreen} options={{
                headerShown: false
            }} />

            <Stack.Screen name="seriecadastro" component={SerieRegister} options={{
                headerTitle: 'Cadastrar',
                headerStyle: styles.mainTab,
                headerTitleStyle: styles.tabLabel,
                headerTintColor: COLORS.font,
                headerTitleAlign: 'center',
                headerShadowVisible: false
            }} />

            <Stack.Screen name="serieeditar" component={SerieEdit} options={{
                headerTitle: 'Editar',
                headerStyle: styles.mainTab,
                headerTitleStyle: styles.tabLabel,
                headerTintColor: COLORS.font,
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
        color: COLORS.font,
        fontSize: 17
    },
    back: {
        color: COLORS.font
    }
})
export default SerieNavigator