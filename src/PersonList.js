import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";

export default class PersonList extends Component {
    static navigationOptions = {
        title: 'PersonList',
    }

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageIndex: 1,
            isLoading: true,
            totalPage: 0,
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.initData = this.initData.bind(this);
    }
    componentDidMount() {
        this.initData();
    }
    initData(){
        fetch('http://10.101.62.43:11322/getPersonList?pageIndex=1')
        .then(response => response.json())
        .then(responseData => {
            let {
                data,
                totalPage
            } = responseData;

            let newlist = this.state.list.concat(data)

            this.setState({
                list: newlist,
                isLoading: true,
                totalPage,
            });

            // Alert.alert('提示', responseData.data[0].address)
        });
    }
    _keyExtractor = (item, index) => index+'';
    renderList({ item }){
        return (
            <View style={styles.listWrap}>
                <View style={styles.infoWrap}>
                    <Text>姓名：{item.name}</Text>
                    <Text>性别：{item.sex}</Text>
                </View>
                <View style={styles.infoWrap}>
                    <Text>电话：{item.phone}</Text>
                    <Text>生日：{item.birth}</Text>
                </View>


                <Text>地址：{item.address}</Text>
            </View>
        )
    }
    _reachEnd(){
        let {
            pageIndex,
            list,
            totalPage,
        } = this.state;

        if(totalPage == pageIndex){
            return;
        }

        pageIndex++;

        fetch(`http://10.101.62.43:11322/getPersonList?pageIndex=${pageIndex}`)
        .then(response => response.json())
        .then(responseData => {

            let newlist = list.concat(responseData.data)

            if(totalPage == pageIndex){
                this.setState({
                    pageIndex,
                    list: newlist,
                    isLoading: false,
                });
            } else {
                this.setState({
                    pageIndex,
                    list: newlist,
                    isLoading: true,
                });
            }


        });
    }
    
    _renderListBottom = () => {
        let {
            isLoading,
            pageIndex,
            totalPage,
        } = this.state;
        if(isLoading){
            return (
                <View style={styles.loadingWrap}>
                    <ActivityIndicator size="large" color="#FF6600" />
                    <Text style={styles.loadingText}>正在努力加载..</Text>
                </View>
            )
        } else if(pageIndex == totalPage && totalPage != 1){
            return (
                <View style={styles.loadingWrap}>
                    <Text style={styles.loadEndText}>我是有底线的~</Text>
                </View>
            )
        } else {
            return (<View></View>)
        }

    }
    render(){
        return (
            <View style={styles.pageWrap}>
                <FlatList 
                    keyExtractor={this._keyExtractor}
                    data={this.state.list}
                    renderItem={this.renderList}
                    onEndReached={()=>{this._reachEnd()}}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={this._renderListBottom}
                />

            </View>
        )
    }
}

var styles = StyleSheet.create({
    pageWrap: {
        backgroundColor: "#f2f4f7",
    },
    infoWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loadingWrap: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingBottom: 10,
        paddingTop: 10,
    },
    loadingText: {
        marginLeft: 10,
        color: "#333",
        fontSize: 16,
    },
    loadEndText: {
        color: "#333",
        fontSize: 16,
    },
    listWrap: {
        flex: 1,
        height: 80,
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
    }
})






