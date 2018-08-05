import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './home/Home';
import NutritionalTable from './nutritionalTable/NutritionalTable'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MainStack = createStackNavigator({
  Home,
  NutritionalTable,
},{
  initialRouteName: 'Home',
  navigationOptions:{
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

MainStack.navigationOptions = {
  title: 'Imagem',
  tabBarIcon: ({ tintColor }) => 
    <MaterialIcons name = "image" size ={25} color = {tintColor}/>,
};


export default MainStack;