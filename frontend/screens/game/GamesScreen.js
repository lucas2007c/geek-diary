import { View, StyleSheet, ScrollView, FlatList, Activityndicator, Modal } from "react-native"
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
import AsyncStorage from '@react-native-async-storage/async-storage'


const GamesScreen = () => {
    const { games, setGames } = useGameStore(state => state)
    const userLogged = useUserLoggedStore(state => state)
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()

    const getGames = async () => {
        try {
            const response = await axios.get(`${API_URL}/game/${userLogged.id}`, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            const data = response.data.games
            setGames(data);
            setLoading(false)
        } catch (error) {
            if (error.response.status == 401) {
                try {
                    setModalVisible(true)
                } catch (error) {
                    console.log(error)
                    alert('Erro ao fazer logout!')
                }
            }
            console.log(error.response);
        }
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userLogged')
            userLogged.logout()
            navigation.pop()
            navigation.navigate('splash')
        } catch (error) {
            console.log(error)
            alert('Erro ao fazer logout!')
        }
    }

    useEffect(() => {
        getGames()
    }, [])

    const jogando = games?.filter((game) => game.status === 'Jogando')
    const zerados = games?.filter((game) => game.status === 'Zerado')
    const platinados = games?.filter((game) => game.status === 'Platinado')

    // const imageUrl = 'https://i.pinimg.com/474x/5f/b1/a9/5fb1a9dde21b1eda765156ba76676814.jpg'

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
            <ImageBackground source={require('../serie/image.jpg')} style={{ paddingTop: 15, paddingLeft: 20, flex: 1 }} contentFit='fill'>
                <ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <H1>Todos Os Jogos ({games?.length})</H1>
                        <Button title='Novo' style={{ marginRight: 50 }} onPress={() => navigation.navigate('jogocadastro')} />
                    </View>

                    {games?.length > 0 ?
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

                    <H1>Jogando ({jogando?.length})</H1>
                    {jogando?.length > 0 ?
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

                    <H1>Zerados ({zerados?.length})</H1>
                    {zerados?.length > 0 ?
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

                    <H1>Platinados ({platinados?.length})</H1>
                    {platinados?.length > 0 ?
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

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false),
                                handleLogout()
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalContainer}>
                                <H1 style={{ fontSize: 20 }}>Sessão expirada, Faça o login novamente</H1>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Button
                                        title='Fechar'
                                        onPress={() => {
                                            setModalVisible(false)
                                            handleLogout()
                                        }}
                                        style={{ padding: 10 }} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.background,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderColor: COLORS.primary,
        borderWidth: 1
    }
})

export default GamesScreen