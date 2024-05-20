import { Pressable, StyleSheet, Text, View } from "react-native"
import { Image } from 'expo-image'
import { COLORS } from "../constants/constants"
import { useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CardGame = ({ serie }) => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.navigate('serieeditar', serie)}>
            <View style={styles.container}>
                {serie.image ?
                    <Image source={serie.image} style={styles.image} contentFit="cover" contentPosition='center' />
                    :
                    <View style={styles.noImage}>
                        <MaterialCommunityIcons name="television" size={50} color={COLORS.primary} />
                        <Text style={{ color: '#fff', fontSize: 17, textAlign: 'center' }}>{serie.name}</Text>
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
    },
    noImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)"
    }
})

export default CardGame