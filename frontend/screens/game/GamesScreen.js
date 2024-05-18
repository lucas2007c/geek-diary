import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native"
import { useState, useEffect } from "react"
import H1 from "../../components/ui/H1"
import axios from "axios"
import CardGame from "../../components/CardGame"
import CardEmpty from "../../components/CardEmpty"
import Button from "../../components/ui/Button"
import { useNavigation } from "@react-navigation/native"
import { ImageBackground } from "expo-image"
import { COLORS } from "../../constants/constants"
import useGameStore from "../../stores/gameStore"

const GamesScreen = () => {
    const { games, setGames } = useGameStore(state => state)
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

    const imageUrl = 'https://e0.pxfuel.com/wallpapers/872/403/desktop-wallpaper-black-and-blue-gaming-black-and-blue-gaming-background-on-bat-mobile-gamer.jpg'

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
            <ImageBackground source={imageUrl} style={{ paddingTop: 15, paddingLeft: 20, flex: 1 }} contentFit='fill'>
                <ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <H1>Todos Os Jogos ({games.length})</H1>
                        <Button title='Novo' style={{ marginRight: 50 }} onPress={() => navigation.navigate('jogocadastro')} />
                    </View>
                    <FlatList
                        data={games}
                        renderItem={({ item }) => item.image ? <CardGame game={item} /> : <CardEmpty game={item} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />

                    <H1>Jogando ({jogando.length})</H1>
                    <FlatList
                        data={jogando}
                        renderItem={({ item }) => <CardGame game={item} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />

                    <H1>Zerados ({zerados.length})</H1>
                    <FlatList
                        data={zerados}
                        renderItem={({ item }) => <CardGame game={item} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />

                    <H1>Platinados ({platinados.length})</H1>
                    <FlatList
                        data={platinados}
                        renderItem={({ item }) => <CardGame game={item} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.background,
    }
})

export default GamesScreen