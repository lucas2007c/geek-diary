import { Pressable, StyleSheet, Text, View } from "react-native"
import { Image } from 'expo-image'
import { COLORS } from "../constants/constants"
import { useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CardGame = ({ game }) => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.navigate('jogoeditar', game)}>
            <View style={styles.container}>
                {game.image ?
                    <Image source={game.image} style={styles.image} contentFit="cover" contentPosition='center' />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="google-controller" size={50} color={COLORS.primary} />
                        <Text style={{ color: '#fff', fontSize: 17, textAlign: 'center' }}>{game.name}</Text>
                    </View>
                }

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
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        borderRadius: 10,
    }
})

export default CardGame