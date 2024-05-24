import { View, TextInput, StyleSheet, ScrollView, Text, Pressable } from "react-native"
import { COLORS } from "../../constants/constants"
import { useNavigation } from '@react-navigation/native';
import useSerieStore from '../../stores/serieStore.js'
import { useState } from "react";
import H1 from '../../components/ui/H1.js'
import Button from '../../components/ui/Button.js'
import axios from "axios";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import useUserLoggedStore from "../../stores/userLoggedStore.js";
import { FontAwesome } from "@expo/vector-icons"
import { API_URL } from '../../constants/constants.js'
import AsyncStorage from "@react-native-async-storage/async-storage";


const SerieRegister = () => {
    const addSerie = useSerieStore(state => state.addSerie)
    const userLogged = useUserLoggedStore(state => state)
    const navigation = useNavigation()

    const [txtName, setTxtName] = useState('')
    const [txtUrl, setTxtUrl] = useState('')
    const [txtStart, setTxtStart] = useState('')
    const [txtFinish, setTxtFinish] = useState('')
    const [txtLastEp, setTxtLastEp] = useState('')
    const [txtStatus, setTxtStatus] = useState('')
    const [Saved, setSaved] = useState(false)
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
            saved: Saved,
            users_id: userLogged.id,
        }

        try {
            const response = await axios.post(`${API_URL}/serie`, newSerie, {
                headers: {
                    Authorization: `Bearer ${userLogged.token}`
                }
            })
            addSerie(response.data.serie)
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

    const dateFormat = (value) => {
        value = value.replace(/\D/g, ""); // Remove não númericos
        value = value.replace(/^(\d{2})(\d)/, "$1/$2"); // adiciona a barra depois do dia
        value = value.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // adiciona a barra depois do mês
        return value;
    }

    const handleSaved = () => {
        setSaved(Saved ? false : true)
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

    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={handleSaved}>
                <FontAwesome name={Saved ? 'bookmark' : 'bookmark-o'} size={35} color={COLORS.font} style={{ textAlign: 'right' }} />
            </Pressable>
            <View style={styles.field}>
                <H1 style={styles.label}>Nome da série <Text style={styles.span}>- Único campo obrigatório</Text></H1>
                <TextInput
                    placeholder="Nome..."
                    placeholderTextColor={COLORS.secondary}
                    style={styles.txtinput}
                    value={txtName}
                    onChangeText={setTxtName}
                    maxLength={200}
                />
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
                <Button title='Cadastrar' onPress={postSerie} />
            </View>
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
    span: {
        fontSize: 14,
        color: COLORS.primary
    }
})

export default SerieRegister