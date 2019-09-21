import React from 'react';
import FacebookLogin from 'react-facebook-login';
import * as DataTypes from '../../types';
import {Button} from 'antd'

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
}

const responseFacebook = (response: any, props: Props) => {
    let testUserEmail = (response.name as string)
        .trim()
        .toLowerCase()
        .concat('@gmail.com')
        .split(' ')
        .join('');
    const email = response.email === undefined ? testUserEmail : response.email;
    const userInfo: DataTypes.UserValueType = { name: response.name, email: email, picture: response.picture.data.url };
    props.loginUser(userInfo);
};

const componentClicked = () => {};

const FacebookMockComponent = (props:Props) => {
    return (<Button onClick={()=>
       { const userInfo: DataTypes.UserValueType = { name: "Iulia Mogos", email: "daosmistique@yahoo.com", picture: "" };
        props.loginUser(userInfo);}
    }/>);
}

const FacebookComponent = (props: Props) => {
    return (
        <FacebookLogin
            appId="298690497437467"
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends,user_actions.books"
            onClick={componentClicked}
            callback={response => responseFacebook(response, props)}
            icon="fa-facebook"
        />
    );
};

export default FacebookMockComponent;