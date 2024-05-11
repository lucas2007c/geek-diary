import { View, Text, StyleSheet } from "react-native"

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
        backgroundColor: '#242A32',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SearchScreen