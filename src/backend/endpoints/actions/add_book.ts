import axios from 'axios';
import { urlBooks, urlCategory, urlLanguages } from '../constants';
import { addCategory } from './../../endpoints/categories';
import { addLanguage } from './../../endpoints/languages';
import * as DataTypes from '../../../shared/types';

export async function addBook(value: DataTypes.BookValueType, onError: (resultCode: number) => void) {
    if (value.category.id <= 0) {
        const newCategory = await addCategory(value.category.title, onError);
        value.category.id = newCategory.id;
    }

    if (value.language.id <= 0) {
        const newLanguage = await addLanguage(value.language.title, onError);
        value.language.id = newLanguage.id;
    }

    await axios
        .post(urlBooks, {
            author: value.author,
            image: value.image,
            language: value.language.id,
            owner: value.owner.id,
            holder: -1,
            title: value.title,
            state: 'state.book.idle',
            isbn: value.isbn,
            category: value.category.id,
            format: value.format,
            space: value.space,
        })
        .catch(error => onError(error));
}
