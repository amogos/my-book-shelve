import React from 'react';
import { View } from 'react-native';
import AddNewBookForm from '../forms/add_new_book_form';

export default class AddNewBookScreen extends React.Component {
    static screenId = "add";
    constructor(props) {
        super(props);
       //alert(this.props.userdata.email);
    }

    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <AddNewBookForm />
            </View>

        );
    }
}