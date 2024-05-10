import { View, Text, StyleSheet } from "react-native"

const SeriesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Series</Text>
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

export default SeriesScreen