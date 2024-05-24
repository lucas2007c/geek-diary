import { View, TextInput, StyleSheet, ScrollView, Modal, Text, Pressable } from "react-native"
import { COLORS } from "../../constants/constants"
import { useNavigation, useRoute } from '@react-navigation/native';
import useSerieStore from '../../stores/serieStore.js'
import { useState } from "react";
import H1 from '../../components/ui/H1.js'
import Button from '../../components/ui/Button.js'
import { Image } from 'expo-image'
import axios from "axios";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import useUserLoggedStore from "../../stores/userLoggedStore.js";
import { FontAwesome } from '@expo/vector-icons'
import { API_URL } from '../../constants/constants.js'
import AsyncStorage from "@react-native-async-storage/async-storage";


const SerieEdit = () => {
    const updateSerie = useSerieStore(state => state.updateSerie)
    const removeSerie = useSerieStore(state => state.removeSerie)
    const userLogged = useUserLoggedStore(state => state)
    const navigation = useNavigation()
    const route = useRoute()
    const serie = route.params

    const [txtName, setTxtName] = useState(serie.name)
    const [txtUrl, setTxtUrl] = useState(!serie.image ? '' : serie.image)
    const [txtStart, setTxtStart] = useState(!serie.start ? '' : serie.start)
    const [txtFinish, setTxtFinish] = useState(!serie.finish ? '' : serie.finish)
    const [txtLastEp, setTxtLastEp] = useState(!serie.last_ep ? '' : serie.last_ep)
    const [txtStatus, setTxtStatus] = useState(!serie.status ? '' : serie.status)
    const [txtNotes, setTxtNotes] = useState(!serie.notes ? '' : serie.notes)
    const [Saved, setSaved] = useState(serie?.saved)
    const [modalVisible, setModalVisible] = useState(false)

    const putSerie = async () => {
        const newSerie = {
            name: txtName,
            image: txtUrl,
            notes: txtNotes,
            start: txtStart ? txtStart : null,
            finish: txtFinish ? txtFinish : null,
            last_ep: txtLastEp,
            status: txtStatus ? txtStatus : null,
            saved: Saved,
            users_id: userLogged.id,
        }

        try {
            const response = await axios.put(`${API_URL}/serie/${serie.id}/${serie.users_id}`, newSerie, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            updateSerie(serie.id, serie.users_id, response.data.serie)
            navigation.navigate('serieslist')
        } catch (error) {
            if (error.response.status == 401) {
                try {
                    alert('Sessão expirada, Faça o login novamente')
                    setTimeout(() => {
                        handleLogout()
                    }, 1000);
                } catch (error) {
                    console.log(error)
                    alert('Erro ao fazer logout!')
                }
            }
            let fieldsErros = ''
            if (error?.response?.data?.fields) {
                for (let field in error.response.data.fields) {
                    fieldsErros += error.response.data.fields[field] + '\n'
                }
            }

            alert(`${error.response.data.msg} \n` + fieldsErros);
        }
    }

    const deleteSerie = async () => {
        try {
            const response = await axios.delete(`${API_URL}/serie/${serie.id}/${serie.users_id}`, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            removeSerie(serie.id, serie.users_id)
            navigation.navigate('serieslist')
        } catch (error) {
            if (error.response.status == 401) {
                try {
                    alert('Sessão expirada, Faça o login novamente')
                    setTimeout(() => {
                        handleLogout()
                    }, 1000);
                } catch (error) {
                    console.log(error)
                    alert('Erro ao fazer logout!')
                }
            }
            let fieldsErros = ''
            if (error?.response?.data?.fields) {
                for (let field in error.response.data.fields) {
                    fieldsErros += field[0] + '\n'
                }
                fieldsErros = error?.response?.data?.fields?.image
            }

            alert(`${error.response.data.msg} \n` + fieldsErros);
            console.log(error.response.data);
        }
    }

    const dateFormat = (value) => {
        value = value.replace(/\D/g, ""); // Remove não númericos
        value = value.replace(/^(\d{2})(\d)/, "$1/$2"); // adiciona a barra depois do dia
        value = value.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // adiciona a barra depois do mês
        return value;
    }

    const handleSaved = async () => {
        setSaved(!Saved)
        try {
            const response = await axios.put(`${API_URL}/serie/${serie.id}/${serie.users_id}`, { saved: !Saved }, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            updateSerie(serie.id, serie.users_id, response.data.serie)
        } catch (error) {
            if (error.response.status == 401) {
                try {
                    alert('Sessão expirada, Faça o login novamente')
                    setTimeout(() => {
                        handleLogout()
                    }, 1000);
                } catch (error) {
                    console.log(error)
                    alert('Erro ao fazer logout!')
                }
            }
            alert('Erro ao salvar série')
        }
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userLogged')
            userLogged.logout()
            navigation.pop()
            navigation.navigate('login')
        } catch (error) {
            console.log(error)
            alert('Erro ao fazer logout!')
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={handleSaved} style={{ alignSelf: 'flex-end' }}>
                <FontAwesome name={Saved ? 'bookmark' : 'bookmark-o'} size={35} color={COLORS.font} />
            </Pressable>

            <TextInput
                placeholder="Nome..."
                placeholderTextColor={COLORS.secondary}
                style={[styles.txtinput, styles.title]}
                value={txtName}
                onChangeText={setTxtName}
                maxLength={200}
            />

            <View style={styles.field}>
                <Image source={serie.image} style={styles.gameImage} contentFit="contain" />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Url da capa</H1>
                <TextInput
                    placeholder="http://image.url"
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtUrl}
                    onChangeText={setTxtUrl}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>ínicio</H1>
                <TextInput
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor={COLORS.secondary}
                    style={[styles.txtinput, { alignSelf: 'flex-start' }]}
                    value={txtStart}
                    onChangeText={(value) => setTxtStart(dateFormat(value))}
                    maxLength={10}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Finalizado</H1>
                <TextInput
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor={COLORS.secondary}
                    style={[styles.txtinput, { alignSelf: 'flex-start' }]}
                    value={txtFinish}
                    onChangeText={(value) => setTxtFinish(dateFormat(value))}
                    maxLength={10}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Ultimo ep</H1>
                <TextInput
                    placeholder="T2 E8 meu episódio"
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtLastEp}
                    onChangeText={setTxtLastEp}
                    maxLength={50}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Status</H1>
                <RadioButtonGroup
                    selected={txtStatus}
                    onSelected={(value) => setTxtStatus(value)}
                    radioBackground={COLORS.primary}
                    radioStyle={{ borderColor: COLORS.secondary }}
                >
                    <RadioButtonItem value='Assistindo' label={
                        <H1 style={styles.label}>Assistindo</H1>
                    } />
                    <RadioButtonItem value='Finalizado' style={{ marginVertical: 10 }} label={
                        <H1 style={styles.label}>Finalizado</H1>
                    } />
                    <RadioButtonItem value='Assistir_mais_tarde' label={
                        <H1 style={styles.label}>Assistir mais tarde</H1>
                    } />
                    <RadioButtonItem value='' style={{ marginVertical: 10 }} label={
                        <H1 style={styles.label}>Nenhum</H1>
                    } />
                </RadioButtonGroup>
            </View>

            <View style={[styles.field]}>
                <H1 style={styles.label}>Anotações {!txtNotes?.length ? 0 : txtNotes.length}/1000</H1>
                <TextInput
                    style={[styles.txtinput, { height: 500, color: COLORS.font, fontSize: 20, textAlignVertical: 'top' }]}
                    placeholder="Anote o que quiser..."
                    placeholderTextColor={COLORS.secondary}
                    multiline
                    value={txtNotes}
                    onChangeText={setTxtNotes}
                    maxLength={1000}
                />
            </View>

            <View style={styles.field}>
                <Button title='Confirmar' onPress={putSerie} />
            </View>

            <View style={styles.field}>
                <Button title='Excluir série' onPress={() => setModalVisible(true)} style={{ backgroundColor: '#f22' }} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <H1 style={{ fontSize: 20 }}> Deseja excluir {serie.name}?</H1>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Button
                                title='Excluir'
                                onPress={deleteSerie}
                                style={{ backgroundColor: '#f22', marginRight: 15, padding: 10 }} />

                            <Button
                                title='Cancelar'
                                onPress={() => setModalVisible(false)}
                                style={{ padding: 10 }} />
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        backgroundColor: COLORS.background
    },
    label: {
        fontSize: 20,
        marginBottom: 5
    },
    txtinput: {
        backgroundColor: '#00334E',
        color: COLORS.font,
        borderRadius: 3,
        padding: 5,
        fontSize: 17
    },
    field: {
        marginVertical: 10
    },
    gameImage: {
        width: '100%',
        height: 200
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

export default SerieEdit