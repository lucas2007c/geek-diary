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

const GameEdit = () => {
    const updateGame = useGameStore(state => state.updateGame)
    const removeGame = useGameStore(state => state.removeGame)
    const userLoggedID = useUserLoggedStore(state => state.id)
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
            users_id: userLoggedID,
        }

        try {
            const response = await axios.put(`http://localhost:3000/game/${game.id}/${game.users_id}`, newGame)
            updateGame(game.id, game.users_id, response.data.game)
            navigation.navigate('jogoslist')
        } catch (error) {
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
            const response = await axios.delete(`http://localhost:3000/game/${game.id}/${game.users_id}`)
            removeGame(game.id, game.users_id)
            navigation.navigate('jogoslist')
        } catch (error) {
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

    const handleSaved = () => {
        setSaved(Saved ? false : true)
    }

    return (
        <ScrollView style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    placeholder="Nome..."
                    placeholderTextColor={COLORS.secondary}
                    style={[styles.txtinput, styles.title]}
                    value={txtName}
                    onChangeText={setTxtName}
                    maxLength={200}
                />

                <Pressable onPress={handleSaved}>
                    <FontAwesome name={Saved ? 'bookmark' : 'bookmark-o'} size={30} color={COLORS.font} />
                </Pressable>
            </View>

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

            <View style={styles.field}>
                <H1 style={styles.label}>ínicio</H1>
                <TextInput
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtStart}
                    onChangeText={(value) => setTxtStart(dateFormat(value))}
                    maxLength={10}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Zerado</H1>
                <TextInput
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtFinish}
                    onChangeText={(value) => setTxtFinish(dateFormat(value))}
                    maxLength={10}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Platinado</H1>
                <TextInput
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtPlatinum}
                    onChangeText={(value) => setTxtPlatinum(dateFormat(value))}
                    maxLength={10}
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
                    style={[styles.txtinput, { height: 500, color: COLORS.font, fontSize: 20, AlignVertical: 'top' }]}
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
                        <H1 style={{ fontSize: 20 }}> Deseja excluir este jogo?</H1>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Button
                                title='Excluir'
                                onPress={deleteGame}
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
        paddingHorizontal: 25
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        backgroundColor: COLORS.background,
        marginRight: 10
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
        backgroundColor: COLORS.secondary,
    }
})

export default GameEdit