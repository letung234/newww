import { ObjectId } from 'mongodb'

export interface AccountType {
  _id?: ObjectId
  ten: string
}

export default class Account {
  _id?: ObjectId
  ten: string

  constructor(account: AccountType) {
    this._id = account._id || new ObjectId()
    this.ten = account.ten
  }
}
