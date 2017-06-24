import { observable, computed, action } from 'mobx'

class User {
  @observable user
  @observable currentEventAction //value is either view, create, edit, or delete
  @observable formError
  @observable eventBeingEdited //the event that is currently being edited by the user
  @observable fetchingUser
  constructor() {
    this.currentEventAction = 'VIEW'
    this.fetchingUser = false
    this.resetEventBeingEdited()
  }
  @computed get currentEventActionType() {
    return this.currentEventAction.charAt(0) + this.currentEventAction.slice(1).toLowerCase()
  }
  @computed get name() {
    return this.user ? this.user.name : ''
  }
  @computed get isAuthenticated() {
    return this.user ? true : false
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
    this.fetchingUser = false
  }
  @action isFetchingUser() {
    this.fetchingUser = true
  }
  @action logout() {
    this.user = null
  }
}

export default User
