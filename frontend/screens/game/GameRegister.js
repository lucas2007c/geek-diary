import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native"
import H1 from '../../components/ui/H1.js'
import { COLORS } from "../../constants/constants.js"
import { useState } from "react"
import Button from "../../components/ui/Button.js"
import axios from "axios"
import { useNavigation } from "@react-navigation/native"
import useGameStore from "../../stores/gameStore.js"
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import useUserLoggedStore from "../../stores/userLoggedStore.js"
import { FontAwesome } from "@expo/vector-icons"
import { API_URL } from '../../constants/constants.js'
import AsyncStorage from "@react-native-async-storage/async-storage"


const GameRegister = () => {
    const addGame = useGameStore(state => state.addGame)
    const userLogged = useUserLoggedStore(state => state)

    const [txtName, setTxtName] = useState('')
    const [txtUrl, setTxtUrl] = useState('')
    const [txtStart, setTxtStart] = useState('')
    const [txtFinish, setTxtFinish] = useState('')
    const [txtPlatinum, setTxtPlatinum] = useState('')
    const [txtStatus, setTxtStatus] = useState('')
    const [Saved, setSaved] = useState(false)
    const [txtNotes, setTxtNotes] = useState('')

    const navigation = useNavigation()

    const postGame = async () => {
        const newGame = {
            name: txtName,
            image: txtUrl !== '' ? txtUrl : undefined,
            notes: txtNotes !== '' ? txtNotes : undefined,
            start: txtStart !== '' ? txtStart : undefined,
            finish: txtFinish !== '' ? txtFinish : undefined,
            platinum: txtPlatinum !== '' ? txtPlatinum : undefined,
            status: txtStatus !== '' ? txtStatus : undefined,
            saved: Saved,
            users_id: userLogged.id,
        }

        try {
            const response = await axios.post(`${API_URL}/game`, newGame, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            addGame(response.data.game)
            navigation.navigate('jogoslist')
        } catch (error) {
            if (error.response.status == 401) {
                try {
                    alert('Sessão expirada, Faça o login novamente')
                    return setTimeout(() => {
                        handleLogout()
                    }, 1000);
                } catch (error) {
                    console.log(error)
                    return alert('Erro ao fazer logout!')
                }
            }
            let fieldsErros = ''
            if (error?.response?.data?.fields) {
                for (let field in error.response.data.fields) {
                    fieldsErros += error.response.data.fields[field] + '\n'
                }
            }

            alert(`${error.response.data.msg} \n` + fieldsErros);
        }
    }

    const dateFormat = (value) => {
        value = value.replace(/\D/g, ""); // Remove não númericos
        value = value.replace(/^(\d{2})(\d)/, "$1/$2"); // adiciona a barra depois do dia
        value = value.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // adiciona a barra depois do mês
        return value;
    }

    const handleSaved = () => {
        setSaved(Saved ? false : true)
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userLogged')
            userLogged.logout()
            navigation.pop()
            navigation.navigate('splash')
        } catch (error) {
            console.log(error)
            alert('Erro ao fazer logout!')
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={handleSaved}>
                <FontAwesome name={Saved ? 'bookmark' : 'bookmark-o'} size={35} color={COLORS.font} style={{ textAlign: 'right' }} />
            </Pressable>
            <View style={styles.field}>
                <H1 style={styles.label}>Nome do jogo <Text style={styles.span}>- Único campo obrigatório</Text> </H1>
                <TextInput
                    placeholder="Nome..."
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtName}
                    onChangeText={setTxtName}
                    maxLength={200}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Url da capa</H1>
                <TextInput
                    placeholder="http://image.url"
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtUrl}
                    onChangeText={setTxtUrl}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.field}>
                    <H1 style={styles.label}>Ínicio</H1>
                    <TextInput
                        placeholder="dd/mm/yyyy"
                        placeholderTextColor={COLORS.secondary}
                        style={[styles.txtinput, { alignSelf: 'flex-start' }]}
                        value={txtStart}
                        onChangeText={(value) => setTxtStart(dateFormat(value))}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.field}>
                    <H1 style={styles.label}>Zerado</H1>
                    <TextInput
                        placeholder="dd/mm/yyyy"
                        placeholderTextColor={COLORS.secondary}
                        style={[styles.txtinput, { alignSelf: 'flex-start' }]}
                        value={txtFinish}
                        onChangeText={(value) => setTxtFinish(dateFormat(value))}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.field}>
                    <H1 style={styles.label}>Platinado</H1>
                    <TextInput
                        placeholder="dd/mm/yyyy"
                        placeholderTextColor={COLORS.secondary}
                        style={[styles.txtinput, { alignSelf: 'flex-start' }]}
                        value={txtPlatinum}
                        onChangeText={(value) => setTxtPlatinum(dateFormat(value))}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Status</H1>
                <RadioButtonGroup
                    selected={txtStatus}
                    onSelected={(value) => setTxtStatus(value)}
                    radioBackground={COLORS.primary}
                    radioStyle={{ borderColor: COLORS.secondary }}
                >
                    <RadioButtonItem value='Jogando' label={
                        <H1 style={styles.label}>Jogando</H1>
                    } />
                    <RadioButtonItem value='Zerado' style={{ marginVertical: 10 }} label={
                        <H1 style={styles.label}>Zerado</H1>
                    } />
                    <RadioButtonItem value='Platinado' label={
                        <H1 style={styles.label}>Platinado</H1>
                    } />
                    <RadioButtonItem value='' style={{ marginVertical: 10 }} label={
                        <H1 style={styles.label}>Nenhum</H1>
                    } />
                </RadioButtonGroup>
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Anotações {txtNotes.length}/1000</H1>
                <TextInput
                    style={[styles.txtinput, { height: 500, color: COLORS.font, fontSize: 20, textAlignVertical: 'top' }]}
                    placeholder="Anote o que quiser..."
                    placeholderTextColor={COLORS.secondary}
                    multiline
                    value={txtNotes}
                    onChangeText={setTxtNotes}
                    maxLength={1000}
                />
            </View>

            <View style={styles.field}>
                <Button title='Cadastrar' onPress={postGame} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20
    },
    label: {
        fontSize: 20,
        marginBottom: 5
    },
    txtinput: {
        backgroundColor: '#00334E',
        color: COLORS.font,
        borderRadius: 3,
        padding: 5,
        fontSize: 17
    },
    field: {
        marginVertical: 10
    },
    span: {
        fontSize: 14,
        color: COLORS.primary
    }
})

export default GameRegister