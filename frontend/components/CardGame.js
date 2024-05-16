import { StyleSheet, View } from "react-native"
import { Image } from 'expo-image'

const CardGame = ({ game }) => {
    return (
        <View style={styles.container}>
            <Image source={game.image} style={styles.image} contentFit="cover" contentPosition='center' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 130,
        height: 180,
        margin: 15,
        // borderColor: '#0296E5',
        // borderWidth: 1,
        // borderRadius: 10,
    },
    image: {
        flex: 1,
        borderRadius: 10,
    }
})

export default CardGame