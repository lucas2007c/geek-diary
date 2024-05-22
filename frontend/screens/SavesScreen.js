import { View, Text, StyleSheet, TextInput, FlatList } from "react-native"
import { COLORS } from "../constants/constants"
import { useEffect, useState } from "react"
import CardGame from "../components/CardGame"
import CardSerie from '../components/CardSerie'
import CardEmpty from "../components/CardEmpty"
import useGameStore from '../stores/gameStore'
import useSerieStore from '../stores/serieStore'
import CardLoading from "../components/CardLoading"
import H1 from "../components/ui/H1"

const SavesScreen = () => {
    const games = useGameStore(state => state.games)
    const series = useSerieStore(state => state.series)
    const [gamesSaved, setGamesSaved] = useState([])
    const [seriesSaved, setSeriesSaved] = useState([])
    const [loading, setLoading] = useState(false)

    const search = async () => {
        try {
            setLoading(true)

            setGamesSaved(games?.filter(game => game.saved === true))
            setSeriesSaved(series?.filter(serie => serie.saved === true))

            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        search()
    }, [games, series])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <H1>Jogos ({gamesSaved?.length})</H1>
            </View>

            <View>
                {gamesSaved?.length > 0 ?
                    <FlatList
                        data={gamesSaved}
                        renderItem={({ item }) => <CardGame game={item} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                    : loading ?
                        <CardLoading />
                        :
                        <CardEmpty text='Nenhum jogo salvo' type='game' />
                }
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <H1>Séries ({seriesSaved?.length})</H1>
            </View>
            <View>
                {seriesSaved?.length > 0 ?
                    <FlatList
                        data={seriesSaved}
                        renderItem={({ item }) => <CardSerie serie={item} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                    : loading ?
                        <CardLoading />
                        :
                        <CardEmpty text='Nenhuma série salva' type='serie' />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 15
    },
    txtinput: {
        backgroundColor: '#00334E',
        color: COLORS.font,
        borderRadius: 3,
        padding: 5,
        fontSize: 25,
        marginTop: 15
    },
})

export default SavesScreen