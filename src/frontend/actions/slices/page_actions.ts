import * as ActionTypes from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';

class PageAction {
    public getSpaces = (filters: string[]) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GOTO_LIST_SPACES,
        filters,
    });

    public getBooks = (filters: string[], callbacks: ((books: DataTypes.BookRecordType[]) => void)[]) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GOTO_LIST_BOOKS,
        filters,
        callbacks,
    });

    public addUrlParams = (urlparams: DataTypes.UrlParms) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_ADD_URL_PARAMS,
        urlparams,
    });

    public refreshState = (params: any) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_REFRESH_STATE,
        params,
    });
}

export default PageAction;
