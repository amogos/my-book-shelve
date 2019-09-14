import axios from 'axios';
import { urlQueues } from './constants';
import * as DataTypes from '../../types';
import WaitEqual from './../utils/wait_equal';
import { getUserRecordTypeFromId } from './get_user';
import { getBookRawRecordTypeFromId } from './get_books';

export async function getQueueNotifications(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.QueueNotificationRecordType[]> {
    let waiter = new WaitEqual();
    let rentalNotifications: DataTypes.QueueNotificationRecordType[] = [];
    await axios
        .get(urlQueues + '?ownerId=' + user.id)
        .then(response => {
            if (response.data.length === 0) return rentalNotifications;

            response.data.forEach(async (item: any) => {
                waiter.begin();
                const user = await getUserRecordTypeFromId(item.userId, onError);
                const rawBook = await getBookRawRecordTypeFromId(item.bookId, onError);
                const notAssigned = rawBook.holder < 0;
                const alreadyOneRequestForBookIdProcessed = rentalNotifications.find(
                    notifiction => notifiction.bookId === item.bookId,
                );
                if (notAssigned && !alreadyOneRequestForBookIdProcessed) {
                    let notification: DataTypes.QueueNotificationRecordType = {
                        id: item.id,
                        bookTitle: rawBook.title,
                        bookId: item.bookId,
                        user: user,
                        duration: item.duration,
                    };
                    rentalNotifications.push(notification);
                }
                waiter.end();
            });
        })
        .catch(error => onError(error));

    await waiter.result();
    return rentalNotifications;
}
