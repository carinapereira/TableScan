
import React from 'react';
import {StyleSheet, View, Text, Switch, TouchableOpacity} from 'react-native';
import { AsyncStorage } from 'react-native';

export default class Restrictions extends React.Component {
  constructor(){
    super();
    this.state = {
      schSalt: false,
      schFatSat: false,
      schSugar: false,
      schFatTra: false,
      schCarb: false,      
    }
  }

  static navigationOptions = {
    title: 'Restrições', 
    headerTintColor: 'white',
    headerStyle:{
      backgroundColor: '#6ca2f7',
    },
    headerTitleStyle:{
      fontSize: 24,
    }
  };

  componentDidMount(){
    this.getSaveRestrictions();
  }

  getSaveRestrictions = async () => {
    try {
      const valSchSalt = await AsyncStorage.getItem('schSalt');
      this.setState({schSalt: valSchSalt === 'true' ? true: false});
 
      const valSchFatSat = await AsyncStorage.getItem('schFatSat');
      this.setState({schFatSat: valSchFatSat === 'true' ? true: false});
 
      const valSchSugar = await AsyncStorage.getItem('schSugar');
      this.setState({schSugar: valSchSugar === 'true' ? true: false});
 
      const valSchFatTra = await AsyncStorage.getItem('schFatTra');
      this.setState({schFatTra: valSchFatTra === 'true' ? true: false});
   
      const valSchCarb = await AsyncStorage.getItem('schCarb');
      this.setState({schCarb: valSchCarb === 'true' ? true: false});
 
    } catch(error){

    }
  }

  saveRestrictions = async () => {
    try{
      let { schSalt, schFatSat, schSugar, schFatTra, schCarb} = this.state;

      await AsyncStorage.setItem('schSalt', schSalt ? 'true' : 'false');
      await AsyncStorage.setItem('schFatSat', schFatSat ? 'true' : 'false');
      await AsyncStorage.setItem('schSugar', schSugar ? 'true' : 'false');
      await AsyncStorage.setItem('schFatTra', schFatTra ? 'true' : 'false');
      await AsyncStorage.setItem('schCarb', schCarb ? 'true' : 'false');
    }catch(error){

    }
  };

  onChangeRestriction(field, value) {
    this.setState({ 
      [field]: value
    });
  }
  
  render() {
    return (
      <View style = { styles.container }>
        <View style = { styles.containerSwitch }>
          <View style = { styles.line }> 
            <Text style = { styles.label }>Carboidratos</Text>
            <Switch 
              style = { styles.content }
              value = { this.state.schCarb }
              onValueChange={value => this.onChangeRestriction('schCarb', value)}
              />
          </View>
          <View style = { styles.line }>
            <Text style = { styles.label }>Gordura Saturadas</Text>
            <Switch
              style = { styles.content } 
              value = { this.state.schFatSat }
              onValueChange={value => this.onChangeRestriction('schFatSat', value)}
              />
          </View>
          <View style = { styles.line }> 
            <Text style = { styles.label }>Gordura Trans</Text>
            <Switch 
              style = { styles.content }
              value = { this.state.schFatTra }
              onValueChange={value => this.onChangeRestriction('schFatTra', value)}
              />
          </View>
          <View style = { styles.line }> 
            <Text style = { styles.label }>Sal</Text>
            <Switch 
              style = { styles.content }
              value = { this.state.schSalt }
              onValueChange={value => this.onChangeRestriction('schSalt', value)}
              />
          </View>
          <View style = { styles.line }>
            <Text style = { styles.label }>Açúcar</Text>
            <Switch 
              style = { styles.content } 
              value = { this.state.schSugar }
              onValueChange={value => this.onChangeRestriction('schSugar', value)}
              />
          </View>
          
        </View>
        <TouchableOpacity onPress={this.saveRestrictions} style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },  
  containerSwitch:{
    marginLeft: 15,
    marginTop: 15,
  },
  line: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  label: {
    flex: 3,
    fontSize: 18,
  },
  content:{
    flex: 1,
  },
  button:{
    alignItems: 'center',
    padding: 10,
    marginTop : 40,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#aac4ed',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});
