import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../constants/constants"
import Button from '../components/ui/Button.js'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useUserLoggedStore from '../stores/userLoggedStore.js'


const LogoutScreen = () => {
    const navigation = useNavigation()
    const logout = useUserLoggedStore(state => state.logout)

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userLogged')
            logout()
            navigation.pop()
            navigation.navigate('splash')
        } catch (error) {
            console.log(error)
            alert('Erro ao fazer logout!')
        }
    }
    return (
        <View style={styles.container}>
            <Button title='Logout' onPress={handleLogout} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LogoutScreen