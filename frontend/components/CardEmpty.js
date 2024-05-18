import { Pressable, StyleSheet, Text, View } from "react-native"
import { Image } from 'expo-image'
import { COLORS } from "../constants/constants"
import { useNavigation } from "@react-navigation/native"

const cardEmpty = ({ game }) => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.navigate('jogoeditar', game)}>
            <View style={styles.container}>
                <Text style={{ color: '#fff' }}>{game.name}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 130,
        height: 180,
        margin: 15,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        borderRadius: 10,
    }
})

export default cardEmpty