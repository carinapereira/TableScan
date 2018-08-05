import React from 'react';
import {StyleSheet, View, ActivityIndicator, ScrollView, Alert} from 'react-native';
import { AsyncStorage } from 'react-native';
import config from '../../config';
import Svg,{ Rect, Text } from 'react-native-svg';

export default class NutritionalTable extends React.Component{

    constructor(props){
        super(props);

        const {navigation} = props;

        const image64 = navigation.state.params.src;

        this.state = {
            loading: false,
            imageBase64: image64,
            imageData: [],
            schSalt: false,
            schFatSat: false,
            schSugar: false,
            schFatTra: false,
            schCarb: false,
        };
    }

    static navigationOptions = {
        title: 'Informação Nutricional', 
        headerTintColor: 'white',
        headerStyle:{
          backgroundColor: '#6ca2f7',
        },
        headerTitleStyle:{
          fontSize: 18,
        }
    };

    componentDidMount(){
        const {imageBase64} = this.state;
        this.fetchImageText(imageBase64);
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
            console.log('erro getrestriction ' + error);
        }
    }
    
    fetchImageText = async (imageBase64) => {

        this.setState({
            loading: true
        });
            
        const myBody = {
          requests: [
            {
              image: {
                content: imageBase64
              },
              features: [
                {
                  type: "TEXT_DETECTION"
                }
              ]
            }
          ]      
        };
    
        const myInit = {
          method: 'POST',     
          body: JSON.stringify(myBody)
        };
                
        const res = await fetch(config.googleCloud.api + config.googleCloud.apiKey, myInit); 
        const { responses } = await res.json();
        
        const textAnnotations = responses[0].textAnnotations;        

        this.setState({
            loading: false,
            imageData: textAnnotations
        });
    
        return responses;
    };

    sortRestriction(arr){
        return  arr.sort(sortFunction)
        function sortFunction(a, b) {
            a = a.verticeX
            b = b.verticeX
            return (a === b) ? 0 : (a < b) ? -1 : 1
        }
    }
       
    getRestriction(allTextsSvg, restriction){
        let trans = allTextsSvg.find((x) => x.desc.toLowerCase() === restriction)
        let text = '';
        if(trans){
            let vlVertY = trans.verticeY;
            text = allTextsSvg.filter((x) => x.verticeY >= (vlVertY - 5) && x.verticeY <= (vlVertY + 5)) ;
            let textOrd =  this.sortRestriction(text);
            text = '';
            textOrd.forEach((item) => {
                text += item.desc + ' ';
            });
        } 
             
        return text;
    };

    getRestrictionAlert(allTextsSvg){
        let { schSalt, schFatSat, schSugar, schFatTra, schCarb } = this.state;
        let msg = '';
  
        schSalt ? msg += this.getRestriction(allTextsSvg, 'sódio') + '\n': '';
        schFatSat ? msg += this.getRestriction(allTextsSvg, 'saturadas')  + '\n' : '';
        schSugar ? msg += this.getRestriction(allTextsSvg, 'energético')  + '\n': '';
        schFatTra ? msg += this.getRestriction(allTextsSvg, 'trans')  + '\n': '';
        schCarb ? msg += this.getRestriction(allTextsSvg, 'carboidratos')  + '\n': '';

        msg.length > 0 ? Alert.alert('Restrições', msg, [{text: 'OK'},], { cancelable: false }) : null
    };

    renderPage(){
        if(this.state.loading) {
            return <ActivityIndicator size="large" color = "#6ca2f7" />
        };

        const textAnnotations = this.state.imageData;
        let widthTable = 0;
        let heightTable = 0;
        let verticeX = 0;
        let verticeY = 0;
        let row = 0;
        let col = 1;
        let texts = [];
        let allTextsSvg = [];
        let indexText = 0;
        
        textAnnotations.forEach((item) => {
            row++;
            item.boundingPoly.vertices.forEach((vertice) => {
              if (row === 1 && col === 3){
                widthTable = vertice.x;
                heightTable = vertice.y;
              }  

              if(col === 1) {
                verticeX = vertice.x;
                verticeY = vertice.y;
              } 
              col == 4 ? col = 1 : col++; 
            });

            let desc = item.description;
            desc = desc.toLowerCase();

            allTextsSvg.push({verticeX, verticeY, desc});

            if(row > 1){
                texts.push( <Text key={++indexText} 
                    stroke="black"
                    fontSize="16"
                    fontWeight="bold"
                    x= {verticeX}
                    y= {verticeY}               
                >{item.description}</Text>)
            }  
        }); 

        allTextsSvg.length > 0 ? this.getRestrictionAlert(allTextsSvg) : null;
            
        return (
            <ScrollView>
                <ScrollView horizontal >
                    <View style={[styles.containerTable]}>
                        <Svg width= {widthTable} height={heightTable}>
                            <Rect
                                x="0"
                                y="0"
                                width={widthTable} 
                                height={heightTable}
                                strokeWidth="2"    
                                fill= "none"                       
                            />
                            {texts}
                        </Svg>                        
                    </View>
                </ScrollView>
            </ScrollView>
        );
    };

    render(){
        return (
            <View style={ styles.container } >
                { this.renderPage() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTable: {
        borderWidth: 2,
        borderColor: 'black',
        margin: 10,
    },
    textBorder:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        borderColor: 'black',
        borderWidth:1,
    },
    textAlert: {
        fontSize: 20,
    }
});