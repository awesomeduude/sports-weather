import React from 'react'
import { observer, inject } from 'mobx-react'

const Dashboard = inject('store')(observer(props =>
  <div className="dashboard">
    <h1>Dashboard</h1>
    <h2>Hello, {props.store.name}</h2>
  </div>
))
export default Dashboard
