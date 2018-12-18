import React, { Component } from 'react';

import { Image, FlatList, StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";

import {unitWidth, width} from './utils/AdapterUtil';

export default class TicketList extends Component {
    static navigationOptions = {
        title: 'TicketList',
    }

    constructor(props){
        super(props);
        this.state = {
            list: [],
            pageIndex: 1,
            totalPage: 0,
        }
    }
    componentDidMount(){
        this.initData();
    }

    initData(){
        fetch('http://10.101.62.43:11322/getTicketList?pageIndex=1')
        .then(response => response.json())
        .then(responseData => {
            let {
                code,
                data
            } = responseData;

            data.map((elem)=>{
                if(elem.featureTab){
                    elem.tagList = elem.featureTab.split(';')
                } else {
                    elem.tagList = [];
                }
            })

            this.setState({
                list: data 
            })
        })
    }

    _keyExtractor = (item, index) => index+'';

    _renderList({ item }){
        return (
            <View style={styles.ticketLine}>
                <Image source={{uri: item.image}} style={styles.ticketImg} />
                <View style={styles.ticketInfo}>
                    <View style={styles.ticketName}>
                        <Text style={styles.ticketNameText}>{item.title}</Text>
                    </View>
                    <View style={styles.tagBox}>
                        {
                            item.tagList.map((elem, index)=>{
                                return (<View key={index} style={styles.tagItem}><Text style={styles.tagText}>{elem}</Text></View>)
                            })
                        }
                    </View>
                    <View style={styles.scoreWrap}>
                        <Text style={styles.scoreText}>4.8分</Text>
                        <Text style={styles.satisfyText}>96%满意</Text>
                    </View>
                    <View style={[styles.priceWrap, !item.tagList.length && styles.priceTop]}>
                        <Text style={styles.priceSymbol}>￥</Text>
                        <Text style={styles.priceNum}>{item.price}</Text>
                        <Text style={styles.priceUp}>起</Text>
                    </View>
                </View>
            </View>
        )
    }

    _renderListBottom = () => {
        let {
            pageIndex,
            totalPage,
        } = this.state;
        if(true){
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
    _renderMore = () => {
        let {
            pageIndex,
            list
        } = this.state;
        pageIndex++;
        fetch(`http://10.101.62.43:11322/getTicketList?pageIndex=${pageIndex}`)
        .then(response => response.json())
        .then(responseData => {
            let {
                code,
                data
            } = responseData;

            data.map((elem)=>{
                if(elem.featureTab){
                    elem.tagList = elem.featureTab.split(';')
                } else {
                    elem.tagList = [];
                }
            })

            this.setState({
                list: list.concat(data),
                pageIndex,
            })
        })
    }
    render(){
        return (
            <View style={styles.ticketWrap}>
                <FlatList 
                    keyExtractor={this._keyExtractor}
                    data={this.state.list}
                    renderItem={this._renderList}
                    onEndReached={this._renderMore}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={this._renderListBottom}/>

            </View>
        )
    }

}


const styles = StyleSheet.create({
    ticketWrap: {
        backgroundColor: "#f2f4f7",

    },
    loadingText: {
        marginLeft: 10 * unitWidth,
        fontSize: 30 * unitWidth,
        color: "#333",
    },
    loadEndText: {
        color: "#333",
        fontSize: 30 * unitWidth,
    },
    loadingWrap: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: 100 * unitWidth,
        paddingBottom: 10 * unitWidth,
        paddingTop: 10 * unitWidth,
    },
    ticketLine: {
        paddingLeft: 30 * unitWidth,
        paddingRight: 30 * unitWidth,
        paddingTop: 30 * unitWidth,
        paddingBottom: 30 * unitWidth,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderBottomColor: '#F6F7FA',
        display: 'flex',
        flexDirection: 'row'
    },
    ticketImg: {
        width: 210 * unitWidth,
        height: 190 * unitWidth,
    },
    ticketInfo: {
        paddingLeft: 30 * unitWidth,
        width: 450 * unitWidth,
        height: 190 * unitWidth,
    },
    ticketName: {
        height: 40 * unitWidth,
        marginBottom: 20 * unitWidth,
    },
    ticketNameText: {
        color: '#333',
        fontSize: 32 * unitWidth
    },
    tagBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    tagItem: {
        height: 40 * unitWidth,
        borderColor: '#ddd',
        borderRadius: 2 * unitWidth,
        borderWidth: 1 * unitWidth,
        marginRight: 10 * unitWidth,
    },
    tagText: {
        color: '#999',
        fontSize: 20 * unitWidth,
        lineHeight: 40 * unitWidth,
        paddingLeft: 5,
        paddingRight: 5,
    },
    scoreWrap: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    scoreText: {
        color: '#28c54d',
        paddingRight: 15,
        fontSize: 26 * unitWidth,
    },
    satisfyText: {
        color: '#28c54d',
        fontSize: 22 * unitWidth,
    },
    priceWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 5
    },
    priceSymbol: {
        color: '#ff5346',
        fontSize: 26 * unitWidth,
    },
    priceNum: {
        lineHeight: 40 * unitWidth,
        color: '#ff5346',
        fontSize: 36 * unitWidth,
    },
    priceUp: {
        color: '#999',
        fontSize: 26 * unitWidth,
    },
    priceTop: {
        marginTop: 20,
    }
})











