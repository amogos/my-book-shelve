import React from 'react'
import { View, FlatList } from 'react-native'
import Book from '../components/book_component'
import * as DataTypes from "./../types";
import { booksArray } from '../connectors/database_caches'

interface Props {
    action: string;
    userdata: DataTypes.UserType;
    changingkey: string
}

const ListBooksComponent = (props: Props) => {
    return (
        <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
            <table>
                <FlatList<DataTypes.BookRecordType> data={booksArray} extraData={props.action} renderItem={({ item }) => {
                    return <Book id={item.id} value={item.value} userdata={props.userdata} extradata={props.changingkey} />;
                }} />
            </table>
        </View>
    )
}

export default ListBooksComponent