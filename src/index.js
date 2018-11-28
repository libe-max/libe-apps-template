import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import config from './config.json'

const App = () => <div className="libe-labo-app-wrapper">
  {/* Here: your app component with config.js as props */}
</div>

ReactDOM.render(
  <App />,
  document.getElementById('react-app-root')
)

serviceWorker.unregister()
