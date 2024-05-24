import { View, StyleSheet, ScrollView, FlatList, ActivityIndicator, Modal } from "react-native"
import { useState, useEffect } from "react"
import H1 from "../../components/ui/H1"
import axios from "axios"
import CardSerie from "../../components/CardSerie"
import CardEmpty from "../../components/CardEmpty"
import Button from "../../components/ui/Button"
import { useNavigation } from "@react-navigation/native"
import { ImageBackground } from "expo-image"
import { COLORS } from "../../constants/constants"
import useSerieStore from "../../stores/serieStore"
import CardLoading from "../../components/CardLoading"
import useUserLoggedStore from "../../stores/userLoggedStore"
import { API_URL } from '../../constants/constants.js'
import AsyncStorage from "@react-native-async-storage/async-storage"


const SerieScreen = () => {
    const { series, setSeries } = useSerieStore(state => state)
    const userLogged = useUserLoggedStore(state => state)
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()

    const getSerie = async () => {
        try {
            const response = await axios.get(`${API_URL}/serie/${userLogged.id}`, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            const data = response.data.series
            setSeries(data);
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
        getSerie()
    }, [])

    const assistindo = series?.filter((serie) => serie.status === 'Assistindo')
    const finalizados = series?.filter((serie) => serie.status === 'Finalizado')
    const seeLater = series?.filter((serie) => serie.status === 'Assistir_mais_tarde')

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
            <ImageBackground source={require('./image.jpg')} style={{ paddingTop: 15, paddingLeft: 20, flex: 1 }} contentFit='fill'>
                <ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <H1>Todas As Séries ({series?.length})</H1>
                        <Button title='Nova' style={{ marginRight: 50 }} onPress={() => navigation.navigate('seriecadastro')} />
                    </View>

                    {series?.length > 0 ?
                        <FlatList
                            data={series}
                            renderItem={({ item }) => <CardSerie serie={item} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                        : loading ?
                            <CardLoading />
                            :
                            <CardEmpty text='Nenhuma série cadastrada' type='serie' />
                    }

                    <H1>Assistindo ({assistindo?.length})</H1>
                    {assistindo?.length > 0 ?
                        <FlatList
                            data={assistindo}
                            renderItem={({ item }) => <CardSerie serie={item} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                        : loading ?
                            <CardLoading />
                            :
                            <CardEmpty text='Nenhuma série sendo assistida' type='serie' />
                    }

                    <H1>Finalizadas ({finalizados?.length})</H1>
                    {finalizados?.length > 0 ?
                        <FlatList
                            data={finalizados}
                            renderItem={({ item }) => <CardSerie serie={item} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                        : loading ?
                            <CardLoading />
                            :
                            <CardEmpty text='Nenhuma série finalizada' type='serie' />
                    }

                    <H1>Assistir mais tarde ({seeLater?.length})</H1>
                    {seeLater?.length > 0 ?
                        <FlatList
                            data={seeLater}
                            renderItem={({ item }) => <CardSerie serie={item} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                        : loading ?
                            <CardLoading />
                            :
                            <CardEmpty text='Nenhuma série para assistir' type='serie' />
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

export default SerieScreen