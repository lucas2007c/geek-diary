import { View, Text, StyleSheet, TextInput, Modal } from 'react-native'
import Button from '../components/ui/Button'
import { useNavigation } from '@react-navigation/native'
import H1 from '../components/ui/H1.js'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useUserLoggedStore from '../stores/userLoggedStore.js'
import { COLORS } from '../constants/constants.js'
import axios from 'axios'
import { API_URL } from '../constants/constants.js'


const Login = () => {
    const [txtEmail, setTxtEmail] = useState('')
    const [txtPass, setTxtPass] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()
    const login = useUserLoggedStore(state => state.login)


    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: txtEmail, pass: txtPass })
            })

            if (response?.ok) {
                const data = await response.json()
                try {
                    await AsyncStorage.setItem('userLogged', JSON.stringify({ ...data.user, token: data.token }))
                    login(data.user, data.token)
                    setTxtEmail('')
                    setTxtPass('')
                    navigation.navigate('app')
                } catch (error) {
                    console.log(error)
                    alert('Erro ao gravar dados de login no dispositivo!')
                }
            } else {
                const data = await response.json()
                let fieldsErros = ''
                if (data?.fields) {
                    for (let field in data.fields) {
                        fieldsErros += data.fields[field] + '\n'
                    }
                }

                alert(`${data.msg} \n` + fieldsErros);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const postUser = async () => {
        const newUser = {
            email: txtEmail,
            pass: txtPass
        }

        try {
            await axios.post(`${API_URL}/user`, newUser)
            setModalVisible(true)
        } catch (error) {
            let fieldsErros = ''
            if (error?.response?.data?.fields) {
                for (let field in error.response.data.fields) {
                    fieldsErros += error.response.data.fields[field] + '\n'
                }
            }

            alert(`${error.response.data.msg} \n` + fieldsErros);
        }
    }
    return (
        <View style={styles.container}>
            <H1>Entrar</H1>

            <TextInput
                style={styles.input}
                placeholder='Email...'
                placeholderTextColor={COLORS.secondary}
                onChangeText={setTxtEmail}
                value={txtEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha...'
                placeholderTextColor={COLORS.secondary}
                onChangeText={setTxtPass}
                value={txtPass}
                secureTextEntry={true}
            />

            <Button
                title="Login"
                onPress={handleLogin}
            />

            <H1>Primeira vez por aqui?</H1>

            <Button
                title="Cadastre-se"
                onPress={postUser}
                style={{ marginTop: 10 }}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <H1 style={{ fontSize: 20 }}> Cadastro concluido com sucesso</H1>
                        <Button
                            title='Fechar'
                            onPress={() => setModalVisible(false)}
                            style={{ padding: 10 }} />
                    </View>
                </View>
            </Modal >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    input: {
        backgroundColor: '#00334E',
        color: COLORS.font,
        borderRadius: 3,
        padding: 5,
        fontSize: 17,
        marginVertical: 10
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
    },
    modalContainer: {
        marginTop: 30,
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
    }
})

export default Login