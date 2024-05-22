import { View, StyleSheet, ScrollView, FlatList, Activityndicator } from "react-native"
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
import CardLoading from "../../components/CardLoading"
import useUserLoggedStore from "../../stores/userLoggedStore"
import { API_URL } from '../../constants/constants.js'


const GamesScreen = () => {
    const { games, setGames } = useGameStore(state => state)
    const userLoggedID = useUserLoggedStore(state => state.id)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()

    const getGames = async () => {
        try {
            const response = await axios.get(`${API_URL}/game/${userLoggedID}`)
            const data = response.data.games
            setGames(data);
            setLoading(false)
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

                    {games.length > 0 ?
                        <FlatList
                            data={games}
                            renderItem={({ item }) => <CardGame game={item} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                        : loading ?
                            <CardLoading />
                            :
                            <CardEmpty text='Nenhum jogo cadastrado' type='game' />
                    }

                    <H1>Jogando ({jogando.length})</H1>
                    {jogando.length > 0 ?
                        <FlatList
                            data={jogando}
                            renderItem={({ item }) => <CardGame game={item} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                        : loading ?
                            <CardLoading />
                            :
                            <CardEmpty text='Nenhum jogo sendo jogado' type='game' />
                    }

                    <H1>Zerados ({zerados.length})</H1>
                    {zerados.length > 0 ?
                        <FlatList
                            data={zerados}
                            renderItem={({ item }) => <CardGame game={item} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                        : loading ?
                            <CardLoading />
                            :
                            <CardEmpty text='Nenhum jogo zerado' type='game' />
                    }

                    <H1>Platinados ({platinados.length})</H1>
                    {platinados.length > 0 ?
                        <FlatList
                            data={platinados}
                            renderItem={({ item }) => <CardGame game={item} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                        : loading ?
                            <CardLoading />
                            :
                            <CardEmpty text='Nenhum jogo platinado' type='game' />
                    }
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