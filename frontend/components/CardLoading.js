import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { COLORS } from "../constants/constants"

const CardLoading = ({ text }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={50} color={COLORS.primary} />
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

export default CardLoading