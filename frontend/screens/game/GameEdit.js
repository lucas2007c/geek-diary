import { View, TextInput, StyleSheet, ScrollView, Modal, Text, Pressable } from "react-native"
import { COLORS } from "../../constants/constants"
import { useNavigation, useRoute } from '@react-navigation/native';
import useGameStore from '../../stores/gameStore.js'
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


const GameEdit = () => {
    const updateGame = useGameStore(state => state.updateGame)
    const removeGame = useGameStore(state => state.removeGame)
    const userLogged = useUserLoggedStore(state => state)
    const navigation = useNavigation()
    const route = useRoute()
    const game = route.params


    const [txtName, setTxtName] = useState(game.name)
    const [txtUrl, setTxtUrl] = useState(!game.image ? '' : game.image)
    const [txtStart, setTxtStart] = useState(!game.start ? '' : game.start)
    const [txtFinish, setTxtFinish] = useState(!game.finish ? '' : game.finish)
    const [txtPlatinum, setTxtPlatinum] = useState(!game.platinum ? '' : game.platinum)
    const [txtStatus, setTxtStatus] = useState(!game.status ? '' : game.status)
    const [txtNotes, setTxtNotes] = useState(!game.notes ? '' : game.notes)
    const [Saved, setSaved] = useState(game?.saved)
    const [modalVisible, setModalVisible] = useState(false)

    const putGame = async () => {
        const newGame = {
            name: txtName,
            image: txtUrl,
            notes: txtNotes,
            start: txtStart ? txtStart : null,
            finish: txtFinish ? txtFinish : null,
            platinum: txtPlatinum ? txtPlatinum : null,
            status: txtStatus ? txtStatus : null,
            saved: Saved,
            users_id: userLogged.id,
        }

        try {
            const response = await axios.put(`${API_URL}/game/${game.id}/${game.users_id}`, newGame, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            updateGame(game.id, game.users_id, response.data.game)
            navigation.navigate('jogoslist')
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

    const deleteGame = async () => {
        try {
            const response = await axios.delete(`${API_URL}/game/${game.id}/${game.users_id}`, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            removeGame(game.id, game.users_id)
            navigation.navigate('jogoslist')
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
            const response = await axios.put(`${API_URL}/game/${game.id}/${game.users_id}`, { saved: !Saved }, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            updateGame(game.id, game.users_id, response.data.game)
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
            alert('Erro ao salvar jogo')
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
                <Image source={game.image} style={styles.gameImage} contentFit="contain" />
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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.field}>
                    <H1 style={styles.label}>Ínicio</H1>
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
                    <H1 style={styles.label}>Zerado</H1>
                    <TextInput
                        placeholder="dd/mm/yyyy"
                        placeholderTextColor={COLORS.secondary}
                        style={[styles.txtinput, { alignSelf: 'flex-start' }]}
                        value={txtFinish}
                        onChangeText={(value) => setTxtFinish(dateFormat(value))}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.field}>
                    <H1 style={styles.label}>Platinado</H1>
                    <TextInput
                        placeholder="dd/mm/yyyy"
                        placeholderTextColor={COLORS.secondary}
                        style={[styles.txtinput, { alignSelf: 'flex-start' }]}
                        value={txtPlatinum}
                        onChangeText={(value) => setTxtPlatinum(dateFormat(value))}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Status</H1>
                <RadioButtonGroup
                    selected={txtStatus}
                    onSelected={(value) => setTxtStatus(value)}
                    radioBackground={COLORS.primary}
                    radioStyle={{ borderColor: COLORS.secondary }}
                >
                    <RadioButtonItem value='Jogando' label={
                        <H1 style={styles.label}>Jogando</H1>
                    } />
                    <RadioButtonItem value='Zerado' style={{ marginVertical: 10 }} label={
                        <H1 style={styles.label}>Zerado</H1>
                    } />
                    <RadioButtonItem value='Platinado' label={
                        <H1 style={styles.label}>Platinado</H1>
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
                <Button title='Confirmar' onPress={putGame} />
            </View>

            <View style={styles.field}>
                <Button title='Excluir jogo' onPress={() => setModalVisible(true)} style={{ backgroundColor: '#f22' }} />
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
                        <H1 style={{ fontSize: 20 }}> Deseja excluir {txtName}?</H1>
                        <View style={{ flexDirection: 'row', marginTop: 25 }}>
                            <Button
                                title='Excluir'
                                onPress={deleteGame}
                                style={{ backgroundColor: '#f22', marginRight: 30 }} />

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

export default GameEdit