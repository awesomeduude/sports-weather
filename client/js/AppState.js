import { observable, action } from 'mobx'

class User {
  @observable name
  @observable user
  constructor(name) {
    this.name = name
  }
  @action setUser(user) {
    this.user = user
  }
}

export default User
