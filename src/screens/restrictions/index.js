import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './home/Home';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RestrictionsStack = createStackNavigator({
  Home,
},{
  initialRouteName: 'Home',
  navigationOptions:{
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

RestrictionsStack.navigationOptions = {
  title: 'Restrições',
  tabBarIcon: ({ tintColor }) => 
    <MaterialIcons name = "warning" size ={25} color = {tintColor}/>,
};

export default RestrictionsStack;

