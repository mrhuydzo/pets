/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList,} from 'react-native';

export default class List  extends Component {
    constructor(props){
        super(props);
        this.state= {
            array: [],
            page: 1,
        }
    }
    loadMore (){
        this.setState({
            page: this.state.page + 1
        }, ()=> {
            fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.bacsithuy.org%2Fchuyen-muc%2Fsinh-san-nhan-giong%2Fpage%2F'+this.state.page+'%2Frss')
            .then((response) => response.json())
            .then((responseJson)=> {

                this.setState({
                    array:this.state.array.concat(responseJson.items)
                })
                console.log(responseJson.items);
            })
        })
    }
    render() {
        return (
            <View>
                <Text>List</Text>
                <Text style={styles.pagination}>Trang: {this.state.page}</Text>

                <FlatList
                    onEndReached={()=>{this.loadMore()}}
                    onEndReachedThreshold="-0.2"
                    data={this.state.array}
                    keyExtractor={(item, index) => index}
                    renderItem={
                        ({item}) =>
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemDate}>{item.pubDate}</Text>
                            </View>
                        }
                />
            </View>
        );
    }
    componentDidMount(){
        //https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.bacsithuy.org%2Fchuyen-muc%2Fsinh-san-nhan-giong%2Fpage%2F2%2Frss
        //https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.bacsithuy.org%2Fchuyen-muc%2Fsinh-san-nhan-giong%2Fpage%2F1%2Frss

        fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.bacsithuy.org%2Fchuyen-muc%2Fsinh-san-nhan-giong%2Fpage%2F'+this.state.page+'%2Frss')
        .then((response) => response.json())
        .then((responseJson)=> {
            this.setState({
                array:responseJson.items
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 20
    },
    pagination: {
        backgroundColor: '#eee',
        textAlign: 'center',
        padding: 5
    },
    itemContainer: {
      padding: 5,
      borderBottomWidth: 1,
      borderColor: '#333'
    },
    itemTitle: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    itemDate: {
        color: '#cecece',
        fontSize: 12
    }
});

