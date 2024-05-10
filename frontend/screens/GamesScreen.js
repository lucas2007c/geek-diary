import { View, Text, StyleSheet } from "react-native"
import H1 from "../components/H1"

const GamesScreen = () => {
    return (
        <View style={styles.container}>
            <H1>Todos Os Jogos</H1>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242A32',
        padding: 10
    }
})

export default GamesScreen