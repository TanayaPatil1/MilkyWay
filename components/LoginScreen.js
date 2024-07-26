import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native'
import { COLORS } from './color.js'
import React, { useState } from 'react';
import SignUpScreen from './SignUpScreen.js';
import { firebase  } from '../config.js';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
    const navigation = useNavigation();
    const [email, onChangeEmail] = useState("");
    const [password, onChangepass] = useState("");
    const [signUp, issignUp] = useState(false);
    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error.message)
        }

    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.text}>Welcome!!</Text>
                <Text style={styles.subtext}>Login to continue</Text>
                <TextInput
                    style={styles.inputfield}
                    value={email}
                    onChangeText={(email) => onChangeEmail(email)}
                    autoCorrect={false}
                    placeholder='Enter Email'></TextInput>
                <TextInput
                    style={styles.inputfield}
                    value={password}
                    onChangeText={(password) => onChangepass(password)}
                    placeholder='Password'
                    secureTextEntry={true} ></TextInput>
                <Pressable style={styles.btn} onPress={() => loginUser(email, password)}>
                    <Text style={styles.btntext}>Login</Text>
                </Pressable>

                <Pressable >
                    <Text style={styles.subtext}
                        onPress={() => navigation.navigate('SignUp')}>Don't have an account! Sign Up</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}
export default LoginScreen;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: COLORS.yellowpastel,
            justifyContent: 'center',
            alignContent: 'center'


        },
        view: {
            backgroundColor: COLORS.white,
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 10,
            margin: 10,
            paddingTop: 30,
            borderColor: COLORS.purple,
            borderWidth: 5,
            paddingBottom: 30,


        },
        text: {
            color: '#121212',
            marginTop: 0,
            textAlign: 'center',
            fontSize: 30
        },
        subtext: {
            color: '#121212',
            margin: 15,
            textAlign: 'center',
            fontSize: 15
        },
        inputfield: {
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            padding: 10,
            borderRadius: 20,
            backgroundColor: COLORS.lightpurple


        },
        btn: {
            borderRadius: 20,
            backgroundColor: COLORS.darkpurple,
            marginLeft: 80,
            marginRight: 80,
        },
        btntext: {

            fontSize: 20,
            color: COLORS.white,
            textAlign: 'center',
            padding: 10

        }
    }
)
