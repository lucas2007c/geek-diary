import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native"
import H1 from '../../components/ui/H1.js'
import { COLORS } from "../../constants/constants.js"
import { useState } from "react"
import Button from "../../components/ui/Button.js"
import axios from "axios"
import { useNavigation } from "@react-navigation/native"
import useGameStore from "../../stores/gameStore.js"

const GameRegister = () => {
    const addGame = useGameStore(state => state.addGame)

    const [txtName, setTxtName] = useState('')
    const [txtUrl, setTxtUrl] = useState('')
    const [txtStart, setTxtStart] = useState('')
    const [txtStatus, setTxtStatus] = useState('')
    const [txtNotes, setTxtNotes] = useState('')

    const navigation = useNavigation()

    const postGame = async () => {
        const newGame = {
            name: txtName,
            image: txtUrl !== '' ? txtUrl : undefined,
            notes: txtNotes !== '' ? txtNotes : undefined,
            start: txtStart !== '' ? txtStart : undefined,
            status: txtStatus !== '' ? txtStatus : undefined,
            users_id: 1,
        }
        try {
            const response = await axios.post('http://localhost:3000/game', newGame)
            addGame(response.data.game)
            navigation.navigate('jogoslist')
        } catch (error) {
            let fieldsErros = ''
            if (error?.response?.data?.fields) {
                for (let field in error.response.data.fields) {
                    fieldsErros += field[0] + '\n'
                }
                fieldsErros = error?.response?.data?.fields?.image
            }

            alert(`${error.response.data.msg} \n` + fieldsErros);
            console.log(error.response.data);
        }
    }

    const dateFormat = (value) => {
        value = value.replace(/\D/g, ""); // Remove não númericos
        value = value.replace(/^(\d{2})(\d)/, "$1/$2"); // adiciona a barra depois do dia
        value = value.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // adiciona a barra depois do mês
        return value;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.field}>
                <H1 style={styles.label}>Nome do jogo</H1>
                <TextInput
                    placeholder="Nome..."
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtName}
                    onChangeText={setTxtName}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Url da capa</H1>
                <TextInput
                    placeholder="Insira sua url..."
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtUrl}
                    onChangeText={setTxtUrl}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Data de ínicio</H1>
                <TextInput
                    style={styles.txtinput}
                    value={txtStart}
                    onChangeText={(value) => setTxtStart(dateFormat(value))}
                    maxLength={10}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Status</H1>
                <TextInput
                    style={styles.txtinput}
                    value={txtStatus}
                    onChangeText={setTxtStatus}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Anotações {txtNotes.length}/1000</H1>
                <TextInput
                    style={[styles.txtinput, { height: 500, color: '#fff', fontSize: 20, AlignVertical: 'top' }]}
                    placeholder="Anote o que quiser..."
                    placeholderTextColor={COLORS.secondary}
                    multiline
                    value={txtNotes}
                    onChangeText={setTxtNotes}
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
        paddingHorizontal: 25
    },
    label: {
        fontSize: 20,
        marginBottom: 5
    },
    txtinput: {
        backgroundColor: '#00334E',
        color: '#fff',
        // height: 30,
        borderRadius: 3,
        padding: 5,
        fontSize: 17
    },
    field: {
        marginVertical: 10
    }
})

export default GameRegister