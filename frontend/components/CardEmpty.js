import { StyleSheet, Text, View } from "react-native"
import { COLORS } from "../constants/constants"
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CardEmpty = ({ text, type }) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name={type === 'game' ? "google-controller-off" : 'television-off'} size={50} color={COLORS.primary} style={{ textAlign: 'center' }} />
            <Text style={{ color: COLORS.font, textAlign: 'center', fontSize: 17 }}>{text}</Text>
        </View>
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
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    image: {
        flex: 1,
        borderRadius: 10,
    }
})

export default CardEmpty