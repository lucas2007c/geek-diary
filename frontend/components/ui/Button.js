import { Pressable, View, Text, StyleSheet } from "react-native"

const Button = ({ title, onPress, style }) => {
    return (
        <Pressable style={styles.tHButton} onPress={onPress}>
            <View style={[styles.customButton, style]}>
                <Text style={styles.textButton}>{title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    customButton: {
        backgroundColor: '#0296E5',
        borderRadius: 7,
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    tHButton: {
        borderRadius: 7,
    },
    textButton: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'center'
    }
})

export default Button