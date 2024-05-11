import { View, Text, StyleSheet } from "react-native"

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
        backgroundColor: '#242A32',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SeriesScreen