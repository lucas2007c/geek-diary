import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native"
import H1 from '../components/ui/H1.js'
import { COLORS } from "../constants/constants"
import { useState } from "react"

const GameRegister = () => {
    const [txtName, setTxtName] = useState('')
    const [txtUrl, setTxtUrl] = useState('')
    const [txtStart, setTxtStart] = useState('')
    const [txtStatus, setTxtStatus] = useState('')
    const [txtNotes, setTxtNotes] = useState('')

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
                    onChangeText={setTxtStart}
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
                    style={[styles.txtinput, { height: 500, color: '#fff', fontSize: 20 }]}
                    placeholder="Anote o que quiser..."
                    placeholderTextColor={COLORS.secondary}
                    multiline
                    value={txtNotes}
                    onChangeText={setTxtNotes}
                />
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