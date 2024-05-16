import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native"
import { useState, useEffect } from "react"
import H1 from "../components/ui/H1"
import axios from "axios"
import CardGame from "../components/CardGame"
import Button from "../components/ui/Button"

const GamesScreen = () => {
    const [games, setGames] = useState([])

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

    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <H1>Todos Os Jogos</H1>
                <Button title='Novo' style={{ marginRight: 50 }} />
            </View>
            <FlatList
                data={games}
                renderItem={({ item }) => <CardGame game={item} />}
                keyExtractor={item => item.id}
                horizontal={true}
            />

            <H1>Jogando</H1>
            <CardGame game={{ image: 'https://upload.wikimedia.org/wikipedia/pt/5/5d/Batman_Arkham_Knight_Capa.jpg?20140331090505' }} />

            <H1>Zerados</H1>
            <CardGame game={{ image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png' }} />

            <H1>Platinados</H1>
            <CardGame game={{ image: 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png' }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242A32',
        paddingTop: 15,
        paddingLeft: 20
    }
})

export default GamesScreen