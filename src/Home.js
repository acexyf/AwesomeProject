import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet,
    Text, 
    View,
    Image,
    Button,
    Alert,
} from 'react-native';
import { red } from 'ansi-colors';
// import fetch from 'whatwg-fetch';

export default class Home extends Component<Props> {
    static navigationOptions = {
        title: 'Home',
    }
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            imgUrl: 'http://pic5.40017.cn/01/000/79/0a/rBLkBVpVuxmAUQqmAAARnUFXcFc487.png'
        }
    }
    componentDidMount(){
        // Alert.alert(fetch)

    }

    _onPressFetch(){

        fetch('https://www.baidu.com/home/msg/data/personalcontent?num=8&indextype=manht&_req_seqid=0xb488f6860006b7be&asyn=1&t=1544664517265&sid=1468_21082_28019_26350_27750',{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })
        .then(response => response.json())
        .then(response => {
            Alert.alert('提示',response.code)
        })
    }

    render() {
        const { navigate, push } = this.props.navigation;
        const {
            imgUrl
        } = this.state;
      return (
        <View>
            <Image source={{uri: imgUrl}} style={styles.imgStyle} />
            <Text style={styles.welcomeStyle}>Welcome Homes XYF!</Text>
            <View>

                <View style={styles.buttons}>
                    <Button
                        onPress={()=>{
                            push('Profile', { name: 'Jane' })
                        }}
                        title="Go Profile" />
                </View>
                
                <View style={styles.buttons}>
                    <Button 
                    onPress={()=>{
                        Alert.alert('提示',`this platform is ${Platform.OS},version is ${Platform.Version}`)
                    }}
                     title="Show Platform" />
                 </View>

                <View style={styles.buttons}>
                    <Button 
                    onPress={this._onPressFetch}
                    color="#f60"
                    title="Click To Fetch" />
                </View>

                <View style={styles.buttons}>
                    <Button 
                    onPress={()=>{
                        push('SampleAppMovies')
                    }}
                    title="Click To SampleAppMovies" />
                </View>

                <View style={styles.buttons}>
                    <Button 
                    onPress={()=>{
                        push('Animate')
                    }}
                    title="Click To Animate" />
                </View>

                <View style={styles.buttons}>
                    <Button 
                    onPress={()=>{
                        push('PersonList')
                    }}
                    title="Click To PersonList" />
                </View>

            </View>

        </View>
      );
    }
}

const styles = StyleSheet.create({
    welcomeStyle: {
        color: '#f60',
        textAlign: 'center',
        fontSize: 26,
        marginTop: 10,
    },  
    imgStyle:{
        width: 100,
        height: 50,
    },
    buttons: {
        margin: 10,
    }
})

