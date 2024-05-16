import { Text, StyleSheet } from "react-native"

const H1 = ({ children, style }) => {
    return (
        <Text style={[styles.title, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 25
    }
})

export default H1