import * as ActionTypes from '../constants/action_constant'
import * as DataTypes from "../types";

export const gotoAddBook = (message?: DataTypes.ConfirmationDialogParams) => ({ type: ActionTypes.ACTION_GOTO_ADD_BOOK, message })
export const addBook = (data: DataTypes.BookValueType) => ({ type: ActionTypes.ACTION_ADD_BOOK, data })

export const gotoListBooks = () => ({ type: ActionTypes.ACTION_GOTO_LIST_BOOKS })
export const listBooks = (message?: DataTypes.ConfirmationDialogParams) => ({ type: ActionTypes.ACTION_LIST_BOOKS, message })

export const addUserData = (userdata: DataTypes.UserType) => ({ type: ActionTypes.ACTION_USER_DATA, userdata })

export const assignBook = (book_key: DataTypes.BookKeyType) => ({ type: ActionTypes.ACTION_ASSIGN_BOOK, book_key })
export const returnBook = (book_key: DataTypes.BookKeyType) => ({ type: ActionTypes.ACTION_RETURN_BOOK, book_key })
export const deleteBook = (book_key: DataTypes.BookKeyType) => ({ type: ActionTypes.ACTION_DELETE_BOOK, book_key })

export const confirmMessage = () => ({ type: ActionTypes.ACTION_CONFIRM_MESSAGE })