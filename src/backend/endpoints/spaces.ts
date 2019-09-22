import axios from 'axios';
import * as DataTypes from '../../types';
import { urlBooks, urlSpaces } from './constants';
import AsyncCallsWaiter from '../utils/async_calls_waiter';
import { getUserRecordTypeFromId } from './user';

export async function getSpaceStatistics(
    space: number,
    onError: (resultCode: number) => void,
): Promise<{ size: number; rating: number; format: string[] }> {
    let size = 0;
    let rating = 0;
    await axios
        .get(`${urlBooks}?space=${space}`)
        .then(response => {
            size = response.data.length;
        })
        .catch(error => {
            onError(error);
        });
    return { size: size, rating: rating, format: ['hardcover'] };
}

async function getSpaceNumberOfFollowers(space: number, onError: (resultCode: number) => void): Promise<number> {
    return 100;
}

export async function getSpaceDataFromRawData(
    item: DataTypes.SpaceRawRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.SpaceType> {
    let spaceOwner = await getUserRecordTypeFromId(item.owner, onError);
    let spaceStatistics = await getSpaceStatistics(item.id, onError);
    let spaceNumberOfFollowers = await getSpaceNumberOfFollowers(item.id, onError);

    const space: DataTypes.SpaceType = {
        id: item.id,
        user: spaceOwner,
        numberOfBooks: spaceStatistics.size,
        numberOfFollowers: spaceNumberOfFollowers,
        rating: spaceStatistics.rating,
        transport: item.transport,
        title: item.title,
        description: item.description,
        format: spaceStatistics.format,
        picture: item.picture,
    };

    return space;
}

async function _getSpaces(url: string, onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    let spacesArray: DataTypes.SpaceType[] = [];
    let waiter = new AsyncCallsWaiter();

    await axios
        .get(urlSpaces)
        .then(response => {
            response.data.forEach(async (item: DataTypes.SpaceRawRecordType) => {
                waiter.begin();
                const space = await getSpaceDataFromRawData(item, onError);
                spacesArray.push(space);
                waiter.end();
            });
        })
        .catch(error => {
            onError(error);
        });

    await waiter.result();
    return spacesArray;
}

export async function getSpaces(onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    return await _getSpaces(urlSpaces, onError);
}

export async function getUserSpaces(user: DataTypes.UserRecordType, onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    return await _getSpaces(`${urlSpaces}?owner=${user.id}`, onError);

}

export async function getSpaceTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.SpaceType> {
    let space = DataTypes.NullSpace;
    let waiter = new AsyncCallsWaiter();
    await axios.get(`${urlSpaces}?id=${id}`).then(async response => {
        waiter.begin();
        space = await getSpaceDataFromRawData(response.data[0], onError);
        waiter.end();
    });
    await waiter.result();
    return space;
}

export async function addDefaultSpaceForUser(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<boolean> {
    const newDefaultSpace = {
        owner: user.id,
        subscription: 0,
        title: user.email,
        description: `${user.name} Default`,
        transport: 0,
        picture: '',
    };

    await axios
        .post(urlSpaces, newDefaultSpace)
        .then(() => {
            return true;
        })
        .catch(error => onError(error));
    return false;
}
