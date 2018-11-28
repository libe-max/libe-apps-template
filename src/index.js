import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import config from './config.json'

const App = () => <div {...config}>
  {/* Replace this App component with your app */}
</div>

ReactDOM.render(
  <App />,
  document.getElementById('libe-labo-app-wrapper')
)

serviceWorker.unregister()
