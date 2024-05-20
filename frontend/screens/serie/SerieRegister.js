import { View, TextInput, StyleSheet, ScrollView, Modal, Text } from "react-native"
import { COLORS } from "../../constants/constants"
import { useNavigation, useRoute } from '@react-navigation/native';
import useSerieStore from '../../stores/serieStore.js'
import { useState } from "react";
import H1 from '../../components/ui/H1.js'
import Button from '../../components/ui/Button.js'
import { Image } from 'expo-image'
import axios from "axios";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const SerieRegister = () => {
    const addSerie = useSerieStore(state => state.addSerie)
    const navigation = useNavigation()
    const route = useRoute()
    const serie = route.params


    const [txtName, setTxtName] = useState('')
    const [txtUrl, setTxtUrl] = useState('')
    const [txtStart, setTxtStart] = useState('')
    const [txtFinish, setTxtFinish] = useState('')
    const [txtLastEp, setTxtLastEp] = useState('')
    const [txtStatus, setTxtStatus] = useState('')
    const [txtNotes, setTxtNotes] = useState('')

    const postSerie = async () => {
        const newSerie = {
            name: txtName,
            image: txtUrl,
            notes: txtNotes,
            start: txtStart ? txtStart : null,
            finish: txtFinish ? txtFinish : null,
            last_ep: txtLastEp,
            status: txtStatus ? txtStatus : null,
            users_id: 1,
        }

        try {
            const response = await axios.post(`http://localhost:3000/serie`, newSerie)
            addSerie(response.data.serie)
            navigation.navigate('serieslist')
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

    const dateFormat = (value) => {
        value = value.replace(/\D/g, ""); // Remove não númericos
        value = value.replace(/^(\d{2})(\d)/, "$1/$2"); // adiciona a barra depois do dia
        value = value.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // adiciona a barra depois do mês
        return value;
    }

    return (
        <ScrollView style={styles.container}>

            <TextInput
                placeholder="Nome..."
                placeholderTextColor={COLORS.secondary}
                style={[styles.txtinput, styles.title]}
                value={txtName}
                onChangeText={setTxtName}
                maxLength={200}
            />

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
                <H1 style={styles.label}>Finalizado</H1>
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
                    style={[styles.txtinput, { height: 500, color: '#fff', fontSize: 20, AlignVertical: 'top' }]}
                    placeholder="Anote o que quiser..."
                    placeholderTextColor={COLORS.secondary}
                    multiline
                    value={txtNotes}
                    onChangeText={setTxtNotes}
                    maxLength={1000}
                />
            </View>

            <View style={styles.field}>
                <Button title='Cadastrar' onPress={postSerie} />
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

export default SerieRegister