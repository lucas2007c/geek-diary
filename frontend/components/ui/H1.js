import { Text, StyleSheet } from "react-native"
import { COLORS } from "../../constants/constants"

const H1 = ({ children, style }) => {
    return (
        <Text style={[styles.title, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        color: COLORS.font,
        fontSize: 25
    }
})

export default H1