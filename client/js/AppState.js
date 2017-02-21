import { observable, computed, action } from 'mobx'

class User {
  @observable user
  @observable currentEventAction //value is either view, create edit, or delete
  @observable formError
  constructor() {
    this.currentEventAction = 'VIEW'
  }
  @computed get name() {
    return this.user.name || '3rr'
  }

  @action setCurrentEventAction(action) {
    if (action !== 'VIEW' && action !== 'CREATE' && action !== 'EDIT' && action !== 'DELETE') {
      throw new Error('Incorrect action type: ' + action)
    } else {
      this.currentEventAction = action
    }
  }
  @action setFormError(err) {
    this.formError = err
  }
  @action resetFormError() {
    this.formError = null
  }
  @action setUser(user) {
    this.user = user
    console.log('user set', this.user);
  }
}

export default User
