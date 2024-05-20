import { View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from "react-native"
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

const SerieScreen = () => {
    const { series, setSeries } = useSerieStore(state => state)
    const userLoggedID = useUserLoggedStore(state => state.id)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()

    const getSerie = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/serie/${userLoggedID}`)
            const data = response.data.series
            setSeries(data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSerie()
    }, [])

    const assistindo = series.filter((serie) => serie.status === 'Assistindo')
    const finalizados = series.filter((serie) => serie.status === 'Finalizado')
    const seeLater = series.filter((serie) => serie.status === 'Assistir_mais_tarde')

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
            <ImageBackground source={require('./image.jpg')} style={{ paddingTop: 15, paddingLeft: 20, flex: 1 }} contentFit='fill'>
                <ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <H1>Todas as séries ({series.length})</H1>
                        <Button title='Novo' style={{ marginRight: 50 }} onPress={() => navigation.navigate('seriecadastro')} />
                    </View>

                    {series.length > 0 ?
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

                    <H1>Assistindo ({assistindo.length})</H1>
                    {assistindo.length > 0 ?
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

                    <H1>Finalizadas ({finalizados.length})</H1>
                    {finalizados.length > 0 ?
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

                    <H1>Assistir mais tarde ({seeLater.length})</H1>
                    {seeLater.length > 0 ?
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

export default SerieScreen