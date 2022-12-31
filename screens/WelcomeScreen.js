/**
 * Code written by Jason You
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text,Button, StyleSheet, Image} from 'react-native';

function WelcomeScreen({navigation}) {
    return(
         <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.title}>
                <Text style={styles.titleText}>Weather App</Text>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>
                    Welcome to the Weather App! This application was developed using React Native and utilizes the Open Weather API for real time weather data.
                </Text>
                <Image style={styles.image} source={require("../assets/sunny.jpg")} />
            </View>
            <View style={styles.button}>
                <Button title="Continue" color="#6699CC" onPress={() => navigation.navigate('Weather App')}/>
            </View>
            <View style={styles.disclaimer}>
                <Text style={styles.disclaimerText}>*Disclaimer: This app was created solely for learning purposes</Text>
            </View>
            <View style={styles.author}>
                <Text style={styles.authorText}>Created by Jason You</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300,
        margin: 5
      },
    title: {
        margin: 10,
        alignItems: 'center'
    },
    titleText: {
        padding: 10,
        alignItems: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    description: {
        padding: 20,
        alignItems: 'center',
        alignContent: 'center'
    },
    descriptionText: {
        fontSize: 20,
        letterSpacing: 1,
        lineHeight: 30,
        fontFamily: 'Roboto'
    },
    button: {
        alignSelf: 'stretch',
        alignContent: 'center',
        margin: 10
    },
    disclaimer: {
        margin: 5,
        alignContent: 'center'
    },
    disclaimerText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    author: {
        margin: 5,
        alignContent: 'center'
    },
    authorText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    }
});

export default WelcomeScreen;