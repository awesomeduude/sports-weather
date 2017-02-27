import React from 'react'
import { observer, inject } from 'mobx-react'
const Dashboard = inject('store')(observer(props =>
  <div>
    <h1>Dashboard</h1>
    <h2>Hello, {props.store.name||'no us3r'}</h2>
  </div>
))
export default Dashboard
