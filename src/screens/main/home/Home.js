import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {ImagePicker, Permissions} from 'expo';

export default class Main extends React.Component {
  constructor (props){
      super(props);

      this.state = {
        image: null,
        image64: null,
        hasCameraPermission: null,
        hasCameraRollPermission: null,
        responses: [],
        loading: false,
        error: false,
      };
  };
  
  static navigationOptions = {
    title: 'Table Scan', 
    headerTintColor: 'white',
    headerStyle:{
      backgroundColor: '#6ca2f7',
    },
    headerTitleStyle:{
      fontSize: 24,
    }
  };
  
  async componentWillMount() {
    this.takePermissionCamera();
    this.takePermissionCameraRoll();
  }

  async takePermissionCamera(){
    const {status}  = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async takePermissionCameraRoll(){
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({hasCameraRollPermission: status === 'granted'});
  }

  pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4,3],
    });

    if(!result.cancelled){
      this.setState({image: result.uri});
      this.setState({image64: result.base64});
    };
  };

  takeImage = async() => {
    let result = await ImagePicker.launchCameraAsync({
      base64 : true,
      allowsEditing: true,
      aspect: [4,3],
    });

    if(!result.cancelled){
      this.setState({image: result.uri});
      this.setState({image64: result.base64});
    };
  };

  handleReadNutritionalTable = () => {
    let { image64 } = this.state;

    if(image64){
      const { navigation } = this.props;
      navigation.navigate('NutritionalTable',{
        src: image64,
      });
    }
  };
  
  render() {
    let { image } = this.state;
    const { hasCameraPermission, hasCameraRollPermission } = this.state;
    if (hasCameraPermission === null || hasCameraRollPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false || hasCameraRollPermission === false) {
      return <Text>Sem acesso a câmera</Text>;
    } else {
      return (
        <View  style={styles.container}>
          <View style={styles.containerImage}>
            { 
              image && 
              <Image 
                style = {styles.image}
                source = {{uri: image}}/>
            }
          </View>
          <View style={styles.containerButton}>         
            <TouchableOpacity onPress={this.pickImage} style={styles.button}>
              <Text style={styles.buttonText}>Rool</Text>
            </TouchableOpacity>    

            <TouchableOpacity onPress={this.takeImage} style={styles.button}>
              <Text style={styles.buttonText}>Foto</Text>
            </TouchableOpacity>   

            <TouchableOpacity onPress={this.handleReadNutritionalTable} style={styles.button}>
              <Text style={styles.buttonText}>Ler Imagem</Text>
            </TouchableOpacity> 
          </View> 
       </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  containerImage:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  image: {
    width: 250,
    height: 250,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#aac4ed',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});