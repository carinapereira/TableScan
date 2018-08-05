import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//Stateles component - functional

const Header = props => (
    <View style = { styles.container }>
        <Text style = { styles.title }>{props.title}</Text> 
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6ca2f7',
        alignItems: 'center',
        marginTop: 25,
        padding: 5,

    },
    title: {
        fontSize: 35,
        color: '#fff',
    }
});

export default Header;