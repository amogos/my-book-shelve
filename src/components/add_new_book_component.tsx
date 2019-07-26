import React, { useState } from 'react';
import * as DataTypes from '../types';
import * as BookStates from '../constants/book_states_constant';
import * as StringConstant from './../constants/string_constant';
import { Select, Input, Button, message } from 'antd';

const { Option } = Select;
const InputGroup = Input.Group;

interface Props {
    languages: DataTypes.LanguageRecordType[];
    categories: DataTypes.CategoryRecordType[];
    userdata: DataTypes.UserRecordType;
    addBook(book: DataTypes.BookValueType): void;
}
const defaultImage =
    'https://vignette.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959';
let currentBook = {
    title: '',
    author: '',
    language: DataTypes.nullLanguage(),
    image: defaultImage,
    owner: DataTypes.nullUser(),
    state: BookStates.default.STATE_BOOK_IDLE,
    holder: DataTypes.nullUser(),
    category: DataTypes.nullCategory(),
};

const AddNewBookComponent = (props: Props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [language, setLanguage] = useState(0);
    const [category, setCategory] = useState(0);

    const onLanguageSelected = (value: number) => {
        if (value < 0 || value > props.languages.length) return;
        setLanguage(value);
        currentBook.language = props.languages[value - 1];
    };

    const onCategorySelected = (value: number) => {
        if (value < 0 || value > props.categories.length) return;
        setCategory(value);
        currentBook.category = props.categories[value - 1];
    };

    const languages = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const children: any[] = [];
        props.languages.forEach(language => children.push(<Option key={language.id}>{language.language}</Option>));
        return children;
    };

    const categories = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const children: any[] = [];
        props.categories.forEach(category => children.push(<Option key={category.id}>{category.title}</Option>));
        return children;
    };

    const onSaveButtonPressed = () => {
        if (title === '' || author === '' || language === 0 || category === 0) {
            message.error(StringConstant.default.MYBOOKSHELVE_INVALID_FIELDS);
            return;
        }
        props.addBook(currentBook);
        setTitle('');
        setAuthor('');
    };

    currentBook.owner = props.userdata;

    return (
        <div className="basic-input-container">
            <InputGroup>
                <Input
                    placeholder="Title"
                    onChange={element => {
                        setTitle(element.target.value);
                        currentBook.title = element.target.value;
                    }}
                    value={title}
                />
                <Input
                    placeholder="Author"
                    onChange={element => {
                        setAuthor(element.target.value);
                        currentBook.author = element.target.value;
                    }}
                    value={author}
                />
                <Select
                    style={{ width: 200 }}
                    placeholder="Select language"
                    onChange={(value: number) => {
                        return onLanguageSelected(value);
                    }}
                >
                    {languages()}
                </Select>

                <Select
                    style={{ width: 200 }}
                    placeholder="Select categorye"
                    onChange={(value: number) => {
                        return onCategorySelected(value);
                    }}
                >
                    {categories()}
                </Select>
            </InputGroup>

            <Button type="primary" onClick={() => onSaveButtonPressed()}>
                Save
            </Button>
        </div>
    );
};

export default AddNewBookComponent;
