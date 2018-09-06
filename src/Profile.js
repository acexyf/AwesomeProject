import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet,
    Text, 
    View,
    Image,
    Button
} from 'react-native';

export default class Profile extends Component<Props> {
    static navigationOptions = {
        title: 'Profile',
    };
    render() {
        const {
            goBack,
            push,
            navigate,
            getParam
        } = this.props.navigation;
        let name = getParam('name', 'ace')
      return (
        <View>
          <Text>Welcome Profile!</Text>
          <Button style={styles.buttons} title="Go Back" onPress={()=>{goBack()}} />
          <Button style={styles.buttons} title="Navigate Now" onPress={()=>{navigate('Profile')}} />
          <Button style={styles.buttons} title="Push Now" onPress={()=>{push('Profile')}} />
          <Text>{name}</Text>
        </View>
      );
    }
}


const styles = StyleSheet.create({
    buttons: {
        margin: 20,

    }
})