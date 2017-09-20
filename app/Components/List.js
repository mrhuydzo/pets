/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';



export default class List  extends Component {
    constructor(props){
        super(props);
        this.state= {
            array: [],
            page: 1
        }
    }
    render() {
        return (
            <View>
                <Text>List</Text>
                <Text style={styles.pagination}>Trang: {this.state.page}</Text>

                <FlatList data={this.state.array} renderItem={({item}) => <Text key={item.id}>{item.title}</Text>}/>
            </View>
        );
    }
    componentDidMount(){
        console.log('vao');
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.bacsithuy.org%2Fchuyen-muc%2Fsinh-san-nhan-giong%2Ffeed%2F')
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
    }

});

