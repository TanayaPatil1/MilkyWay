import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, ScrollView,  Image } from 'react-native'
import { COLORS } from './color.js'
import React, { useState } from 'react';

import { firebase } from '../config.js';
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'

function LoginScreen() {
    const navigation = useNavigation();
    const [email, onChangeEmail] = useState("");
    const [password, onChangepass] = useState("");
    const [firstName,setfirstName] =useState("")
    const [lastName,setlastName] = useState("")
    const [confirmPassword, onChangeconfirmpass] = useState("")
    //const [name, setName] = useState("")
    const [dairyName, setdairyName] = useState("")
    const [address, setAddress] = useState("")
    const [imageUri, setImageUri] = useState(null);
    const [phone, setPhone] = useState("")
    const pickImage = async () => {
        // Request media library permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need media library permissions to make this work!');
            return;
        }

        // Launch the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };
    signUpUser = async (firstName, lastName,dairyName,email, password, confirmPassword,address,imageUri,phone) => {
        if (!(password == confirmPassword)) {
            alert('password not matching')
        } else {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                    .set({
                        firstName,
                        lastName,
                        dairyName,
                        email,
                        address,
                        imageUri,
                        phone
                    },{ merge: true })
                    alert('Data saved successfully!');
            } catch (error) {
                console.error("Error saving data: ", error);
                alert('Failed to save data.');
            }
        }

    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
            <View style={styles.view}>
                <Text style={styles.text}>Welcome!!</Text>
                <Text style={styles.subtext}>Create Your Account</Text>
                <TextInput
                    style={styles.inputfield}
                    value={firstName}
                    onChangeText={(firstName) => setfirstName(firstName)}
                    autoCorrect={false}
                    placeholder='First Name'></TextInput>
                    <TextInput
                    style={styles.inputfield}
                    value={lastName}
                    onChangeText={(lastName) => setlastName(lastName)}
                    autoCorrect={false}
                    placeholder='Last Name'></TextInput>
                     <TextInput
                    style={styles.inputfield}
                    value={dairyName}
                    onChangeText={(dairyName) => setdairyName(dairyName)}
                    autoCorrect={false}
                    placeholder='Dairy Name'></TextInput>
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
                <TextInput
                    style={styles.inputfield}
                    value={confirmPassword}
                    onChangeText={(confirmPassword) => onChangeconfirmpass(confirmPassword)}
                    placeholder='Confirm Password'
                    secureTextEntry={true} ></TextInput>
                    <View>
                    <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
                        <Text style={{ color: 'white' }}>Pick an Image</Text>
                    </TouchableOpacity>
                    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

                    <TextInput
                        style={styles.inputfield}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={styles.inputfield}
                        placeholder="Contact No."
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType='phone-pad'
                    />
                     
                </View>
                <Pressable style={styles.btn} onPress={() => signUpUser(firstName,lastName,dairyName,email, password, confirmPassword,address,imageUri,phone)}>
                    <Text style={styles.btntext}>Sign Up</Text>
                </Pressable>

                <Pressable >
                    <Text style={styles.subtext}
                        onPress={() => navigation.navigate('Login')}>Already have an account! Sign In</Text>
                </Pressable>
            </View>
            </ScrollView>
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

        },
        image: {
            width: 200,
            height: 200,
            borderRadius: 100, // Half of the width/height to make it circular
            overflow: 'hidden',
            margin: 10,
            alignSelf: 'center'
        },
        pickImage:{
            padding: 10, backgroundColor: 'blue', margin: 10 ,
            borderRadius: 20,
            backgroundColor: COLORS.gray,
            marginLeft: 80,
            marginRight: 80
        }
    }
)
