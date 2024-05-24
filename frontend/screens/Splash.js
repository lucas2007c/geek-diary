import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useEffect } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useUserLoggedStore from '../stores/userLoggedStore.js'
import { API_URL, COLORS } from '../constants/constants.js'
import H1 from '../components/ui/H1.js'

const Splash = () => {

    const navigation = useNavigation()
    const login = useUserLoggedStore(state => state.login)

    useFocusEffect(() => {
        const checkUserLogged = async () => {
            try {
                const response = await fetch(`${API_URL}`)
                const data = await response.json()
                if (data.ready) {
                    console.log('servidor pronto');
                }
            } catch (error) {
                console.log(error);
            }

            try {
                dataFound = await AsyncStorage.getItem('userLogged')
                if (dataFound) {
                    const data = JSON.parse(dataFound)
                    const { token } = data
                    const user = data
                    delete user.token
                    login(user, token)
                    navigation.navigate('app')
                } else {
                    navigation.navigate('login')
                }
            } catch (error) {
                console.log('Erro ao ler dado')
            }
        }
        checkUserLogged()
    })

    return (
        <View style={styles.container}>
            <H1 style={{ marginBottom: 15 }}>Por favor, aguarde</H1>
            <ActivityIndicator size='large' color={COLORS.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Splash