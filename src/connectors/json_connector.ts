import * as DataTypes from '../types';
import axios from 'axios';

export default class JsonConnector {
    public constructor() {
        this.init();
    }

    private init() {}

    public async getBooks(onError: (resultCode: number) => void): Promise<DataTypes.BookRecordType[]> {
        var booksArray: DataTypes.BookRecordType[] = [];
        await axios
            .get('http://localhost:3001/books')
            .then(response => response.data.json)
            .then(async item => {
                let holder: DataTypes.UserType = DataTypes.nullUser;
                if (item.val().holder > 0) {
                    fetch('http://localhost:3001/users/' + item.val().holder)
                        .then(response => response.json())
                        .then(item => {
                            holder = { name: item.name, email: item.email, id: item.id };
                        });
                }

                let owner: DataTypes.UserType = DataTypes.nullUser;
                fetch('http://localhost:3001/users/' + item.val().owner)
                    .then(response => response.json())
                    .then(item => {
                        owner = { name: item.name, email: item.email, id: item.id };
                    });

                let language = '';
                fetch('http://localhost:3001/languages/' + item.val().language)
                    .then(response => response.json())
                    .then(item => {
                        language = item.language;
                    });

                let bookValue: DataTypes.BookValueType = {
                    title: item.val().title,
                    image: item.val().image,
                    author: item.val().author,
                    language: language,
                    owner: owner,
                    holder: holder,
                    state: item.val().state,
                };
                booksArray.push({
                    id: item.val().id,
                    value: bookValue,
                } as DataTypes.BookRecordType);
            })
            .catch(error => {
                onError(error);
            });
        return booksArray;
    }

    public async confirmRental(
        bookId: number,
        user: DataTypes.UserType,
        onError: (resultCode: number) => void,
    ): Promise<boolean> {
        await axios
            .delete('http://localhost:3001/queues?book_id=' + bookId + '&user_id=' + user.id)
            .catch(error => onError(error));
        return true;
    }
}
