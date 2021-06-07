import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Dimensions, StyleSheet,ToastAndroid } from 'react-native';
import firebaseConfig from "../Firebase/firebase";





const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const register =async(email,pass)=>{
        await firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email,pass)
        .then((user)=>{
            console.log('dang ki thanh cong');
            ToastAndroid.show("thanh cong",ToastAndroid.SHORT);
            return true;
        })
        .catch((error)=>{
            const{code,message}=error;
            console.log('loi:'+message);
            ToastAndroid.show('dang ky that bai',ToastAndroid.SHORT);
            return false
        })
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register Facebook</Text>
            <TextInput style={styles.input}
                value={email}
                placeholder="email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                value={pass}
                placeholder="pass"
                onChangeText={(text) => setPass(text)}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => register(email,pass)}>
                <Text style={styles.buttontext}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbutton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navbuttontext}>Go to login</Text>
            </TouchableOpacity>
        </View>
    );
};
export default Register;
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    },
    navbutton: {
        marginTop: 15
    },
    navbuttontext: {
        fontSize: 24,
        color: '#6646ee'
    },
    input: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    buttonContainer: {
        marginTop: 10,
        backgroundColor: '#6495ed',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttontext: {
        fontSize: 28,
        color: '#ffffff'
    }
});