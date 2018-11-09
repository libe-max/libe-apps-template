import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import config from './config'

const SomeApp = props => <div className="some-app">
  <pre>{JSON.stringify(props, null, 2)}</pre>
</div>

const LibeLaboAppWrapper = props => <div
  className="libe-labo-app-wrapper">
  <SomeApp {...config} />
</div>

ReactDOM.render(
  <LibeLaboAppWrapper />,
  document.getElementById('react-app-root')
)

serviceWorker.unregister()
