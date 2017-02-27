import { observable, computed, action } from 'mobx'

class User {
  @observable user
  @observable currentEventAction //value is either view, create edit, or delete
  @observable formError
  @observable eventBeingEdited //the event that is currently being edited by the user
  constructor() {
    this.currentEventAction = 'VIEW'
    this.resetEventBeingEdited()
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
  @action setEventBeingEdited(event) {
    this.eventBeingEdited = event
  }
  @action resetEventBeingEdited() {
    this.eventBeingEdited = {title: '', date: '', city:'', state:'', description:''}
  }
  @action setFormError(err) {
    this.formError = err
  }
  @action resetFormError() {
    this.formError = null
  }
  @action setUser(user) {
    this.user = user
  }
  @action logout() {
    this.user = null
    console.log('logged out', this.user);
  }
}

export default User
