import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { COLORS } from "../constants/constants"

import GameRegister from '../screens/game/GameRegister';
import GamesScreen from '../screens/game/GamesScreen';
import GameEdit from '../screens/game/GameEdit';

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
                headerTintColor: COLORS.font,
                headerTitleAlign: 'center',
                headerShadowVisible: false
            }} />

            <Stack.Screen name="jogoeditar" component={GameEdit} options={{
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
export default GameNavigator