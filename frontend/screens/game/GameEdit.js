import { View, TextInput, StyleSheet, ScrollView } from "react-native"
import { COLORS } from "../../constants/constants"
import { useNavigation, useRoute } from '@react-navigation/native';
import useGameStore from '../../stores/gameStore.js'
import { useState } from "react";
import H1 from '../../components/ui/H1.js'
import Button from '../../components/ui/Button.js'
import { Image } from 'expo-image'
import axios from "axios";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const GameEdit = () => {
    const updateGame = useGameStore(state => state.updateGame)
    const removeGame = useGameStore(state => state.removeGame)
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

    const putGame = async () => {
        const newGame = {
            name: txtName,
            image: txtUrl,
            notes: txtNotes,
            start: txtStart ? txtStart : null,
            finish: txtFinish ? txtFinish : null,
            platinum: txtPlatinum ? txtPlatinum : null,
            status: txtStatus ? txtStatus : null,
            users_id: 1,
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

    return (
        <ScrollView style={styles.container}>

            <TextInput
                placeholder="Nome..."
                placeholderTextColor={COLORS.secondary}
                style={[styles.txtinput, styles.title]}
                value={txtName}
                onChangeText={setTxtName}
            />

            <View style={styles.field}>
                <Image source={game.image} style={styles.gameImage} contentFit="contain" />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Url da capa</H1>
                <TextInput
                    placeholder="Insira sua url..."
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtUrl}
                    onChangeText={setTxtUrl}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>ínicio</H1>
                <TextInput
                    style={styles.txtinput}
                    value={txtStart}
                    onChangeText={setTxtStart}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Zerado</H1>
                <TextInput
                    style={styles.txtinput}
                    value={txtFinish}
                    onChangeText={setTxtFinish}
                />
            </View>

            <View style={styles.field}>
                <H1 style={styles.label}>Platinado</H1>
                <TextInput
                    style={styles.txtinput}
                    value={txtPlatinum}
                    onChangeText={setTxtPlatinum}
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
                    style={[styles.txtinput, { height: 500, color: '#fff', fontSize: 20, AlignVertical: 'top' }]}
                    placeholder="Anote o que quiser..."
                    placeholderTextColor={COLORS.secondary}
                    multiline
                    value={txtNotes}
                    onChangeText={setTxtNotes}
                />
            </View>

            <View style={styles.field}>
                <Button title='Confirmar' onPress={putGame} />
            </View>

            <View style={styles.field}>
                <Button title='Excluir jogo' onPress={deleteGame} style={{ backgroundColor: '#f33' }} />
            </View>
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
        backgroundColor: COLORS.background
    },
    label: {
        fontSize: 20,
        marginBottom: 5
    },
    txtinput: {
        backgroundColor: '#00334E',
        color: '#fff',
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
    }
})

export default GameEdit