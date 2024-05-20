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

const SearchScreen = () => {
    const games = useGameStore(state => state.games)
    const series = useSerieStore(state => state.series)
    const [txtSearch, setTxtSearch] = useState('')
    const [gamesFound, setGamesFound] = useState([])
    const [seriesFound, setSeriesFound] = useState([])
    const [loading, setLoading] = useState(false)

    const search = async () => {
        try {
            setLoading(true)
            if (txtSearch === '') {
                setGamesFound([])
                setSeriesFound([])
                return setLoading(false)
            }

            setGamesFound(games?.filter(game => game.name.toLowerCase().includes(txtSearch.toLowerCase())))
            setSeriesFound(series?.filter(serie => serie.name.toLowerCase().includes(txtSearch.toLowerCase())))
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        search()
    }, [txtSearch])

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Pesquisar"
                placeholderTextColor={COLORS.secondary}
                style={styles.txtinput}
                maxLength={200}
                value={txtSearch}
                onChangeText={setTxtSearch}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <H1>Jogos ({gamesFound?.length})</H1>
            </View>

            <View>
                {gamesFound?.length > 0 ?
                    <FlatList
                        data={gamesFound}
                        renderItem={({ item }) => <CardGame game={item} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                    : loading ?
                        <CardLoading />
                        :
                        <CardEmpty text='Nenhum jogo Encontrado' type='game' />
                }
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <H1>Séries ({seriesFound?.length})</H1>
            </View>
            <View>
                {seriesFound?.length > 0 ?
                    <FlatList
                        data={seriesFound}
                        renderItem={({ item }) => <CardSerie serie={item} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                    : loading ?
                        <CardLoading />
                        :
                        <CardEmpty text='Nenhuma série Encontrada' type='serie' />
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

export default SearchScreen