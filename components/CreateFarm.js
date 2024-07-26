import { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView, Pressable, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { firebase } from '../config';
import { COLORS } from './color';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'
export default function CreateFarm() {
    const [name, setName] = useState("")
    const [ownerName, setOwnerName] = useState("")
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
    useEffect(() => {
        firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setName(snapshot.data())
                } else {
                    console.log('user does not exist')
                }
            })
    }, [])

upload = async () =>{
        try {
            const userId = firebase.auth().currentUser.uid;
            await firebase.firestore().collection('users').doc(userId).set({
                ownerName,
                address,
                phone,
                imageUri
            }, { merge: true });
            alert('Data saved successfully!');
        } catch (error) {
            console.error("Error saving data: ", error);
            alert('Failed to save data.');
        }
    }
    return (
        <KeyboardAvoidingView>


            <ScrollView>
                <Text style={styles.text}>
                    Hello, {name.firstName}
                </Text>
                <Text style={styles.subtext}> Complete your Profile.Create your Dairy Farm now</Text>
                <View>
                    <TouchableOpacity onPress={pickImage} style={{ padding: 10, backgroundColor: 'blue', margin: 10 }}>
                        <Text style={{ color: 'white' }}>Pick an Image</Text>
                    </TouchableOpacity>
                    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}



                    <TextInput
                        style={styles.inputfield}
                        placeholder="Owner Name"
                        value={ownerName}
                        onChangeText={setOwnerName}
                    />
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
                     <Pressable style={styles.btn}
                    onPress={upload}>
                    <Text style={styles.btntext}>Upload</Text>
                </Pressable>
                </View>
                <Pressable style={styles.btn}
                    onPress={() => firebase.auth().signOut()}>
                    <Text style={styles.btntext}>Logout</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}


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
        }
    }
)
