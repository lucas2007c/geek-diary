import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native"
import { useState, useEffect } from "react"
import H1 from "../components/ui/H1"
import axios from "axios"
import CardGame from "../components/CardGame"
import Button from "../components/ui/Button"
import { useNavigation } from "@react-navigation/native"
import { ImageBackground } from "expo-image"
import { COLORS } from "../constants/constants"

const GamesScreen = () => {
    const [games, setGames] = useState([])
    const navigation = useNavigation()

    const getGames = async () => {
        try {
            const response = await axios.get('http://localhost:3000/game')
            const data = response.data.games
            setGames(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGames()
    }, [])

    const jogando = games.filter((game) => game.status === 'Jogando')
    const zerados = games.filter((game) => game.status === 'Zerado')
    const platinados = games.filter((game) => game.status === 'Platinado')

    return (
        <ScrollView style={styles.container}>
            <ImageBackground source='https://img.freepik.com/premium-vector/modern-dark-abstract-background-with-red-light_55870-87.jpg' style={{ paddingTop: 15, paddingLeft: 20 }} contentFit='fill'>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <H1>Todos Os Jogos</H1>
                    <Button title='Novo' style={{ marginRight: 50 }} onPress={() => navigation.navigate('jogocadastro')} />
                </View>
                <FlatList
                    data={games}
                    renderItem={({ item }) => <CardGame game={item} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />

                <H1>Jogando</H1>
                <FlatList
                    data={jogando}
                    renderItem={({ item }) => <CardGame game={item} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />

                <H1>Zerados</H1>
                <FlatList
                    data={zerados}
                    renderItem={({ item }) => <CardGame game={item} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />

                <H1>Platinados</H1>
                <FlatList
                    data={platinados}
                    renderItem={({ item }) => <CardGame game={item} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.background,
    }
})

export default GamesScreen