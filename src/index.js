import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import config from './config'
import 'whatwg-fetch'

const App = props => <div>
  {/* Replace this App component with your app */}
</div>

ReactDOM.render(
  <App {...config} />,
  document.getElementById('libe-labo-app-wrapper')
)

serviceWorker.unregister()
