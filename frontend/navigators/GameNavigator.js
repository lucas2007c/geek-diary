import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { COLORS } from "../constants/constants"

import GameRegister from '../screens/GameRegister';
import GamesScreen from '../screens/GamesScreen';

const GameNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="jogoslist" component={GamesScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="jogocadastro" component={GameRegister} options={{
                headerTitle: 'Cadastrar',
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
        paddingTop: 40,
        textAlign: 'center',
    },
    tabLabel: {
        color: '#fff',
        fontSize: 17,
    },
    back: {
        color: '#fff'
    }
})
export default GameNavigator