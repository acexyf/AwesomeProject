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

const styles = StyleSheet.create({
    buttons: {
        margin: 20
    }
})

export default class Home extends Component<Props> {
    static navigationOptions = {
        title: 'Home',
    };
    render() {
        const { navigate, push } = this.props.navigation;
      return (
        <View>
            <Text>Welcome Homes!</Text>
            <Button
                onPress={()=>{
                    push('Profile', { name: 'Jane' })
                }}
                title="Go Profile" />
            
            <Button 
            onPress={()=>{
                Alert.alert('Tap click')
            }}
             style={styles.buttons} title="Click To Alert" />

        </View>
      );
    }
}


