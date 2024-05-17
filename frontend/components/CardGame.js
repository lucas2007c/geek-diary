import { Pressable, StyleSheet, View } from "react-native"
import { Image } from 'expo-image'
import { COLORS } from "../constants/constants"
import { useNavigation } from "@react-navigation/native"

const CardGame = ({ game }) => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.navigate('jogoeditar', game)}>
            <View style={styles.container}>
                <Image source={game.image} style={styles.image} contentFit="cover" contentPosition='center' />
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
    },
    image: {
        flex: 1,
        borderRadius: 10,
    }
})

export default CardGame