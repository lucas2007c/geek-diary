import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../constants/constants"

const SearchScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ color: '#fff' }}>Search</Text>
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

export default SearchScreen