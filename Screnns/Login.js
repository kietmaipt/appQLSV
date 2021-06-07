import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, StyleSheet,ToastAndroid } from 'react-native';
import firebaseConfig from "../Firebase/firebase";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    
const loginFB = async (email,pass)=>{
    await firebaseConfig
    .auth()
    .signInWithEmailAndPassword(email,pass)
    .then((user)=>{
        ToastAndroid.show("thanh cong",ToastAndroid.SHORT);
        navigation.navigate('Product');
        return true;
    })
    .catch((error)=>{
        const{code,message}=error;
        console.log('loi'+message);
        ToastAndroid.show("that bai",ToastAndroid.SHORT);
        return false;
    })
};
    // const checkLogin = (email, pass) => {
    //     if (email == "admin@gmail.com" && pass == "admin") {
    //         navigation.navigate('Product');
    //         ToastAndroid.show('dah nhap thanh cong', ToastAndroid.SHORT);
    //     } else {
    //         ToastAndroid.show('danh nhap that bai', ToastAndroid.SHORT);
    //     }
    // };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <TextInput style={styles.input}
                value={email}
                placeholder="email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                value={pass}
                placeholder="passWord"
                onChangeText={(text) => setPass(text)}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => loginFB(email, pass)}>
                <Text style={styles.buttontext}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbutton} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.navbuttontext}>new user? Join here</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
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