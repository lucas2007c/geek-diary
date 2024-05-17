import { View, Text, StyleSheet, TextInput } from "react-native"
import H1 from '../components/ui/H1.js'
import { COLORS } from "../constants/constants"

const GameRegister = () => {
    return (
        <View style={styles.container}>
            <H1 style={styles.label}>Url da capa</H1>
            <TextInput
                placeholder="Insira sua url..."
                style={styles.txtinput}
            />

            <H1 style={styles.label}>Nome do jogo</H1>
            <TextInput
                placeholder="Insira o nome..."
                style={styles.txtinput}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    label: {
        fontSize: 20
    },
    txtinput: {
        backgroundColor: '#444'
    }
})

export default GameRegister