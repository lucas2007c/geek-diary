import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../../constants/constants"
import { useNavigation, useRoute } from '@react-navigation/native';

const GameEdit = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const game = route.params
    return (
        <View style={styles.container}>
            <Text style={{ color: '#fff' }}>{game.name}</Text>
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

export default GameEdit