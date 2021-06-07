import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Dimensions, StyleSheet } from 'react-native';

const Test = () => {
    console.log("Test");
    return (
        <View style={styles.container}>
            <Text>aslkdjaksdj</Text>
        </View>
    )
};
export default Test;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue"
    }
});