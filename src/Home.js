import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet,
    Text, 
    View,
    Image,
    Button
} from 'react-native';

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
        </View>
      );
    }
}