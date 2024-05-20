import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../constants/constants.js'
import H1 from '../components/ui/H1.js'

const SavesScreen = () => {
    return (
        <View style={styles.container}>
            <H1>Saves</H1>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background
    }
})

export default SavesScreen