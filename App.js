import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import MainStack from './src/screens/main/index';
import RestrictionsStack from './src/screens/restrictions/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MainTabs = createBottomTabNavigator({
  Main: MainStack,
  Restrictions: RestrictionsStack,
},{
  initialRouteName: 'Main',
  navigationOptions:({navigation})=>({
    headerTitleStyle:{
      fontWeight: 'bold',
    },
  }),
});

export default class App extends React.Component {
  state = {
    favorites: new Map(),
  };

  render() {
    return (
      <MainTabs
        screenProps={{
          state: this.state
        }}
      />
    );
  }
};

