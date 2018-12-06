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
    }
    constructor(props){
        super(props);
        this.state = { isLoading: true}
    }
    componentDidMount(){
        // Alert.alert('初始化'+this.state.isLoading)
    }
    render() {
        const { navigate, push } = this.props.navigation;
      return (
        <View>
            <Text>Welcome Homes!</Text>
            <View>
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

        </View>
      );
    }
}


