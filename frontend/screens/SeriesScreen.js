import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../constants/constants"

const SeriesScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ color: '#fff' }}>Series</Text>
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

export default SeriesScreen