import React, { Component } from 'react'
import config from './config'

export default class App extends Component {
  render () {
    return <div style={{padding: '10vh 10vw'}}
      className="libe-labo-app-wrapper">
      <h3>Import your app here, and pass config as props</h3>
      <h4>Config:</h4>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  }
}
